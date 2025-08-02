import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RefreshCw, Download, Share2, Target, Lightbulb, TrendingUp, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnalysisData {
  userFlavour: string;
  exes: Array<{ flavour: string; outcome: string; duration: string }>;
  reflections: {
    whatYouMiss: string;
    whatEndsIt: string;
  };
}

interface PatternResult {
  loopName: string;
  loopEmoji: string;
  description: string;
  whatsKeepingYouStuck: string;
  howToBreakIt: string[];
  flavoursToExplore: string[];
  warningSignals: string[];
  strengths: string[];
}

const flavourData: Record<string, { name: string; emoji: string; traits: string[] }> = {
  strawberry: { name: "Strawberry", emoji: "🍓", traits: ["emotional", "expressive", "social"] },
  vanilla: { name: "Vanilla", emoji: "🍦", traits: ["stable", "reliable", "calm"] },
  chocolate: { name: "Chocolate", emoji: "🍫", traits: ["intense", "moody", "creative"] },
  mango: { name: "Mango", emoji: "🥭", traits: ["confident", "adventurous", "energetic"] },
  coconut: { name: "Coconut", emoji: "🥥", traits: ["independent", "intellectual", "distant"] },
  cherry: { name: "Cherry", emoji: "🍒", traits: ["dramatic", "passionate", "attention-seeking"] },
  mint: { name: "Mint", emoji: "🍃", traits: ["balanced", "adaptable", "logical"] },
  blueberry: { name: "Blueberry", emoji: "🫐", traits: ["creative", "sensitive", "gentle"] }
};

const generatePatternAnalysis = (data: AnalysisData): PatternResult => {
  const userTraits = flavourData[data.userFlavour]?.traits || [];
  const exFlavours = data.exes.map(ex => ex.flavour);
  const dominantExTypes = [...new Set(exFlavours)];
  
  // Analyze patterns based on psychology
  const isChaosSeeking = dominantExTypes.some(f => ['chocolate', 'cherry', 'mango'].includes(f));
  const isStabilityAvoiding = !dominantExTypes.some(f => ['vanilla', 'mint'].includes(f));
  const hasIntensePattern = dominantExTypes.includes('chocolate') || dominantExTypes.includes('cherry');
  const isAttachmentAnxious = data.reflections.whatYouMiss.toLowerCase().includes('excitement') || 
                              data.reflections.whatYouMiss.toLowerCase().includes('chase');

  let result: PatternResult;

  if (data.userFlavour === 'vanilla' && isChaosSeeking) {
    result = {
      loopName: "The Vanilla Burnout Cycle",
      loopEmoji: "🔥",
      description: "You're drawn to exciting, unpredictable partners but feel overwhelmed by their intensity. This creates a cycle where you seek stability but are bored by it, then chase chaos but can't handle it.",
      whatsKeepingYouStuck: "Fear of boredom drives you toward unstable partners, but your need for security makes you retreat when things get too intense. You're caught between safety and excitement.",
      howToBreakIt: [
        "Practice staying present during calm moments instead of seeking drama",
        "Communicate your need for both stability AND adventure to partners",
        "Set boundaries around emotional intensity while staying open to growth",
        "Focus on partners who can be both reliable and spontaneous"
      ],
      flavoursToExplore: ["Mint (balanced adventurer)", "Blueberry (gentle creativity)", "Peach (warm stability)"],
      warningSignals: ["Feeling 'bored' after 3 months", "Attraction to unavailable people", "Staying in chaos longer than feels good"],
      strengths: ["You provide grounding for others", "You recognize patterns", "You value genuine connection"]
    };
  } else if (data.userFlavour === 'strawberry' && dominantExTypes.includes('coconut')) {
    result = {
      loopName: "The Anxious-Avoidant Trap",
      loopEmoji: "🌪️",
      description: "You're caught in the classic pursuit-distance cycle. Your emotional expressiveness triggers their withdrawal, which makes you chase harder, creating more distance.",
      whatsKeepingYouStuck: "You mistake emotional unavailability for 'mystery' and challenge. The harder they are to reach, the more valuable they seem to your attachment system.",
      howToBreakIt: [
        "Recognize unavailability as incompatibility, not a challenge to overcome",
        "Practice self-soothing when someone pulls away instead of pursuing",
        "Date people who are excited to hear from you, not annoyed",
        "Work on feeling secure within yourself before seeking external validation"
      ],
      flavoursToExplore: ["Vanilla (steady warmth)", "Mint (emotionally available)", "Mango (confident but expressive)"],
      warningSignals: ["Mixed signals feel 'exciting'", "You do most of the emotional work", "They seem 'too good to be true' when distant"],
      strengths: ["You're emotionally intelligent", "You're not afraid of feelings", "You bring warmth to others"]
    };
  } else if (hasIntensePattern) {
    result = {
      loopName: "The Drama Addiction Loop",
      loopEmoji: "🎭",
      description: "You're addicted to emotional intensity and mistake chaos for passion. Calm relationships feel 'boring' because your nervous system is wired for drama.",
      whatsKeepingYouStuck: "High-intensity relationships flood your system with stress hormones that feel like excitement. Healthy relationships feel 'flat' by comparison.",
      howToBreakIt: [
        "Reframe 'boring' as 'peaceful' and practice appreciating stability",
        "Notice when you create drama to feel something",
        "Find healthy ways to experience intensity (sports, creative projects)",
        "Give calm partners more time before deciding they're 'not right'"
      ],
      flavoursToExplore: ["Vanilla (peaceful strength)", "Mint (calm but engaging)", "Blueberry (deep but gentle)"],
      warningSignals: ["Constant ups and downs feel 'normal'", "You miss red flags during intense moments", "Calm feels like rejection"],
      strengths: ["You feel deeply", "You're passionate about life", "You're not afraid of big emotions"]
    };
  } else {
    result = {
      loopName: "The Comfort Zone Spiral",
      loopEmoji: "🔄",
      description: "You tend to date the same 'type' because it feels familiar, even when it doesn't work. You're more afraid of the unknown than of repeating patterns.",
      whatsKeepingYouStuck: "Familiarity feels like compatibility, but you're confusing comfort with connection. You're dating your past instead of your future.",
      howToBreakIt: [
        "Identify what specific traits you keep choosing and why",
        "Try dating someone completely different for at least 3 dates",
        "Focus on values and life goals, not just personality chemistry",
        "Ask friends to introduce you to people outside your usual type"
      ],
      flavoursToExplore: ["Try any flavour you've never dated", "Focus on emotional maturity over exciting traits"],
      warningSignals: ["They remind you of an ex (good or bad)", "You can predict their behavior perfectly", "Friends say 'here we go again'"],
      strengths: ["You know what you like", "You're loyal and consistent", "You're good at deep relationships"]
    };
  }

  return result;
};

interface PatternAnalysisProps {
  analysisData: AnalysisData;
  onReset: () => void;
}

export default function PatternAnalysis({ analysisData, onReset }: PatternAnalysisProps) {
  const [analysis, setAnalysis] = useState<PatternResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate AI analysis loading
    const timer = setTimeout(() => {
      const result = generatePatternAnalysis(analysisData);
      setAnalysis(result);
      setIsGenerating(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [analysisData]);

  const shareReport = () => {
    if (navigator.share && analysis) {
      navigator.share({
        title: 'My Dating Pattern Report',
        text: `I just broke down my dating pattern: "${analysis.loopName}" 🔄 Ready to try healthier relationships!`,
        url: window.location.href
      });
    } else {
      toast({
        title: "Report ready to share!",
        description: "Screenshot this analysis to share your breakthrough moment.",
      });
    }
  };

  const downloadReport = () => {
    toast({
      title: "Feature coming soon!",
      description: "PDF download will be available in the next update.",
    });
  };

  if (isGenerating) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="py-12 text-center">
          <div className="space-y-4">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-primary" />
            <h3 className="text-xl font-semibold">Analyzing Your Pattern...</h3>
            <p className="text-muted-foreground">
              Our AI is studying your relationship history and psychology to find your loops
            </p>
            <div className="flex justify-center gap-2 mt-6">
              {['🧠', '💭', '🔍', '💡'].map((emoji, i) => (
                <span 
                  key={i} 
                  className="text-2xl animate-pulse" 
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Main Pattern Card */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-500/10 to-orange-500/10 text-center">
          <div className="text-4xl mb-2">{analysis.loopEmoji}</div>
          <CardTitle className="text-2xl text-red-700 dark:text-red-400">
            Your Dating Loop: {analysis.loopName}
          </CardTitle>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {analysis.description}
          </p>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* What's Keeping You Stuck */}
          <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-5">
            <h3 className="font-semibold text-red-700 dark:text-red-400 flex items-center gap-2 mb-3">
              <Target className="w-5 h-5" />
              What's Keeping You Stuck
            </h3>
            <p className="text-red-800 dark:text-red-300">{analysis.whatsKeepingYouStuck}</p>
          </div>

          <Separator />

          {/* How to Break It */}
          <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-5">
            <h3 className="font-semibold text-green-700 dark:text-green-400 flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5" />
              How to Break It
            </h3>
            <ul className="space-y-3">
              {analysis.howToBreakIt.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-green-800 dark:text-green-200">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Bottom Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Flavours to Explore */}
            <div>
              <h3 className="font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5" />
                Flavours to Explore Next
              </h3>
              <div className="space-y-2">
                {analysis.flavoursToExplore.map((flavour, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">
                    {flavour}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Your Strengths */}
            <div>
              <h3 className="font-semibold text-purple-700 dark:text-purple-400 flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5" />
                Your Strengths
              </h3>
              <ul className="space-y-1">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-purple-800 dark:text-purple-200 flex items-center gap-2">
                    <span className="text-purple-500">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Warning Signals */}
          <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4">
            <h3 className="font-semibold text-amber-700 dark:text-amber-400 mb-3">
              ⚠️ Watch Out For These Warning Signals
            </h3>
            <div className="flex flex-wrap gap-2">
              {analysis.warningSignals.map((signal, index) => (
                <Badge key={index} variant="outline" className="border-amber-300 text-amber-700 dark:text-amber-300">
                  {signal}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={shareReport} variant="outline" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Report
            </Button>
            <Button onClick={downloadReport} variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button onClick={onReset} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Analyze Again
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Encouragement Card */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="text-center py-8">
          <h3 className="text-xl font-semibold mb-2">You've Taken the Hardest Step 🌟</h3>
          <p className="text-muted-foreground mb-4">
            Recognizing your patterns is the beginning of changing them. You're already on your way to healthier relationships.
          </p>
          <p className="text-sm font-medium text-primary">
            "The definition of insanity is doing the same thing over and over and expecting different results." — Einstein
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
