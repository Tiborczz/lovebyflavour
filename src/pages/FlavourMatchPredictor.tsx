import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Heart, Brain, ArrowRight, ArrowLeft, Sparkles, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import NewBrandLogo from "@/components/NewBrandLogo";

interface CompatibilityResult {
  flavour: string;
  emoji: string;
  compatibility: number;
  reason: string;
  type: 'perfect' | 'good' | 'warning';
}

const FlavourMatchPredictor = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userFlavour, setUserFlavour] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<CompatibilityResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const flavours = [
    { emoji: "🍓", name: "Strawberry", trait: "Hopeless Romantic" },
    { emoji: "🍦", name: "Vanilla", trait: "Steady & Loyal" },
    { emoji: "🍫", name: "Chocolate", trait: "Intense & Deep" },
    { emoji: "🍌", name: "Banana", trait: "Energetic & Optimistic" },
    { emoji: "🌿", name: "Mint", trait: "Fresh & Independent" },
    { emoji: "🍒", name: "Cherry", trait: "Sweet & Playful" },
    { emoji: "🍬", name: "Bubblegum", trait: "Youthful & Spontaneous" },
    { emoji: "☕", name: "Coffee", trait: "Sophisticated & Driven" },
    { emoji: "🍉", name: "Watermelon", trait: "Refreshing & Social" },
    { emoji: "🍋", name: "Lemon", trait: "Zesty & Bold" },
    { emoji: "🥥", name: "Coconut", trait: "Exotic & Mysterious" },
    { emoji: "🍇", name: "Grape", trait: "Refined & Sophisticated" },
    { emoji: "🍍", name: "Pineapple", trait: "Wild & Adventurous" },
    { emoji: "🥭", name: "Mango", trait: "Flirty & Magnetic" }
  ];

  const questions = [
    {
      question: "What's most important to you in a relationship?",
      options: [
        { text: "Deep emotional connection and intimacy", value: "emotional" },
        { text: "Fun, excitement, and new experiences", value: "adventure" },
        { text: "Stability, loyalty, and long-term commitment", value: "stability" },
        { text: "Intellectual stimulation and growth", value: "intellectual" }
      ]
    },
    {
      question: "How do you handle conflict in relationships?",
      options: [
        { text: "I avoid it and hope it resolves itself", value: "avoidant" },
        { text: "I address it directly and want to talk it through", value: "direct" },
        { text: "I get emotional and need reassurance", value: "emotional" },
        { text: "I analyze it logically and find solutions", value: "analytical" }
      ]
    },
    {
      question: "What's your ideal date night?",
      options: [
        { text: "Cozy night in with deep conversations", value: "intimate" },
        { text: "Exciting adventure or trying something new", value: "adventurous" },
        { text: "Cultural event like museum or theater", value: "cultured" },
        { text: "Social gathering with friends", value: "social" }
      ]
    },
    {
      question: "What's your biggest relationship deal-breaker?",
      options: [
        { text: "Lack of emotional availability", value: "emotional_unavailable" },
        { text: "Being controlling or possessive", value: "controlling" },
        { text: "Dishonesty or breaking trust", value: "dishonest" },
        { text: "Different life goals or values", value: "incompatible_goals" }
      ]
    },
    {
      question: "How do you show love?",
      options: [
        { text: "Through words and emotional expression", value: "words" },
        { text: "Through physical affection and touch", value: "physical" },
        { text: "Through acts of service and support", value: "service" },
        { text: "Through quality time and attention", value: "time" }
      ]
    }
  ];

  const calculateCompatibility = (userFlavour: string, answers: string[]): CompatibilityResult[] => {
    // Complex compatibility algorithm based on psychology
    const compatibilityMatrix: { [key: string]: { [key: string]: { score: number; reason: string } } } = {
      strawberry: {
        chocolate: { score: 95, reason: "Both crave deep emotional connection and aren't afraid of intensity" },
        vanilla: { score: 85, reason: "Your romanticism balances their stability beautifully" },
        coconut: { score: 80, reason: "Their mystery intrigues your romantic soul" },
        coffee: { score: 40, reason: "They might find your emotions overwhelming" },
        pineapple: { score: 30, reason: "Your need for commitment clashes with their freedom" }
      },
      vanilla: {
        banana: { score: 90, reason: "Their optimism complements your steady nature perfectly" },
        coconut: { score: 85, reason: "You provide the stability they need to open up" },
        strawberry: { score: 85, reason: "Your loyalty gives them the security to be romantic" },
        mango: { score: 35, reason: "Their intensity might overwhelm your calm nature" },
        pineapple: { score: 25, reason: "Their unpredictability conflicts with your need for stability" }
      },
      chocolate: {
        strawberry: { score: 95, reason: "Both value deep emotional intimacy and authentic connection" },
        grape: { score: 80, reason: "You both appreciate depth and meaningful experiences" },
        coffee: { score: 75, reason: "Intellectual and emotional intensity create powerful chemistry" },
        bubblegum: { score: 40, reason: "Your depth might feel too heavy for their lightness" },
        watermelon: { score: 35, reason: "Their social nature conflicts with your need for intimate connection" }
      },
      // Add more comprehensive mappings...
    };

    // Get base compatibility scores
    const userMatrix = compatibilityMatrix[userFlavour.toLowerCase()] || {};
    
    // Adjust scores based on answers
    const adjustedScores = flavours.map(flavour => {
      const baseScore = userMatrix[flavour.name.toLowerCase()]?.score || 50;
      const baseReason = userMatrix[flavour.name.toLowerCase()]?.reason || "Moderate compatibility based on personality traits";
      
      let adjustedScore = baseScore;
      
      // Adjust based on relationship values
      if (answers[0] === 'emotional' && ['chocolate', 'strawberry', 'grape'].includes(flavour.name.toLowerCase())) {
        adjustedScore += 15;
      }
      if (answers[0] === 'adventure' && ['pineapple', 'mango', 'lemon'].includes(flavour.name.toLowerCase())) {
        adjustedScore += 20;
      }
      if (answers[0] === 'stability' && ['vanilla', 'coconut', 'coffee'].includes(flavour.name.toLowerCase())) {
        adjustedScore += 15;
      }
      
      // Adjust based on conflict style
      if (answers[1] === 'direct' && ['lemon', 'coffee', 'mint'].includes(flavour.name.toLowerCase())) {
        adjustedScore += 10;
      }
      if (answers[1] === 'emotional' && ['strawberry', 'cherry', 'bubblegum'].includes(flavour.name.toLowerCase())) {
        adjustedScore += 10;
      }
      
      // Cap scores at 100
      adjustedScore = Math.min(adjustedScore, 100);
      
      let type: 'perfect' | 'good' | 'warning' = 'good';
      if (adjustedScore >= 85) type = 'perfect';
      if (adjustedScore <= 40) type = 'warning';
      
      return {
        flavour: flavour.name,
        emoji: flavour.emoji,
        compatibility: adjustedScore,
        reason: baseReason,
        type
      };
    });
    
    // Sort by compatibility score and return top results
    return adjustedScores
      .filter(result => result.flavour.toLowerCase() !== userFlavour.toLowerCase())
      .sort((a, b) => b.compatibility - a.compatibility);
  };

  const handleFlavourSelect = (flavour: string) => {
    setUserFlavour(flavour);
    setCurrentStep(1);
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate results
      const compatibilityResults = calculateCompatibility(userFlavour, newAnswers);
      setResults(compatibilityResults);
      setShowResults(true);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setUserFlavour('');
    setAnswers([]);
    setResults([]);
    setShowResults(false);
  };

  const progress = currentStep === 0 ? 0 : ((currentStep) / (questions.length + 1)) * 100;

  if (showResults) {
    const topMatches = results.slice(0, 3);
    const warnings = results.filter(r => r.type === 'warning').slice(0, 2);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <header className="container mx-auto px-4 py-6">
          <Link to="/">
            <NewBrandLogo variant="full" size="lg" />
          </Link>
        </header>
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <div className="text-6xl mb-4">
              {flavours.find(f => f.name === userFlavour)?.emoji}
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Your Compatibility Results
            </h1>
            <p className="text-lg text-gray-600">
              Based on your {userFlavour} personality and relationship preferences
            </p>
          </div>
          
          {/* Top Matches */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              🎯 Your Top 3 Matches
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {topMatches.map((match, index) => (
                <Card key={match.flavour} className={`border-0 shadow-lg ${
                  match.type === 'perfect' ? 'bg-gradient-to-br from-green-50 to-emerald-50 ring-2 ring-green-200' : 
                  'bg-white'
                }`}>
                  <CardHeader className="text-center pb-4">
                    <div className="text-4xl mb-2">{match.emoji}</div>
                    <CardTitle className="text-xl">{match.flavour}</CardTitle>
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant={match.type === 'perfect' ? 'default' : 'secondary'} className={
                        match.type === 'perfect' ? 'bg-green-500' : ''
                      }>
                        {match.compatibility}% Match
                      </Badge>
                      {index === 0 && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm text-center">
                      {match.reason}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Warning Matches */}
          {warnings.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                ⚠️ Potential Challenges
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {warnings.map((warning) => (
                  <Card key={warning.flavour} className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-orange-50 ring-2 ring-red-200">
                    <CardHeader className="text-center pb-4">
                      <div className="text-3xl mb-2">{warning.emoji}</div>
                      <CardTitle className="text-lg">{warning.flavour}</CardTitle>
                      <Badge variant="destructive" className="bg-red-500">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {warning.compatibility}% Match
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm text-center">
                        {warning.reason}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Actions */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quiz">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <Heart className="w-4 h-4 mr-2" />
                  Take Full Personality Quiz
                </Button>
              </Link>
              <Button variant="outline" size="lg" onClick={resetQuiz}>
                Try Different Flavour
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Want deeper insights? Take our full quiz to discover your complete dating personality.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="container mx-auto px-4 py-6">
        <Link to="/">
          <NewBrandLogo variant="full" size="lg" />
        </Link>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          {currentStep > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm text-gray-500">{currentStep}/{questions.length + 1}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          {/* Flavour Selection */}
          {currentStep === 0 && (
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-100 rounded-full p-4">
                    <Brain className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <CardTitle className="text-3xl mb-4">Flavour Match Predictor</CardTitle>
                <p className="text-gray-600">
                  Discover which flavours you're most compatible with based on psychology and your relationship patterns.
                </p>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-4 text-center">What's your flavour?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {flavours.map((flavour) => (
                    <button
                      key={flavour.name}
                      onClick={() => handleFlavourSelect(flavour.name)}
                      className="p-4 text-center border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                    >
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                        {flavour.emoji}
                      </div>
                      <div className="font-semibold text-sm">{flavour.name}</div>
                      <div className="text-xs text-gray-500">{flavour.trait}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Questions */}
          {currentStep > 0 && currentStep <= questions.length && (
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Button variant="ghost" onClick={goBack} className="p-2">
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <Badge variant="secondary">
                    Question {currentStep} of {questions.length}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-center">
                  {questions[currentStep - 1].question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup className="space-y-4">
                  {questions[currentStep - 1].options.map((option, index) => (
                    <div key={index}>
                      <Button
                        variant="outline"
                        className="w-full p-6 h-auto text-left justify-start hover:bg-purple-50 hover:border-purple-300"
                        onClick={() => handleAnswer(option.value)}
                      >
                        <div className="flex items-center w-full">
                          <RadioGroupItem value={option.value} className="mr-3" />
                          <Label className="flex-1 cursor-pointer text-sm leading-relaxed">
                            {option.text}
                          </Label>
                        </div>
                      </Button>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlavourMatchPredictor; 