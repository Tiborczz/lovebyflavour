import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Heart, 
  Brain, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Calendar,
  Clock,
  Star,
  Zap
} from 'lucide-react';

interface ExPartnerData {
  name: string;
  relationship_duration: string;
  age_when_dated: string;
  relationship_context: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  category: string;
  options: {
    value: string;
    label: string;
    trait_mapping: Record<string, number>;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'social_energy',
    question: 'How did they typically recharge after a long day?',
    category: 'Personality',
    options: [
      {
        value: 'social_gathering',
        label: 'Going out with friends or to social events',
        trait_mapping: { extraversion: 0.8, openness: 0.6 }
      },
      {
        value: 'quiet_home',
        label: 'Staying home alone or with close family',
        trait_mapping: { extraversion: 0.2, conscientiousness: 0.6 }
      },
      {
        value: 'creative_activity',
        label: 'Engaging in hobbies or creative activities',
        trait_mapping: { openness: 0.8, extraversion: 0.4 }
      },
      {
        value: 'mixed_approach',
        label: 'It varied depending on their mood',
        trait_mapping: { extraversion: 0.5, neuroticism: 0.3 }
      }
    ]
  },
  {
    id: 'conflict_style',
    question: 'How did they typically handle disagreements or conflicts?',
    category: 'Communication',
    options: [
      {
        value: 'direct_discussion',
        label: 'Addressed issues directly and openly',
        trait_mapping: { agreeableness: 0.7, conscientiousness: 0.8 }
      },
      {
        value: 'avoidant',
        label: 'Avoided confrontation and withdrew',
        trait_mapping: { agreeableness: 0.8, neuroticism: 0.6 }
      },
      {
        value: 'emotional_reactive',
        label: 'Became emotional or reactive',
        trait_mapping: { neuroticism: 0.8, agreeableness: 0.3 }
      },
      {
        value: 'analytical',
        label: 'Wanted to analyze and discuss everything',
        trait_mapping: { conscientiousness: 0.8, openness: 0.7 }
      }
    ]
  },
  {
    id: 'decision_making',
    question: 'How did they make important decisions?',
    category: 'Thinking Style',
    options: [
      {
        value: 'quick_intuitive',
        label: 'Quickly, based on gut feelings',
        trait_mapping: { extraversion: 0.7, openness: 0.6 }
      },
      {
        value: 'thorough_research',
        label: 'After extensive research and planning',
        trait_mapping: { conscientiousness: 0.9, openness: 0.5 }
      },
      {
        value: 'seek_advice',
        label: 'By seeking advice from others',
        trait_mapping: { agreeableness: 0.8, extraversion: 0.6 }
      },
      {
        value: 'procrastinate',
        label: 'Often delayed or avoided making decisions',
        trait_mapping: { neuroticism: 0.7, conscientiousness: 0.3 }
      }
    ]
  },
  {
    id: 'affection_style',
    question: 'How did they typically show love and affection?',
    category: 'Love Language',
    options: [
      {
        value: 'words_affirmation',
        label: 'Through compliments and verbal expressions',
        trait_mapping: { extraversion: 0.7, agreeableness: 0.8 }
      },
      {
        value: 'physical_touch',
        label: 'Through physical touch and closeness',
        trait_mapping: { agreeableness: 0.7, extraversion: 0.6 }
      },
      {
        value: 'acts_service',
        label: 'By doing things for you or helping out',
        trait_mapping: { conscientiousness: 0.8, agreeableness: 0.9 }
      },
      {
        value: 'gifts_time',
        label: 'Through gifts or quality time together',
        trait_mapping: { conscientiousness: 0.6, agreeableness: 0.7 }
      }
    ]
  },
  {
    id: 'stress_response',
    question: 'How did they typically react under stress or pressure?',
    category: 'Emotional Regulation',
    options: [
      {
        value: 'calm_composed',
        label: 'Remained calm and composed',
        trait_mapping: { neuroticism: 0.2, conscientiousness: 0.8 }
      },
      {
        value: 'anxious_worried',
        label: 'Became anxious or worried',
        trait_mapping: { neuroticism: 0.8, agreeableness: 0.6 }
      },
      {
        value: 'irritable_snappy',
        label: 'Got irritable or snappy with others',
        trait_mapping: { neuroticism: 0.7, agreeableness: 0.3 }
      },
      {
        value: 'withdraw_isolate',
        label: 'Withdrew and wanted to be alone',
        trait_mapping: { neuroticism: 0.6, extraversion: 0.2 }
      }
    ]
  },
  {
    id: 'future_planning',
    question: 'What was their approach to future planning and goals?',
    category: 'Life Approach',
    options: [
      {
        value: 'detailed_planner',
        label: 'Had detailed plans and clear goals',
        trait_mapping: { conscientiousness: 0.9, neuroticism: 0.3 }
      },
      {
        value: 'spontaneous_flexible',
        label: 'Preferred to be spontaneous and flexible',
        trait_mapping: { openness: 0.8, extraversion: 0.7 }
      },
      {
        value: 'dreamer_unrealistic',
        label: 'Had big dreams but struggled with execution',
        trait_mapping: { openness: 0.7, conscientiousness: 0.3 }
      },
      {
        value: 'anxious_uncertain',
        label: 'Felt anxious about the future',
        trait_mapping: { neuroticism: 0.8, conscientiousness: 0.4 }
      }
    ]
  }
];

const ExPartnerAnalysis: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [exPartnerData, setExPartnerData] = useState<ExPartnerData>({
    name: '',
    relationship_duration: '',
    age_when_dated: '',
    relationship_context: ''
  });
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalSteps = 2 + quizQuestions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleExPartnerDataChange = (field: keyof ExPartnerData, value: string) => {
    setExPartnerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQuizAnswer = (questionId: string, answer: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const canProceedFromBasicInfo = () => {
    return exPartnerData.name.trim() && 
           exPartnerData.relationship_duration.trim() && 
           exPartnerData.age_when_dated.trim();
  };

  const canProceedFromContext = () => {
    return exPartnerData.relationship_context.trim().length > 20;
  };

  const canProceedFromQuiz = (questionIndex: number) => {
    const questionId = quizQuestions[questionIndex].id;
    return quizAnswers[questionId] !== undefined;
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // In a real implementation, this would call the backend API
      // For now, we'll simulate the analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Analysis Complete! 🎉",
        description: `${exPartnerData.name}'s flavour has been analyzed. Redirecting to insights...`,
      });

      // Navigate to the AI dashboard to see insights
      navigate('/ai-dashboard');
      
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderBasicInfoStep = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full">
            <User className="h-8 w-8 text-pink-600" />
          </div>
        </div>
        <CardTitle className="text-2xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Tell us about your ex
        </CardTitle>
        <CardDescription>
          Let's start with some basic information to help our AI understand the relationship context
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">What should we call them?</Label>
          <Input
            id="name"
            placeholder="e.g., Alex, Sam, or just 'Ex #1'"
            value={exPartnerData.name}
            onChange={(e) => handleExPartnerDataChange('name', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration">How long did you date?</Label>
          <Input
            id="duration"
            placeholder="e.g., 6 months, 2 years, etc."
            value={exPartnerData.relationship_duration}
            onChange={(e) => handleExPartnerDataChange('relationship_duration', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age">How old were they when you dated?</Label>
          <Input
            id="age"
            placeholder="e.g., 25, early 20s, etc."
            value={exPartnerData.age_when_dated}
            onChange={(e) => handleExPartnerDataChange('age_when_dated', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderContextStep = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Relationship Context
        </CardTitle>
        <CardDescription>
          Help our AI understand the bigger picture of your relationship
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="context">
            Describe your relationship dynamic, what attracted you to them, and why it ended
          </Label>
          <Textarea
            id="context"
            placeholder="Tell us about the highs and lows, what you loved about them, what drove you crazy, how you met, why it ended, etc. The more detail, the better our AI can analyze their personality..."
            value={exPartnerData.relationship_context}
            onChange={(e) => handleExPartnerDataChange('relationship_context', e.target.value)}
            rows={6}
            className="resize-none"
          />
          <div className="text-sm text-muted-foreground text-right">
            {exPartnerData.relationship_context.length}/500 characters (minimum 20)
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderQuizStep = (questionIndex: number) => {
    const question = quizQuestions[questionIndex];
    const currentAnswer = quizAnswers[question.id];

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <Badge variant="secondary" className="mb-2">
            {question.category}
          </Badge>
          <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {question.question}
          </CardTitle>
          <CardDescription>
            Question {questionIndex + 1} of {quizQuestions.length} • Think about {exPartnerData.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={currentAnswer}
            onValueChange={(value) => handleQuizAnswer(question.id, value)}
            className="space-y-4"
          >
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className="flex-1 cursor-pointer text-sm leading-relaxed"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    );
  };

  const renderFinalStep = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
            <Sparkles className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Ready for AI Analysis
        </CardTitle>
        <CardDescription>
          Our AI will analyze {exPartnerData.name}'s personality and infer their "flavour" based on your responses
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-pink-50 rounded-lg">
            <Clock className="h-5 w-5 text-pink-600 mx-auto mb-2" />
            <div className="font-medium">Analysis Time</div>
            <div className="text-muted-foreground">~30 seconds</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <Star className="h-5 w-5 text-purple-600 mx-auto mb-2" />
            <div className="font-medium">AI Confidence</div>
            <div className="text-muted-foreground">85-95%</div>
          </div>
        </div>
        
        <Button 
          onClick={handleSubmitAnalysis}
          disabled={isAnalyzing}
          className="w-full"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Zap className="mr-2 h-4 w-4 animate-spin" />
              Analyzing {exPartnerData.name}'s Flavour...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Analyze Their Flavour
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );

  const renderCurrentStep = () => {
    if (currentStep === 0) return renderBasicInfoStep();
    if (currentStep === 1) return renderContextStep();
    if (currentStep >= 2 && currentStep < totalSteps - 1) {
      return renderQuizStep(currentStep - 2);
    }
    return renderFinalStep();
  };

  const canProceed = () => {
    if (currentStep === 0) return canProceedFromBasicInfo();
    if (currentStep === 1) return canProceedFromContext();
    if (currentStep >= 2 && currentStep < totalSteps - 1) {
      return canProceedFromQuiz(currentStep - 2);
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Ex-Partner Analysis
          </h1>
          <p className="text-muted-foreground">
            Help our AI understand your dating patterns by analyzing your past relationships
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Current Step */}
        {renderCurrentStep()}

        {/* Navigation */}
        <div className="flex justify-between max-w-2xl mx-auto mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          {currentStep < totalSteps - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ExPartnerAnalysis; 