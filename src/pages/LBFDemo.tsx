import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, Brain, Heart, Target, Users, 
  MessageCircle, Activity, Shield, Zap
} from "lucide-react";
import LBFInsightCard from "@/components/LBFInsightCard";

export default function LBFDemo() {
  const [activeTab, setActiveTab] = useState("demo");

  // Sample data for demonstration
  const sampleUserTraits = {
    personality: {
      extraversion: 0.7,
      agreeableness: 0.8,
      conscientiousness: 0.6,
      neuroticism: 0.4,
      openness: 0.9
    },
    lifestyle: {
      social_preference: "ambivert",
      activity_level: "high",
      financial_style: "balanced",
      career_ambition: "high"
    },
    relationship: {
      attachment_style: "anxious",
      love_language: "quality_time",
      communication_style: "direct"
    }
  };

  const sampleQuizAnswers = {
    "How do you typically handle conflict?": "I prefer to address issues directly and openly",
    "What's your ideal weekend?": "A mix of social activities and quiet time",
    "How do you show affection?": "Through quality time and physical touch",
    "What attracts you to potential partners?": "Intellectual depth and emotional availability",
    "How do you deal with stress?": "I talk to friends and practice self-care"
  };

  const sampleFlavourPreferences = ["chocolate", "strawberry", "vanilla"];

  const sampleRelationshipHistory = [
    {
      flavour: "chocolate",
      duration: "2 years",
      outcome: "amicable",
      lessons: "Learned the importance of intellectual compatibility"
    },
    {
      flavour: "strawberry", 
      duration: "6 months",
      outcome: "passionate but short-lived",
      lessons: "Discovered I need more emotional stability"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🤖 LBF AI Insights Demo</h1>
        <p className="text-muted-foreground">
          Experience AI-powered personality analysis and compatibility insights using LBF's advanced AI
        </p>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="demo">Live Demo</TabsTrigger>
          <TabsTrigger value="info">How It Works</TabsTrigger>
        </TabsList>

        <TabsContent value="demo" className="space-y-6">
          {/* Sample Data Display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-500" />
                  Sample User Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Personality Traits</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Extraversion:</span>
                      <span>{Math.round(sampleUserTraits.personality.extraversion * 100)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Agreeableness:</span>
                      <span>{Math.round(sampleUserTraits.personality.agreeableness * 100)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Conscientiousness:</span>
                      <span>{Math.round(sampleUserTraits.personality.conscientiousness * 100)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Neuroticism:</span>
                      <span>{Math.round(sampleUserTraits.personality.neuroticism * 100)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Openness:</span>
                      <span>{Math.round(sampleUserTraits.personality.openness * 100)}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Flavour Preferences</h4>
                  <div className="flex gap-2">
                    {sampleFlavourPreferences.map((flavour) => (
                      <Badge key={flavour} variant="secondary">
                        {flavour === 'vanilla' && '🍦'}
                        {flavour === 'strawberry' && '🍓'}
                        {flavour === 'chocolate' && '🍫'}
                        {flavour === 'mango' && '🥭'}
                        {flavour}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Relationship History</h4>
                  <div className="space-y-2">
                    {sampleRelationshipHistory.map((relationship, index) => (
                      <div key={index} className="text-sm p-2 bg-accent/30 rounded">
                        <div className="flex items-center gap-2 mb-1">
                          <span>
                            {relationship.flavour === 'vanilla' && '🍦'}
                            {relationship.flavour === 'strawberry' && '🍓'}
                            {relationship.flavour === 'chocolate' && '🍫'}
                            {relationship.flavour === 'mango' && '🥭'}
                          </span>
                          <span className="font-medium capitalize">{relationship.flavour}</span>
                          <span className="text-muted-foreground">• {relationship.duration}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{relationship.lessons}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  AI Analysis Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <Brain className="w-5 h-5 text-blue-500" />
                    <div>
                      <h4 className="font-medium">Personality Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Deep dive into personality traits and emotional patterns
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <Heart className="w-5 h-5 text-red-500" />
                    <div>
                      <h4 className="font-medium">Compatibility Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Find your best flavour matches and potential conflicts
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <Target className="w-5 h-5 text-green-500" />
                    <div>
                      <h4 className="font-medium">Growth Recommendations</h4>
                      <p className="text-sm text-muted-foreground">
                        Personalized action steps for relationship growth
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <h4 className="font-medium mb-2">AI-Powered Insights</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Psychological framework analysis</li>
                    <li>• Attachment style detection</li>
                    <li>• Communication pattern recognition</li>
                    <li>• Personalized recommendations</li>
                    <li>• Real-time scoring and metrics</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* OpenAI Insight Card */}
          <LBFInsightCard
            userTraits={sampleUserTraits}
            quizAnswers={sampleQuizAnswers}
            flavourPreferences={sampleFlavourPreferences}
            relationshipHistory={sampleRelationshipHistory}
            onInsightGenerated={(insight) => {
              console.log('Generated insight:', insight);
            }}
          />
        </TabsContent>

        <TabsContent value="info" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Data Collection</h4>
                      <p className="text-sm text-muted-foreground">
                        User provides personality traits, quiz answers, and relationship history
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">AI Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        LBF AI analyzes data using psychological frameworks
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Structured Output</h4>
                      <p className="text-sm text-muted-foreground">
                        AI returns structured JSON with insights, scores, and recommendations
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium">Visual Display</h4>
                      <p className="text-sm text-muted-foreground">
                        Results displayed in beautiful, interactive cards with emojis and metrics
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">Secure API Key</h4>
                      <p className="text-sm text-muted-foreground">
                        LBF API key stored securely on backend, never exposed to frontend
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">Rate Limiting</h4>
                      <p className="text-sm text-muted-foreground">
                        10 requests per hour per IP to prevent abuse and manage costs
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <Activity className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">Data Privacy</h4>
                      <p className="text-sm text-muted-foreground">
                        User data anonymized and stored securely in database
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">User Consent</h4>
                      <p className="text-sm text-muted-foreground">
                        Clear consent management for AI analysis and data processing
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                Technical Implementation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Backend</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Express.js API routes</li>
                    <li>• LBF SDK integration</li>
                    <li>• Rate limiting middleware</li>
                    <li>• Error handling & validation</li>
                    <li>• Database storage</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Frontend</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• React TypeScript</li>
                    <li>• Axios for API calls</li>
                    <li>• Shadcn/UI components</li>
                    <li>• Real-time updates</li>
                    <li>• Responsive design</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">AI Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• GPT-3.5 Turbo model</li>
                    <li>• Structured JSON responses</li>
                    <li>• Psychological frameworks</li>
                    <li>• Flavour-based analysis</li>
                    <li>• Personalized insights</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Powered by LBF AI • Built with React & Node.js
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Button variant="outline" size="sm" onClick={() => window.open('/compatibility', '_blank')}>
            <Users className="w-4 h-4 mr-2" />
            View Dashboard
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.open('/quiz', '_blank')}>
            <Target className="w-4 h-4 mr-2" />
            Take Quiz
          </Button>
        </div>
      </div>
    </div>
  );
} 