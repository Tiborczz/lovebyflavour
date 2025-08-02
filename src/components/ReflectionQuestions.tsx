import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Heart, AlertTriangle } from "lucide-react";

interface ReflectionData {
  whatYouMiss: string;
  whatEndsIt: string;
}

interface ReflectionQuestionsProps {
  onComplete: (data: ReflectionData) => void;
}

export default function ReflectionQuestions({ onComplete }: ReflectionQuestionsProps) {
  const [answers, setAnswers] = useState<ReflectionData>({
    whatYouMiss: "",
    whatEndsIt: ""
  });

  const handleSubmit = () => {
    if (!answers.whatYouMiss.trim() || !answers.whatEndsIt.trim()) {
      return;
    }
    onComplete(answers);
  };

  const isComplete = answers.whatYouMiss.trim() && answers.whatEndsIt.trim();

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Let's Break Your Pattern 🔍
        </CardTitle>
        <p className="text-muted-foreground">
          Help us understand your dating cycles with these reflection questions
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Question 1 */}
        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            What part of your past relationships do you often miss or chase again?
          </Label>
          <p className="text-sm text-muted-foreground">
            Be honest — what draws you back to similar patterns? (e.g., "the excitement," "feeling needed," "the chase")
          </p>
          <Textarea
            placeholder="I always miss..."
            value={answers.whatYouMiss}
            onChange={(e) => setAnswers(prev => ({ ...prev, whatYouMiss: e.target.value }))}
            className="min-h-[100px] resize-none"
          />
        </div>

        {/* Question 2 */}
        <div className="space-y-3">
          <Label className="text-base font-medium flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            What usually ends the relationship for you?
          </Label>
          <p className="text-sm text-muted-foreground">
            Think about the common themes — was it communication, different goals, timing, or something else?
          </p>
          <Textarea
            placeholder="Things usually end when..."
            value={answers.whatEndsIt}
            onChange={(e) => setAnswers(prev => ({ ...prev, whatEndsIt: e.target.value }))}
            className="min-h-[100px] resize-none"
          />
        </div>

        {/* Character counts */}
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{answers.whatYouMiss.length}/500</span>
          <span>{answers.whatEndsIt.length}/500</span>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button 
            onClick={handleSubmit}
            disabled={!isComplete}
            className="w-full h-12 text-lg"
          >
            Analyze My Pattern
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Encouragement */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Remember:</strong> Recognizing patterns is the first step to changing them. 
            You're already doing the hard work by being here.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}