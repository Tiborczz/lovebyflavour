import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Camera, 
  Mic, 
  Video, 
  Check, 
  RefreshCw, 
  Star, 
  Trophy,
  Heart,
  Brain,
  Target,
  Sparkles
} from "lucide-react";

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  goals: string;
  preferences: string;
  quote: string;
  superpower: string;
  flavour: string;
  avatar?: string;
  verified: boolean;
  hasVoiceIntro: boolean;
  hasVideoIntro: boolean;
}

interface AIAnalysis {
  type: string;
  content: string;
  tips: string[];
  confidence: number;
}

const EnhancedProfile = () => {
  const [user, setUser] = useState<UserProfile>({
    name: "Alex Johnson",
    username: "alexj_adventures",
    bio: "Adventure seeker who believes in spontaneous connections and meaningful conversations over coffee.",
    goals: "Looking for someone to explore life's adventures with",
    preferences: "Spontaneous, empathetic, loves trying new things",
    quote: "Life is either a daring adventure or nothing at all",
    superpower: "Making people feel comfortable in any situation",
    flavour: "Pineapple",
    verified: true,
    hasVoiceIntro: true,
    hasVideoIntro: false
  });

  const [profileCompletion, setProfileCompletion] = useState(85);
  const [showCelebration, setShowCelebration] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis>({
    type: "Pineapple",
    content: "As a Pineapple flavour, your preference for spontaneity and adventure suggests you thrive with partners who enjoy surprises and new experiences. Your empathetic nature combined with your adventurous spirit makes you naturally magnetic to those seeking genuine connections.",
    tips: [
      "Plan unique, unexpected dates to showcase your spontaneous side",
      "Ask about their biggest dreams and aspirations on first dates",
      "Share stories about your adventures to spark engaging conversations",
      "Look for partners who light up when talking about their passions"
    ],
    confidence: 92
  });

  const [badges, setBadges] = useState([
    { id: 'profile-pro', name: 'Profile Pro', earned: true, description: 'Completed 80%+ of profile' },
    { id: 'voice-master', name: 'Voice Master', earned: true, description: 'Added voice introduction' },
    { id: 'adventure-seeker', name: 'Adventure Seeker', earned: true, description: 'Pineapple personality type' },
    { id: 'completionist', name: '100% Complete', earned: false, description: 'Complete your entire profile' }
  ]);

  const [dailyChallege, setDailyChallenge] = useState({
    title: "Add a video introduction",
    description: "Let potential matches see your personality shine!",
    points: 200,
    completed: false
  });

  const calculateProfileCompletion = () => {
    const fields = ['name', 'username', 'bio', 'goals', 'preferences', 'quote', 'superpower'];
    const completedFields = fields.filter(field => user[field as keyof UserProfile] && (user[field as keyof UserProfile] as string).length > 0);
    let completion = (completedFields.length / fields.length) * 70; // 70% for fields
    
    if (user.avatar) completion += 10;
    if (user.hasVoiceIntro) completion += 10;
    if (user.hasVideoIntro) completion += 10;
    
    return Math.min(completion, 100);
  };

  useEffect(() => {
    const newCompletion = calculateProfileCompletion();
    setProfileCompletion(newCompletion);
    
    if (newCompletion === 100 && !badges.find(b => b.id === 'completionist')?.earned) {
      setBadges(prev => prev.map(badge => 
        badge.id === 'completionist' ? { ...badge, earned: true } : badge
      ));
      setShowCelebration(true);
    }
  }, [user]);

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const refreshAIAnalysis = async () => {
    // Simulate AI analysis refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    setAiAnalysis(prev => ({
      ...prev,
      confidence: Math.min(prev.confidence + Math.floor(Math.random() * 5), 98)
    }));
  };

  const completeVideoChallenge = () => {
    setUser(prev => ({ ...prev, hasVideoIntro: true }));
    setDailyChallenge(prev => ({ ...prev, completed: true }));
    // Award points animation would go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-candy-peach-50 via-candy-mint-50 to-candy-sky-50">
      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md animate-in zoom-in-95">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h3 className="text-2xl font-bold text-candy-cocoa-800 mb-2">Profile Complete!</h3>
            <p className="text-candy-cocoa-600 mb-4">You've unlocked the "100% Complete" badge!</p>
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg p-4 mb-4">
              <div className="text-2xl font-bold">+500 Discovery Points</div>
              <div className="text-sm opacity-90">Keep exploring to earn more!</div>
            </div>
            <Button 
              onClick={() => setShowCelebration(false)}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Header with Progress */}
      <section className="bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400 min-h-64">
        <div className="container mx-auto px-4 py-8">
          {/* Profile Progress Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/90 font-medium">Profile Completion</span>
              <span className="text-white font-bold text-lg">{Math.round(profileCompletion)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-500 shadow-lg" 
                style={{width: `${profileCompletion}%`}}
              ></div>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Badge className="bg-green-100 text-green-800 border-0">✅ Basic Info</Badge>
              <Badge className="bg-green-100 text-green-800 border-0">✅ Quiz Complete</Badge>
              <Badge className={user.avatar ? "bg-green-100 text-green-800 border-0" : "bg-yellow-100 text-yellow-800 border-0"}>
                {user.avatar ? "✅" : "🔄"} Photos
              </Badge>
              <Badge className={user.hasVoiceIntro ? "bg-green-100 text-green-800 border-0" : "bg-gray-100 text-gray-600 border-0"}>
                {user.hasVoiceIntro ? "✅" : "⏳"} Voice Intro
              </Badge>
              <Badge className={user.hasVideoIntro ? "bg-green-100 text-green-800 border-0" : "bg-gray-100 text-gray-600 border-0"}>
                {user.hasVideoIntro ? "✅" : "⏳"} Video Intro
              </Badge>
            </div>
          </div>

          {/* Profile Header Content */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white/30">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-purple-600 hover:bg-gray-100"
                  aria-label="Upload profile photo"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <Badge className="bg-white/20 text-white border-white/30">
                    {user.flavour} Flavour
                  </Badge>
                  {user.verified && (
                    <Badge className="bg-green-500 text-white border-0">
                      <Check className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Form */}
            <Card className="bg-white/90 backdrop-blur-md border border-purple-200/60 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-candy-cocoa-800 mb-6">About You</h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="username" className="text-sm font-medium text-candy-cocoa-700">Username</Label>
                    <Input 
                      id="username" 
                      value={user.username} 
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-sm font-medium text-candy-cocoa-700">Bio</Label>
                    <Textarea 
                      id="bio" 
                      value={user.bio} 
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Share your story..."
                      className="border-purple-200 focus:border-purple-500 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="goals" className="text-sm font-medium text-candy-cocoa-700">Relationship Goals</Label>
                    <Input 
                      id="goals" 
                      value={user.goals} 
                      onChange={(e) => handleInputChange('goals', e.target.value)}
                      placeholder="e.g., Long-term relationship, New adventures"
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="preferences" className="text-sm font-medium text-candy-cocoa-700">What You Value in a Partner</Label>
                    <Input 
                      id="preferences" 
                      value={user.preferences} 
                      onChange={(e) => handleInputChange('preferences', e.target.value)}
                      placeholder="e.g., Adventurous, Empathetic, Creative"
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="quote" className="text-sm font-medium text-candy-cocoa-700">Favorite Quote</Label>
                    <Input 
                      id="quote" 
                      value={user.quote} 
                      onChange={(e) => handleInputChange('quote', e.target.value)}
                      placeholder="A quote that inspires you..."
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="superpower" className="text-sm font-medium text-candy-cocoa-700">What's your dating superpower?</Label>
                    <Input 
                      id="superpower" 
                      value={user.superpower} 
                      onChange={(e) => handleInputChange('superpower', e.target.value)}
                      placeholder="e.g., Making people laugh, Great listener"
                      className="border-purple-200 focus:border-purple-500"
                    />
                  </div>

                  {/* Interactive Media */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-candy-cocoa-700">Voice Introduction</Label>
                      <Button 
                        variant="outline" 
                        className={`w-full mt-2 ${user.hasVoiceIntro ? 'border-green-300 text-green-600' : 'border-purple-300 text-purple-600'}`}
                      >
                        <Mic className="w-4 h-4 mr-2" />
                        {user.hasVoiceIntro ? 'Update Voice Intro' : 'Add Voice Intro'}
                      </Button>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-candy-cocoa-700">Video Introduction</Label>
                      <Button 
                        variant="outline" 
                        className={`w-full mt-2 ${user.hasVideoIntro ? 'border-green-300 text-green-600' : 'border-purple-300 text-purple-600'}`}
                        onClick={completeVideoChallenge}
                      >
                        <Video className="w-4 h-4 mr-2" />
                        {user.hasVideoIntro ? 'Update Video Intro' : 'Add Video Intro'}
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600">
                  Save Profile
                </Button>
              </CardContent>
            </Card>

            {/* Badges & Daily Challenge */}
            <Card className="bg-white/90 backdrop-blur-md border border-mint-200/60 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-candy-cocoa-800 mb-3">Your Badges</h3>
                    <div className="flex flex-wrap gap-2">
                      {badges.filter(badge => badge.earned).map(badge => (
                        <Badge key={badge.id} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                          {badge.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-candy-cocoa-800 mb-3">Daily Challenge</h3>
                    <div className="bg-gradient-to-r from-mint-50 to-blue-50 rounded-lg p-4 border border-mint-200/40">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-mint-600" />
                        <span className="font-medium text-candy-cocoa-800">{dailyChallege.title}</span>
                      </div>
                      <p className="text-sm text-candy-cocoa-600 mb-2">{dailyChallege.description}</p>
                      <div className="text-xs text-mint-600">+{dailyChallege.points} points</div>
                      {dailyChallege.completed && (
                        <Badge className="bg-green-100 text-green-800 mt-2">Completed! ✅</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: AI Analysis & Stats */}
          <div className="space-y-6">
            {/* AI Dating Blueprint */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/60 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-candy-cocoa-800">Your Dating Blueprint</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={refreshAIAnalysis}
                    className="text-purple-600 hover:bg-purple-100"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Refresh
                  </Button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-candy-cocoa-800">{aiAnalysis.confidence}% Confidence</span>
                </div>

                <div className="bg-white/80 rounded-lg p-4 border border-purple-200/40 mb-4">
                  <p className="text-candy-cocoa-700 text-sm leading-relaxed">{aiAnalysis.content}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-candy-cocoa-800 mb-2">Personalized Tips:</h4>
                  <ul className="space-y-2">
                    {aiAnalysis.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-candy-cocoa-600">
                        <Sparkles className="w-3 h-3 text-purple-500 mt-1 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Love Journey Stats */}
            <Card className="bg-white/90 backdrop-blur-md border border-pink-200/60 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-candy-cocoa-800 mb-4">Your Love Journey Stats</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">23</div>
                    <div className="text-sm text-candy-cocoa-600">Potential Matches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">87%</div>
                    <div className="text-sm text-candy-cocoa-600">Compatibility</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-mint-600">5</div>
                    <div className="text-sm text-candy-cocoa-600">Profile Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2</div>
                    <div className="text-sm text-candy-cocoa-600">Connections</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gradient-to-r from-mint-50 to-blue-50 rounded-lg border border-mint-200/40">
                  <p className="text-sm text-candy-cocoa-600 text-center">
                    Complete your profile to unlock more detailed insights!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfile;