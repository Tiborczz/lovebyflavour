import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, Users, TrendingUp, Heart, Target, 
  BarChart3, Activity, MessageCircle, Shield,
  RefreshCw, Clock, Zap, Star, AlertTriangle
} from "lucide-react";
import AIInsights from "@/components/AIInsights";
import RealTimeReportGenerator from "@/components/RealTimeReportGenerator";
import axios from "axios";
import { SupabaseService } from '@/lib/supabaseService';
import { useAuth } from '@/contexts/AuthContext';

interface User {
  id: string;
  name: string;
  email: string;
  flavour?: string;
  traits?: any;
}

interface ExPartner {
  id: string;
  nickname: string;
  flavour: string;
  duration: string;
  outcome: string;
  feelings: string[];
  attachmentMatch: string;
  notes?: string;
  timestamp: number;
}

export default function CompatibilityDashboard() {
  const { user: authUser, userProfile } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [exPartners, setExPartners] = useState<ExPartner[]>([]);
  const [lifestyleTags, setLifestyleTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentReport, setCurrentReport] = useState<any>(null);
  const [reportHistory, setReportHistory] = useState<any[]>([]);

  useEffect(() => {
    if (authUser) {
      loadUserData();
    }
  }, [authUser, userProfile]);

  const loadUserData = async () => {
    if (!authUser) return;
    
    try {
      // Set user from auth context
      const currentUser = userProfile || {
        id: authUser.id,
        name: authUser.email?.split('@')[0] || 'User',
        email: authUser.email || '',
        flavour: 'vanilla', // Default flavour
        joinDate: authUser.created_at || new Date().toISOString()
      };
      setUser(currentUser);

      // Load ex-partners from Supabase
      const supabasePartners = await SupabaseService.getExPartners();
      const convertedPartners = supabasePartners.map(partner => ({
        id: partner.id,
        nickname: `${partner.flavour} Partner`,
        flavour: partner.flavour,
        duration: partner.duration,
        outcome: partner.outcome,
        feelings: [],
        attachmentMatch: 'secure', // Default value
        notes: partner.lessons,
        timestamp: new Date(partner.created_at).getTime()
      }));
      setExPartners(convertedPartners);

      // Load lifestyle tags (could be stored in user profile later)
      setLifestyleTags(['active_lifestyle', 'career_focused', 'social_butterfly', 'adventure_seeker']);

      // Load compatibility analyses (report history)
      const analyses = await SupabaseService.getCompatibilityAnalyses();
      setReportHistory(analyses);

    } catch (error) {
      console.error('Error loading user data:', error);
      // Load mock data for demo on error
      loadMockData();
    } finally {
      setIsLoading(false);
    }
  };

  const loadMockData = () => {
    setUser({
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@example.com',
      flavour: 'strawberry',
      traits: {
        personality: {
          extraversion: 0.7,
          agreeableness: 0.8,
          conscientiousness: 0.6,
          neuroticism: 0.4,
          openness: 0.9
        }
      }
    });

    setExPartners([
      {
        id: '1',
        nickname: 'Alex',
        flavour: 'chocolate',
        duration: 'long',
        outcome: 'amicable',
        feelings: ['passion', 'intellectual_connection'],
        attachmentMatch: 'anxious-secure',
        timestamp: Date.now() - 86400000 * 30
      },
      {
        id: '2',
        nickname: 'Sam',
        flavour: 'vanilla',
        duration: 'medium',
        outcome: 'boring',
        feelings: ['comfort', 'stability'],
        attachmentMatch: 'anxious-avoidant',
        timestamp: Date.now() - 86400000 * 60
      },
      {
        id: '3',
        nickname: 'Jordan',
        flavour: 'mango',
        duration: 'short',
        outcome: 'exciting',
        feelings: ['adventure', 'spontaneity'],
        attachmentMatch: 'anxious-anxious',
        timestamp: Date.now() - 86400000 * 15
      }
    ]);
  };

  const handleReportGenerated = (report: any) => {
    setCurrentReport(report);
    // Add to history
    setReportHistory(prev => [report, ...prev.slice(0, 9)]);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your relationship insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Relationship Intelligence Dashboard</h1>
        <p className="text-muted-foreground">
          AI-powered insights into your dating patterns and compatibility
        </p>
      </div>

      {/* User Info */}
      {user && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-1">
                  {user.flavour} flavour
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {exPartners.length} relationships analyzed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="real-time">Real-Time</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  Relationship Count
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{exPartners.length}</div>
                <p className="text-xs text-muted-foreground">
                  Total analyzed relationships
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-500" />
                  Most Compatible
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {exPartners.length > 0 ? 
                    exPartners.reduce((a, b) => 
                      exPartners.filter(p => p.flavour === a.flavour).length >= 
                      exPartners.filter(p => p.flavour === b.flavour).length ? a : b
                    ).flavour : 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Most dated flavour type
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {exPartners.length > 0 ? 
                    Math.round((exPartners.filter(p => p.outcome === 'amicable').length / exPartners.length) * 100) : 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Positive outcomes
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Partners */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Recent Partners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {exPartners.slice(0, 3).map((partner) => (
                  <div key={partner.id} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                    <div>
                      <h4 className="font-medium">{partner.nickname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {partner.flavour} • {partner.duration} • {partner.outcome}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {partner.attachmentMatch}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          <AIInsights
            partners={exPartners}
            userFlavour={user?.flavour}
            userId={user?.id}
            userTraits={user?.traits}
            lifestyleTags={lifestyleTags}
          />
        </TabsContent>

        <TabsContent value="real-time" className="space-y-6">
          <RealTimeReportGenerator
            userId={user?.id || 'demo-user'}
            userData={user}
            exPartners={exPartners}
            lifestyleTags={lifestyleTags}
            onReportGenerated={handleReportGenerated}
            autoGenerate={true}
          />

          {/* Current Report Details */}
          {currentReport && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Latest Report Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Emotional Analysis */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-blue-500" />
                      Emotional Profile
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Attachment Style:</span>
                        <Badge variant="outline" className="capitalize">
                          {currentReport.emotional_tone?.emotional_profile?.attachment_style}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Emotional Maturity:</span>
                        <span>{Math.round((currentReport.emotional_tone?.emotional_profile?.emotional_maturity || 0) * 100)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Relationship Readiness:</span>
                        <span>{Math.round((currentReport.emotional_tone?.tone_analysis?.relationship_readiness || 0) * 100)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Compatibility Analysis */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      Compatibility Insights
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Most Compatible:</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {currentReport.ex_partner_comparison?.comparison_analysis?.most_compatible_flavour}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Average Score:</span>
                        <span>{Math.round((currentReport.ex_partner_comparison?.comparison_analysis?.average_compatibility_score || 0) * 100)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Trend:</span>
                        <Badge variant="outline" className="capitalize">
                          {currentReport.ex_partner_comparison?.comparison_analysis?.overall_compatibility_trend}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Report History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reportHistory.length > 0 ? (
                <div className="space-y-3">
                  {reportHistory.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                      <div>
                        <h4 className="font-medium">
                          Report #{reportHistory.length - index}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(report.timestamp).toLocaleDateString()} at {new Date(report.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {Math.round((report.scores?.overall_score || 0) * 100)}
                        </div>
                        <p className="text-xs text-muted-foreground">Overall Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No reports generated yet</p>
                  <p className="text-sm text-muted-foreground">
                    Generate your first AI report to see history here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
        <Button onClick={() => window.open('/ex-partner-analysis', '_blank')}>
          <Users className="w-4 h-4 mr-2" />
          Add New Partner
        </Button>
        <Button variant="outline" onClick={() => window.open('/quiz', '_blank')}>
          <Target className="w-4 h-4 mr-2" />
          Retake Quiz
        </Button>
        <Button variant="outline" onClick={loadUserData}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Data
        </Button>
      </div>
    </div>
  );
} 