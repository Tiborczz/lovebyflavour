import { GoogleGenerativeAI } from '@google/generative-ai';
import crypto from 'crypto';
import { getDatabase } from '../database/init.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AIService {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    this._db = null;
  }

  get db() {
    if (!this._db) {
      this._db = getDatabase();
    }
    return this._db;
  }

  // Generate cache key for AI requests
  generateCacheKey(input, analysisType) {
    const hash = crypto.createHash('sha256');
    hash.update(JSON.stringify(input) + analysisType);
    return hash.digest('hex');
  }

  // Check cache before making AI request
  async getCachedResult(cacheKey) {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT result FROM ai_cache WHERE cache_key = ? AND expires_at > datetime("now")',
        [cacheKey],
        (err, row) => {
          if (err) reject(err);
          else resolve(row ? JSON.parse(row.result) : null);
        }
      );
    });
  }

  // Cache AI result
  async cacheResult(cacheKey, analysisType, result, hoursValid = 24) {
    const expiresAt = new Date(Date.now() + hoursValid * 60 * 60 * 1000).toISOString();
    
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT OR REPLACE INTO ai_cache (id, cache_key, analysis_type, result, expires_at) VALUES (?, ?, ?, ?, ?)',
        [crypto.randomUUID(), cacheKey, analysisType, JSON.stringify(result), expiresAt],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  // Analyze ex-partner traits and infer flavour
  async analyzeExPartnerFlavour(partnerTraits, relationshipContext) {
    const cacheKey = this.generateCacheKey({ partnerTraits, relationshipContext }, 'ex_partner_flavour');
    
    // Check cache first
    const cached = await this.getCachedResult(cacheKey);
    if (cached) return cached;

    const prompt = `
    You are a relationship psychology expert specializing in personality analysis. Based on the following information about someone's ex-partner, determine their most likely "flavour" (personality archetype) and provide detailed psychological insights.

    PARTNER TRAITS:
    ${JSON.stringify(partnerTraits, null, 2)}

    RELATIONSHIP CONTEXT:
    ${JSON.stringify(relationshipContext, null, 2)}

    AVAILABLE FLAVOURS:
    1. Vanilla 🍦 - The steady, reliable lover (secure attachment, high conscientiousness, traditional values)
    2. Strawberry 🍓 - The passionate romantic (anxious attachment, high extraversion, emotional intensity)
    3. Chocolate 🍫 - The complex, mysterious type (fearful-avoidant, high openness, intellectual depth)
    4. Mango 🥭 - The adventurous free spirit (dismissive-avoidant, high openness, spontaneous)

    Analyze using established psychological frameworks:
    - Big Five personality traits
    - Attachment theory
    - Love languages
    - Behavioral patterns

    Respond with ONLY a valid JSON object in this exact format:
    {
      "flavour": "vanilla|strawberry|chocolate|mango",
      "confidence": 0.85,
      "reasoning": "Detailed explanation of why this flavour fits based on psychological indicators",
      "big_five_scores": {
        "openness": 0.7,
        "conscientiousness": 0.6,
        "extraversion": 0.8,
        "agreeableness": 0.5,
        "neuroticism": 0.4
      },
      "attachment_style": "secure|anxious|dismissive_avoidant|fearful_avoidant",
      "key_traits": ["trait1", "trait2", "trait3"],
      "red_flags": ["flag1", "flag2"],
      "green_flags": ["flag1", "flag2"],
      "compatibility_insights": "What this reveals about the user's attraction patterns"
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      
      // Cache the result
      await this.cacheResult(cacheKey, 'ex_partner_flavour', analysis);
      
      return analysis;
    } catch (error) {
      console.error('AI Analysis Error:', error);
      throw new Error('Failed to analyze partner flavour: ' + error.message);
    }
  }

  // Analyze user's dating patterns across multiple ex-partners
  async analyzePatterns(userTraits, exPartners) {
    const cacheKey = this.generateCacheKey({ userTraits, exPartners }, 'pattern_analysis');
    
    const cached = await this.getCachedResult(cacheKey);
    if (cached) return cached;

    const prompt = `
    You are a relationship psychology expert. Analyze this user's dating patterns based on their personal traits and ex-partner data.

    USER TRAITS:
    ${JSON.stringify(userTraits, null, 2)}

    EX-PARTNERS DATA:
    ${JSON.stringify(exPartners, null, 2)}

    Analyze for:
    1. Recurring attachment patterns
    2. Attraction vs. compatibility mismatches
    3. Psychological blind spots
    4. Growth areas
    5. Ideal partner recommendations

    Respond with ONLY a valid JSON object:
    {
      "attraction_pattern": "What types they're consistently drawn to",
      "compatibility_gap": "Difference between attraction and actual compatibility",
      "attachment_insights": "User's likely attachment style and how it affects choices",
      "blind_spots": ["psychological blind spot 1", "blind spot 2"],
      "recurring_issues": ["issue 1", "issue 2"],
      "growth_recommendations": ["recommendation 1", "recommendation 2"],
      "ideal_partner_flavours": ["flavour1", "flavour2"],
      "red_flags_to_watch": ["red flag 1", "red flag 2"],
      "confidence_score": 0.8
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      await this.cacheResult(cacheKey, 'pattern_analysis', analysis);
      
      return analysis;
    } catch (error) {
      console.error('Pattern Analysis Error:', error);
      throw new Error('Failed to analyze patterns: ' + error.message);
    }
  }

  // Generate compatibility recommendations
  async generateCompatibilityInsights(userProfile, targetFlavours) {
    const cacheKey = this.generateCacheKey({ userProfile, targetFlavours }, 'compatibility_insights');
    
    const cached = await this.getCachedResult(cacheKey);
    if (cached) return cached;

    const prompt = `
    As a relationship psychology expert, provide detailed compatibility insights for this user profile against specific flavour types.

    USER PROFILE:
    ${JSON.stringify(userProfile, null, 2)}

    TARGET FLAVOURS TO ANALYZE:
    ${JSON.stringify(targetFlavours, null, 2)}

    Provide research-backed compatibility analysis including:
    - Psychological compatibility scores
    - Potential challenges and strengths
    - Communication strategies
    - Long-term relationship viability

    Respond with ONLY a valid JSON object:
    {
      "compatibility_scores": {
        "vanilla": 0.85,
        "strawberry": 0.65,
        "chocolate": 0.90,
        "mango": 0.45
      },
      "top_matches": [
        {
          "flavour": "chocolate",
          "score": 0.90,
          "why": "Detailed explanation",
          "strengths": ["strength 1", "strength 2"],
          "challenges": ["challenge 1", "challenge 2"],
          "tips": ["tip 1", "tip 2"]
        }
      ],
      "avoid_types": [
        {
          "flavour": "mango",
          "reason": "Why this might not work",
          "warning_signs": ["sign 1", "sign 2"]
        }
      ],
      "overall_insights": "Summary of user's compatibility profile"
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      await this.cacheResult(cacheKey, 'compatibility_insights', analysis);
      
      return analysis;
    } catch (error) {
      console.error('Compatibility Analysis Error:', error);
      throw new Error('Failed to generate compatibility insights: ' + error.message);
    }
  }

  // Infer user's own flavour based on their traits and patterns
  async inferUserFlavour(userTraits, behaviorPatterns) {
    const cacheKey = this.generateCacheKey({ userTraits, behaviorPatterns }, 'user_flavour');
    
    const cached = await this.getCachedResult(cacheKey);
    if (cached) return cached;

    const prompt = `
    Analyze this user's personality and infer their own "flavour" type based on their traits and relationship patterns.

    USER TRAITS:
    ${JSON.stringify(userTraits, null, 2)}

    BEHAVIOR PATTERNS:
    ${JSON.stringify(behaviorPatterns, null, 2)}

    Determine their flavour using psychological assessment principles. Consider:
    - Self-reported traits vs. revealed preferences
    - Attachment style indicators
    - Lifestyle choices
    - Relationship history patterns

    Respond with ONLY a valid JSON object:
    {
      "primary_flavour": "vanilla|strawberry|chocolate|mango",
      "secondary_flavour": "vanilla|strawberry|chocolate|mango",
      "confidence": 0.8,
      "reasoning": "Detailed psychological analysis",
      "personality_breakdown": {
        "dominant_traits": ["trait1", "trait2"],
        "attachment_style": "secure|anxious|dismissive_avoidant|fearful_avoidant",
        "love_language": "primary love language",
        "relationship_style": "description"
      },
      "growth_areas": ["area 1", "area 2"],
      "ideal_partner_traits": ["trait 1", "trait 2"]
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      await this.cacheResult(cacheKey, 'user_flavour', analysis);
      
      return analysis;
    } catch (error) {
      console.error('User Flavour Analysis Error:', error);
      throw new Error('Failed to infer user flavour: ' + error.message);
    }
  }

  // NEW: Real-time emotional tone analysis
  async analyzeEmotionalTone(userData, exPartners, lifestyleTags) {
    const cacheKey = this.generateCacheKey({ userData, exPartners, lifestyleTags }, 'emotional_tone');
    
    const cached = await this.getCachedResult(cacheKey);
    if (cached) return cached;

    const prompt = `
    As a relationship psychologist specializing in emotional intelligence, analyze the emotional patterns and tone in this user's relationship data.

    USER DATA:
    ${JSON.stringify(userData, null, 2)}

    EX-PARTNERS:
    ${JSON.stringify(exPartners, null, 2)}

    LIFESTYLE TAGS:
    ${JSON.stringify(lifestyleTags, null, 2)}

    Analyze for:
    1. Emotional attachment patterns
    2. Communication style indicators
    3. Emotional maturity level
    4. Stress response patterns
    5. Emotional availability signals
    6. Conflict resolution style

    Respond with ONLY a valid JSON object:
    {
      "emotional_profile": {
        "attachment_style": "secure|anxious|avoidant|fearful_avoidant",
        "emotional_maturity": 0.85,
        "communication_style": "direct|passive|aggressive|passive_aggressive",
        "stress_response": "fight|flight|freeze|fawn",
        "emotional_availability": 0.7
      },
      "tone_analysis": {
        "overall_tone": "positive|negative|neutral|mixed",
        "confidence_level": 0.8,
        "emotional_stability": 0.75,
        "relationship_readiness": 0.8
      },
      "patterns": {
        "recurring_emotions": ["anxiety", "excitement", "frustration"],
        "emotional_triggers": ["abandonment", "criticism", "uncertainty"],
        "coping_mechanisms": ["withdrawal", "communication", "self-reflection"]
      },
      "insights": {
        "emotional_strengths": ["empathy", "self-awareness"],
        "growth_areas": ["emotional regulation", "boundary setting"],
        "recommendations": ["practice mindfulness", "develop emotional vocabulary"]
      }
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      await this.cacheResult(cacheKey, 'emotional_tone', analysis, 12); // Cache for 12 hours
      
      return analysis;
    } catch (error) {
      console.error('Emotional Tone Analysis Error:', error);
      throw new Error('Failed to analyze emotional tone: ' + error.message);
    }
  }

  // NEW: Ex-partner comparison analysis
  async analyzeExPartnerComparison(userFlavour, exPartners) {
    const cacheKey = this.generateCacheKey({ userFlavour, exPartners }, 'ex_partner_comparison');
    
    const cached = await this.getCachedResult(cacheKey);
    if (cached) return cached;

    const prompt = `
    Analyze the compatibility patterns between this user's flavour and their ex-partners to identify key conflicts and compatibilities.

    USER FLAVOUR: ${userFlavour}
    
    EX-PARTNERS DATA:
    ${JSON.stringify(exPartners, null, 2)}

    Analyze for:
    1. Personality conflicts between user and each ex-partner
    2. Compatibility strengths that worked well
    3. Communication style mismatches
    4. Attachment style dynamics
    5. Lifestyle compatibility issues
    6. Emotional needs alignment

    Respond with ONLY a valid JSON object:
    {
      "comparison_analysis": {
        "overall_compatibility_trend": "improving|declining|stable|volatile",
        "average_compatibility_score": 0.65,
        "most_compatible_flavour": "strawberry",
        "least_compatible_flavour": "mango"
      },
      "conflict_patterns": [
        {
          "flavour": "strawberry",
          "conflict_type": "communication_style",
          "description": "User's direct communication clashed with partner's emotional sensitivity",
          "severity": 0.7,
          "resolution_strategy": "Practice active listening and emotional validation"
        }
      ],
      "compatibility_strengths": [
        {
          "flavour": "chocolate",
          "strength_type": "intellectual_connection",
          "description": "Both partners valued deep conversations and intellectual growth",
          "impact_score": 0.8
        }
      ],
      "key_insights": {
        "attraction_vs_compatibility_gap": "User is attracted to exciting types but needs stability",
        "communication_lessons": "Direct communication works better than passive-aggressive",
        "attachment_dynamics": "User tends to attract avoidant types despite needing security"
      }
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      await this.cacheResult(cacheKey, 'ex_partner_comparison', analysis);
      
      return analysis;
    } catch (error) {
      console.error('Ex-Partner Comparison Error:', error);
      throw new Error('Failed to analyze ex-partner comparison: ' + error.message);
    }
  }

  // NEW: Lifestyle trait matching analysis
  async analyzeLifestyleMatching(userLifestyle, partnerLifestyles) {
    const cacheKey = this.generateCacheKey({ userLifestyle, partnerLifestyles }, 'lifestyle_matching');
    
    const cached = await this.getCachedResult(cacheKey);
    if (cached) return cached;

    const prompt = `
    Analyze how the user's lifestyle choices align with their partner preferences and what patterns emerge.

    USER LIFESTYLE:
    ${JSON.stringify(userLifestyle, null, 2)}

    PARTNER LIFESTYLES:
    ${JSON.stringify(partnerLifestyles, null, 2)}

    Analyze for:
    1. Lifestyle compatibility patterns
    2. Social activity preferences alignment
    3. Financial values and spending habits
    4. Career and ambition compatibility
    5. Family and relationship goals
    6. Hobbies and interests alignment

    Respond with ONLY a valid JSON object:
    {
      "lifestyle_patterns": {
        "social_preference": "introvert|extrovert|ambivert",
        "activity_level": "high|medium|low",
        "financial_style": "saver|spender|balanced",
        "career_ambition": "high|medium|low"
      },
      "compatibility_insights": {
        "best_matches": ["active_lifestyle", "career_focused", "social_butterfly"],
        "conflict_areas": ["financial_values", "social_needs"],
        "compromise_opportunities": ["weekend_activities", "social_events"]
      },
      "attraction_patterns": {
        "drawn_to": ["adventurous_types", "career_ambitious", "social_connectors"],
        "repelled_by": ["homebodies", "financially_conservative"],
        "blind_spots": ["overlooking_lifestyle_incompatibility"]
      },
      "recommendations": {
        "lifestyle_goals": ["Find balance between social and quiet time"],
        "partner_criteria": ["Prioritize shared values over shared interests"],
        "growth_areas": ["Develop flexibility in social preferences"]
      }
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      await this.cacheResult(cacheKey, 'lifestyle_matching', analysis);
      
      return analysis;
    } catch (error) {
      console.error('Lifestyle Matching Error:', error);
      throw new Error('Failed to analyze lifestyle matching: ' + error.message);
    }
  }

  // NEW: Self-awareness boost analysis
  async generateSelfAwarenessInsights(userData, exPartners, patterns) {
    const cacheKey = this.generateCacheKey({ userData, exPartners, patterns }, 'self_awareness');
    
    const cached = await this.getCachedResult(cacheKey);
    if (cached) return cached;

    const prompt = `
    As a relationship psychologist, provide deep self-awareness insights about what this user might be missing, what they attract, and what they repel.

    USER DATA:
    ${JSON.stringify(userData, null, 2)}

    EX-PARTNERS:
    ${JSON.stringify(exPartners, null, 2)}

    PATTERNS:
    ${JSON.stringify(patterns, null, 2)}

    Analyze for:
    1. Psychological blind spots
    2. Unconscious attraction patterns
    3. Repulsion triggers
    4. Missing needs in relationships
    5. Self-sabotage patterns
    6. Growth opportunities

    Respond with ONLY a valid JSON object:
    {
      "self_awareness_profile": {
        "blind_spots": [
          {
            "area": "emotional_availability",
            "description": "User doesn't realize they're emotionally unavailable",
            "impact": "high",
            "evidence": "Multiple partners complained about lack of emotional intimacy"
          }
        ],
        "unconscious_patterns": [
          {
            "pattern": "attraction_to_unavailable_partners",
            "reason": "Familiarity from childhood relationships",
            "frequency": 0.8
          }
        ]
      },
      "attraction_analysis": {
        "what_they_attract": ["emotionally_needy", "adventurous_spirits", "intellectuals"],
        "what_they_repel": ["emotionally_secure", "routine_lovers", "direct_communicators"],
        "why_this_happens": "User's mysterious nature attracts those seeking depth, but their inconsistency repels those needing stability"
      },
      "missing_needs": [
        {
          "need": "emotional_security",
          "description": "User needs more reassurance and emotional safety",
          "priority": "high"
        }
      ],
      "growth_insights": {
        "self_sabotage_patterns": ["pushing_away_secure_partners", "idealizing_unavailable_types"],
        "healing_opportunities": ["address_childhood_wounds", "develop_emotional_vulnerability"],
        "recommended_actions": ["therapy_for_attachment_issues", "practice_emotional_openness"]
      }
    }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      const analysis = JSON.parse(jsonMatch[0]);
      await this.cacheResult(cacheKey, 'self_awareness', analysis);
      
      return analysis;
    } catch (error) {
      console.error('Self-Awareness Analysis Error:', error);
      throw new Error('Failed to generate self-awareness insights: ' + error.message);
    }
  }

  // NEW: Dynamic insights engine with scoring
  async generateDynamicInsights(userId, newData) {
    const cacheKey = this.generateCacheKey({ userId, newData }, 'dynamic_insights');
    
    // For dynamic insights, we use shorter cache time
    const cached = await this.getCachedResult(cacheKey);
    if (cached) return cached;

    // Get all user data for comprehensive analysis
    const userData = await this.getUserData(userId);
    const exPartners = await this.getExPartners(userId);
    
    // Generate all analysis types
    const [emotionalTone, exComparison, lifestyleMatching, selfAwareness] = await Promise.all([
      this.analyzeEmotionalTone(userData, exPartners, newData.lifestyleTags || []),
      this.analyzeExPartnerComparison(userData.flavour, exPartners),
      this.analyzeLifestyleMatching(userData.lifestyle, exPartners.map(p => p.lifestyle)),
      this.generateSelfAwarenessInsights(userData, exPartners, newData.patterns || {})
    ]);

    // Calculate comprehensive scores
    const scores = this.calculateInsightScores(emotionalTone, exComparison, lifestyleMatching, selfAwareness);

    const dynamicInsights = {
      timestamp: new Date().toISOString(),
      emotional_tone: emotionalTone,
      ex_partner_comparison: exComparison,
      lifestyle_matching: lifestyleMatching,
      self_awareness: selfAwareness,
      scores: scores,
      summary: this.generateInsightSummary(emotionalTone, exComparison, lifestyleMatching, selfAwareness),
      recommendations: this.generateActionableRecommendations(emotionalTone, exComparison, lifestyleMatching, selfAwareness)
    };

    // Cache for shorter time since this is dynamic
    await this.cacheResult(cacheKey, 'dynamic_insights', dynamicInsights, 6); // 6 hours
    
    return dynamicInsights;
  }

  // NEW: Scoring logic for insights
  calculateInsightScores(emotionalTone, exComparison, lifestyleMatching, selfAwareness) {
    const scores = {
      emotional_maturity: emotionalTone.emotional_profile?.emotional_maturity || 0.5,
      relationship_readiness: emotionalTone.tone_analysis?.relationship_readiness || 0.5,
      compatibility_awareness: exComparison.comparison_analysis?.average_compatibility_score || 0.5,
      lifestyle_alignment: 0.7, // Placeholder - would be calculated from lifestyle data
      self_awareness_level: 0.6, // Placeholder - would be calculated from self-awareness data
      overall_score: 0
    };

    // Calculate overall score
    scores.overall_score = (
      scores.emotional_maturity * 0.25 +
      scores.relationship_readiness * 0.25 +
      scores.compatibility_awareness * 0.2 +
      scores.lifestyle_alignment * 0.15 +
      scores.self_awareness_level * 0.15
    );

    return scores;
  }

  // NEW: Generate insight summary
  generateInsightSummary(emotionalTone, exComparison, lifestyleMatching, selfAwareness) {
    const summary = {
      key_findings: [],
      growth_areas: [],
      strengths: [],
      next_steps: []
    };

    // Extract key findings from all analyses
    if (emotionalTone.emotional_profile?.attachment_style) {
      summary.key_findings.push(`Your attachment style is ${emotionalTone.emotional_profile.attachment_style}`);
    }

    if (exComparison.comparison_analysis?.most_compatible_flavour) {
      summary.key_findings.push(`You're most compatible with ${exComparison.comparison_analysis.most_compatible_flavour} types`);
    }

    if (selfAwareness.growth_insights?.self_sabotage_patterns) {
      summary.growth_areas.push(...selfAwareness.growth_insights.self_sabotage_patterns.slice(0, 2));
    }

    if (emotionalTone.insights?.emotional_strengths) {
      summary.strengths.push(...emotionalTone.insights.emotional_strengths);
    }

    if (selfAwareness.growth_insights?.recommended_actions) {
      summary.next_steps.push(...selfAwareness.growth_insights.recommended_actions.slice(0, 3));
    }

    return summary;
  }

  // NEW: Generate actionable recommendations
  generateActionableRecommendations(emotionalTone, exComparison, lifestyleMatching, selfAwareness) {
    const recommendations = {
      immediate_actions: [],
      medium_term_goals: [],
      long_term_development: [],
      relationship_strategies: []
    };

    // Immediate actions based on emotional tone
    if (emotionalTone.insights?.recommendations) {
      recommendations.immediate_actions.push(...emotionalTone.insights.recommendations);
    }

    // Medium term goals from lifestyle matching
    if (lifestyleMatching.recommendations?.lifestyle_goals) {
      recommendations.medium_term_goals.push(...lifestyleMatching.recommendations.lifestyle_goals);
    }

    // Long term development from self-awareness
    if (selfAwareness.growth_insights?.healing_opportunities) {
      recommendations.long_term_development.push(...selfAwareness.growth_insights.healing_opportunities);
    }

    // Relationship strategies from ex-partner comparison
    if (exComparison.conflict_patterns) {
      exComparison.conflict_patterns.forEach(conflict => {
        if (conflict.resolution_strategy) {
          recommendations.relationship_strategies.push(conflict.resolution_strategy);
        }
      });
    }

    return recommendations;
  }

  // Helper methods for getting user data
  async getUserData(userId) {
    return new Promise((resolve, reject) => {
      this.db.get(
        'SELECT * FROM users WHERE id = ?',
        [userId],
        (err, user) => {
          if (err) reject(err);
          else resolve(user);
        }
      );
    });
  }

  async getExPartners(userId) {
    return new Promise((resolve, reject) => {
      this.db.all(
        'SELECT * FROM ex_partners WHERE user_id = ?',
        [userId],
        (err, partners) => {
          if (err) reject(err);
          else resolve(partners);
        }
      );
    });
  }
}

export default new AIService(); 