import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, Sparkles, Heart, Target, TrendingUp, 
  Loader2, RefreshCw, Star, AlertTriangle, CheckCircle,
  MessageCircle, Zap, Users, Activity, Shield
} from "lucide-react";
import axios from "axios";
import { SupabaseService } from '@/lib/supabaseService';

interface LBFInsightCardProps {
  userTraits?: any;
  quizAnswers?: any;
  flavourPreferences?: string[];
  relationshipHistory?: any[];
  onInsightGenerated?: (insight: any) => void;
  className?: string;
}

interface InsightData {
  insight_type: string;
  primary_flavour?: string;
  confidence_score?: number;
  personality_summary?: string;
  emotional_profile?: {
    attachment_style: string;
    emotional_maturity: number;
    communication_style: string;
    stress_response: string;
  };
  key_traits?: string[];
  strengths?: string[];
  personality_growth_areas?: string[];
  relationship_style?: string;
  insights?: Array<{
    category: string;
    insight: string;
    emoji: string;
  }>;
  compatibility_scores?: Record<string, number>;
  best_matches?: Array<{
    flavour: string;
    score: number;
    why: string;
    strengths: string[];
    challenges: string[];
  }>;
  avoid_types?: Array<{
    flavour: string;
    reason: string;
    warning_signs: string[];
  }>;
  compatibility_insights?: Array<{
    category: string;
    insight: string;
    emoji: string;
  }>;
  current_state?: {
    emotional_readiness: number;
    self_awareness: number;
    relationship_skills: number;
  };
  growth_areas?: Array<{
    area: string;
    priority: string;
    description: string;
    action_steps: string[];
  }>;
  strengths_to_leverage?: string[];
  recommendations?: Array<{
    category: string;
    recommendation: string;
    emoji: string;
  }>;
}

const flavourEmojis: Record<string, string> = {
  vanilla: '🍦',
  strawberry: '🍓',
  chocolate: '🍫',
  mango: '🥭'
};

const flavourColors: Record<string, string> = {
  vanilla: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  strawberry: 'bg-pink-100 text-pink-800 border-pink-200',
  chocolate: 'bg-amber-100 text-amber-800 border-amber-200',
  mango: 'bg-orange-100 text-orange-800 border-orange-200'
};

export default function LBFInsightCard({
  userTraits,
  quizAnswers,
  flavourPreferences,
  relationshipHistory,
  onInsightGenerated,
  className = ""
}: LBFInsightCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentInsight, setCurrentInsight] = useState<InsightData | null>(null);
  const [analysisType, setAnalysisType] = useState<'personality' | 'compatibility' | 'growth'>('personality');
  const [error, setError] = useState<string | null>(null);

  const generateMockInsight = () => {
    const mockInsight = {
      insight_type: "personality_analysis",
      primary_flavour: flavourPreferences?.[0] || "chocolate",
      confidence_score: 0.85,
      personality_summary: "Based on your responses, you appear to be a thoughtful and introspective individual. Your personality traits suggest you value deep connections and meaningful conversations in relationships.",
      emotional_profile: {
        attachment_style: "anxious",
        emotional_maturity: 0.8,
        communication_style: "direct",
        stress_response: "fight"
      },
      key_traits: ["analytical", "emotionally aware", "direct communicator"],
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
    
    return mockInsight;
  };

  const generateInsight = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Create a cache key from the input data
      const cacheKey = JSON.stringify({
        userTraits,
        quizAnswers,
        flavourPreferences,
        relationshipHistory,
        analysisType
      });
      
      const queryHash = btoa(cacheKey).substring(0, 32); // Simple hash

      // Check cache first
      console.log('Checking AI cache...');
      const cachedResult = await SupabaseService.getAICache(queryHash);
      
      if (cachedResult) {
        console.log('Using cached AI insight');
        setCurrentInsight(cachedResult.response_data);
        onInsightGenerated?.(cachedResult.response_data);
        setIsLoading(false);
        return;
      }

      console.log('Generating new AI insight (cache miss)...');
      
      // Generate mock insight since we don't have backend anymore
      // In a real implementation, you'd call OpenAI directly here
      const mockInsight = generateMockInsight();
      
      // Cache the result
      await SupabaseService.setAICache(queryHash, mockInsight, 24); // Cache for 24 hours
      
      console.log('Generated and cached new AI insight');
      setCurrentInsight(mockInsight);
      onInsightGenerated?.(mockInsight);

    } catch (error: any) {
      console.error('Error generating insight:', error);
      
      // Fallback to mock data
      console.log('Falling back to mock insight due to error');
      const mockInsight = generateMockInsight();
      setCurrentInsight(mockInsight);
      onInsightGenerated?.(mockInsight);
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "text-green-600";
    if (score >= 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 0.8) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (score >= 0.6) return <Target className="w-4 h-4 text-yellow-600" />;
    return <AlertTriangle className="w-4 h-4 text-red-600" />;
  };

  const renderPersonalityAnalysis = (insight: InsightData) => (
    <div className="space-y-6">
      {/* Primary Flavour */}
      {insight.primary_flavour && (
        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg">
          <div className="text-4xl mb-2">{flavourEmojis[insight.primary_flavour]}</div>
          <h3 className="text-xl font-bold mb-1">Primary Flavour: {insight.primary_flavour}</h3>
          {insight.confidence_score && (
            <div className="flex items-center justify-center gap-2">
              <span className={`text-lg font-bold ${getScoreColor(insight.confidence_score)}`}>
                {Math.round(insight.confidence_score * 100)}%
              </span>
              <span className="text-sm text-muted-foreground">confidence</span>
            </div>
          )}
        </div>
      )}

      {/* Personality Summary */}
      {insight.personality_summary && (
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Brain className="w-4 h-4 text-blue-500" />
            Personality Summary
          </h4>
          <p className="text-muted-foreground leading-relaxed">
            {insight.personality_summary}
          </p>
        </div>
      )}

      {/* Emotional Profile */}
      {insight.emotional_profile && (
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            Emotional Profile
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Attachment Style:</span>
                <Badge variant="outline" className="ml-2 capitalize">
                  {insight.emotional_profile.attachment_style}
                </Badge>
              </div>
              <div className="text-sm">
                <span className="font-medium">Communication:</span>
                <Badge variant="outline" className="ml-2 capitalize">
                  {insight.emotional_profile.communication_style}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Stress Response:</span>
                <Badge variant="outline" className="ml-2 capitalize">
                  {insight.emotional_profile.stress_response}
                </Badge>
              </div>
              <div className="text-sm">
                <span className="font-medium">Emotional Maturity:</span>
                <span className="ml-2">
                  {Math.round(insight.emotional_profile.emotional_maturity * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Key Traits */}
      {insight.key_traits && insight.key_traits.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            Key Traits
          </h4>
          <div className="flex flex-wrap gap-2">
            {insight.key_traits.map((trait, index) => (
              <Badge key={index} variant="secondary">
                {trait}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Strengths & Growth Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insight.strengths && insight.strengths.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Strengths
            </h4>
            <div className="space-y-2">
              {insight.strengths.map((strength, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded">
                  <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {insight.personality_growth_areas && insight.personality_growth_areas.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" />
              Growth Areas
            </h4>
            <div className="space-y-2">
              {insight.personality_growth_areas.map((area, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded">
                  <Target className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{area}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Insights */}
      {insight.insights && insight.insights.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            Personalized Insights
          </h4>
          <div className="space-y-3">
            {insight.insights.map((item, index) => (
              <div key={index} className="p-3 bg-accent/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{item.emoji}</span>
                  <span className="font-medium capitalize">{item.category}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderCompatibilityAnalysis = (insight: InsightData) => (
    <div className="space-y-6">
      {/* Compatibility Scores */}
      {insight.compatibility_scores && (
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-500" />
            Compatibility Scores
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(insight.compatibility_scores).map(([flavour, score]) => (
              <div key={flavour} className="text-center p-3 bg-accent/30 rounded-lg">
                <div className="text-2xl mb-1">{flavourEmojis[flavour]}</div>
                <div className={`text-lg font-bold ${getScoreColor(score)}`}>
                  {Math.round(score * 100)}
                </div>
                <div className="text-xs text-muted-foreground capitalize">
                  {flavour}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Matches */}
      {insight.best_matches && insight.best_matches.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            Best Matches
          </h4>
          <div className="space-y-3">
            {insight.best_matches.map((match, index) => (
              <div key={index} className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{flavourEmojis[match.flavour]}</span>
                  <div>
                    <h5 className="font-semibold capitalize">{match.flavour}</h5>
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${getScoreColor(match.score)}`}>
                        {Math.round(match.score * 100)}%
                      </span>
                      <span className="text-sm text-muted-foreground">compatibility</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{match.why}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <h6 className="font-medium text-green-700 dark:text-green-400 mb-1">Strengths</h6>
                    <div className="space-y-1">
                      {match.strengths.map((strength, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                          <span className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></span>
                          {strength}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h6 className="font-medium text-orange-700 dark:text-orange-400 mb-1">Challenges</h6>
                    <div className="space-y-1">
                      {match.challenges.map((challenge, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                          <span className="w-1 h-1 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></span>
                          {challenge}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Avoid Types */}
      {insight.avoid_types && insight.avoid_types.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            Types to Avoid
          </h4>
          <div className="space-y-3">
            {insight.avoid_types.map((type, index) => (
              <div key={index} className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{flavourEmojis[type.flavour]}</span>
                  <h5 className="font-semibold capitalize">{type.flavour}</h5>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{type.reason}</p>
                <div>
                  <h6 className="font-medium text-orange-700 dark:text-orange-400 mb-1">Warning Signs</h6>
                  <div className="space-y-1">
                    {type.warning_signs.map((sign, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="w-1 h-1 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></span>
                        {sign}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compatibility Insights */}
      {insight.compatibility_insights && insight.compatibility_insights.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            Compatibility Insights
          </h4>
          <div className="space-y-3">
            {insight.compatibility_insights.map((item, index) => (
              <div key={index} className="p-3 bg-accent/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{item.emoji}</span>
                  <span className="font-medium capitalize">{item.category}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderGrowthAnalysis = (insight: InsightData) => (
    <div className="space-y-6">
      {/* Current State */}
      {insight.current_state && (
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" />
            Current State
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-accent/30 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                {getScoreIcon(insight.current_state.emotional_readiness)}
              </div>
              <div className={`text-lg font-bold ${getScoreColor(insight.current_state.emotional_readiness)}`}>
                {Math.round(insight.current_state.emotional_readiness * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Emotional Readiness</div>
            </div>
            <div className="text-center p-3 bg-accent/30 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                {getScoreIcon(insight.current_state.self_awareness)}
              </div>
              <div className={`text-lg font-bold ${getScoreColor(insight.current_state.self_awareness)}`}>
                {Math.round(insight.current_state.self_awareness * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Self Awareness</div>
            </div>
            <div className="text-center p-3 bg-accent/30 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                {getScoreIcon(insight.current_state.relationship_skills)}
              </div>
              <div className={`text-lg font-bold ${getScoreColor(insight.current_state.relationship_skills)}`}>
                {Math.round(insight.current_state.relationship_skills * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Relationship Skills</div>
            </div>
          </div>
        </div>
      )}

      {/* Growth Areas */}
      {insight.growth_areas && insight.growth_areas.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Target className="w-4 h-4 text-green-500" />
            Growth Areas
          </h4>
          <div className="space-y-3">
            {insight.growth_areas.map((area, index) => (
              <div key={index} className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold capitalize">{area.area.replace(/_/g, ' ')}</h5>
                  <Badge variant={area.priority === 'high' ? 'destructive' : 'secondary'}>
                    {area.priority} priority
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{area.description}</p>
                <div>
                  <h6 className="font-medium text-blue-700 dark:text-blue-400 mb-1">Action Steps</h6>
                  <div className="space-y-1">
                    {area.action_steps.map((step, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strengths to Leverage */}
      {insight.strengths_to_leverage && insight.strengths_to_leverage.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Strengths to Leverage
          </h4>
          <div className="flex flex-wrap gap-2">
            {insight.strengths_to_leverage.map((strength, index) => (
              <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                {strength}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {insight.recommendations && insight.recommendations.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-500" />
            Recommendations
          </h4>
          <div className="space-y-3">
            {insight.recommendations.map((rec, index) => (
              <div key={index} className="p-3 bg-accent/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{rec.emoji}</span>
                  <span className="font-medium capitalize">{rec.category.replace(/_/g, ' ')}</span>
                </div>
                <p className="text-sm text-muted-foreground">{rec.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            LBF AI Insights
            {currentInsight && (
              <Badge variant="secondary" className="ml-2">
                {currentInsight.insight_type.replace(/_/g, ' ')}
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={generateInsight}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
              Generate
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={generateMockInsight}
              disabled={isLoading}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Demo
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Analysis Type Selector */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Analysis Type</label>
          <Tabs value={analysisType} onValueChange={(value: any) => setAnalysisType(value)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personality">Personality</TabsTrigger>
              <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-primary" />
            <h3 className="text-lg font-semibold mb-2">Generating AI Insights...</h3>
            <p className="text-muted-foreground">
              Analyzing your data with LBF's advanced AI
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="font-medium text-red-700 dark:text-red-400">Error</span>
            </div>
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Generated Insight */}
        {currentInsight && !isLoading && (
          <div className="space-y-6">
            {currentInsight.insight_type === 'personality_analysis' && renderPersonalityAnalysis(currentInsight)}
            {currentInsight.insight_type === 'compatibility_analysis' && renderCompatibilityAnalysis(currentInsight)}
            {currentInsight.insight_type === 'growth_analysis' && renderGrowthAnalysis(currentInsight)}
          </div>
        )}

        {/* Empty State */}
        {!currentInsight && !isLoading && !error && (
          <div className="text-center py-8">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Ready for AI Analysis</h3>
            <p className="text-muted-foreground mb-4">
              Select an analysis type and click generate to get personalized insights
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={generateInsight} disabled={isLoading}>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Insights
              </Button>
              <Button variant="outline" onClick={generateMockInsight}>
                <Sparkles className="w-4 h-4 mr-2" />
                Try Demo
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 