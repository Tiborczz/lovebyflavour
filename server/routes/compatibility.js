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

// Get compatibility analysis for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Get user traits
    const userTraits = await getUserTraits(userId);
    
    // Get all flavours for comparison
    const flavours = await getFlavours();
    
    // Generate compatibility insights
    const compatibilityInsights = await aiService.generateCompatibilityInsights(
      userTraits, 
      flavours
    );

    // Store the analysis
    await new Promise((resolve, reject) => {
      getDb().run(
        'INSERT INTO compatibility_analyses (id, user_id, analysis_type, analysis_data, insights, confidence_score) VALUES (?, ?, ?, ?, ?, ?)',
        [
          uuidv4(), userId, 'compatibility_analysis',
          JSON.stringify(compatibilityInsights),
          compatibilityInsights.overall_insights || '',
          0.85
        ],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    res.json({
      success: true,
      compatibility: compatibilityInsights,
      userTraits
    });

  } catch (error) {
    console.error('Error generating compatibility analysis:', error);
    res.status(500).json({ error: 'Failed to generate compatibility analysis: ' + error.message });
  }
});

// Get flavour compatibility matrix
router.get('/flavours/matrix', async (req, res) => {
  try {
    const flavours = await getFlavours();
    
    const matrix = {};
    flavours.forEach(flavour => {
      matrix[flavour.id] = {
        ...flavour,
        compatibility_matrix: JSON.parse(flavour.compatibility_matrix)
      };
    });

    res.json({ matrix });
  } catch (error) {
    console.error('Error fetching compatibility matrix:', error);
    res.status(500).json({ error: 'Failed to fetch compatibility matrix' });
  }
});

// Analyze specific flavour pairing
router.post('/analyze-pairing', async (req, res) => {
  try {
    const { userFlavour, targetFlavour } = req.body;

    if (!userFlavour || !targetFlavour) {
      return res.status(400).json({ error: 'Both user and target flavours are required' });
    }

    // Get flavour details
    const userFlavourData = await getFlavourById(userFlavour);
    const targetFlavourData = await getFlavourById(targetFlavour);

    if (!userFlavourData || !targetFlavourData) {
      return res.status(404).json({ error: 'Flavour not found' });
    }

    // Calculate compatibility score
    const userMatrix = JSON.parse(userFlavourData.compatibility_matrix);
    const compatibilityScore = userMatrix[targetFlavour] || 0.5;

    // Get detailed analysis
    const analysis = {
      compatibility_score: compatibilityScore,
      user_flavour: {
        ...userFlavourData,
        personality_traits: JSON.parse(userFlavourData.personality_traits),
        psychological_profile: JSON.parse(userFlavourData.psychological_profile),
        red_flags: JSON.parse(userFlavourData.red_flags),
        green_flags: JSON.parse(userFlavourData.green_flags)
      },
      target_flavour: {
        ...targetFlavourData,
        personality_traits: JSON.parse(targetFlavourData.personality_traits),
        psychological_profile: JSON.parse(targetFlavourData.psychological_profile),
        red_flags: JSON.parse(targetFlavourData.red_flags),
        green_flags: JSON.parse(targetFlavourData.green_flags)
      },
      analysis: generatePairingAnalysis(userFlavourData, targetFlavourData, compatibilityScore)
    };

    res.json({ success: true, analysis });

  } catch (error) {
    console.error('Error analyzing pairing:', error);
    res.status(500).json({ error: 'Failed to analyze pairing' });
  }
});

// Helper functions
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
            traits[row.category][row.trait_key] = JSON.parse(row.trait_value);
          });
          resolve(traits);
        }
      }
    );
  });
}

async function getFlavours() {
  return new Promise((resolve, reject) => {
    getDb().all('SELECT * FROM flavours', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function getFlavourById(flavourId) {
  return new Promise((resolve, reject) => {
    getDb().get('SELECT * FROM flavours WHERE id = ?', [flavourId], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function generatePairingAnalysis(userFlavour, targetFlavour, compatibilityScore) {
  const userTraits = JSON.parse(userFlavour.personality_traits);
  const targetTraits = JSON.parse(targetFlavour.personality_traits);
  
  const strengths = [];
  const challenges = [];
  const tips = [];

  // Analyze Big Five compatibility
  const bigFiveDiff = {
    openness: Math.abs(userTraits.big_five.openness - targetTraits.big_five.openness),
    conscientiousness: Math.abs(userTraits.big_five.conscientiousness - targetTraits.big_five.conscientiousness),
    extraversion: Math.abs(userTraits.big_five.extraversion - targetTraits.big_five.extraversion),
    agreeableness: Math.abs(userTraits.big_five.agreeableness - targetTraits.big_five.agreeableness),
    neuroticism: Math.abs(userTraits.big_five.neuroticism - targetTraits.big_five.neuroticism)
  };

  // Generate insights based on trait differences
  if (bigFiveDiff.extraversion < 0.3) {
    strengths.push('Similar social energy levels create natural harmony');
  } else {
    challenges.push('Different social needs may require compromise');
    tips.push('Balance social activities to meet both partners\' needs');
  }

  if (bigFiveDiff.conscientiousness < 0.2) {
    strengths.push('Aligned approaches to responsibility and organization');
  } else {
    challenges.push('Different organizational styles may cause friction');
    tips.push('Respect each other\'s approach to planning and structure');
  }

  if (compatibilityScore > 0.8) {
    strengths.push('High overall psychological compatibility');
  } else if (compatibilityScore < 0.5) {
    challenges.push('Significant personality differences require extra effort');
    tips.push('Focus on understanding and appreciating your differences');
  }

  return {
    overall_rating: compatibilityScore > 0.7 ? 'Excellent' : compatibilityScore > 0.5 ? 'Good' : 'Challenging',
    strengths,
    challenges,
    tips,
    long_term_potential: compatibilityScore > 0.6 ? 'High' : 'Moderate'
  };
}

export default router; 