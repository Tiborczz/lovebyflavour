import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Share2, RefreshCw, Sun, Cloud, Snowflake, CloudRain } from "lucide-react";
import { useNavigate } from "react-router-dom";

const flavours = [
  { id: "strawberry", name: "Strawberry", emoji: "🍓", traits: ["expressive", "social", "emotional", "clingy"] },
  { id: "vanilla", name: "Vanilla", emoji: "🍦", traits: ["stable", "reliable", "introverted", "practical"] },
  { id: "chocolate", name: "Chocolate", emoji: "🍫", traits: ["intense", "moody", "creative", "unpredictable"] },
  { id: "mango", name: "Mango", emoji: "🥭", traits: ["confident", "active", "adventurous", "extroverted"] },
  { id: "coconut", name: "Coconut", emoji: "🥥", traits: ["independent", "intellectual", "distant", "mysterious"] },
  { id: "cherry", name: "Cherry", emoji: "🍒", traits: ["dramatic", "passionate", "social", "attention-seeking"] },
  { id: "mint", name: "Mint", emoji: "🍃", traits: ["calm", "logical", "balanced", "adaptable"] },
  { id: "blueberry", name: "Blueberry", emoji: "🫐", traits: ["creative", "sensitive", "introspective", "gentle"] }
];

interface ForecastResult {
  compatibility: number;
  weather: "sunny" | "cloudy" | "stormy" | "snowy";
  tone: string;
  insight: string;
  warning?: string;
  strengths: string[];
  challenges: string[];
}

const getCompatibilityLogic = (user: string, target: string): ForecastResult => {
  const compatibilityMatrix: Record<string, Record<string, ForecastResult>> = {
    strawberry: {
      strawberry: {
        compatibility: 75,
        weather: "sunny",
        tone: "Exciting but overwhelming",
        insight: "Two Strawberries create fireworks! You'll bond over shared energy and emotional expression, but may struggle with emotional regulation when both are triggered.",
        strengths: ["Shared enthusiasm", "Emotional connection", "Fun adventures"],
        challenges: ["Drama amplification", "Lack of stability", "Competition for attention"]
      },
      vanilla: {
        compatibility: 82,
        weather: "sunny",
        tone: "Balanced and nurturing",
        insight: "Strawberry brings excitement to Vanilla's stability, while Vanilla grounds Strawberry's chaos. This is often a healing combination with great long-term potential.",
        strengths: ["Complementary traits", "Emotional growth", "Stable foundation"],
        challenges: ["Different energy levels", "Vanilla may feel overwhelmed", "Strawberry may feel restricted"]
      },
      chocolate: {
        compatibility: 65,
        weather: "stormy",
        tone: "Intense and volatile",
        insight: "Passion meets chaos! Both are emotionally intense but in different ways. Expect passionate highs followed by dramatic lows. Communication is key.",
        warning: "High potential for toxic patterns",
        strengths: ["Intense passion", "Creative energy", "Never boring"],
        challenges: ["Emotional volatility", "Miscommunication", "Drama cycles"]
      },
      mango: {
        compatibility: 78,
        weather: "sunny",
        tone: "Energetic and fun",
        insight: "A social power couple! Both love excitement and new experiences. Mango's confidence helps Strawberry feel secure, though both may avoid deeper emotional work.",
        strengths: ["Shared social energy", "Adventure partnership", "Mutual confidence boost"],
        challenges: ["Avoiding serious talks", "Superficial connection", "Competition dynamics"]
      },
      coconut: {
        compatibility: 45,
        weather: "snowy",
        tone: "Frustrated and distant",
        insight: "Strawberry's need for emotional expression clashes with Coconut's desire for independence. This often leads to an anxious-avoidant cycle.",
        warning: "Classic anxious-avoidant trap",
        strengths: ["Learning opportunity", "Growth potential", "Intellectual balance"],
        challenges: ["Emotional mismatch", "Communication styles", "Different needs"]
      },
      cherry: {
        compatibility: 70,
        weather: "stormy",
        tone: "Dramatic and attention-focused",
        insight: "Drama meets drama! You'll understand each other's need for attention and emotional expression, but may compete rather than complement.",
        strengths: ["Emotional understanding", "Shared expressiveness", "Never boring"],
        challenges: ["Drama competition", "Lack of grounding", "Exhausting dynamics"]
      },
      mint: {
        compatibility: 85,
        weather: "cloudy",
        tone: "Calming and balanced",
        insight: "Mint's calm energy soothes Strawberry's emotional storms. This is often a very healing pairing where both learn emotional regulation.",
        strengths: ["Emotional balance", "Mutual growth", "Calming influence"],
        challenges: ["Different energy levels", "Mint may feel drained", "Strawberry may feel judged"]
      },
      blueberry: {
        compatibility: 72,
        weather: "cloudy",
        tone: "Gentle and emotional",
        insight: "Two sensitive souls who understand emotion but express it differently. Blueberry's gentleness can calm Strawberry's intensity.",
        strengths: ["Emotional understanding", "Gentle connection", "Creative partnership"],
        challenges: ["Both may be overwhelmed", "Lack of grounding", "Sensitivity overload"]
      }
    },
    vanilla: {
      strawberry: {
        compatibility: 82,
        weather: "sunny",
        tone: "Balanced and nurturing",
        insight: "Vanilla provides the stability Strawberry needs, while Strawberry brings excitement to Vanilla's routine. A classic opposites-attract success story.",
        strengths: ["Complementary balance", "Emotional growth", "Stable foundation"],
        challenges: ["Energy level differences", "Vanilla may feel overwhelmed", "Different social needs"]
      },
      vanilla: {
        compatibility: 88,
        weather: "sunny",
        tone: "Steady and reliable",
        insight: "Two Vanillas create a peaceful, stable relationship built on shared values and reliability. May lack excitement but offers security and growth.",
        strengths: ["Shared stability", "Reliable partnership", "Peaceful dynamics"],
        challenges: ["Potential boredom", "Lack of spontaneity", "Emotional avoidance"]
      },
      chocolate: {
        compatibility: 55,
        weather: "stormy",
        tone: "Confusing and unpredictable",
        insight: "Vanilla's need for stability clashes with Chocolate's emotional volatility. Vanilla may feel constantly off-balance while Chocolate feels restricted.",
        strengths: ["Learning opportunity", "Growth potential", "Different perspectives"],
        challenges: ["Emotional mismatch", "Unpredictability stress", "Communication styles"]
      },
      mango: {
        compatibility: 75,
        weather: "cloudy",
        tone: "Complementary but challenging",
        insight: "Mango's adventurous spirit can pull Vanilla out of their comfort zone, while Vanilla grounds Mango's impulsivity. Requires compromise.",
        strengths: ["Complementary growth", "Adventure balance", "Mutual learning"],
        challenges: ["Different energy levels", "Social needs mismatch", "Comfort zone conflicts"]
      },
      coconut: {
        compatibility: 80,
        weather: "cloudy",
        tone: "Respectful and independent",
        insight: "Both value independence and reliability. You'll respect each other's space and build a solid, if sometimes distant, partnership.",
        strengths: ["Mutual respect", "Independence", "Intellectual connection"],
        challenges: ["Emotional distance", "Lack of passion", "Communication barriers"]
      },
      cherry: {
        compatibility: 50,
        weather: "stormy",
        tone: "Exhausting and dramatic",
        insight: "Cherry's need for drama and attention conflicts with Vanilla's desire for peace. Vanilla may feel constantly drained by Cherry's intensity.",
        warning: "High stress potential for Vanilla",
        strengths: ["Vanilla learns expressiveness", "Cherry learns stability", "Growth opportunity"],
        challenges: ["Energy drain", "Different values", "Drama vs peace"]
      },
      mint: {
        compatibility: 90,
        weather: "sunny",
        tone: "Harmonious and balanced",
        insight: "A perfect match of stability and adaptability. Both value peace and growth, creating a harmonious partnership built on mutual respect.",
        strengths: ["Perfect balance", "Mutual respect", "Peaceful growth"],
        challenges: ["Potential predictability", "Avoiding conflict", "Emotional depth"]
      },
      blueberry: {
        compatibility: 85,
        weather: "cloudy",
        tone: "Gentle and nurturing",
        insight: "Vanilla's stability provides security for Blueberry's sensitivity, while Blueberry adds emotional depth to Vanilla's life.",
        strengths: ["Emotional safety", "Gentle growth", "Nurturing partnership"],
        challenges: ["Different energy levels", "Emotional expression", "Social needs"]
      }
    }
    // Add more flavour combinations as needed
  };

  // Default compatibility logic for missing combinations
  const defaultResult: ForecastResult = {
    compatibility: 60,
    weather: "cloudy",
    tone: "Uncertain but promising",
    insight: "Every flavour combination has potential! Your success depends on communication, mutual respect, and willingness to grow together.",
    strengths: ["Unique combination", "Learning opportunity", "Fresh perspective"],
    challenges: ["Unknown dynamics", "Different approaches", "Requires patience"]
  };

  return compatibilityMatrix[user]?.[target] || defaultResult;
};

const getWeatherIcon = (weather: string) => {
  switch (weather) {
    case "sunny": return <Sun className="w-8 h-8 text-yellow-500" />;
    case "cloudy": return <Cloud className="w-8 h-8 text-gray-500" />;
    case "stormy": return <CloudRain className="w-8 h-8 text-blue-600" />;
    case "snowy": return <Snowflake className="w-8 h-8 text-blue-300" />;
    default: return <Cloud className="w-8 h-8 text-gray-500" />;
  }
};

const getCompatibilityColor = (score: number) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-yellow-600";
  return "text-red-600";
};

export default function Forecast() {
  const [userFlavour, setUserFlavour] = useState<string>("");
  const [targetFlavour, setTargetFlavour] = useState<string>("");
  const [forecast, setForecast] = useState<ForecastResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-fill user flavour if available from previous quiz
    const savedResult = localStorage.getItem('love-by-flavour-result');
    if (savedResult) {
      try {
        const parsed = JSON.parse(savedResult);
        if (parsed.flavour) {
          setUserFlavour(parsed.flavour);
        }
      } catch (e) {
        console.log('Could not parse saved result');
      }
    }
  }, []);

  const generateForecast = () => {
    if (!userFlavour || !targetFlavour) {
      toast({
        title: "Please select both flavours",
        description: "Choose your flavour and the one you're curious about.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      const result = getCompatibilityLogic(userFlavour, targetFlavour);
      setForecast(result);
      setIsGenerating(false);
    }, 1500);
  };

  const shareForecast = () => {
    const userFlavourData = flavours.find(f => f.id === userFlavour);
    const targetFlavourData = flavours.find(f => f.id === targetFlavour);
    
    if (navigator.share && forecast) {
      navigator.share({
        title: 'My Flavour Forecast',
        text: `${userFlavourData?.emoji} + ${targetFlavourData?.emoji} = ${forecast.compatibility}% compatibility! ${forecast.insight}`,
        url: window.location.href
      });
    } else {
      toast({
        title: "Forecast ready to share!",
        description: "Screenshot this result to share your flavour forecast.",
      });
    }
  };

  const resetForecast = () => {
    setForecast(null);
    setTargetFlavour("");
  };

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
            Flavour Forecast ⛅
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Predict how your relationship might unfold based on flavour compatibility. 
            <br />
            <em className="text-sm">Some flavours mix. Some curdle.</em>
          </p>
        </div>

        {!forecast ? (
          /* Selection Interface */
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-xl">Choose Your Flavour Match</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* User Flavour Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Your Flavour:</label>
                <Select value={userFlavour} onValueChange={setUserFlavour}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your flavour..." />
                  </SelectTrigger>
                  <SelectContent>
                    {flavours.map((flavour) => (
                      <SelectItem key={flavour.id} value={flavour.id}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{flavour.emoji}</span>
                          <span>{flavour.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Target Flavour Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Flavour You're Curious About:</label>
                <Select value={targetFlavour} onValueChange={setTargetFlavour}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target flavour..." />
                  </SelectTrigger>
                  <SelectContent>
                    {flavours.map((flavour) => (
                      <SelectItem key={flavour.id} value={flavour.id}>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{flavour.emoji}</span>
                          <span>{flavour.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={generateForecast} 
                disabled={isGenerating || !userFlavour || !targetFlavour}
                className="w-full h-12 text-lg"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Forecasting Your Love...
                  </div>
                ) : (
                  "Forecast My Love 🔮"
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Forecast Results */
          <div className="space-y-6">
            {/* Compatibility Card */}
            <Card className="max-w-3xl mx-auto">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-4xl">
                    {flavours.find(f => f.id === userFlavour)?.emoji}
                  </div>
                  <div className="text-2xl">+</div>
                  <div className="text-4xl">
                    {flavours.find(f => f.id === targetFlavour)?.emoji}
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">
                  {flavours.find(f => f.id === userFlavour)?.name} + {flavours.find(f => f.id === targetFlavour)?.name}
                </CardTitle>
                <div className="flex items-center justify-center gap-4">
                  {getWeatherIcon(forecast.weather)}
                  <span className={`text-3xl font-bold ${getCompatibilityColor(forecast.compatibility)}`}>
                    {forecast.compatibility}%
                  </span>
                </div>
                <Badge variant="secondary" className="mx-auto">
                  {forecast.tone}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Warning */}
                {forecast.warning && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-medium">⚠️ {forecast.warning}</p>
                  </div>
                )}

                {/* AI Insight */}
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    🧠 AI Insight
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">{forecast.insight}</p>
                </div>

                {/* Strengths & Challenges */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-green-700 flex items-center gap-2">
                      💚 Strengths
                    </h3>
                    <ul className="space-y-2">
                      {forecast.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-green-500 mt-1">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-orange-700 flex items-center gap-2">
                      ⚡ Challenges
                    </h3>
                    <ul className="space-y-2">
                      {forecast.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button onClick={shareForecast} variant="outline" className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share Forecast
                  </Button>
                  <Button onClick={resetForecast} variant="outline" className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </Button>
                  <Button onClick={() => navigate('/quiz')} className="flex-1">
                    Explore New Flavour Path
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quote Section */}
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-accent/20 to-secondary/20">
              <CardContent className="text-center py-8">
                <p className="text-lg font-medium mb-2">
                  "Forecast before you fall."
                </p>
                <p className="text-sm text-muted-foreground">
                  Ready to break old patterns and explore healthier connections?
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}