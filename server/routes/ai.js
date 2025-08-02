import express from 'express';
import aiService from '../services/aiService.js';

const router = express.Router();

// Infer user's own flavour
router.post('/infer-user-flavour', async (req, res) => {
  try {
    const { userTraits, behaviorPatterns } = req.body;

    if (!userTraits) {
      return res.status(400).json({ error: 'User traits are required' });
    }

    const analysis = await aiService.inferUserFlavour(userTraits, behaviorPatterns || {});

    res.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('Error inferring user flavour:', error);
    res.status(500).json({ error: 'Failed to infer user flavour: ' + error.message });
  }
});

// Generate custom compatibility insights
router.post('/compatibility-insights', async (req, res) => {
  try {
    const { userProfile, targetFlavours } = req.body;

    if (!userProfile || !targetFlavours) {
      return res.status(400).json({ error: 'User profile and target flavours are required' });
    }

    const insights = await aiService.generateCompatibilityInsights(userProfile, targetFlavours);

    res.json({
      success: true,
      insights
    });

  } catch (error) {
    console.error('Error generating compatibility insights:', error);
    res.status(500).json({ error: 'Failed to generate insights: ' + error.message });
  }
});

// Analyze dating patterns
router.post('/analyze-patterns', async (req, res) => {
  try {
    const { userTraits, exPartners } = req.body;

    if (!userTraits || !exPartners || exPartners.length < 2) {
      return res.status(400).json({ error: 'User traits and at least 2 ex-partners are required' });
    }

    const patterns = await aiService.analyzePatterns(userTraits, exPartners);

    res.json({
      success: true,
      patterns
    });

  } catch (error) {
    console.error('Error analyzing patterns:', error);
    res.status(500).json({ error: 'Failed to analyze patterns: ' + error.message });
  }
});

// NEW: Real-time emotional tone analysis
router.post('/emotional-tone', async (req, res) => {
  try {
    const { userData, exPartners, lifestyleTags } = req.body;

    if (!userData) {
      return res.status(400).json({ error: 'User data is required' });
    }

    const analysis = await aiService.analyzeEmotionalTone(userData, exPartners || [], lifestyleTags || []);

    res.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('Error analyzing emotional tone:', error);
    res.status(500).json({ error: 'Failed to analyze emotional tone: ' + error.message });
  }
});

// NEW: Ex-partner comparison analysis
router.post('/ex-partner-comparison', async (req, res) => {
  try {
    const { userFlavour, exPartners } = req.body;

    if (!userFlavour || !exPartners || exPartners.length === 0) {
      return res.status(400).json({ error: 'User flavour and ex-partners data are required' });
    }

    const analysis = await aiService.analyzeExPartnerComparison(userFlavour, exPartners);

    res.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('Error analyzing ex-partner comparison:', error);
    res.status(500).json({ error: 'Failed to analyze ex-partner comparison: ' + error.message });
  }
});

// NEW: Lifestyle trait matching analysis
router.post('/lifestyle-matching', async (req, res) => {
  try {
    const { userLifestyle, partnerLifestyles } = req.body;

    if (!userLifestyle) {
      return res.status(400).json({ error: 'User lifestyle data is required' });
    }

    const analysis = await aiService.analyzeLifestyleMatching(userLifestyle, partnerLifestyles || []);

    res.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('Error analyzing lifestyle matching:', error);
    res.status(500).json({ error: 'Failed to analyze lifestyle matching: ' + error.message });
  }
});

// NEW: Self-awareness insights
router.post('/self-awareness', async (req, res) => {
  try {
    const { userData, exPartners, patterns } = req.body;

    if (!userData) {
      return res.status(400).json({ error: 'User data is required' });
    }

    const insights = await aiService.generateSelfAwarenessInsights(userData, exPartners || [], patterns || {});

    res.json({
      success: true,
      insights
    });

  } catch (error) {
    console.error('Error generating self-awareness insights:', error);
    res.status(500).json({ error: 'Failed to generate self-awareness insights: ' + error.message });
  }
});

// NEW: Dynamic insights engine - comprehensive real-time analysis
router.post('/dynamic-insights', async (req, res) => {
  try {
    const { userId, newData } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const insights = await aiService.generateDynamicInsights(userId, newData || {});

    res.json({
      success: true,
      insights
    });

  } catch (error) {
    console.error('Error generating dynamic insights:', error);
    res.status(500).json({ error: 'Failed to generate dynamic insights: ' + error.message });
  }
});

// NEW: Real-time report generation with user ID
router.post('/generate-report/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { triggerType, additionalData } = req.body; // triggerType: 'new_ex_partner', 'quiz_update', 'manual_refresh'

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Generate comprehensive report
    const report = await aiService.generateDynamicInsights(userId, {
      triggerType,
      ...additionalData
    });

    // Store report in database for history
    const { getDatabase } = await import('../database/init.js');
    const db = getDatabase();
    const { v4: uuidv4 } = await import('uuid');

    await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO compatibility_analyses (id, user_id, analysis_type, analysis_data, insights, confidence_score) VALUES (?, ?, ?, ?, ?, ?)',
        [
          uuidv4(), userId, 'dynamic_report',
          JSON.stringify(report),
          report.summary?.key_findings?.join(', ') || '',
          report.scores?.overall_score || 0.5
        ],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    res.json({
      success: true,
      report,
      triggerType,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating real-time report:', error);
    res.status(500).json({ error: 'Failed to generate report: ' + error.message });
  }
});

// NEW: Get report history for a user
router.get('/report-history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10 } = req.query;

    const { getDatabase } = await import('../database/init.js');
    const db = getDatabase();

    const reports = await new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM compatibility_analyses WHERE user_id = ? AND analysis_type = "dynamic_report" ORDER BY created_at DESC LIMIT ?',
        [userId, parseInt(limit)],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });

    res.json({
      success: true,
      reports: reports.map(report => ({
        id: report.id,
        timestamp: report.created_at,
        confidence: report.confidence_score,
        summary: report.insights,
        data: JSON.parse(report.analysis_data)
      }))
    });

  } catch (error) {
    console.error('Error fetching report history:', error);
    res.status(500).json({ error: 'Failed to fetch report history: ' + error.message });
  }
});

// Health check for AI service
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Enhanced AI Analysis Service',
    timestamp: new Date().toISOString(),
    features: [
      'Ex-partner flavour analysis',
      'Dating pattern analysis',
      'Compatibility insights',
      'User flavour inference',
      'Real-time emotional tone analysis',
      'Ex-partner comparison analysis',
      'Lifestyle trait matching',
      'Self-awareness insights',
      'Dynamic insights engine',
      'Real-time report generation'
    ]
  });
});

export default router; 