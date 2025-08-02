import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, AlertCircle, TrendingUp } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ReflectionQuestions from "@/components/ReflectionQuestions";
import PatternAnalysis from "@/components/PatternAnalysis";
import LoopBadges from "@/components/LoopBadges";

interface SavedData {
  userFlavour?: string;
  exes?: Array<{ flavour: string; outcome: string; duration: string }>;
  hasAnalysis?: boolean;
}

interface ReflectionData {
  whatYouMiss: string;
  whatEndsIt: string;
}

interface AnalysisData {
  userFlavour: string;
  exes: Array<{ flavour: string; outcome: string; duration: string }>;
  reflections: ReflectionData;
}

const flavourData: Record<string, { name: string; emoji: string }> = {
  strawberry: { name: "Strawberry", emoji: "🍓" },
  vanilla: { name: "Vanilla", emoji: "🍦" },
  chocolate: { name: "Chocolate", emoji: "🍫" },
  mango: { name: "Mango", emoji: "🥭" },
  coconut: { name: "Coconut", emoji: "🥥" },
  cherry: { name: "Cherry", emoji: "🍒" },
  mint: { name: "Mint", emoji: "🍃" },
  blueberry: { name: "Blueberry", emoji: "🫐" }
};

export default function PatternBreaker() {
  const [currentStep, setCurrentStep] = useState<'overview' | 'questions' | 'analysis' | 'badges'>('overview');
  const [savedData, setSavedData] = useState<SavedData>({});
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load saved data from localStorage
    const loadSavedData = () => {
      const data: SavedData = {};
      
      // Load user flavour
      const savedResult = localStorage.getItem('love-by-flavour-result');
      if (savedResult) {
        try {
          const parsed = JSON.parse(savedResult);
          data.userFlavour = parsed.flavour;
        } catch (e) {
          console.log('Could not parse saved result');
        }
      }

      // Load ex history
      const savedExes = localStorage.getItem('love-by-flavour-exes');
      if (savedExes) {
        try {
          const parsed = JSON.parse(savedExes);
          data.exes = parsed;
        } catch (e) {
          console.log('Could not parse saved exes');
        }
      }

      // Check if analysis was completed before
      const savedAnalysis = localStorage.getItem('love-by-flavour-pattern-analysis');
      data.hasAnalysis = !!savedAnalysis;

      setSavedData(data);
    };

    loadSavedData();
  }, []);

  const handleQuestionComplete = (reflectionData: ReflectionData) => {
    if (!savedData.userFlavour) {
      toast({
        title: "Missing information",
        description: "Please take the main quiz first to discover your flavour.",
        variant: "destructive",
      });
      return;
    }

    const analysis: AnalysisData = {
      userFlavour: savedData.userFlavour,
      exes: savedData.exes || [],
      reflections: reflectionData
    };

    setAnalysisData(analysis);
    
    // Save analysis data
    localStorage.setItem('love-by-flavour-pattern-analysis', JSON.stringify({
      ...analysis,
      completedAt: new Date().toISOString()
    }));

    setCurrentStep('analysis');
  };

  const handleReset = () => {
    setAnalysisData(null);
    setCurrentStep('overview');
  };

  const canStartAnalysis = savedData.userFlavour && (savedData.exes?.length || 0) >= 1;

  if (currentStep === 'questions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentStep('overview')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
          <ReflectionQuestions onComplete={handleQuestionComplete} />
        </div>
      </div>
    );
  }

  if (currentStep === 'analysis' && analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentStep('badges')}
              className="flex items-center gap-2"
            >
              View Badges
            </Button>
          </div>
          <PatternAnalysis analysisData={analysisData} onReset={handleReset} />
        </div>
      </div>
    );
  }

  if (currentStep === 'badges') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentStep(analysisData ? 'analysis' : 'overview')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
          <LoopBadges />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Flavour Pattern Breaker ✂️
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Break free from toxic dating cycles with AI-powered pattern analysis.
            <br />
            <em className="text-sm">Understanding your loops is the first step to changing them.</em>
          </p>
        </div>

        {/* Data Check Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* User Flavour Status */}
          <Card className={savedData.userFlavour ? "border-green-200 bg-green-50/50" : "border-orange-200 bg-orange-50/50"}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                {savedData.userFlavour ? (
                  <>
                    <div className="text-2xl">{flavourData[savedData.userFlavour]?.emoji}</div>
                    <div>
                      <h3 className="font-semibold text-green-700">Your Flavour: {flavourData[savedData.userFlavour]?.name}</h3>
                      <p className="text-sm text-green-600">Ready for analysis</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-6 h-6 text-orange-500" />
                    <div>
                      <h3 className="font-semibold text-orange-700">Flavour Unknown</h3>
                      <p className="text-sm text-orange-600">Take the main quiz first</p>
                    </div>
                  </>
                )}
              </div>
              {!savedData.userFlavour && (
                <Button asChild size="sm" variant="outline">
                  <Link to="/quiz">Take Quiz</Link>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Ex History Status */}
          <Card className={(savedData.exes?.length || 0) > 0 ? "border-green-200 bg-green-50/50" : "border-orange-200 bg-orange-50/50"}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Ex History</h3>
                  <p className="text-sm text-muted-foreground">
                    {(savedData.exes?.length || 0)} partners logged
                  </p>
                </div>
              </div>
              {(savedData.exes?.length || 0) === 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-orange-600">Add some exes for better analysis</p>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/loop-tracker">Add Exes</Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-1 mt-2">
                  {savedData.exes?.slice(0, 5).map((ex, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {flavourData[ex.flavour]?.emoji} {flavourData[ex.flavour]?.name}
                    </Badge>
                  ))}
                  {(savedData.exes?.length || 0) > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{(savedData.exes?.length || 0) - 5} more
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Action Card */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Ready to Break Your Pattern?</CardTitle>
            <p className="text-muted-foreground">
              Our AI will analyze your relationship history and psychology to identify your dating loops
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {savedData.hasAnalysis && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Previous Analysis Found</span>
                </div>
                <p className="text-sm text-blue-700">
                  You've already completed a pattern analysis. You can view it or create a new one.
                </p>
                <div className="flex gap-2 mt-3">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      const saved = localStorage.getItem('love-by-flavour-pattern-analysis');
                      if (saved) {
                        const parsed = JSON.parse(saved);
                        setAnalysisData(parsed);
                        setCurrentStep('analysis');
                      }
                    }}
                  >
                    View Previous
                  </Button>
                </div>
              </div>
            )}

            {canStartAnalysis ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-medium text-green-800 mb-2">✅ Ready for Analysis</h3>
                  <p className="text-sm text-green-700">
                    You have enough data for a comprehensive pattern analysis. This will take about 5 minutes.
                  </p>
                </div>
                
                <Button 
                  onClick={() => setCurrentStep('questions')} 
                  className="w-full h-12 text-lg"
                >
                  Start Pattern Analysis ✂️
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-medium text-orange-800 mb-2">Missing Information</h3>
                  <p className="text-sm text-orange-700">
                    You need to complete the main quiz{!savedData.userFlavour && " and add at least one ex"} to unlock pattern analysis.
                  </p>
                </div>
                
                <div className="flex flex-col gap-3">
                  {!savedData.userFlavour && (
                    <Button asChild variant="outline">
                      <Link to="/quiz">Take Main Quiz</Link>
                    </Button>
                  )}
                  <Button asChild variant="outline">
                    <Link to="/loop-tracker">Add Ex Partners</Link>
                  </Button>
                </div>
              </div>
            )}

            {/* Badge Preview */}
            <div className="text-center pt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setCurrentStep('badges')}
                className="text-muted-foreground"
              >
                View Achievement Badges →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feature Preview */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="font-semibold mb-2">Pattern Detection</h3>
              <p className="text-sm text-muted-foreground">
                AI identifies your recurring relationship cycles and emotional loops
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="font-semibold mb-2">Psychology-Based</h3>
              <p className="text-sm text-muted-foreground">
                Grounded in attachment theory and Big Five personality research
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl mb-3">✂️</div>
              <h3 className="font-semibold mb-2">Actionable Steps</h3>
              <p className="text-sm text-muted-foreground">
                Concrete strategies to break unhealthy patterns and choose better partners
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}