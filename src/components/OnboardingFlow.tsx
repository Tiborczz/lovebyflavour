import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Heart, 
  Camera, 
  Mic, 
  CheckCircle,
  Sparkles,
  Star,
  Target,
  Brain
} from "lucide-react";

interface OnboardingData {
  username: string;
  name: string;
  bio: string;
  goals: string;
  preferences: string;
  quote: string;
  idealDate: string;
  quizAnswers: Record<string, number>;
  flavourResult?: string;
}

interface QuizQuestion {
  id: string;
  text: string;
  options: Array<{
    text: string;
    values: Record<string, number>;
  }>;
}

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    username: '',
    name: '',
    bio: '',
    goals: '',
    preferences: '',
    quote: '',
    idealDate: '',
    quizAnswers: {}
  });
  const [showCelebration, setShowCelebration] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const totalSteps = 8;
  
  const quizQuestions: QuizQuestion[] = [
    {
      id: 'approach',
      text: 'How do you approach new relationships?',
      options: [
        { text: 'Dive in head-first with passion', values: { chocolate: 3, strawberry: 2, pineapple: 1 } },
        { text: 'Take it slow and steady', values: { vanilla: 3, coconut: 2, mint: 1 } },
        { text: 'Go with the flow and see what happens', values: { pineapple: 3, mango: 2, lemon: 1 } },
        { text: 'Analyze compatibility first', values: { coffee: 3, grape: 2, vanilla: 1 } }
      ]
    },
    {
      id: 'conflict',
      text: 'When facing relationship conflict, you tend to:',
      options: [
        { text: 'Address it directly and emotionally', values: { chocolate: 3, cherry: 2, strawberry: 1 } },
        { text: 'Discuss it calmly and rationally', values: { vanilla: 3, coffee: 2, mint: 1 } },
        { text: 'Avoid confrontation when possible', values: { coconut: 3, bubblegum: 2, watermelon: 1 } },
        { text: 'Turn it into a learning experience', values: { grape: 3, coffee: 2, lemon: 1 } }
      ]
    },
    {
      id: 'social',
      text: 'In social situations, you are:',
      options: [
        { text: 'The life of the party', values: { cherry: 3, bubblegum: 2, watermelon: 1 } },
        { text: 'Warm and welcoming to everyone', values: { strawberry: 3, banana: 2, watermelon: 1 } },
        { text: 'Selective about who you open up to', values: { coconut: 3, mint: 2, grape: 1 } },
        { text: 'Comfortable in small, intimate groups', values: { vanilla: 3, chocolate: 2, coffee: 1 } }
      ]
    }
  ];

  const steps = [
    { title: 'Welcome', description: 'Let\'s get started!' },
    { title: 'Basic Info', description: 'Tell us about yourself' },
    { title: 'Your Story', description: 'Share your bio' },
    { title: 'Relationship Goals', description: 'What are you looking for?' },
    { title: 'Your Values', description: 'What matters to you?' },
    { title: 'Mini Quiz', description: 'Discover your flavour' },
    { title: 'Profile Photo', description: 'Show your best self' },
    { title: 'Finish', description: 'You\'re all set!' }
  ];

  const calculateFlavour = (answers: Record<string, number>) => {
    const flavourScores: Record<string, number> = {};
    
    Object.values(answers).forEach(questionAnswers => {
      Object.entries(questionAnswers).forEach(([flavour, score]) => {
        flavourScores[flavour] = (flavourScores[flavour] || 0) + score;
      });
    });

    const topFlavour = Object.entries(flavourScores).reduce((a, b) => 
      flavourScores[a[0]] > flavourScores[b[0]] ? a : b
    );

    const flavourMap: Record<string, string> = {
      strawberry: 'Strawberry - Hopeless Romantic',
      vanilla: 'Vanilla - Steady & Loyal',
      chocolate: 'Chocolate - Intense & Deep',
      banana: 'Banana - Energetic & Optimistic',
      mint: 'Mint - Fresh & Independent',
      cherry: 'Cherry - Sweet & Playful',
      bubblegum: 'Bubblegum - Youthful & Spontaneous',
      coffee: 'Coffee - Sophisticated & Driven',
      watermelon: 'Watermelon - Refreshing & Social',
      lemon: 'Lemon - Zesty & Bold',
      coconut: 'Coconut - Exotic & Mysterious',
      grape: 'Grape - Refined & Sophisticated',
      pineapple: 'Pineapple - Wild & Adventurous',
      mango: 'Mango - Flirty & Magnetic'
    };

    return flavourMap[topFlavour[0]] || 'Pineapple - Wild & Adventurous';
  };

  const handleInputChange = (field: keyof OnboardingData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuizAnswer = (questionId: string, optionIndex: number) => {
    const question = quizQuestions.find(q => q.id === questionId);
    if (question) {
      setData(prev => ({
        ...prev,
        quizAnswers: {
          ...prev.quizAnswers,
          [questionId]: question.options[optionIndex].values
        }
      }));
    }
  };

  const nextStep = async () => {
    if (currentStep === 6 && Object.keys(data.quizAnswers).length === quizQuestions.length) {
      // Analyze flavour
      setIsAnalyzing(true);
      setAnalysisProgress(0);
      
      // Simulate analysis progress
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            const flavour = calculateFlavour(data.quizAnswers);
            setData(prev => ({ ...prev, flavourResult: flavour }));
            setIsAnalyzing(false);
            setShowCelebration(true);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 2: return data.username && data.name;
      case 3: return data.bio;
      case 4: return data.goals;
      case 5: return data.preferences;
      case 6: return Object.keys(data.quizAnswers).length === quizQuestions.length;
      default: return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">💝</div>
            <h2 className="text-3xl font-bold text-candy-cocoa-800 mb-4">Welcome to Love by Flavour!</h2>
            <p className="text-xl text-candy-cocoa-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's create your personalized dating profile and discover your unique love flavour. 
              This journey will help you understand your dating patterns and find your perfect match!
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200/40 max-w-md mx-auto">
              <h3 className="font-semibold text-candy-cocoa-800 mb-2">What You'll Get:</h3>
              <ul className="text-sm text-candy-cocoa-600 space-y-1">
                <li>✨ Your personalized Love Flavour</li>
                <li>🧠 AI-powered compatibility insights</li>
                <li>💡 Tailored dating advice</li>
                <li>🎯 Better matches based on psychology</li>
              </ul>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-candy-cocoa-800 mb-6 text-center">Tell Us About Yourself</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-candy-cocoa-700">Your Name</Label>
                <Input 
                  id="name" 
                  value={data.name} 
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your first name"
                  className="border-purple-200 focus:border-purple-500"
                />
                <p className="text-xs text-candy-cocoa-500 mt-1">This is how matches will see you</p>
              </div>
              <div>
                <Label htmlFor="username" className="text-sm font-medium text-candy-cocoa-700">Username</Label>
                <Input 
                  id="username" 
                  value={data.username} 
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="Choose a unique username"
                  className="border-purple-200 focus:border-purple-500"
                />
                <p className="text-xs text-candy-cocoa-500 mt-1">Make it memorable and fun!</p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-candy-cocoa-800 mb-6 text-center">Share Your Story</h2>
            <div>
              <Label htmlFor="bio" className="text-sm font-medium text-candy-cocoa-700">Bio</Label>
              <Textarea 
                id="bio" 
                value={data.bio} 
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself, your interests, and what makes you unique..."
                className="border-purple-200 focus:border-purple-500 min-h-[120px]"
              />
              <p className="text-xs text-candy-cocoa-500 mt-1">This helps us understand your personality</p>
            </div>
            <div className="mt-6">
              <Label htmlFor="idealDate" className="text-sm font-medium text-candy-cocoa-700">Describe your ideal date</Label>
              <Input 
                id="idealDate" 
                value={data.idealDate} 
                onChange={(e) => handleInputChange('idealDate', e.target.value)}
                placeholder="e.g., Hiking followed by coffee and deep conversations"
                className="border-purple-200 focus:border-purple-500"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-candy-cocoa-800 mb-6 text-center">What Are You Looking For?</h2>
            <div>
              <Label htmlFor="goals" className="text-sm font-medium text-candy-cocoa-700">Relationship Goals</Label>
              <Textarea 
                id="goals" 
                value={data.goals} 
                onChange={(e) => handleInputChange('goals', e.target.value)}
                placeholder="e.g., Looking for a long-term relationship with someone who shares my adventurous spirit..."
                className="border-purple-200 focus:border-purple-500 min-h-[100px]"
              />
              <p className="text-xs text-candy-cocoa-500 mt-1">Be honest about what you want - it helps us find better matches!</p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-candy-cocoa-800 mb-6 text-center">What Do You Value?</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="preferences" className="text-sm font-medium text-candy-cocoa-700">What qualities do you value in a partner?</Label>
                <Textarea 
                  id="preferences" 
                  value={data.preferences} 
                  onChange={(e) => handleInputChange('preferences', e.target.value)}
                  placeholder="e.g., Kindness, humor, ambition, emotional intelligence..."
                  className="border-purple-200 focus:border-purple-500 min-h-[80px]"
                />
              </div>
              <div>
                <Label htmlFor="quote" className="text-sm font-medium text-candy-cocoa-700">Favorite Quote or Life Motto</Label>
                <Input 
                  id="quote" 
                  value={data.quote} 
                  onChange={(e) => handleInputChange('quote', e.target.value)}
                  placeholder="A quote that inspires you..."
                  className="border-purple-200 focus:border-purple-500"
                />
                <p className="text-xs text-candy-cocoa-500 mt-1">This helps matches understand your perspective on life</p>
              </div>
            </div>
          </div>
        );

      case 6:
        if (isAnalyzing) {
          return (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-candy-cocoa-800 mb-4">Analyzing Your Flavour...</h2>
              <p className="text-candy-cocoa-600 mb-6">Our AI is processing your answers to discover your unique dating personality!</p>
              <div className="max-w-md mx-auto">
                <Progress value={analysisProgress} className="h-3 mb-2" />
                <p className="text-sm text-candy-cocoa-600">{analysisProgress}% complete</p>
              </div>
            </div>
          );
        }

        return (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-candy-cocoa-800 mb-6 text-center">Mini Quiz: Discover Your Flavour</h2>
            <p className="text-candy-cocoa-600 text-center mb-8">Answer these questions to discover your dating personality type!</p>
            
            <div className="space-y-8">
              {quizQuestions.map((question, qIndex) => (
                <Card key={question.id} className="bg-white/90 backdrop-blur-md border border-purple-200/60">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-candy-cocoa-800 mb-4">
                      {qIndex + 1}. {question.text}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          onClick={() => handleQuizAnswer(question.id, oIndex)}
                          className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                            data.quizAnswers[question.id] === option.values 
                              ? 'border-purple-500 bg-purple-50' 
                              : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              data.quizAnswers[question.id] === option.values
                                ? 'border-purple-500 bg-purple-500'
                                : 'border-gray-300'
                            }`}>
                              {data.quizAnswers[question.id] === option.values && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <span className="text-candy-cocoa-700">{option.text}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
              <Camera className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-candy-cocoa-800 mb-4">Add Your Profile Photo</h2>
            <p className="text-candy-cocoa-600 mb-6 max-w-md mx-auto">
              Upload a photo that shows your personality! This helps potential matches connect with the real you.
            </p>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 mb-4">
              Upload Photo
            </Button>
            <p className="text-xs text-candy-cocoa-500">You can always change this later in your profile</p>
          </div>
        );

      case 8:
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-candy-cocoa-800 mb-4">Welcome to Love by Flavour!</h2>
            <p className="text-xl text-candy-cocoa-600 mb-8 max-w-2xl mx-auto">
              Your profile is complete! You're now ready to discover meaningful connections and explore your dating journey.
            </p>
            
            {data.flavourResult && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200/40 max-w-md mx-auto mb-8">
                <h3 className="font-bold text-candy-cocoa-800 mb-2">Your Love Flavour:</h3>
                <div className="text-lg font-semibold text-purple-600">{data.flavourResult}</div>
              </div>
            )}

            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 text-lg px-8 py-3">
              Start Exploring Matches
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-candy-peach-50 via-candy-mint-50 to-candy-sky-50">
      {/* Celebration Modal */}
      {showCelebration && data.flavourResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md animate-in zoom-in-95">
            <div className="text-6xl mb-4 animate-bounce">✨</div>
            <h3 className="text-2xl font-bold text-candy-cocoa-800 mb-2">Your Flavour Discovered!</h3>
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg p-4 mb-4">
              <div className="text-lg font-bold">{data.flavourResult}</div>
            </div>
            <p className="text-candy-cocoa-600 mb-4">
              You're leaning toward adventurous vibes—let's explore what this means for your dating life!
            </p>
            <Button 
              onClick={() => {
                setShowCelebration(false);
                nextStep();
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-candy-cocoa-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-purple-600">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-3 mb-2" />
          <div className="text-center">
            <h1 className="text-lg font-semibold text-candy-cocoa-800">{steps[currentStep - 1].title}</h1>
            <p className="text-sm text-candy-cocoa-600">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Main Content */}
        <Card className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md border border-purple-200/60 shadow-lg">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        {currentStep > 1 && currentStep < totalSteps && (
          <div className="max-w-2xl mx-auto flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={prevStep}
              className="border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button 
              onClick={nextStep}
              disabled={!canProceed()}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 disabled:opacity-50"
            >
              {currentStep === 6 ? 'Analyze My Flavour' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {currentStep === 1 && (
          <div className="text-center mt-8">
            <Button 
              onClick={nextStep}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 text-lg px-8 py-3"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;