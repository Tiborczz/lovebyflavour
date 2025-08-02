import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Sparkles, Heart, Star, Zap, Trophy, Gift, ArrowRight, Brain } from "lucide-react";
import LBFInsightCard from "@/components/LBFInsightCard";

interface Question {
  id: number;
  text: string;
  answers: string[];
  traits: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
    anxious: number;
    avoidant: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "I enjoy a well-planned routine and prefer predictability in my daily life.",
    answers: [
      "Strongly Disagree",
      "Disagree", 
      "Neutral",
      "Agree",
      "Strongly Agree"
    ],
    traits: [
      { openness: -2, conscientiousness: -2, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 1 },
      { openness: -1, conscientiousness: -1, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 1, conscientiousness: 1, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 2, conscientiousness: 2, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 }
    ]
  },
  {
    id: 2,
    text: "I fall in love very quickly and intensely.",
    answers: [
      "Never",
      "Rarely",
      "Sometimes", 
      "Often",
      "Always"
    ],
    traits: [
      { openness: 0, conscientiousness: 1, extraversion: -1, agreeableness: 0, neuroticism: -1, anxious: -1, avoidant: 1 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 1, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 1, conscientiousness: -1, extraversion: 1, agreeableness: 1, neuroticism: 1, anxious: 1, avoidant: -1 },
      { openness: 2, conscientiousness: -2, extraversion: 2, agreeableness: 1, neuroticism: 2, anxious: 2, avoidant: -2 }
    ]
  },
  {
    id: 3,
    text: "I need significant time alone to recharge after socializing.",
    answers: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often", 
      "Always"
    ],
    traits: [
      { openness: 0, conscientiousness: 0, extraversion: 2, agreeableness: 1, neuroticism: 0, anxious: 0, avoidant: -1 },
      { openness: 0, conscientiousness: 0, extraversion: 1, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: -1, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 1 },
      { openness: 0, conscientiousness: 0, extraversion: -2, agreeableness: -1, neuroticism: 0, anxious: 0, avoidant: 2 }
    ]
  },
  {
    id: 4,
    text: "I crave emotional intensity and drama in my relationships.",
    answers: [
      "Never",
      "Rarely", 
      "Sometimes",
      "Often",
      "Always"
    ],
    traits: [
      { openness: -1, conscientiousness: 1, extraversion: 0, agreeableness: 0, neuroticism: -2, anxious: -1, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: -1, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 1, conscientiousness: -1, extraversion: 1, agreeableness: 0, neuroticism: 1, anxious: 1, avoidant: 0 },
      { openness: 2, conscientiousness: -2, extraversion: 2, agreeableness: 0, neuroticism: 2, anxious: 2, avoidant: 0 }
    ]
  },
  {
    id: 5,
    text: "I tend to date people I know aren't good for me.",
    answers: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Always"
    ],
    traits: [
      { openness: 0, conscientiousness: 2, extraversion: 0, agreeableness: 0, neuroticism: -1, anxious: -1, avoidant: 0 },
      { openness: 0, conscientiousness: 1, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: -1, extraversion: 0, agreeableness: -1, neuroticism: 1, anxious: 1, avoidant: 1 },
      { openness: 0, conscientiousness: -2, extraversion: 0, agreeableness: -1, neuroticism: 2, anxious: 2, avoidant: 2 }
    ]
  },
  {
    id: 6,
    text: "I put my partner's needs before my own, even when it hurts me.",
    answers: [
      "Never",
      "Rarely",
      "Sometimes", 
      "Often",
      "Always"
    ],
    traits: [
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: -2, neuroticism: 0, anxious: -1, avoidant: 1 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: -1, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 1, neuroticism: 0, anxious: 1, avoidant: -1 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 2, neuroticism: 1, anxious: 2, avoidant: -2 }
    ]
  },
  {
    id: 7,
    text: "I get bored easily and need constant novelty and excitement.",
    answers: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Always"
    ],
    traits: [
      { openness: -2, conscientiousness: 2, extraversion: -1, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: -1, conscientiousness: 1, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 1, conscientiousness: -1, extraversion: 1, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 1 },
      { openness: 2, conscientiousness: -2, extraversion: 2, agreeableness: 0, neuroticism: 1, anxious: 0, avoidant: 2 }
    ]
  },
  {
    id: 8,
    text: "I worry constantly about being abandoned or rejected.",
    answers: [
      "Never",
      "Rarely", 
      "Sometimes",
      "Often",
      "Always"
    ],
    traits: [
      { openness: 0, conscientiousness: 0, extraversion: 1, agreeableness: 0, neuroticism: -2, anxious: -2, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: -1, anxious: -1, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 1, neuroticism: 1, anxious: 1, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: -1, agreeableness: 1, neuroticism: 2, anxious: 2, avoidant: 0 }
    ]
  },
  {
    id: 9,
    text: "I keep my emotions to myself and rarely share deep feelings.",
    answers: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often", 
      "Always"
    ],
    traits: [
      { openness: 1, conscientiousness: 0, extraversion: 2, agreeableness: 1, neuroticism: -1, anxious: -1, avoidant: -2 },
      { openness: 0, conscientiousness: 0, extraversion: 1, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: -1 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: -1, agreeableness: -1, neuroticism: 0, anxious: 0, avoidant: 1 },
      { openness: -1, conscientiousness: 0, extraversion: -2, agreeableness: -1, neuroticism: 0, anxious: 0, avoidant: 2 }
    ]
  },
  {
    id: 10,
    text: "I flirt and date multiple people at once without feeling guilty.",
    answers: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Always" 
    ],
    traits: [
      { openness: 0, conscientiousness: 2, extraversion: -1, agreeableness: 1, neuroticism: 0, anxious: 0, avoidant: -1 },
      { openness: 0, conscientiousness: 1, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 1, conscientiousness: -1, extraversion: 1, agreeableness: -1, neuroticism: 0, anxious: 0, avoidant: 1 },
      { openness: 2, conscientiousness: -2, extraversion: 2, agreeableness: -2, neuroticism: 0, anxious: 0, avoidant: 2 }
    ]
  },
  {
    id: 11,
    text: "I analyze my relationships constantly and seek to understand every detail.",
    answers: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Always"
    ],
    traits: [
      { openness: -1, conscientiousness: -1, extraversion: 1, agreeableness: 0, neuroticism: -2, anxious: -2, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: -1, anxious: -1, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 1, conscientiousness: 1, extraversion: -1, agreeableness: 0, neuroticism: 1, anxious: 1, avoidant: 0 },
      { openness: 2, conscientiousness: 2, extraversion: -2, agreeableness: 0, neuroticism: 2, anxious: 2, avoidant: 0 }
    ]
  },
  {
    id: 12,
    text: "I prefer casual relationships and avoid serious commitment.",
    answers: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Always"
    ],
    traits: [
      { openness: 0, conscientiousness: 1, extraversion: -1, agreeableness: 1, neuroticism: 0, anxious: -1, avoidant: -2 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: -1 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 1, conscientiousness: -1, extraversion: 1, agreeableness: -1, neuroticism: 0, anxious: 0, avoidant: 1 },
      { openness: 2, conscientiousness: -2, extraversion: 2, agreeableness: -2, neuroticism: 0, anxious: 0, avoidant: 2 }
    ]
  },
  {
    id: 13,
    text: "I express my feelings openly and wear my heart on my sleeve.",
    answers: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Always"
    ],
    traits: [
      { openness: -1, conscientiousness: 0, extraversion: -2, agreeableness: -1, neuroticism: -1, anxious: -1, avoidant: 2 },
      { openness: 0, conscientiousness: 0, extraversion: -1, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 1 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 1, conscientiousness: 0, extraversion: 1, agreeableness: 1, neuroticism: 1, anxious: 1, avoidant: -1 },
      { openness: 2, conscientiousness: 0, extraversion: 2, agreeableness: 2, neuroticism: 2, anxious: 2, avoidant: -2 }
    ]
  },
  {
    id: 14,
    text: "I seek partners who challenge me intellectually and emotionally.",
    answers: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Always"
    ],
    traits: [
      { openness: -2, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 1 },
      { openness: -1, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 1, conscientiousness: 0, extraversion: 1, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 2, conscientiousness: 0, extraversion: 2, agreeableness: 0, neuroticism: 1, anxious: 1, avoidant: -1 }
    ]
  },
  {
    id: 15,
    text: "I tend to lose myself in relationships and neglect my own interests.",
    answers: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Always"
    ],
    traits: [
      { openness: 0, conscientiousness: 1, extraversion: 0, agreeableness: -1, neuroticism: -1, anxious: -2, avoidant: 1 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: -1, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: -1, extraversion: 0, agreeableness: 1, neuroticism: 1, anxious: 1, avoidant: -1 },
      { openness: 0, conscientiousness: -2, extraversion: -1, agreeableness: 2, neuroticism: 2, anxious: 2, avoidant: -2 }
    ]
  },
  {
    id: 16,
    text: "I enjoy the thrill of pursuing someone who seems uninterested.",
    answers: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Always"
    ],
    traits: [
      { openness: 0, conscientiousness: 1, extraversion: -1, agreeableness: 1, neuroticism: -1, anxious: -1, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 1, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 1, conscientiousness: -1, extraversion: 1, agreeableness: -1, neuroticism: 1, anxious: 1, avoidant: 1 },
      { openness: 2, conscientiousness: -2, extraversion: 2, agreeableness: -2, neuroticism: 2, anxious: 2, avoidant: 2 }
    ]
  },
  {
    id: 17,
    text: "I believe in taking things slow and building trust gradually.",
    answers: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Always"
    ],
    traits: [
      { openness: 1, conscientiousness: -2, extraversion: 1, agreeableness: -1, neuroticism: 1, anxious: 1, avoidant: 0 },
      { openness: 0, conscientiousness: -1, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: 1, extraversion: 0, agreeableness: 1, neuroticism: -1, anxious: 0, avoidant: 0 },
      { openness: -1, conscientiousness: 2, extraversion: -1, agreeableness: 2, neuroticism: -2, anxious: -1, avoidant: 0 }
    ]
  },
  {
    id: 18,
    text: "I find myself attracted to partners with emotional baggage or problems.",
    answers: [
      "Never",
      "Rarely",
      "Sometimes",
      "Often",
      "Always"
    ],
    traits: [
      { openness: 0, conscientiousness: 1, extraversion: 0, agreeableness: 0, neuroticism: -1, anxious: -1, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 1, neuroticism: 0, anxious: 0, avoidant: 0 },
      { openness: 0, conscientiousness: -1, extraversion: 0, agreeableness: 1, neuroticism: 1, anxious: 1, avoidant: 0 },
      { openness: 0, conscientiousness: -2, extraversion: 0, agreeableness: 2, neuroticism: 2, anxious: 2, avoidant: 0 }
    ]
  }
];

interface TraitScores {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  anxious: number;
  avoidant: number;
}

function calculateFlavour(scores: TraitScores): string {
  // Normalize scores to 0-10 scale
  const normalized = Object.fromEntries(
    Object.entries(scores).map(([key, value]) => [key, Math.max(0, Math.min(10, value + 5))])
  );

  // Vanilla: High conscientiousness, low neuroticism, moderate avoidant
  if (normalized.conscientiousness >= 7 && normalized.neuroticism <= 4 && normalized.avoidant >= 5) {
    return "vanilla";
  }
  
  // Strawberry: High agreeableness, high anxious attachment, high neuroticism
  if (normalized.agreeableness >= 6 && normalized.anxious >= 6 && normalized.neuroticism >= 6) {
    return "strawberry";
  }
  
  // Chocolate: High neuroticism, high openness, high anxious, low conscientiousness
  if (normalized.neuroticism >= 7 && normalized.openness >= 6 && normalized.anxious >= 6 && normalized.conscientiousness <= 4) {
    return "chocolate";
  }
  
  // Banana: High agreeableness, high conscientiousness, high anxious, low avoidant
  if (normalized.agreeableness >= 7 && normalized.conscientiousness >= 6 && normalized.anxious >= 5 && normalized.avoidant <= 4) {
    return "banana";
  }
  
  // Mint: High conscientiousness, low neuroticism, moderate extraversion, low anxious
  if (normalized.conscientiousness >= 7 && normalized.neuroticism <= 3 && normalized.extraversion >= 5 && normalized.anxious <= 4) {
    return "mint";
  }
  
  // Cherry: High extraversion, high neuroticism, low conscientiousness, moderate anxious
  if (normalized.extraversion >= 7 && normalized.neuroticism >= 6 && normalized.conscientiousness <= 4 && normalized.anxious >= 5) {
    return "cherry";
  }
  
  // Bubblegum: High extraversion, low conscientiousness, high agreeableness, high anxious
  if (normalized.extraversion >= 6 && normalized.conscientiousness <= 4 && normalized.agreeableness >= 6 && normalized.anxious >= 6) {
    return "bubblegum";
  }
  
  // Coffee: High conscientiousness, high openness, moderate neuroticism, low anxious
  if (normalized.conscientiousness >= 7 && normalized.openness >= 6 && normalized.neuroticism >= 4 && normalized.anxious <= 4) {
    return "coffee";
  }
  
  // Watermelon: High extraversion, high agreeableness, low neuroticism, moderate anxious
  if (normalized.extraversion >= 7 && normalized.agreeableness >= 6 && normalized.neuroticism <= 4 && normalized.anxious >= 4) {
    return "watermelon";
  }
  
  // Lemon: High extraversion, low agreeableness, high openness, low anxious
  if (normalized.extraversion >= 7 && normalized.agreeableness <= 4 && normalized.openness >= 6 && normalized.anxious <= 4) {
    return "lemon";
  }
  
  // Coconut: Low extraversion, high agreeableness, high avoidant, low neuroticism
  if (normalized.extraversion <= 4 && normalized.agreeableness >= 6 && normalized.avoidant >= 6 && normalized.neuroticism <= 4) {
    return "coconut";
  }
  
  // Grape: High conscientiousness, high openness, low extraversion, moderate neuroticism
  if (normalized.conscientiousness >= 6 && normalized.openness >= 7 && normalized.extraversion <= 5 && normalized.neuroticism >= 4) {
    return "grape";
  }
  
  // Pineapple: High openness, low conscientiousness, high extraversion, high avoidant
  if (normalized.openness >= 7 && normalized.conscientiousness <= 4 && normalized.extraversion >= 6 && normalized.avoidant >= 6) {
    return "pineapple";
  }
  
  // Mango: High extraversion, high openness, high neuroticism, low conscientiousness
  if (normalized.extraversion >= 7 && normalized.openness >= 6 && normalized.neuroticism >= 6 && normalized.conscientiousness <= 4) {
    return "mango";
  }
  
  // Default fallback logic based on strongest traits
  if (normalized.neuroticism >= 6 && normalized.extraversion >= 6) return "cherry";
  if (normalized.neuroticism >= 6) return "chocolate";
  if (normalized.agreeableness >= 7 && normalized.extraversion <= 4) return "coconut";
  if (normalized.agreeableness >= 7) return "banana";
  if (normalized.extraversion >= 7 && normalized.openness >= 6) return "mango";
  if (normalized.extraversion >= 7) return "watermelon";
  if (normalized.openness >= 7 && normalized.conscientiousness <= 4) return "pineapple";
  if (normalized.openness >= 7) return "grape";
  if (normalized.conscientiousness >= 7 && normalized.extraversion <= 4) return "coffee";
  if (normalized.conscientiousness >= 7) return "mint";
  if (normalized.anxious >= 6) return "strawberry";
  if (normalized.extraversion <= 4) return "coconut";
  
  return "vanilla";
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showOpenAIInsights, setShowOpenAIInsights] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);
  const navigate = useNavigate();

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Progress milestones for rewards
  const milestones = [25, 50, 75, 100];
  const currentMilestone = milestones.find(m => progress >= m) || 0;

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    // Add delay for better UX
    setTimeout(() => {
      const newAnswers = [...answers, answerIndex];
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      // Check for milestone rewards
      const newProgress = ((currentQuestion + 1) / questions.length) * 100;
      if (milestones.includes(newProgress)) {
        setShowReward(true);
        setTimeout(() => setShowReward(false), 2000);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Calculate result
        const totalScores: TraitScores = {
          openness: 0,
          conscientiousness: 0,
          extraversion: 0,
          agreeableness: 0,
          neuroticism: 0,
          anxious: 0,
          avoidant: 0
        };

        newAnswers.forEach((answerIndex, questionIndex) => {
          const questionTraits = questions[questionIndex].traits[answerIndex];
          Object.keys(totalScores).forEach(trait => {
            totalScores[trait as keyof TraitScores] += questionTraits[trait as keyof TraitScores];
          });
        });

        const result = calculateFlavour(totalScores);
        
        // Store quiz data for OpenAI analysis
        const quizAnswers = answers.map((answerIndex, questionIndex) => ({
          question: questions[questionIndex].text,
          answer: questions[questionIndex].answers[answerIndex],
          traits: questions[questionIndex].traits[answerIndex]
        }));
        
        setQuizData({
          result,
          totalScores,
          quizAnswers,
          answers
        });
        
        setIsComplete(true);
      }
    }, 300);
  };

  const getMilestoneReward = (milestone: number) => {
    switch (milestone) {
      case 25: return { icon: Sparkles, text: "Getting to know you! ✨", color: "text-blue-500" };
      case 50: return { icon: Heart, text: "Halfway there! 💕", color: "text-pink-500" };
      case 75: return { icon: Star, text: "Almost done! ⭐", color: "text-yellow-500" };
      case 100: return { icon: Trophy, text: "Quiz complete! 🏆", color: "text-purple-500" };
      default: return { icon: Sparkles, text: "Great progress!", color: "text-primary" };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent/5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-secondary/5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <Card className="w-full max-w-2xl mx-auto animate-fade-in border-accent/20 shadow-xl relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-primary">
              {isComplete ? "Quiz Complete! 🎉" : "Discover Your Love Flavour"}
            </CardTitle>
            <p className="text-muted-foreground">
              {isComplete ? "Your results are ready!" : `Question ${currentQuestion + 1} of ${questions.length}`}
            </p>
          </div>
          
          {/* Enhanced Progress Bar with Rewards */}
          <div className="relative">
            <Progress value={progress} className="w-full h-3" />
            <div className="flex justify-between mt-3 text-xs">
              <span className={`transition-all duration-300 ${progress >= 25 ? "opacity-100 scale-125" : "opacity-30"}`}>🍦</span>
              <span className={`transition-all duration-300 ${progress >= 50 ? "opacity-100 scale-125" : "opacity-30"}`}>🍓</span>
              <span className={`transition-all duration-300 ${progress >= 75 ? "opacity-100 scale-125" : "opacity-30"}`}>🍫</span>
              <span className={`transition-all duration-300 ${progress >= 100 ? "opacity-100 scale-125" : "opacity-30"}`}>🥭</span>
            </div>
            
            {/* Milestone Indicators */}
            <div className="flex justify-between mt-2">
              {milestones.map((milestone) => (
                <div
                  key={milestone}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    progress >= milestone ? 'bg-primary scale-125' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!isComplete ? (
            <>
              <div className="text-center space-y-4 animate-scale-in">
                <h2 className="text-xl font-semibold leading-relaxed text-primary">
                  {questions[currentQuestion].text}
                </h2>
              </div>
              
              <div className="space-y-3">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === index ? "default" : "outline"}
                    className={`w-full p-4 h-auto text-left justify-start transition-all duration-300 group animate-fade-in ${
                      selectedAnswer === index 
                        ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                        : 'hover:bg-primary/5 hover:border-primary/30 hover:scale-102'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                  >
                    <span className={`text-sm font-medium transition-colors ${
                      selectedAnswer === index ? 'text-primary-foreground' : 'group-hover:text-primary'
                    }`}>
                      {answer}
                    </span>
                  </Button>
                ))}
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                Your answers help us understand your personality traits and attachment style
              </div>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <div className="text-6xl mb-4">
                  {quizData?.result === 'vanilla' && '🍦'}
                  {quizData?.result === 'strawberry' && '🍓'}
                  {quizData?.result === 'chocolate' && '🍫'}
                  {quizData?.result === 'mango' && '🥭'}
                </div>
                <h2 className="text-2xl font-bold text-primary">
                  You're a {quizData?.result} lover!
                </h2>
                <p className="text-muted-foreground">
                  Your personality and relationship style have been analyzed
                </p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={() => navigate(`/result/${quizData?.result}`)}
                  className="w-full"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  View Detailed Results
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => setShowOpenAIInsights(!showOpenAIInsights)}
                  className="w-full"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  {showOpenAIInsights ? 'Hide' : 'Get'} AI-Powered Insights
                </Button>
              </div>
              
              {showOpenAIInsights && quizData && (
                <div className="mt-6">
                                        <LBFInsightCard
                    quizAnswers={quizData.quizAnswers}
                    flavourPreferences={[quizData.result]}
                    userTraits={quizData.totalScores}
                    onInsightGenerated={(insight) => {
                      console.log('OpenAI insight generated:', insight);
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Milestone Reward Toast */}
      {showReward && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 shadow-lg">
            <CardContent className="p-4 flex items-center gap-3">
              {(() => {
                const reward = getMilestoneReward(currentMilestone);
                const IconComponent = reward.icon;
                return (
                  <>
                    <IconComponent className={`h-5 w-5 ${reward.color}`} />
                    <span className="font-medium">{reward.text}</span>
                  </>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}