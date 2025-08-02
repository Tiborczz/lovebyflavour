import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Heart, 
  TrendingUp, 
  Sparkles, 
  Loader2,
  Target,
  Users,
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";

interface AIEngineProps {
  quizProgress?: number;
  isAnalyzing?: boolean;
  userFlavour?: string;
}

const EnhancedAIEngine: React.FC<AIEngineProps> = ({ 
  quizProgress = 0, 
  isAnalyzing = false, 
  userFlavour = null 
}) => {
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showPersonalizedContent, setShowPersonalizedContent] = useState(false);
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setShowPersonalizedContent(true);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  useEffect(() => {
    if (userFlavour) {
      const insights = generatePersonalizedInsights(userFlavour);
      setAiInsights(insights);
      setShowPersonalizedContent(true);
    }
  }, [userFlavour]);

  const generatePersonalizedInsights = (flavour: string): string[] => {
    const insightMap: Record<string, string[]> = {
      'Strawberry': [
        'You value emotional depth and romantic gestures',
        'Consider partners who appreciate traditional courtship',
        'Your idealistic nature attracts fellow dreamers'
      ],
      'Chocolate': [
        'Your intensity creates powerful connections',
        'Look for partners who can match your emotional depth',
        'Passionate relationships fuel your happiness'
      ],
      'Vanilla': [
        'Your stability makes you a reliable partner',
        'Seek someone who values consistency and loyalty',
        'Long-term commitment is your relationship strength'
      ],
      'Pineapple': [
        'Your adventurous spirit attracts fellow explorers',
        'Try unique date ideas to showcase your creativity',
        'Partners who embrace spontaneity complement you well'
      ]
    };

    const flavourKey = flavour?.split(' - ')[0] || 'Pineapple';
    return insightMap[flavourKey] || insightMap['Pineapple'];
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-200/50 mb-6 shadow-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-candy-cocoa-700">AI Engine Active</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
                AI Compatibility Engine
              </span>
            </h2>
            
            <p className="text-xl text-pink-400 max-w-2xl mx-auto leading-relaxed">
              Our advanced AI analyzes your dating patterns and suggests compatible matches 
              based on <strong className="text-purple-400">psychological principles</strong>.
            </p>
          </div>

          {/* AI Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/90 backdrop-blur-md border border-purple-200/60 hover:shadow-xl transition-all group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-candy-cocoa-800 mb-4">Pattern Analysis</h3>
                <p className="text-candy-cocoa-600 mb-6">AI identifies your dating patterns and suggests ways to break toxic cycles.</p>
                <div className="text-sm text-purple-600 font-medium">
                  {isAnalyzing ? 'Analyzing patterns...' : 'Ready to analyze'}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-md border border-pink-200/60 hover:shadow-xl transition-all group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="w-10 h-10 text-white animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-candy-cocoa-800 mb-4">Compatibility Matching</h3>
                <p className="text-candy-cocoa-600 mb-6">Find partners who complement your personality and relationship goals.</p>
                <div className="text-sm text-blue-600 font-medium">
                  {showPersonalizedContent ? '23 potential matches found' : 'Building your profile...'}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-md border border-blue-200/60 hover:shadow-xl transition-all group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-mint-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-candy-cocoa-800 mb-4">Growth Tracking</h3>
                <p className="text-candy-cocoa-600 mb-6">Monitor your progress and celebrate relationship milestones.</p>
                <div className="text-sm text-mint-600 font-medium">
                  {quizProgress > 0 ? `${quizProgress}% profile complete` : 'Get started today'}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personalized AI Teaser */}
          {showPersonalizedContent && userFlavour && (
            <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/60 shadow-xl mb-8">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-candy-cocoa-800">Your AI Insights Are Ready!</h3>
                    <p className="text-candy-cocoa-600">Based on your {userFlavour} personality, here's what we discovered:</p>
                  </div>
                </div>
                
                <div className="bg-white/80 rounded-lg p-6 border border-purple-200/40 mb-6">
                  <div className="space-y-3">
                    {aiInsights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-candy-cocoa-700">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600">
                  View Complete Analysis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Progress Tracker */}
          {isAnalyzing && (
            <Card className="bg-white/90 backdrop-blur-md border border-purple-200/60 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center animate-spin">
                    <Loader2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-candy-cocoa-800">AI Analysis in Progress</h4>
                    <p className="text-sm text-candy-cocoa-600">Your flavour is taking shape...</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-500" 
                      style={{width: `${analysisProgress}%`}}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-candy-cocoa-600">
                    <span>{analysisProgress}% analyzed</span>
                    <span>
                      {analysisProgress < 30 && "Processing personality traits..."}
                      {analysisProgress >= 30 && analysisProgress < 70 && "Analyzing relationship patterns..."}
                      {analysisProgress >= 70 && analysisProgress < 100 && "Generating compatibility model..."}
                      {analysisProgress === 100 && "Analysis complete!"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          {!isAnalyzing && !showPersonalizedContent && (
            <div className="text-center">
              <Card className="bg-gradient-to-r from-mint-50 to-blue-50 border-mint-200 shadow-lg inline-block">
                <CardContent className="p-8">
                  <Target className="w-12 h-12 text-mint-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-candy-cocoa-800 mb-2">Ready to Begin?</h3>
                  <p className="text-candy-cocoa-600 mb-6 max-w-sm">
                    Take our psychology-based quiz to unlock your AI compatibility insights.
                  </p>
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600">
                    Start Your Analysis
                    <Zap className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Success Stories Teaser */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-candy-cocoa-800 mb-8">Powered by Real Results</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-2">94%</div>
                <p className="text-candy-cocoa-600">Better understand their patterns</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-500 mb-2">87%</div>
                <p className="text-candy-cocoa-600">Make healthier dating choices</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-mint-600 mb-2">76%</div>
                <p className="text-candy-cocoa-600">Find more compatible matches</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedAIEngine;