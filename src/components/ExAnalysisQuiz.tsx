import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface QuizAnswers {
  communication: string;
  conflict: string;
  loveLanguage: string;
  attachment: string;
  socialEnergy: string;
  interests: string;
  reliability: string;
}

interface ExAnalysisQuizProps {
  onComplete: (flavour: string, answers: QuizAnswers) => void;
}

const questions = [
  {
    id: "communication",
    question: "How did they communicate during tough conversations?",
    options: [
      { value: "withdrawn", label: "Went quiet or avoided talking", emoji: "🤐" },
      { value: "explosive", label: "Got emotional or dramatic", emoji: "💥" },
      { value: "logical", label: "Stayed calm and rational", emoji: "🤔" },
      { value: "expressive", label: "Talked through feelings openly", emoji: "💭" },
    ],
  },
  {
    id: "conflict",
    question: "When you disagreed, they typically...",
    options: [
      { value: "avoid", label: "Changed the subject or left", emoji: "🚪" },
      { value: "fight", label: "Argued until someone won", emoji: "⚔️" },
      { value: "resolve", label: "Worked toward compromise", emoji: "🤝" },
      { value: "manipulate", label: "Used guilt or emotional tactics", emoji: "🎭" },
    ],
  },
  {
    id: "loveLanguage",
    question: "They showed love most through...",
    options: [
      { value: "words", label: "Compliments and sweet texts", emoji: "💌" },
      { value: "touch", label: "Physical affection and cuddles", emoji: "🤗" },
      { value: "gifts", label: "Thoughtful presents or surprises", emoji: "🎁" },
      { value: "time", label: "Planning dates and quality time", emoji: "⏰" },
      { value: "acts", label: "Doing helpful things for you", emoji: "🛠️" },
    ],
  },
  {
    id: "attachment",
    question: "In terms of emotional availability, they were...",
    options: [
      { value: "clingy", label: "Always needed reassurance", emoji: "🔗" },
      { value: "distant", label: "Hard to read emotionally", emoji: "🌫️" },
      { value: "secure", label: "Consistent and emotionally stable", emoji: "🛡️" },
      { value: "hot-cold", label: "Intense then pulled away", emoji: "🌡️" },
    ],
  },
  {
    id: "socialEnergy",
    question: "Socially, they were...",
    options: [
      { value: "introvert", label: "Preferred small groups or alone time", emoji: "🏠" },
      { value: "extrovert", label: "Loved parties and meeting people", emoji: "🎉" },
      { value: "selective", label: "Social but picky about people", emoji: "🎯" },
      { value: "adaptable", label: "Matched the vibe of any situation", emoji: "🎭" },
    ],
  },
  {
    id: "interests",
    question: "Their main interests/hobbies were...",
    options: [
      { value: "creative", label: "Art, music, writing, or crafts", emoji: "🎨" },
      { value: "active", label: "Sports, fitness, or outdoor activities", emoji: "🏃" },
      { value: "intellectual", label: "Reading, learning, or deep conversations", emoji: "📚" },
      { value: "social", label: "Friends, parties, or social media", emoji: "📱" },
      { value: "practical", label: "Work, goals, or skill-building", emoji: "🔧" },
    ],
  },
  {
    id: "reliability",
    question: "When it came to plans and promises...",
    options: [
      { value: "flaky", label: "Often cancelled or was late", emoji: "💨" },
      { value: "rigid", label: "Stuck to plans no matter what", emoji: "📅" },
      { value: "reliable", label: "Usually followed through", emoji: "✅" },
      { value: "spontaneous", label: "Preferred last-minute adventures", emoji: "🎲" },
    ],
  },
];

const flavourMapping = {
  strawberry: {
    patterns: ["expressive", "fight", "words", "clingy", "extrovert", "social"],
    name: "Strawberry",
    emoji: "🍓"
  },
  vanilla: {
    patterns: ["logical", "resolve", "acts", "secure", "introvert", "practical"],
    name: "Vanilla",
    emoji: "🍦"
  },
  chocolate: {
    patterns: ["explosive", "manipulate", "touch", "hot-cold", "selective", "creative"],
    name: "Chocolate",
    emoji: "🍫"
  },
  mango: {
    patterns: ["expressive", "fight", "time", "hot-cold", "extrovert", "active"],
    name: "Mango",
    emoji: "🥭"
  },
  coconut: {
    patterns: ["withdrawn", "avoid", "acts", "distant", "introvert", "intellectual"],
    name: "Coconut",
    emoji: "🥥"
  },
  cherry: {
    patterns: ["explosive", "manipulate", "gifts", "clingy", "extrovert", "social"],
    name: "Cherry",
    emoji: "🍒"
  },
  mint: {
    patterns: ["logical", "resolve", "words", "secure", "adaptable", "practical"],
    name: "Mint",
    emoji: "🍃"
  },
  blueberry: {
    patterns: ["withdrawn", "avoid", "time", "distant", "introvert", "creative"],
    name: "Blueberry",
    emoji: "🫐"
  }
};

export default function ExAnalysisQuiz({ onComplete }: ExAnalysisQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({} as QuizAnswers);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const { toast } = useToast();

  const handleNext = () => {
    if (!selectedAnswer) {
      toast({
        title: "Please select an answer",
        description: "Choose the option that best describes them.",
        variant: "destructive",
      });
      return;
    }

    const newAnswers = {
      ...answers,
      [questions[currentQuestion].id]: selectedAnswer,
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      // Calculate flavour based on answers
      const answerValues = Object.values(newAnswers);
      let bestMatch = "vanilla";
      let highestScore = 0;

      Object.entries(flavourMapping).forEach(([flavour, data]) => {
        const score = answerValues.filter(answer => 
          data.patterns.includes(answer)
        ).length;
        
        if (score > highestScore) {
          highestScore = score;
          bestMatch = flavour;
        }
      });

      onComplete(bestMatch, newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[questions[currentQuestion - 1].id] || "");
    }
  };

  const question = questions[currentQuestion];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          What Flavour Was Your Ex? 🔍
        </CardTitle>
        <p className="text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <div className="w-full bg-secondary/20 rounded-full h-2 mt-4">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold">{question.question}</h3>
          
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
            <div className="grid gap-3">
              {question.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 cursor-pointer flex items-center gap-3"
                  >
                    <span className="text-xl">{option.emoji}</span>
                    <span>{option.label}</span>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-4 pt-4">
          {currentQuestion > 0 && (
            <Button variant="outline" onClick={handlePrevious} className="flex-1">
              Previous
            </Button>
          )}
          <Button onClick={handleNext} className="flex-1">
            {currentQuestion === questions.length - 1 ? "Analyze Ex" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}