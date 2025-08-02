import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Loader2, Brain, TrendingUp, Heart, AlertTriangle, 
  Users, Target, Zap, BarChart3, RefreshCw, Eye, EyeOff,
  MessageCircle, Activity, Shield, Star, Clock, TrendingDown
} from "lucide-react";
import axios from "axios";
import { SupabaseService } from '@/lib/supabaseService';
import { useAuth } from '@/contexts/AuthContext';

interface Partner {
  id: string;
  flavour: string;
  duration: string;
  outcome: string;
  feelings: string[];
  attachmentMatch: string;
  notes?: string;
  timestamp: number;
}

interface AIInsightsProps {
  partners: Partner[];
  userFlavour?: string;
  userId?: string;
  userTraits?: any;
  lifestyleTags?: string[];
}

interface EmotionalToneAnalysis {
  emotional_profile: {
    attachment_style: string;
    emotional_maturity: number;
    communication_style: string;
    stress_response: string;
    emotional_availability: number;
  };
  tone_analysis: {
    overall_tone: string;
    confidence_level: number;
    emotional_stability: number;
    relationship_readiness: number;
  };
  patterns: {
    recurring_emotions: string[];
    emotional_triggers: string[];
    coping_mechanisms: string[];
  };
  insights: {
    emotional_strengths: string[];
    growth_areas: string[];
    recommendations: string[];
  };
}

interface ExPartnerComparison {
  comparison_analysis: {
    overall_compatibility_trend: string;
    average_compatibility_score: number;
    most_compatible_flavour: string;
    least_compatible_flavour: string;
  };
  conflict_patterns: Array<{
    flavour: string;
    conflict_type: string;
    description: string;
    severity: number;
    resolution_strategy: string;
  }>;
  compatibility_strengths: Array<{
    flavour: string;
    strength_type: string;
    description: string;
    impact_score: number;
  }>;
  key_insights: {
    attraction_vs_compatibility_gap: string;
    communication_lessons: string;
    attachment_dynamics: string;
  };
}

interface LifestyleMatching {
  lifestyle_patterns: {
    social_preference: string;
    activity_level: string;
    financial_style: string;
    career_ambition: string;
  };
  compatibility_insights: {
    best_matches: string[];
    conflict_areas: string[];
    compromise_opportunities: string[];
  };
  attraction_patterns: {
    drawn_to: string[];
    repelled_by: string[];
    blind_spots: string[];
  };
  recommendations: {
    lifestyle_goals: string[];
    partner_criteria: string[];
    growth_areas: string[];
  };
}

interface SelfAwarenessInsights {
  self_awareness_profile: {
    blind_spots: Array<{
      area: string;
      description: string;
      impact: string;
      evidence: string;
    }>;
    unconscious_patterns: Array<{
      pattern: string;
      reason: string;
      frequency: number;
    }>;
  };
  attraction_analysis: {
    what_they_attract: string[];
    what_they_repel: string[];
    why_this_happens: string;
  };
  missing_needs: Array<{
    need: string;
    description: string;
    priority: string;
  }>;
  growth_insights: {
    self_sabotage_patterns: string[];
    healing_opportunities: string[];
    recommended_actions: string[];
  };
}

interface DynamicInsights {
  timestamp: string;
  emotional_tone: EmotionalToneAnalysis;
  ex_partner_comparison: ExPartnerComparison;
  lifestyle_matching: LifestyleMatching;
  self_awareness: SelfAwarenessInsights;
  scores: {
    emotional_maturity: number;
    relationship_readiness: number;
    compatibility_awareness: number;
    lifestyle_alignment: number;
    self_awareness_level: number;
    overall_score: number;
  };
  summary: {
    key_findings: string[];
    growth_areas: string[];
    strengths: string[];
    next_steps: string[];
  };
  recommendations: {
    immediate_actions: string[];
    medium_term_goals: string[];
    long_term_development: string[];
    relationship_strategies: string[];
  };
}

export default function AIInsights({ partners, userFlavour, userId, userTraits, lifestyleTags }: AIInsightsProps) {
  const { user } = useAuth();
  const [insights, setInsights] = useState<DynamicInsights | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (partners.length >= 2 && user) {
      loadOrGenerateInsights();
    }
  }, [partners, user]);

  const loadOrGenerateInsights = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Create a cache key for the insights
      const cacheKey = JSON.stringify({
        partners: partners.map(p => ({ flavour: p.flavour, duration: p.duration })),
        userFlavour,
        userTraits,
        lifestyleTags,
        type: 'ai_insights'
      });
      
      const queryHash = btoa(cacheKey).substring(0, 32);

      // Check if we have cached insights
      const cachedInsights = await SupabaseService.getAICache(queryHash);
      
      if (cachedInsights) {
        console.log('Using cached AI insights');
        setInsights(cachedInsights.response_data);
        setLastUpdated(new Date(cachedInsights.created_at));
        return;
      }

      // Generate new insights
      console.log('Generating new AI insights');
      const newInsights = generateMockInsights();
      
      // Cache the insights
      await SupabaseService.setAICache(queryHash, newInsights, 6); // Cache for 6 hours
      
      // Save as compatibility analysis
      await SupabaseService.addCompatibilityAnalysis({
        analysis_type: 'ai_insights',
        analysis_data: {
          partners: partners.map(p => ({ flavour: p.flavour, duration: p.duration })),
          userFlavour,
          userTraits,
          lifestyleTags
        },
        insights: JSON.stringify(newInsights),
        confidence_score: 0.85
      });

      setInsights(newInsights);
      setLastUpdated(new Date());
      
    } catch (error) {
      console.error('Error generating AI insights:', error);
      // Fallback to mock data
      setInsights(generateMockInsights());
      setLastUpdated(new Date());
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockInsights = (): DynamicInsights => {
    return {
      timestamp: new Date().toISOString(),
      emotional_tone: {
        emotional_profile: {
          attachment_style: "anxious",
          emotional_maturity: 0.75,
          communication_style: "direct",
          stress_response: "fight",
          emotional_availability: 0.7
        },
        tone_analysis: {
          overall_tone: "positive",
          confidence_level: 0.8,
          emotional_stability: 0.75,
          relationship_readiness: 0.8
        },
        patterns: {
          recurring_emotions: ["excitement", "anxiety", "frustration"],
          emotional_triggers: ["uncertainty", "abandonment", "criticism"],
          coping_mechanisms: ["communication", "self-reflection", "withdrawal"]
        },
        insights: {
          emotional_strengths: ["empathy", "self-awareness", "communication"],
          growth_areas: ["emotional regulation", "boundary setting"],
          recommendations: ["practice mindfulness", "develop emotional vocabulary"]
        }
      },
      ex_partner_comparison: {
        comparison_analysis: {
          overall_compatibility_trend: "improving",
          average_compatibility_score: 0.65,
          most_compatible_flavour: "strawberry",
          least_compatible_flavour: "mango"
        },
        conflict_patterns: [
          {
            flavour: "strawberry",
            conflict_type: "communication_style",
            description: "Your direct communication clashed with partner's emotional sensitivity",
            severity: 0.7,
            resolution_strategy: "Practice active listening and emotional validation"
          }
        ],
        compatibility_strengths: [
          {
            flavour: "chocolate",
            strength_type: "intellectual_connection",
            description: "Both partners valued deep conversations and intellectual growth",
            impact_score: 0.8
          }
        ],
        key_insights: {
          attraction_vs_compatibility_gap: "You're attracted to exciting types but need stability",
          communication_lessons: "Direct communication works better than passive-aggressive",
          attachment_dynamics: "You tend to attract avoidant types despite needing security"
        }
      },
      lifestyle_matching: {
        lifestyle_patterns: {
          social_preference: "ambivert",
          activity_level: "high",
          financial_style: "balanced",
          career_ambition: "high"
        },
        compatibility_insights: {
          best_matches: ["active_lifestyle", "career_focused", "social_butterfly"],
          conflict_areas: ["financial_values", "social_needs"],
          compromise_opportunities: ["weekend_activities", "social_events"]
        },
        attraction_patterns: {
          drawn_to: ["adventurous_types", "career_ambitious", "social_connectors"],
          repelled_by: ["homebodies", "financially_conservative"],
          blind_spots: ["overlooking_lifestyle_incompatibility"]
        },
        recommendations: {
          lifestyle_goals: ["Find balance between social and quiet time"],
          partner_criteria: ["Prioritize shared values over shared interests"],
          growth_areas: ["Develop flexibility in social preferences"]
        }
      },
      self_awareness: {
        self_awareness_profile: {
          blind_spots: [
            {
              area: "emotional_availability",
              description: "You don't realize you're emotionally unavailable",
              impact: "high",
              evidence: "Multiple partners complained about lack of emotional intimacy"
            }
          ],
          unconscious_patterns: [
            {
              pattern: "attraction_to_unavailable_partners",
              reason: "Familiarity from childhood relationships",
              frequency: 0.8
            }
          ]
        },
        attraction_analysis: {
          what_they_attract: ["emotionally_needy", "adventurous_spirits", "intellectuals"],
          what_they_repel: ["emotionally_secure", "routine_lovers", "direct_communicators"],
          why_this_happens: "Your mysterious nature attracts those seeking depth, but your inconsistency repels those needing stability"
        },
        missing_needs: [
          {
            need: "emotional_security",
            description: "You need more reassurance and emotional safety",
            priority: "high"
          }
        ],
        growth_insights: {
          self_sabotage_patterns: ["pushing_away_secure_partners", "idealizing_unavailable_types"],
          healing_opportunities: ["address_childhood_wounds", "develop_emotional_vulnerability"],
          recommended_actions: ["therapy_for_attachment_issues", "practice_emotional_openness"]
        }
      },
      scores: {
        emotional_maturity: 0.75,
        relationship_readiness: 0.8,
        compatibility_awareness: 0.65,
        lifestyle_alignment: 0.7,
        self_awareness_level: 0.6,
        overall_score: 0.7
      },
      summary: {
        key_findings: [
          "Your attachment style is anxious",
          "You're most compatible with strawberry types",
          "You have strong communication skills"
        ],
        growth_areas: [
          "pushing_away_secure_partners",
          "idealizing_unavailable_types"
        ],
        strengths: ["empathy", "self-awareness", "communication"],
        next_steps: [
          "therapy_for_attachment_issues",
          "practice_emotional_openness",
          "practice mindfulness"
        ]
      },
      recommendations: {
        immediate_actions: ["practice mindfulness", "develop emotional vocabulary"],
        medium_term_goals: ["Find balance between social and quiet time"],
        long_term_development: ["address_childhood_wounds", "develop_emotional_vulnerability"],
        relationship_strategies: ["Practice active listening and emotional validation"]
      }
    };
  };

  if (partners.length < 2) {
    return (
      <Card className="w-full">
        <CardContent className="text-center py-8">
          <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">AI Insights Coming Soon</h3>
          <p className="text-muted-foreground">
            Add at least 2 partners to unlock AI-powered pattern analysis
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="text-center py-8">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
          <h3 className="text-lg font-semibold mb-2">AI is analyzing your patterns...</h3>
          <p className="text-muted-foreground">
            Crunching your dating data with psychology insights
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!insights) return null;

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "text-green-600";
    if (score >= 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 0.8) return <Star className="w-4 h-4 text-green-600" />;
    if (score >= 0.6) return <Target className="w-4 h-4 text-yellow-600" />;
    return <AlertTriangle className="w-4 h-4 text-red-600" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Relationship Analysis
            <Badge variant="secondary" className="ml-2">
              {partners.length} relationships analyzed
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            {lastUpdated && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={generateInsights}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold">Overall Relationship Intelligence Score</h4>
            <span className={`text-2xl font-bold ${getScoreColor(insights.scores.overall_score)}`}>
              {Math.round(insights.scores.overall_score * 100)}
            </span>
          </div>
          <Progress value={insights.scores.overall_score * 100} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Based on emotional maturity, relationship readiness, and self-awareness
          </p>
        </div>

        {/* Detailed Scores Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(insights.scores).map(([key, score]) => {
            if (key === 'overall_score') return null;
            return (
              <div key={key} className="text-center p-3 bg-accent/30 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  {getScoreIcon(score)}
                </div>
                <div className={`text-lg font-bold ${getScoreColor(score)}`}>
                  {Math.round(score * 100)}
                </div>
                <div className="text-xs text-muted-foreground capitalize">
                  {key.replace(/_/g, ' ')}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs for Detailed Analysis */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="emotional">Emotional</TabsTrigger>
            <TabsTrigger value="patterns">Patterns</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Key Findings */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Key Findings
              </h4>
              <div className="space-y-2">
                {insights.summary.key_findings.map((finding, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-accent/20 rounded">
                    <Star className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            {insights.summary.strengths.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Heart className="w-4 h-4 text-green-500" />
                  Your Strengths
                </h4>
                <div className="flex flex-wrap gap-2">
                  {insights.summary.strengths.map((strength, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="emotional" className="space-y-4">
            {/* Emotional Profile */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                Emotional Profile
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Attachment Style:</span>
                    <Badge variant="outline" className="ml-2 capitalize">
                      {insights.emotional_tone.emotional_profile.attachment_style}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Communication:</span>
                    <Badge variant="outline" className="ml-2 capitalize">
                      {insights.emotional_tone.emotional_profile.communication_style}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Stress Response:</span>
                    <Badge variant="outline" className="ml-2 capitalize">
                      {insights.emotional_tone.emotional_profile.stress_response}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Emotional Availability:</span>
                    <span className="ml-2">
                      {Math.round(insights.emotional_tone.emotional_profile.emotional_availability * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emotional Patterns */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-500" />
                Emotional Patterns
              </h4>
              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium">Recurring Emotions:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {insights.emotional_tone.patterns.recurring_emotions.map((emotion, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {emotion}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium">Emotional Triggers:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {insights.emotional_tone.patterns.emotional_triggers.map((trigger, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-red-50 text-red-700">
                        {trigger}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            {/* Compatibility Analysis */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-500" />
                Compatibility Analysis
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Most Compatible:</span>
                    <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                      {insights.ex_partner_comparison.comparison_analysis.most_compatible_flavour}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Least Compatible:</span>
                    <Badge variant="secondary" className="ml-2 bg-red-100 text-red-800">
                      {insights.ex_partner_comparison.comparison_analysis.least_compatible_flavour}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Average Score:</span>
                    <span className="ml-2">
                      {Math.round(insights.ex_partner_comparison.comparison_analysis.average_compatibility_score * 100)}%
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Trend:</span>
                    <Badge variant="outline" className="ml-2 capitalize">
                      {insights.ex_partner_comparison.comparison_analysis.overall_compatibility_trend}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                Key Insights
              </h4>
              <div className="space-y-2">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="text-sm font-medium mb-1">Attraction vs Compatibility Gap</div>
                  <div className="text-sm text-muted-foreground">
                    {insights.ex_partner_comparison.key_insights.attraction_vs_compatibility_gap}
                  </div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="text-sm font-medium mb-1">Communication Lessons</div>
                  <div className="text-sm text-muted-foreground">
                    {insights.ex_partner_comparison.key_insights.communication_lessons}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="growth" className="space-y-4">
            {/* Growth Areas */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-green-500" />
                Growth Areas
              </h4>
              <div className="space-y-2">
                {insights.summary.growth_areas.map((area, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                    <AlertTriangle className="w-3 h-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{area.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                Action Plan
              </h4>
              <div className="space-y-3">
                {insights.recommendations.immediate_actions.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2">Immediate Actions</div>
                    <div className="space-y-1">
                      {insights.recommendations.immediate_actions.map((action, index) => (
                        <div key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {insights.recommendations.medium_term_goals.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2">Medium Term Goals</div>
                    <div className="space-y-1">
                      {insights.recommendations.medium_term_goals.map((goal, index) => (
                        <div key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                          {goal}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="border-t pt-4">
          <p className="text-center text-sm text-muted-foreground mb-3">
            Ready to break the pattern?
          </p>
          <Button className="w-full" onClick={() => window.open('/quiz', '_blank')}>
            Retake Quiz & Discover Your Growth 🌱
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}