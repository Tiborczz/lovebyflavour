import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Heart, Calendar, TrendingUp, Download, Plus, Trash2, Brain } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ExAnalysisQuiz from "@/components/ExAnalysisQuiz";
import AIInsights from "@/components/AIInsights";
import { Link } from "react-router-dom";
import { SupabaseService } from "@/lib/supabaseService";
import { useAuth } from "@/contexts/AuthContext";
import RealTimeUpdates from "@/components/RealTimeUpdates";

interface Partner {
  id: string;
  nickname: string;
  flavour: string;
  duration: string;
  outcome: string;
  feelings: string[];
  attachmentMatch: string;
  notes?: string;
  timestamp: number;
}

interface FormData {
  nickname: string;
  flavour: string;
  duration: string;
  outcome: string;
  feelings: string[];
  attachmentMatch: string;
  notes: string;
}

export default function LoopTracker() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showExQuiz, setShowExQuiz] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    nickname: "",
    flavour: "",
    duration: "",
    outcome: "",
    feelings: [],
    attachmentMatch: "",
    notes: "",
  });
  const { toast } = useToast();
  const { user: authUser } = useAuth();

  useEffect(() => {
    loadExPartners();
  }, [authUser]);

  const loadExPartners = async () => {
    if (!authUser) return;
    
    setIsLoading(true);
    try {
      const exPartners = await SupabaseService.getExPartners();
      // Convert Supabase ex-partners to Partner format
      const convertedPartners = exPartners.map(ex => ({
        id: ex.id,
        nickname: ex.flavour, // Using flavour as nickname for now
        flavour: ex.flavour,
        duration: ex.duration,
        outcome: ex.outcome,
        feelings: [], // This field doesn't exist in Supabase schema yet
        attachmentMatch: "", // This field doesn't exist in Supabase schema yet
        notes: ex.lessons,
        timestamp: new Date(ex.created_at).getTime()
      }));
      setPartners(convertedPartners);
    } catch (error) {
      console.error('Error loading ex-partners:', error);
      // Fallback to localStorage for development
      const saved = localStorage.getItem("loveLoops");
      if (saved) {
        setPartners(JSON.parse(saved));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addPartner = async () => {
    if (!formData.nickname || !formData.flavour || !formData.duration || !formData.outcome) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!authUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save your data.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Add to Supabase
      const newExPartner = await SupabaseService.addExPartner({
        flavour: formData.flavour,
        duration: formData.duration,
        outcome: formData.outcome,
        lessons: formData.notes || `Relationship with ${formData.nickname}`
      });

      if (newExPartner) {
        // Convert to Partner format and add to local state
        const newPartner: Partner = {
          id: newExPartner.id,
          nickname: formData.nickname,
          flavour: formData.flavour,
          duration: formData.duration,
          outcome: formData.outcome,
          feelings: formData.feelings,
          attachmentMatch: formData.attachmentMatch,
          notes: formData.notes,
          timestamp: new Date(newExPartner.created_at).getTime(),
        };

        const updatedPartners = [...partners, newPartner];
        setPartners(updatedPartners);
        
        // Also save to localStorage as backup
        localStorage.setItem("loveLoops", JSON.stringify(updatedPartners));

        toast({
          title: "Partner added to your loop! 💫",
          description: "Your pattern analysis is getting more insightful.",
        });

        setFormData({
          nickname: "",
          flavour: "",
          duration: "",
          outcome: "",
          feelings: [],
          attachmentMatch: "",
          notes: "",
        });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error adding partner:', error);
      toast({
        title: "Error saving partner",
        description: "Please try again or check your connection.",
        variant: "destructive",
      });
    }
  };

  const handleExAnalysisComplete = (flavour: string, answers: any) => {
    setFormData(prev => ({ ...prev, flavour }));
    setShowExQuiz(false);
    setShowForm(true);
    
    toast({
      title: `Ex analyzed as ${flavour}! 🔍`,
      description: "Now add some details about the relationship.",
    });
  };

  const removePartner = async (id: string) => {
    try {
      // Remove from Supabase
      const success = await SupabaseService.deleteExPartner(id);
      
      if (success) {
        const updated = partners.filter(p => p.id !== id);
        setPartners(updated);
        localStorage.setItem("loveLoops", JSON.stringify(updated));
        toast({
          title: "Partner removed",
          description: "Your loop has been updated.",
        });
      }
    } catch (error) {
      console.error('Error removing partner:', error);
      toast({
        title: "Error removing partner",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportToPDF = () => {
    const exportData = {
      totalPartners: partners.length,
      patterns: partners.reduce((acc, p) => {
        acc[p.flavour] = (acc[p.flavour] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      timeline: partners.map(p => ({
        nickname: p.nickname,
        flavour: p.flavour,
        duration: p.duration,
        outcome: p.outcome,
        date: new Date(p.timestamp).toLocaleDateString(),
      })),
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-love-loops.json";
    link.click();

    toast({
      title: "Love loops exported! 📋",
      description: "Your dating patterns have been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-secondary/10">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Love by Flavour
            </span>
          </Link>
          <div className="flex gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link to="/quiz">Take Quiz</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/">Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🍧</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Flavour Loop Tracker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your dating patterns with AI-powered insights. Discover the loops that keep you cycling through the same flavours. 
            Self-awareness is the first step to breaking old patterns. 💫
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={() => setShowExQuiz(true)}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            <Brain className="w-4 h-4 mr-2" />
            Analyze an Ex
          </Button>
          
          <Button
            onClick={() => setShowForm(true)}
            variant="outline"
            size="lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Manual Entry
          </Button>
          
          {partners.length > 0 && (
            <Button
              onClick={exportToPDF}
              variant="outline"
              size="lg"
            >
              <Download className="w-4 h-4 mr-2" />
              Export My Loops
            </Button>
          )}
        </div>

      {/* AI Insights */}
      <div className="w-full max-w-4xl mx-auto">
        <AIInsights partners={partners} />
      </div>

      {/* Real-time Updates Component */}
      <div className="fixed bottom-4 right-4 z-40">
        <RealTimeUpdates 
          onExPartnerUpdate={() => loadExPartners()} 
          onAnalysisUpdate={() => {
            console.log('Analysis updated, refreshing insights...')
          }}
        />
      </div>

      {/* Pattern Analysis */}
      {partners.length >= 2 && (
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Pattern Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PatternAnalysis partners={partners} />
          </CardContent>
        </Card>
      )}

        {/* Timeline */}
        {partners.length > 0 && (
          <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Your Flavour Timeline 🍇
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {partners.map((partner, index) => (
                  <div key={partner.id} className="flex items-center justify-between p-4 bg-accent/20 rounded-lg border-l-4 border-l-primary">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{getFlavorEmoji(partner.flavour)}</span>
                      <div>
                        <h4 className="font-semibold">{partner.nickname}</h4>
                        <p className="text-sm text-muted-foreground">
                          {partner.flavour} • {partner.duration} • {partner.outcome}
                        </p>
                        {partner.feelings.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {partner.feelings.map((feeling, i) => (
                              <span key={i} className="text-sm">{feeling}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {partner.attachmentMatch || "Unknown"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePartner(partner.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {partners.length === 0 && (
          <Card className="w-full max-w-2xl mx-auto text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">🌸</div>
              <h3 className="text-xl font-semibold mb-2">Start Your Journey</h3>
              <p className="text-muted-foreground mb-6">
                Begin tracking your dating patterns by analyzing a past relationship.
                The more you add, the clearer your patterns become!
              </p>
              <Button onClick={() => setShowExQuiz(true)} size="lg">
                Analyze Your First Ex 🔍
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Ex Analysis Quiz Modal */}
      {showExQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-lg">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Analyze Your Ex</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowExQuiz(false)}>
                  ✕
                </Button>
              </div>
              <ExAnalysisQuiz onComplete={handleExAnalysisComplete} />
            </div>
          </div>
        </div>
      )}

      {/* Add Partner Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add to Your Loop</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nickname">Nickname or Initials *</Label>
                <Input
                  id="nickname"
                  value={formData.nickname}
                  onChange={(e) => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
                  placeholder="e.g., Alex, J.S., The Gym Guy"
                />
              </div>

              <div>
                <Label htmlFor="flavour">Their Flavour *</Label>
                <Select value={formData.flavour} onValueChange={(value) => setFormData(prev => ({ ...prev, flavour: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder={formData.flavour ? getFlavorDisplay(formData.flavour) : "Select their flavour type"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strawberry">🍓 Strawberry - Enthusiastic & Emotionally Intense</SelectItem>
                    <SelectItem value="vanilla">🍦 Vanilla - Stable & Traditional</SelectItem>
                    <SelectItem value="chocolate">🍫 Chocolate - Complex & Moody</SelectItem>
                    <SelectItem value="mango">🥭 Mango - Passionate & Spontaneous</SelectItem>
                    <SelectItem value="coconut">🥥 Coconut - Gentle & Introspective</SelectItem>
                    <SelectItem value="cherry">🍒 Cherry - Flirtatious & Attention-seeking</SelectItem>
                    <SelectItem value="mint">🍃 Mint - Balanced & Logical</SelectItem>
                    <SelectItem value="blueberry">🫐 Blueberry - Quiet & Artistic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration">Relationship Duration *</Label>
                <Select value={formData.duration} onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="How long did it last?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (under 3 months)</SelectItem>
                    <SelectItem value="medium">Medium (3-12 months)</SelectItem>
                    <SelectItem value="long">Long (1+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="outcome">How did it end? *</Label>
                <Select value={formData.outcome} onValueChange={(value) => setFormData(prev => ({ ...prev, outcome: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mutual">Mutual decision</SelectItem>
                    <SelectItem value="they-left">They ended it</SelectItem>
                    <SelectItem value="i-left">I ended it</SelectItem>
                    <SelectItem value="toxic">Toxic/dramatic</SelectItem>
                    <SelectItem value="boring">Just fizzled out</SelectItem>
                    <SelectItem value="complicated">It's complicated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>How did it make you feel? (Select all that apply)</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {["😍", "🥰", "😊", "😔", "😢", "😤", "🤔", "😵‍💫", "🥺", "🤗", "💔", "🙄"].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => {
                        const newFeelings = formData.feelings.includes(emoji)
                          ? formData.feelings.filter(f => f !== emoji)
                          : [...formData.feelings, emoji];
                        setFormData(prev => ({ ...prev, feelings: newFeelings }));
                      }}
                      className={`text-2xl p-2 rounded border-2 transition-all ${
                        formData.feelings.includes(emoji)
                          ? "border-primary bg-primary/10"
                          : "border-muted hover:border-primary/50"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="attachmentMatch">Attachment Style Compatibility</Label>
                <Select value={formData.attachmentMatch} onValueChange={(value) => setFormData(prev => ({ ...prev, attachmentMatch: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="How did you two attach?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="secure">Secure (healthy communication)</SelectItem>
                    <SelectItem value="anxious">Anxious (clingy, needed reassurance)</SelectItem>
                    <SelectItem value="avoidant">Avoidant (distant, hard to connect)</SelectItem>
                    <SelectItem value="chaotic">Chaotic (hot and cold, confusing)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="What patterns do you notice? Any red flags you ignored?"
                  rows={3}
                />
              </div>

              <div className="flex gap-4">
                <Button onClick={addPartner} className="flex-1">
                  Add to Loop
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Pattern Analysis Component
function PatternAnalysis({ partners }: { partners: Partner[] }) {
  const flavourCounts = partners.reduce((acc, p) => {
    acc[p.flavour] = (acc[p.flavour] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const outcomeCounts = partners.reduce((acc, p) => {
    acc[p.outcome] = (acc[p.outcome] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommonFlavour = Object.entries(flavourCounts).sort(([,a], [,b]) => b - a)[0];
  const mostCommonOutcome = Object.entries(outcomeCounts).sort(([,a], [,b]) => b - a)[0];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Flavour Preferences</h4>
          <div className="space-y-2">
            {Object.entries(flavourCounts)
              .sort(([,a], [,b]) => b - a)
              .map(([flavour, count]) => (
                <div key={flavour} className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    {getFlavorEmoji(flavour)} {flavour}
                  </span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Relationship Outcomes</h4>
          <div className="space-y-2">
            {Object.entries(outcomeCounts)
              .sort(([,a], [,b]) => b - a)
              .map(([outcome, count]) => (
                <div key={outcome} className="flex justify-between items-center">
                  <span className="capitalize">{outcome.replace('-', ' ')}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-accent/20 rounded-lg">
        <h4 className="font-semibold mb-2">Quick Insights</h4>
        <p className="text-sm text-muted-foreground">
          You have a pattern of dating <strong>{mostCommonFlavour[0]}s</strong> ({mostCommonFlavour[1]} times), 
          and most of your relationships tend to <strong>{mostCommonOutcome[0].replace('-', ' ')}</strong>.
          {mostCommonFlavour[1] >= 3 && (
            <span className="text-amber-600 font-medium"> This might be a loop worth examining! 🔄</span>
          )}
        </p>
      </div>
    </div>
  );
}

const getFlavorEmoji = (flavor: string) => {
  const emojiMap: Record<string, string> = {
    strawberry: "🍓",
    vanilla: "🍦", 
    chocolate: "🍫",
    mango: "🥭",
    coconut: "🥥",
    cherry: "🍒",
    mint: "🍃",
    blueberry: "🫐"
  };
  return emojiMap[flavor] || "❓";
};

const getFlavorDisplay = (flavor: string) => {
  const displayMap: Record<string, string> = {
    strawberry: "🍓 Strawberry",
    vanilla: "🍦 Vanilla", 
    chocolate: "🍫 Chocolate",
    mango: "🥭 Mango",
    coconut: "🥥 Coconut",
    cherry: "🍒 Cherry",
    mint: "🍃 Mint",
    blueberry: "🫐 Blueberry"
  };
  return displayMap[flavor] || "❓ Unknown";
};