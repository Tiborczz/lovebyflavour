import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Heart, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Clock, 
  Star, 
  Trophy, 
  Lock, 
  Sparkles,
  RefreshCw,
  Lightbulb,
  User,
  Check,
  Target,
  Zap
} from "lucide-react";

interface Partner {
  id: string;
  name: string;
  flavour: string;
  compatibility: number;
  dateAnalyzed: string;
}

interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [discoveryPoints, setDiscoveryPoints] = useState(1247);
  const [compatibilityScore, setCompatibilityScore] = useState(87);
  const [partnersAnalyzed, setPartnersAnalyzed] = useState(14);
  const [potentialMatches, setPotentialMatches] = useState(23);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const partners: Partner[] = [
    { id: '1', name: 'Alex', flavour: 'Chocolate', compatibility: 92, dateAnalyzed: '2 days ago' },
    { id: '2', name: 'Jamie', flavour: 'Vanilla', compatibility: 78, dateAnalyzed: '1 week ago' },
    { id: '3', name: 'Casey', flavour: 'Strawberry', compatibility: 85, dateAnalyzed: '2 weeks ago' },
  ];

  const achievements: Achievement[] = [
    { 
      id: 'pattern-pioneer', 
      name: 'Pattern Pioneer', 
      icon: '🏆', 
      description: 'Analyzed 10+ partners', 
      unlocked: true 
    },
    { 
      id: 'ai-explorer', 
      name: 'AI Explorer', 
      icon: '🧠', 
      description: 'Used all AI features', 
      unlocked: true 
    },
    { 
      id: 'quiz-master', 
      name: 'Quiz Master', 
      icon: '📝', 
      description: 'Complete 5 quizzes', 
      unlocked: false,
      progress: 3,
      maxProgress: 5
    },
    { 
      id: 'growth-guru', 
      name: 'Growth Guru', 
      icon: '🌱', 
      description: 'Break 3 patterns', 
      unlocked: false,
      progress: 1,
      maxProgress: 3
    }
  ];

  const aiInsights = [
    {
      type: 'connection',
      icon: '💝',
      title: 'Connection Style',
      description: 'You tend to form intense, passionate connections quickly. This suggests you\'re a "Chocolate" personality type.',
      action: 'Learn More About Chocolate Types',
      color: 'purple'
    },
    {
      type: 'pattern',
      icon: '🔄',
      title: 'Pattern Recognition',
      description: 'You\'re often drawn to partners who are emotionally unavailable. Consider exploring relationships with more open communicators.',
      action: 'Get Pattern-Breaking Tips',
      color: 'pink'
    },
    {
      type: 'growth',
      icon: '🎯',
      title: 'Growth Opportunity',
      description: 'Try connecting with "Vanilla" personalities who value stability and long-term commitment.',
      action: 'Explore Vanilla Matches',
      color: 'blue'
    }
  ];

  const handleRefreshAnalysis = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCompatibilityScore(prev => prev + Math.floor(Math.random() * 10) - 5);
    setIsRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-candy-peach-50 via-candy-mint-50 to-candy-sky-50">
      {/* Header */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-candy-cocoa-800 mb-2">
              Relationship Intelligence
            </h1>
            <p className="text-candy-cocoa-600">AI-powered insights to understand your dating patterns</p>
          </div>
          
          {/* AI Status Indicator */}
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200/50 shadow-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-candy-cocoa-700">AI Active</span>
          </div>
        </div>

        {/* Achievement Section */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 border border-purple-200/60 mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-candy-cocoa-800">Your Achievements</h3>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
              <span className="font-bold text-candy-cocoa-800">{discoveryPoints.toLocaleString()} Discovery Points</span>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={`text-center ${achievement.unlocked ? '' : 'opacity-50'}`}>
                <div className={`w-16 h-16 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-r from-green-500 to-blue-500' 
                    : 'bg-gray-300'
                } rounded-full flex items-center justify-center mx-auto mb-2 transition-all hover:scale-105`}>
                  {achievement.unlocked ? (
                    <span className="text-2xl">{achievement.icon}</span>
                  ) : (
                    <Lock className="w-8 h-8 text-gray-500" />
                  )}
                </div>
                <div className="text-sm font-semibold text-candy-cocoa-800">{achievement.name}</div>
                <div className="text-xs text-candy-cocoa-600">{achievement.description}</div>
                {!achievement.unlocked && achievement.progress && (
                  <div className="mt-2">
                    <Progress value={(achievement.progress / achievement.maxProgress!) * 100} className="h-2" />
                    <div className="text-xs text-candy-cocoa-500 mt-1">
                      {achievement.progress}/{achievement.maxProgress}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabbed Content */}
      <section className="container mx-auto px-4 pb-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-xl p-1 mb-8 shadow-lg">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all"
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all"
            >
              <Clock className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Personalized Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white/90 backdrop-blur-md border border-purple-200/60 hover:shadow-xl transition-all group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">{compatibilityScore}%</div>
                  <div className="text-sm text-candy-cocoa-600 mb-2">Compatibility Score</div>
                  <div className="text-xs text-green-600">↑ 12% this month</div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-md border border-pink-200/60 hover:shadow-xl transition-all group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-pink-600 mb-2">{partnersAnalyzed}</div>
                  <div className="text-sm text-candy-cocoa-600 mb-2">Partners Analyzed</div>
                  <div className="text-xs text-blue-600">+3 this week</div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-md border border-blue-200/60 hover:shadow-xl transition-all group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-mint-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{potentialMatches}</div>
                  <div className="text-sm text-candy-cocoa-600 mb-2">Potential Matches</div>
                  <div className="text-xs text-mint-600">Based on patterns</div>
                </CardContent>
              </Card>
            </div>

            {/* Compatibility Trends Chart */}
            <Card className="bg-white/90 backdrop-blur-md border border-purple-200/60 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-candy-cocoa-800">Your Compatibility Journey</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRefreshAnalysis}
                    disabled={isRefreshing}
                    className="border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
                <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center border border-purple-200/30">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <div className="text-candy-cocoa-600 mb-2">Interactive Chart: Your compatibility trends over time</div>
                    <div className="text-sm text-purple-600">Click to explore patterns</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/60 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-candy-cocoa-800 mb-2">AI Pattern Analysis</h3>
                    <p className="text-candy-cocoa-600">Based on your dating history, here's what we've discovered:</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="bg-white/80 rounded-lg p-4 border border-purple-200/40 hover:shadow-md transition-shadow">
                      <h4 className={`font-semibold mb-2 flex items-center gap-2 ${
                        insight.color === 'purple' ? 'text-purple-700' :
                        insight.color === 'pink' ? 'text-pink-700' : 'text-blue-700'
                      }`}>
                        <span className="text-lg">{insight.icon}</span>
                        {insight.title}
                      </h4>
                      <p className="text-candy-cocoa-700 mb-3">{insight.description}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={`${
                          insight.color === 'purple' ? 'border-purple-300 text-purple-600 hover:bg-purple-50' :
                          insight.color === 'pink' ? 'border-pink-300 text-pink-600 hover:bg-pink-50' : 
                          'border-blue-300 text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        {insight.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-md border border-purple-200/60 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-candy-cocoa-800 mb-4">Partner Analysis History</h3>
                
                {partners.length > 0 ? (
                  <div className="space-y-4">
                    {partners.map((partner) => (
                      <div key={partner.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200/40 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-candy-cocoa-800">{partner.name}</h4>
                            <p className="text-sm text-candy-cocoa-600">{partner.flavour} • {partner.compatibility}% match • {partner.dateAnalyzed}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                          View Analysis
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📊</div>
                    <h4 className="text-lg font-semibold text-candy-cocoa-800 mb-2">No Analysis History Yet</h4>
                    <p className="text-candy-cocoa-600 mb-4">Start by analyzing your first partner to see AI insights!</p>
                    <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600">
                      Add New Partner
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default EnhancedDashboard;