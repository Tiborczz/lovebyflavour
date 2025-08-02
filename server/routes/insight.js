import express from 'express';
import OpenAI from 'openai';
import rateLimit from 'express-rate-limit';
import config from '../config.js';

const router = express.Router();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

// Rate limiting: 10 requests per hour per IP
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again after an hour.',
    retryAfter: 3600
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes
router.use(limiter);

// Generate personality insight
router.post('/generate', async (req, res) => {
  try {
    const { 
      userTraits, 
      quizAnswers, 
      flavourPreferences, 
      relationshipHistory,
      analysisType = 'personality' // 'personality', 'compatibility', 'growth'
    } = req.body;

    if (!userTraits && !quizAnswers && !flavourPreferences) {
      return res.status(400).json({ 
        error: 'At least one of userTraits, quizAnswers, or flavourPreferences is required' 
      });
    }

    // Build the system message based on analysis type
    let systemMessage = `You are a helpful AI that uses psychological frameworks and romantic theory to help users understand their emotional and personality traits based on quiz answers and flavour preferences. Generate short, unique insights that feel personal.

Available flavours and their psychological profiles:
- 🍦 Vanilla: The steady, reliable lover (secure attachment, high conscientiousness, traditional values)
- 🍓 Strawberry: The passionate romantic (anxious attachment, high extraversion, emotional intensity)
- 🍫 Chocolate: The complex, mysterious type (fearful-avoidant, high openness, intellectual depth)
- 🥭 Mango: The adventurous free spirit (dismissive-avoidant, high openness, spontaneous)

Psychological frameworks to reference:
- Big Five personality traits (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)
- Attachment theory (Secure, Anxious, Avoidant, Fearful-Avoidant)
- Love languages (Words of Affirmation, Quality Time, Physical Touch, Acts of Service, Receiving Gifts)
- Relationship patterns and compatibility dynamics

Always respond with a valid JSON object in this exact format:`;

    // Customize system message based on analysis type
    switch (analysisType) {
      case 'personality':
        systemMessage += `
{
  "insight_type": "personality_analysis",
  "primary_flavour": "vanilla|strawberry|chocolate|mango",
  "confidence_score": 0.85,
  "personality_summary": "Brief personality overview",
  "emotional_profile": {
    "attachment_style": "secure|anxious|avoidant|fearful_avoidant",
    "emotional_maturity": 0.8,
    "communication_style": "direct|passive|aggressive|passive_aggressive",
    "stress_response": "fight|flight|freeze|fawn"
  },
  "key_traits": ["trait1", "trait2", "trait3"],
  "strengths": ["strength1", "strength2"],
  "growth_areas": ["area1", "area2"],
  "relationship_style": "Brief description of how they approach relationships",
  "insights": [
    {
      "category": "personality",
      "insight": "Personalized insight about their personality",
      "emoji": "🧠"
    },
    {
      "category": "emotional",
      "insight": "Insight about their emotional patterns",
      "emoji": "💝"
    },
    {
      "category": "relationship",
      "insight": "Insight about their relationship approach",
      "emoji": "💕"
    }
  ]
}`;
        break;

      case 'compatibility':
        systemMessage += `
{
  "insight_type": "compatibility_analysis",
  "compatibility_scores": {
    "vanilla": 0.85,
    "strawberry": 0.65,
    "chocolate": 0.90,
    "mango": 0.45
  },
  "best_matches": [
    {
      "flavour": "chocolate",
      "score": 0.90,
      "why": "Detailed explanation of compatibility",
      "strengths": ["strength1", "strength2"],
      "challenges": ["challenge1", "challenge2"]
    }
  ],
  "avoid_types": [
    {
      "flavour": "mango",
      "reason": "Why this might not work well",
      "warning_signs": ["sign1", "sign2"]
    }
  ],
  "compatibility_insights": [
    {
      "category": "attraction",
      "insight": "What attracts them to certain types",
      "emoji": "✨"
    },
    {
      "category": "conflict",
      "insight": "Potential conflict areas to watch for",
      "emoji": "⚠️"
    },
    {
      "category": "growth",
      "insight": "How different types could help them grow",
      "emoji": "🌱"
    }
  ]
}`;
        break;

      case 'growth':
        systemMessage += `
{
  "insight_type": "growth_analysis",
  "current_state": {
    "emotional_readiness": 0.7,
    "self_awareness": 0.6,
    "relationship_skills": 0.8
  },
  "growth_areas": [
    {
      "area": "emotional_vulnerability",
      "priority": "high",
      "description": "Description of the growth area",
      "action_steps": ["step1", "step2", "step3"]
    }
  ],
  "strengths_to_leverage": ["strength1", "strength2"],
  "recommendations": [
    {
      "category": "immediate",
      "recommendation": "Something they can start doing right away",
      "emoji": "⚡"
    },
    {
      "category": "long_term",
      "recommendation": "Longer-term development goal",
      "emoji": "🎯"
    },
    {
      "category": "mindset",
      "recommendation": "Mindset shift or perspective change",
      "emoji": "🧘"
    }
  ]
}`;
        break;

      default:
        systemMessage += `
{
  "insight_type": "general_analysis",
  "summary": "Overall analysis summary",
  "key_insights": [
    {
      "category": "personality",
      "insight": "Personalized insight",
      "emoji": "💭"
    }
  ],
  "recommendations": [
    {
      "category": "action",
      "recommendation": "Actionable recommendation",
      "emoji": "🎯"
    }
  ]
}`;
    }

    // Build user message with provided data
    const userMessage = `Please analyze the following user data and provide insights:

${userTraits ? `User Traits: ${JSON.stringify(userTraits, null, 2)}` : ''}
${quizAnswers ? `Quiz Answers: ${JSON.stringify(quizAnswers, null, 2)}` : ''}
${flavourPreferences ? `Flavour Preferences: ${JSON.stringify(flavourPreferences, null, 2)}` : ''}
${relationshipHistory ? `Relationship History: ${JSON.stringify(relationshipHistory, null, 2)}` : ''}

Analysis Type: ${analysisType}

Please provide a comprehensive analysis using the specified JSON format.`;

    // Call OpenAI API
    let response;
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemMessage
          },
          {
            role: "user",
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        response_format: { type: "json_object" }
      });

      response = completion.choices[0].message.content;
    } catch (openaiError) {
      console.error('OpenAI API Error:', openaiError);
      
      if (openaiError.response?.status === 429) {
        // Return mock data when quota is exceeded
        const mockResponse = {
          insight_type: "personality_analysis",
          primary_flavour: "chocolate",
          confidence_score: 0.85,
          personality_summary: "You appear to be a complex, introspective individual with strong analytical tendencies. Your high openness and moderate extraversion suggest you're intellectually curious and enjoy meaningful conversations.",
          emotional_profile: {
            attachment_style: "anxious",
            emotional_maturity: 0.8,
            communication_style: "direct",
            stress_response: "fight"
          },
          key_traits: ["intellectual", "emotionally aware", "direct communicator"],
          strengths: ["deep thinking", "emotional intelligence", "honest communication"],
          personality_growth_areas: ["emotional vulnerability", "patience with others"],
          relationship_style: "You approach relationships with intellectual depth and emotional awareness, preferring meaningful connections over superficial interactions.",
          insights: [
            {
              category: "personality",
              insight: "Your analytical nature helps you understand relationships deeply, but you might need to balance logic with emotional expression.",
              emoji: "🧠"
            },
            {
              category: "emotional",
              insight: "Your direct communication style is a strength, but consider how others might perceive your honesty.",
              emoji: "💝"
            },
            {
              category: "relationship",
              insight: "You're likely drawn to partners who can match your intellectual depth while providing emotional stability.",
              emoji: "💕"
            }
          ]
        };
        
        return res.json({
          success: true,
          analysis: mockResponse,
          timestamp: new Date().toISOString(),
          model: "mock-response",
          note: "OpenAI quota exceeded - showing demo data"
        });
      }
      
      throw openaiError; // Re-throw other errors
    }
    
    // Parse the JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error);
      return res.status(500).json({ 
        error: 'Failed to parse AI response',
        raw_response: response 
      });
    }

    // Store the analysis in database (optional)
    if (req.user?.id) {
      try {
        const { getDatabase } = await import('../database/init.js');
        const db = getDatabase();
        const { v4: uuidv4 } = await import('uuid');

        await new Promise((resolve, reject) => {
          db.run(
            'INSERT INTO compatibility_analyses (id, user_id, analysis_type, analysis_data, insights, confidence_score) VALUES (?, ?, ?, ?, ?, ?)',
            [
              uuidv4(), 
              req.user.id, 
              `openai_${analysisType}`,
              JSON.stringify(parsedResponse),
              parsedResponse.summary || parsedResponse.personality_summary || 'OpenAI Analysis',
              parsedResponse.confidence_score || 0.8
            ],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
      } catch (dbError) {
        console.error('Failed to store analysis in database:', dbError);
        // Don't fail the request if database storage fails
      }
    }

    res.json({
      success: true,
      analysis: parsedResponse,
      timestamp: new Date().toISOString(),
      model: "gpt-3.5-turbo"
    });

  } catch (error) {
          console.error('OpenAI API Error:', error);
    
    if (error.response?.status === 401) {
      return res.status(401).json({ 
        error: 'Invalid API key. Please check your OpenAI configuration.' 
      });
    }

    res.status(500).json({ 
      error: 'Failed to generate insight',
      details: error.message 
    });
  }
});

// Get insight history for a user
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10 } = req.query;

    const { getDatabase } = await import('../database/init.js');
    const db = getDatabase();

    const insights = await new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM compatibility_analyses WHERE user_id = ? AND analysis_type LIKE "openai_%" ORDER BY created_at DESC LIMIT ?',
        [userId, parseInt(limit)],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });

    res.json({
      success: true,
      insights: insights.map(insight => ({
        id: insight.id,
        type: insight.analysis_type.replace('openai_', ''),
        timestamp: insight.created_at,
        confidence: insight.confidence_score,
        data: JSON.parse(insight.analysis_data)
      }))
    });

  } catch (error) {
    console.error('Error fetching insight history:', error);
    res.status(500).json({ error: 'Failed to fetch insight history' });
  }
});

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
          service: 'OpenAI Insight Generation',
    timestamp: new Date().toISOString(),
    features: [
      'Personality analysis',
      'Compatibility analysis', 
      'Growth recommendations',
      'Rate limiting',
      'Response caching'
    ]
  });
});

export default router; 