import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Star, 
  Trophy, 
  Target, 
  Zap, 
  Gift, 
  Crown,
  CheckCircle,
  Lock,
  Sparkles,
  Heart,
  Brain,
  Users,
  TrendingUp
} from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  icon: string;
  deadline: string;
}

interface GamificationSystemProps {
  discoveryPoints: number;
  userLevel: number;
  profileCompletion: number;
  onChallengeComplete?: (challengeId: string) => void;
}

const GamificationSystem: React.FC<GamificationSystemProps> = ({
  discoveryPoints = 1247,
  userLevel = 3,
  profileCompletion = 85,
  onChallengeComplete
}) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  const achievements: Achievement[] = [
    { 
      id: 'first-steps', 
      name: 'First Steps', 
      icon: '🌟', 
      description: 'Complete your first quiz', 
      unlocked: true,
      points: 100,
      rarity: 'common'
    },
    { 
      id: 'profile-pro', 
      name: 'Profile Pro', 
      icon: '✨', 
      description: 'Complete 80%+ of profile', 
      unlocked: profileCompletion >= 80,
      points: 250,
      rarity: 'common'
    },
    { 
      id: 'pattern-pioneer', 
      name: 'Pattern Pioneer', 
      icon: '🧠', 
      description: 'Analyze 10+ partners', 
      unlocked: true,
      points: 500,
      rarity: 'rare'
    },
    { 
      id: 'social-butterfly', 
      name: 'Social Butterfly', 
      icon: '🦋', 
      description: 'Get 50+ profile views', 
      unlocked: false,
      progress: 23,
      maxProgress: 50,
      points: 300,
      rarity: 'common'
    },
    { 
      id: 'compatibility-king', 
      name: 'Compatibility King', 
      icon: '👑', 
      description: 'Achieve 90%+ compatibility', 
      unlocked: false,
      progress: 87,
      maxProgress: 90,
      points: 750,
      rarity: 'epic'
    },
    { 
      id: 'love-guru', 
      name: 'Love Guru', 
      icon: '💫', 
      description: 'Help 5 friends find love', 
      unlocked: false,
      progress: 1,
      maxProgress: 5,
      points: 1000,
      rarity: 'legendary'
    }
  ];

  const dailyChallenges: DailyChallenge[] = [
    {
      id: 'daily-reflection',
      title: 'Daily Reflection',
      description: 'Write about your dating experience',
      points: 100,
      completed: false,
      icon: '💭',
      deadline: 'Today'
    },
    {
      id: 'profile-update',
      title: 'Profile Polish',
      description: 'Update your bio or add a new photo',
      points: 150,
      completed: false,
      icon: '📸',
      deadline: 'Today'
    },
    {
      id: 'compatibility-check',
      title: 'Compatibility Check',
      description: 'Analyze a potential match',
      points: 200,
      completed: true,
      icon: '🔍',
      deadline: 'Today'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-300';
      case 'epic': return 'border-purple-300';
      case 'legendary': return 'border-yellow-300';
      default: return 'border-gray-300';
    }
  };

  const handleChallengeComplete = (challengeId: string) => {
    if (onChallengeComplete) {
      onChallengeComplete(challengeId);
    }
    // Simulate points animation
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const levelProgress = ((discoveryPoints % 1000) / 1000) * 100;
  const nextLevelPoints = 1000 - (discoveryPoints % 1000);

  return (
    <div className="space-y-6">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right">
          <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl animate-bounce">🎉</div>
                <div>
                  <div className="font-bold">Challenge Complete!</div>
                  <div className="text-sm opacity-90">+200 Discovery Points</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Level & Points Header */}
      <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200/60 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {userLevel}
              </div>
              <div>
                <h3 className="text-xl font-bold text-candy-cocoa-800">Level {userLevel} Explorer</h3>
                <p className="text-candy-cocoa-600">You're making great progress!</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-2xl font-bold text-candy-cocoa-800">{discoveryPoints.toLocaleString()}</span>
              </div>
              <div className="text-sm text-candy-cocoa-600">{nextLevelPoints} to next level</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-candy-cocoa-600">
              <span>Level Progress</span>
              <span>{Math.round(levelProgress)}%</span>
            </div>
            <Progress value={levelProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Daily Challenges */}
      <Card className="bg-white/90 backdrop-blur-md border border-mint-200/60 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-mint-600" />
            <h3 className="text-xl font-bold text-candy-cocoa-800">Daily Challenges</h3>
            <Badge className="bg-mint-100 text-mint-700">
              {dailyChallenges.filter(c => c.completed).length}/{dailyChallenges.length} Complete
            </Badge>
          </div>

          <div className="space-y-4">
            {dailyChallenges.map((challenge) => (
              <div 
                key={challenge.id} 
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  challenge.completed 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-mint-200 bg-mint-50 hover:border-mint-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    challenge.completed ? 'bg-green-500' : 'bg-mint-500'
                  }`}>
                    {challenge.completed ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-white text-lg">{challenge.icon}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-candy-cocoa-800">{challenge.title}</h4>
                    <p className="text-sm text-candy-cocoa-600">{challenge.description}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-bold text-mint-600">+{challenge.points} pts</div>
                  <div className="text-xs text-candy-cocoa-500">{challenge.deadline}</div>
                  {!challenge.completed && (
                    <Button 
                      size="sm" 
                      className="mt-2 bg-mint-500 hover:bg-mint-600 text-white"
                      onClick={() => handleChallengeComplete(challenge.id)}
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-white/90 backdrop-blur-md border border-purple-200/60 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-candy-cocoa-800">Achievements</h3>
            </div>
            <Badge className="bg-purple-100 text-purple-700">
              {achievements.filter(a => a.unlocked).length}/{achievements.length} Unlocked
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`${achievement.unlocked ? '' : 'opacity-60'} ${getRarityBorder(achievement.rarity)} transition-all hover:scale-105`}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${getRarityColor(achievement.rarity)} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    {achievement.unlocked ? (
                      <span className="text-2xl">{achievement.icon}</span>
                    ) : (
                      <Lock className="w-8 h-8 text-white" />
                    )}
                  </div>
                  
                  <h4 className="font-bold text-candy-cocoa-800 mb-1">{achievement.name}</h4>
                  <p className="text-xs text-candy-cocoa-600 mb-2">{achievement.description}</p>
                  
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-sm font-semibold text-candy-cocoa-700">{achievement.points} pts</span>
                  </div>
                  
                  <Badge className={`text-xs ${
                    achievement.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                    achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-700' :
                    achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {achievement.rarity}
                  </Badge>

                  {!achievement.unlocked && achievement.progress && achievement.maxProgress && (
                    <div className="mt-3">
                      <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                      <div className="text-xs text-candy-cocoa-500 mt-1">
                        {achievement.progress}/{achievement.maxProgress}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goals */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/60 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-candy-cocoa-800">This Week's Goals</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/80 rounded-lg p-4 border border-blue-200/40">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="font-semibold text-candy-cocoa-800">Make 3 Connections</span>
              </div>
              <Progress value={66} className="h-2 mb-2" />
              <div className="text-sm text-candy-cocoa-600">2/3 complete • +500 pts</div>
            </div>

            <div className="bg-white/80 rounded-lg p-4 border border-purple-200/40">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="w-5 h-5 text-purple-500" />
                <span className="font-semibold text-candy-cocoa-800">Complete AI Analysis</span>
              </div>
              <Progress value={100} className="h-2 mb-2" />
              <div className="text-sm text-green-600">Complete! • +300 pts earned</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationSystem;