import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from '../database/init.js';
import aiService from '../services/aiService.js';

const router = express.Router();
let _db = null;

function getDb() {
  if (!_db) {
    _db = getDatabase();
  }
  return _db;
}

// Get all ex-partners for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    getDb().all(
      `SELECT ep.*, 
       GROUP_CONCAT(ept.trait_key || ':' || ept.trait_value) as traits
       FROM ex_partners ep
       LEFT JOIN ex_partner_traits ept ON ep.id = ept.ex_partner_id
       WHERE ep.user_id = ?
       GROUP BY ep.id
       ORDER BY ep.created_at DESC`,
      [userId],
      (err, rows) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Failed to fetch ex-partners' });
        }
        
        const exPartners = rows.map(row => ({
          ...row,
          traits: row.traits ? row.traits.split(',').reduce((acc, trait) => {
            const [key, value] = trait.split(':');
            acc[key] = value;
            return acc;
          }, {}) : {}
        }));
        
        res.json({ exPartners });
      }
    );
  } catch (error) {
    console.error('Error fetching ex-partners:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit ex-partner quiz responses and get AI analysis
router.post('/analyze', async (req, res) => {
  try {
    const {
      userId,
      nickname,
      relationshipDuration,
      relationshipEndReason,
      relationshipSatisfaction,
      quizResponses
    } = req.body;

    // Validate required fields
    if (!userId || !nickname || !quizResponses) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const exPartnerId = uuidv4();

    // Process quiz responses into structured traits
    const traits = processQuizResponses(quizResponses);
    
    // Get AI analysis of the ex-partner's flavour
    const relationshipContext = {
      duration: relationshipDuration,
      endReason: relationshipEndReason,
      satisfaction: relationshipSatisfaction
    };

    const aiAnalysis = await aiService.analyzeExPartnerFlavour(traits, relationshipContext);

    // Insert ex-partner record
    await new Promise((resolve, reject) => {
      getDb().run(
        `INSERT INTO ex_partners 
         (id, user_id, nickname, relationship_duration_months, relationship_end_reason, 
          relationship_satisfaction, inferred_flavour, flavour_confidence)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          exPartnerId, userId, nickname, relationshipDuration,
          relationshipEndReason, relationshipSatisfaction,
          aiAnalysis.flavour, aiAnalysis.confidence
        ],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    // Insert traits
    const traitPromises = Object.entries(traits).map(([category, categoryTraits]) => {
      return Object.entries(categoryTraits).map(([key, value]) => {
                  return new Promise((resolve, reject) => {
            getDb().run(
            `INSERT INTO ex_partner_traits 
             (id, ex_partner_id, category, trait_key, trait_value, raw_score)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [uuidv4(), exPartnerId, category, key, JSON.stringify(value), value.score || 0],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
      });
    }).flat();

    await Promise.all(traitPromises);

    res.json({
      success: true,
      exPartnerId,
      analysis: aiAnalysis,
      message: `${nickname} has been analyzed as ${aiAnalysis.flavour} ${getFlavourEmoji(aiAnalysis.flavour)}`
    });

  } catch (error) {
    console.error('Error analyzing ex-partner:', error);
    res.status(500).json({ error: 'Failed to analyze ex-partner: ' + error.message });
  }
});

// Get pattern analysis for user's dating history
router.get('/patterns/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user traits
    const userTraits = await getUserTraits(userId);
    
    // Get all ex-partners with their analysis
    const exPartners = await getExPartnersWithAnalysis(userId);

    if (exPartners.length < 2) {
      return res.json({
        message: 'Need at least 2 ex-partners for pattern analysis',
        requiresMoreData: true
      });
    }

    // Get AI pattern analysis
    const patternAnalysis = await aiService.analyzePatterns(userTraits, exPartners);

    // Store analysis in database
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO compatibility_analyses 
         (id, user_id, analysis_type, analysis_data, insights, confidence_score)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          uuidv4(), userId, 'pattern_analysis',
          JSON.stringify(patternAnalysis), patternAnalysis.overall_insights || '',
          patternAnalysis.confidence_score || 0.8
        ],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    res.json({
      success: true,
      patterns: patternAnalysis,
      exPartnerCount: exPartners.length
    });

  } catch (error) {
    console.error('Error analyzing patterns:', error);
    res.status(500).json({ error: 'Failed to analyze patterns: ' + error.message });
  }
});

// Delete an ex-partner
router.delete('/:exPartnerId', async (req, res) => {
  try {
    const { exPartnerId } = req.params;

    await new Promise((resolve, reject) => {
      getDb().run('DELETE FROM ex_partners WHERE id = ?', [exPartnerId], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.json({ success: true, message: 'Ex-partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting ex-partner:', error);
    res.status(500).json({ error: 'Failed to delete ex-partner' });
  }
});

// Helper functions
function processQuizResponses(responses) {
  const traits = {
    big_five: {},
    attachment: {},
    behavior: {},
    physical: {},
    lifestyle: {}
  };

  // Process each quiz response into psychological traits
  Object.entries(responses).forEach(([questionId, answer]) => {
    const mapping = getTraitMapping(questionId, answer);
    if (mapping) {
      const { category, trait, value, score } = mapping;
      traits[category][trait] = { value, score };
    }
  });

  return traits;
}

function getTraitMapping(questionId, answer) {
  // Map quiz questions to psychological traits
  const mappings = {
    'communication_style': {
      category: 'big_five',
      trait: 'extraversion',
      values: {
        'very_expressive': { value: 'high_extraversion', score: 0.9 },
        'balanced': { value: 'moderate_extraversion', score: 0.6 },
        'reserved': { value: 'low_extraversion', score: 0.2 }
      }
    },
    'conflict_resolution': {
      category: 'attachment',
      trait: 'conflict_style',
      values: {
        'direct_discussion': { value: 'secure', score: 0.8 },
        'avoids_conflict': { value: 'avoidant', score: 0.7 },
        'emotional_response': { value: 'anxious', score: 0.6 },
        'passive_aggressive': { value: 'disorganized', score: 0.4 }
      }
    },
    'emotional_expression': {
      category: 'big_five',
      trait: 'neuroticism',
      values: {
        'very_emotional': { value: 'high_neuroticism', score: 0.8 },
        'stable': { value: 'low_neuroticism', score: 0.2 },
        'mood_swings': { value: 'moderate_neuroticism', score: 0.6 }
      }
    },
    'social_energy': {
      category: 'big_five',
      trait: 'extraversion',
      values: {
        'life_of_party': { value: 'high_extraversion', score: 0.9 },
        'social_but_selective': { value: 'moderate_extraversion', score: 0.6 },
        'prefers_small_groups': { value: 'low_extraversion', score: 0.3 }
      }
    },
    'adventure_seeking': {
      category: 'big_five',
      trait: 'openness',
      values: {
        'thrill_seeker': { value: 'high_openness', score: 0.9 },
        'occasional_adventure': { value: 'moderate_openness', score: 0.6 },
        'prefers_routine': { value: 'low_openness', score: 0.2 }
      }
    },
    'commitment_style': {
      category: 'attachment',
      trait: 'commitment',
      values: {
        'all_in_quickly': { value: 'anxious_attachment', score: 0.7 },
        'gradual_commitment': { value: 'secure_attachment', score: 0.8 },
        'commitment_hesitant': { value: 'avoidant_attachment', score: 0.6 }
      }
    }
  };

  const mapping = mappings[questionId];
  if (!mapping || !mapping.values[answer]) {
    return null;
  }

  return {
    category: mapping.category,
    trait: mapping.trait,
    ...mapping.values[answer]
  };
}

async function getUserTraits(userId) {
  return new Promise((resolve, reject) => {
    getDb().all(
      'SELECT category, trait_key, trait_value FROM user_traits WHERE user_id = ?',
      [userId],
      (err, rows) => {
        if (err) reject(err);
        else {
          const traits = {};
          rows.forEach(row => {
            if (!traits[row.category]) traits[row.category] = {};
            traits[row.category][row.trait_key] = row.trait_value;
          });
          resolve(traits);
        }
      }
    );
  });
}

async function getExPartnersWithAnalysis(userId) {
  return new Promise((resolve, reject) => {
    getDb().all(
      `SELECT ep.*, 
       GROUP_CONCAT(ept.category || ':' || ept.trait_key || ':' || ept.trait_value) as traits
       FROM ex_partners ep
       LEFT JOIN ex_partner_traits ept ON ep.id = ept.ex_partner_id
       WHERE ep.user_id = ?
       GROUP BY ep.id`,
      [userId],
      (err, rows) => {
        if (err) reject(err);
        else {
          const exPartners = rows.map(row => {
            const traits = {};
            if (row.traits) {
              row.traits.split(',').forEach(trait => {
                const [category, key, value] = trait.split(':');
                if (!traits[category]) traits[category] = {};
                traits[category][key] = value;
              });
            }
            return {
              id: row.id,
              nickname: row.nickname,
              duration: row.relationship_duration_months,
              endReason: row.relationship_end_reason,
              satisfaction: row.relationship_satisfaction,
              inferredFlavour: row.inferred_flavour,
              confidence: row.flavour_confidence,
              traits
            };
          });
          resolve(exPartners);
        }
      }
    );
  });
}

function getFlavourEmoji(flavour) {
  const emojis = {
    vanilla: '🍦',
    strawberry: '🍓',
    chocolate: '🍫',
    mango: '🥭'
  };
  return emojis[flavour] || '❓';
}

export default router; 