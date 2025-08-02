import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ArrowLeft, Flame, AlertTriangle, Lightbulb, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

interface FlavorType {
  name: string;
  emoji: string;
  traits: string[];
}

interface CompatibilityResult {
  score: number;
  summary: string;
  chemistry: string;
  conflict: string;
  advice: string;
  patternBreak: string;
  riskFactors: string[];
  workability: string;
}

const Compatibility = () => {
  const [userFlavor, setUserFlavor] = useState<string>("");
  const [partnerFlavor, setPartnerFlavor] = useState<string>("");
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const flavors: FlavorType[] = [
    { name: "Vanilla", emoji: "🍦", traits: ["Reserved", "Loyal", "Predictable"] },
    { name: "Strawberry", emoji: "🍓", traits: ["Romantic", "Emotional", "Sensitive"] },
    { name: "Chocolate", emoji: "🍫", traits: ["Intense", "Passionate", "Complex"] },
    { name: "Mango", emoji: "🥭", traits: ["Passionate", "Spontaneous", "Intense"] },
    { name: "Coconut", emoji: "🥥", traits: ["Gentle", "Introspective", "Peaceful"] },
    { name: "Cherry", emoji: "🍒", traits: ["Flirtatious", "Dramatic", "Attention-seeking"] },
    { name: "Mint", emoji: "🍃", traits: ["Balanced", "Logical", "Strategic"] },
    { name: "Blueberry", emoji: "🫐", traits: ["Artistic", "Quiet", "Deep"] },
    { name: "Pineapple", emoji: "🍍", traits: ["Chaotic", "Fun", "Adventurous"] },
    { name: "Banana", emoji: "🍌", traits: ["Nurturing", "Stable", "Selfless"] }
  ];

  const compatibilityMatrix: Record<string, Record<string, CompatibilityResult>> = {
    Vanilla: {
      Vanilla: {
        score: 75,
        summary: "Stable and predictable, but may lack excitement",
        chemistry: "Comfortable and secure, but low passion",
        conflict: "Both avoid confrontation, issues may go unresolved",
        advice: "Inject spontaneity and open communication about needs",
        patternBreak: "Try expressing desires more openly, even if it feels uncomfortable",
        riskFactors: ["Emotional stagnation", "Boredom", "Lack of growth"],
        workability: "High long-term potential with effort to maintain spark"
      },
      Strawberry: {
        score: 85,
        summary: "Vanilla provides security Strawberry craves",
        chemistry: "Deep emotional connection, gentle passion",
        conflict: "Strawberry may want more emotional intensity than Vanilla gives",
        advice: "Vanilla should practice emotional expression, Strawberry should appreciate stability",
        patternBreak: "Vanilla: don't withdraw when emotions get intense. Strawberry: communicate needs clearly",
        riskFactors: ["Emotional imbalance", "Strawberry feeling unseen"],
        workability: "Excellent match with mutual understanding"
      },
      Chocolate: {
        score: 45,
        summary: "Opposite energies that initially attract but clash long-term",
        chemistry: "Initial fascination, but overwhelming for Vanilla",
        conflict: "Chocolate pushes intensity, Vanilla withdraws to safety",
        advice: "Meet in the middle: Chocolate slow down, Vanilla step up",
        patternBreak: "Vanilla: don't shut down when things get passionate. Chocolate: respect boundaries",
        riskFactors: ["Emotional overwhelm", "Communication breakdown", "Power imbalance"],
        workability: "Requires significant compromise from both sides"
      },
      Pineapple: {
        score: 35,
        summary: "Pineapple's chaos disrupts Vanilla's need for stability",
        chemistry: "Brief excitement followed by stress for Vanilla",
        conflict: "Pineapple finds Vanilla boring, Vanilla finds Pineapple exhausting",
        advice: "Only works if both are willing to dramatically change approach",
        patternBreak: "Vanilla: embrace some uncertainty. Pineapple: value consistency sometimes",
        riskFactors: ["Constant stress", "Incompatible life rhythms", "Resentment"],
        workability: "Very difficult without major adjustments"
      },
      Banana: {
        score: 90,
        summary: "Perfect harmony of stability and nurturing",
        chemistry: "Gentle, caring, and deeply satisfying",
        conflict: "Both may avoid difficult conversations",
        advice: "Work on addressing problems directly instead of smoothing over",
        patternBreak: "Don't become complacent - keep growing together",
        riskFactors: ["Avoiding growth", "Taking each other for granted"],
        workability: "Excellent foundation for lasting love"
      },
      Mango: {
        score: 40,
        summary: "Mango's independence conflicts with Vanilla's need for closeness",
        chemistry: "Mango seems exciting but emotionally unavailable",
        conflict: "Vanilla wants commitment, Mango wants freedom",
        advice: "Unlikely to work without Mango choosing commitment",
        patternBreak: "Vanilla: don't try to 'fix' or convince them. Mango: be honest about limitations",
        riskFactors: ["Unmatched commitment levels", "Emotional distance", "One-sided effort"],
        workability: "Low compatibility for serious relationships"
      }
    },
    Strawberry: {
      Strawberry: {
        score: 70,
        summary: "Beautiful emotional connection but can amplify insecurities",
        chemistry: "Intense romantic passion and understanding",
        conflict: "Both sensitive, small issues become big emotional events",
        advice: "Learn to self-soothe and communicate without blame",
        patternBreak: "Take breaks to process emotions before discussing conflicts",
        riskFactors: ["Emotional overwhelm", "Codependency", "Drama cycles"],
        workability: "Good with emotional intelligence work"
      },
      Chocolate: {
        score: 55,
        summary: "Passionate but volatile - can be destructive",
        chemistry: "Explosive passion and deep emotional connection",
        conflict: "Both emotionally intense, conflicts escalate quickly",
        advice: "Learn emotional regulation before attempting relationship",
        patternBreak: "Get individual therapy. Don't rely on each other for emotional stability",
        riskFactors: ["Emotional volatility", "Toxic patterns", "Burnout"],
        workability: "Possible but requires significant personal growth"
      },
      Pineapple: {
        score: 25,
        summary: "Strawberry gets hurt by Pineapple's inconsistency",
        chemistry: "Initial fun turns into emotional chaos for Strawberry",
        conflict: "Strawberry needs emotional security, Pineapple avoids it",
        advice: "Probably best to avoid this pairing",
        patternBreak: "Strawberry: don't try to change them. Pineapple: be honest about commitment ability",
        riskFactors: ["Emotional damage", "Attachment trauma", "Self-worth issues"],
        workability: "Very low - likely to cause pain"
      },
      Banana: {
        score: 95,
        summary: "Banana provides perfect emotional support for Strawberry",
        chemistry: "Tender, nurturing love with passion",
        conflict: "Strawberry may test Banana's patience occasionally",
        advice: "Strawberry should appreciate Banana's consistency",
        patternBreak: "Don't take Banana's stability for granted - show appreciation",
        riskFactors: ["Strawberry becoming demanding", "Banana burnout"],
        workability: "Excellent match for long-term happiness"
      },
      Mango: {
        score: 30,
        summary: "Mango's emotional distance triggers Strawberry's insecurities",
        chemistry: "Strawberry infatuated, Mango pulls away",
        conflict: "Strawberry pursues, Mango distances",
        advice: "Classic anxious-avoidant trap - avoid if possible",
        patternBreak: "Strawberry: don't chase unavailable people. Mango: work on emotional availability first",
        riskFactors: ["Attachment trauma", "Self-esteem damage", "Obsessive patterns"],
        workability: "Very low - feeds unhealthy patterns"
      }
    },
    Chocolate: {
      Pineapple: {
        score: 60,
        summary: "Wild passion but can burn out quickly",
        chemistry: "Explosive sexual and emotional intensity",
        conflict: "Both impulsive, decisions made in emotional states",
        advice: "Amazing short-term, but build stability for long-term",
        patternBreak: "Learn to make decisions when calm, not just when passionate",
        riskFactors: ["Impulsive decisions", "Dramatic breakups", "Instability"],
        workability: "Great chemistry but needs work for stability"
      },
      Banana: {
        score: 65,
        summary: "Banana can ground Chocolate's intensity",
        chemistry: "Chocolate brings passion, Banana brings peace",
        conflict: "Chocolate may feel constrained, Banana may feel overwhelmed",
        advice: "Chocolate should appreciate Banana's grounding influence",
        patternBreak: "Chocolate: don't mistake stability for boredom. Banana: don't become a caretaker",
        riskFactors: ["Chocolate feeling restricted", "Banana feeling drained"],
        workability: "Good if Chocolate commits to growth"
      },
      Mango: {
        score: 50,
        summary: "Intense attraction but both avoid real intimacy",
        chemistry: "Strong physical and mental connection",
        conflict: "Both struggle with emotional vulnerability",
        advice: "Work on emotional intimacy individually first",
        patternBreak: "Don't mistake intensity for intimacy - practice vulnerability",
        riskFactors: ["Surface-level connection", "Emotional walls", "Fear of commitment"],
        workability: "Possible but requires emotional growth"
      }
    },
    Pineapple: {
      Banana: {
        score: 45,
        summary: "Pineapple's chaos stresses Banana's need for harmony",
        chemistry: "Initially exciting for Banana, eventually exhausting",
        conflict: "Pineapple finds Banana restricting, Banana finds Pineapple draining",
        advice: "Fundamental incompatibility in life approach",
        patternBreak: "Pineapple: consider if you want stability. Banana: don't try to 'fix' them",
        riskFactors: ["Exhaustion", "Resentment", "Incompatible values"],
        workability: "Low - very different needs"
      },
      Mango: {
        score: 70,
        summary: "Both value freedom but may lack emotional depth",
        chemistry: "Fun, adventurous, sexually compatible",
        conflict: "Neither wants to deal with serious emotional issues",
        advice: "Great for casual dating, challenging for deep commitment",
        patternBreak: "If you want something serious, learn emotional intimacy first",
        riskFactors: ["Shallow connection", "Avoidance of problems", "Lack of growth"],
        workability: "Good for non-traditional relationships"
      }
    },
    Banana: {
      Mango: {
        score: 40,
        summary: "Banana gives too much, Mango takes without reciprocating",
        chemistry: "Banana attracted to Mango's confidence, one-sided nurturing",
        conflict: "Banana needs appreciation, Mango struggles with emotional reciprocity",
        advice: "Banana should set boundaries, Mango should practice gratitude",
        patternBreak: "Banana: don't over-give to unavailable people. Mango: practice emotional generosity",
        riskFactors: ["One-sided relationship", "Banana burnout", "Resentment"],
        workability: "Low unless Mango commits to emotional growth"
      }
    }
  };

  const handleCalculateCompatibility = () => {
    if (!userFlavor || !partnerFlavor) return;
    
    const compatibility = compatibilityMatrix[userFlavor]?.[partnerFlavor] || 
                         compatibilityMatrix[partnerFlavor]?.[userFlavor];
    
    if (compatibility) {
      setResult(compatibility);
    }
  };

  const resetForm = () => {
    setUserFlavor("");
    setPartnerFlavor("");
    setResult(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreDescription = (score: number) => {
    if (score >= 80) return "Excellent Match";
    if (score >= 60) return "Good Potential";
    if (score >= 40) return "Challenging";
    return "High Risk";
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <Heart className="text-primary h-6 w-6" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Love by Flavour
            </span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Compatibility
              </span>{" "}
              Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the dynamics between any two flavour types. Get insights on chemistry, 
              challenges, and how to make it work.
            </p>
          </div>

          {!result ? (
            /* Selection Form */
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Select Your Flavours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Your Flavour
                    </label>
                    <Select value={userFlavor} onValueChange={setUserFlavor}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your flavour..." />
                      </SelectTrigger>
                      <SelectContent>
                        {flavors.map((flavor) => (
                          <SelectItem key={flavor.name} value={flavor.name}>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{flavor.emoji}</span>
                              <span>{flavor.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      Their Flavour
                    </label>
                    <Select value={partnerFlavor} onValueChange={setPartnerFlavor}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose their flavour..." />
                      </SelectTrigger>
                      <SelectContent>
                        {flavors.map((flavor) => (
                          <SelectItem key={flavor.name} value={flavor.name}>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{flavor.emoji}</span>
                              <span>{flavor.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleCalculateCompatibility}
                  disabled={!userFlavor || !partnerFlavor}
                  className="w-full"
                  size="lg"
                >
                  Calculate Compatibility
                  <Heart className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Results */
            <div className="space-y-6">
              {/* Score Card */}
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="text-4xl">
                      {flavors.find(f => f.name === userFlavor)?.emoji}
                    </div>
                    <Heart className="h-8 w-8 text-primary" />
                    <div className="text-4xl">
                      {flavors.find(f => f.name === partnerFlavor)?.emoji}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    {userFlavor} + {partnerFlavor}
                  </h2>
                  <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.score)}`}>
                    {result.score}%
                  </div>
                  <p className={`text-lg font-medium ${getScoreColor(result.score)}`}>
                    {getScoreDescription(result.score)}
                  </p>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Flame className="h-5 w-5 text-primary" />
                    Relationship Summary
                  </h3>
                  <p className="text-lg">{result.summary}</p>
                </CardContent>
              </Card>

              {/* Chemistry & Conflict */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-3 text-pink-500">
                      💕 Chemistry
                    </h3>
                    <p>{result.chemistry}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-3 text-orange-500">
                      ⚡ Conflict Style
                    </h3>
                    <p>{result.conflict}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Risk Factors */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    Risk Factors
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {result.riskFactors.map((risk, index) => (
                      <li key={index} className="text-muted-foreground">{risk}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Advice */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-500" />
                    How to Make It Work
                  </h3>
                  <p className="mb-4">{result.advice}</p>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Pattern Breaking Tip:</h4>
                    <p className="text-sm">{result.patternBreak}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Workability */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-3">
                    🎯 Bottom Line
                  </h3>
                  <p className="text-lg">{result.workability}</p>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetForm} variant="outline" size="lg">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Another Combo
                </Button>
                <Button asChild variant="default" size="lg">
                  <Link to="/quiz">
                    Discover Your Flavour
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Compatibility;