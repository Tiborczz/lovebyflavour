import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, Brain, Users, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            The Psychology Behind Love by Flavour
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We use proven psychological frameworks to help you understand your dating patterns, 
            break toxic cycles, and find healthier relationships through the power of metaphor.
          </p>
        </div>

        {/* Creator Message */}
        <Card className="mb-16 border-accent/20 bg-gradient-to-br from-candy-peach-50 to-candy-mint-50">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <Heart className="w-8 h-8 text-candy-berry-600" />
              <h2 className="text-3xl font-bold">From the Creator</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              This site was built with love by <strong>Lee</strong>, a passionate student of psychology and human behaviour. 
              It's not just a quiz — it's a mirror into your emotional flavour.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Love by Flavour was born from a simple observation: we all have patterns in dating, 
              but most of us can't see them clearly. By using fruit and flavor metaphors, we make 
              complex psychology accessible and memorable. My goal is to help you understand your 
              romantic personality, recognize your patterns, and make conscious choices about love.
            </p>
          </CardContent>
        </Card>

        {/* The Science */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-accent/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Brain className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold">The Science</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Our flavor system is grounded in established psychological research:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Big Five Personality Traits</strong> - The gold standard in personality psychology</li>
                <li>• <strong>Attachment Theory</strong> - How we bond and connect in relationships</li>
                <li>• <strong>Behavioral Patterns</strong> - Recognizing cycles in dating choices</li>
                <li>• <strong>Relationship Research</strong> - What actually predicts compatibility</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold">Why Metaphors Work</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                We chose food metaphors because they're:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Intuitive</strong> - Everyone understands flavors and preferences</li>
                <li>• <strong>Non-judgmental</strong> - No flavor is "better" than another</li>
                <li>• <strong>Memorable</strong> - Easier to remember than clinical terms</li>
                <li>• <strong>Shareable</strong> - Fun to discuss with friends and partners</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Meet the Flavors */}
        <Card className="mb-16 border-accent/20">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <Users className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold">Meet the Fourteen Flavors</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍦</div>
                <h4 className="font-semibold text-primary">Vanilla</h4>
                <p className="text-xs text-muted-foreground">Steady & Loyal</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍓</div>
                <h4 className="font-semibold text-primary">Strawberry</h4>
                <p className="text-xs text-muted-foreground">Hopeless Romantic</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍫</div>
                <h4 className="font-semibold text-primary">Chocolate</h4>
                <p className="text-xs text-muted-foreground">Intense & Deep</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍌</div>
                <h4 className="font-semibold text-primary">Banana</h4>
                <p className="text-xs text-muted-foreground">Energetic & Optimistic</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🌿</div>
                <h4 className="font-semibold text-primary">Mint</h4>
                <p className="text-xs text-muted-foreground">Fresh & Independent</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍒</div>
                <h4 className="font-semibold text-primary">Cherry</h4>
                <p className="text-xs text-muted-foreground">Sweet & Playful</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍬</div>
                <h4 className="font-semibold text-primary">Bubblegum</h4>
                <p className="text-xs text-muted-foreground">Youthful & Spontaneous</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">☕</div>
                <h4 className="font-semibold text-primary">Coffee</h4>
                <p className="text-xs text-muted-foreground">Sophisticated & Driven</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍉</div>
                <h4 className="font-semibold text-primary">Watermelon</h4>
                <p className="text-xs text-muted-foreground">Refreshing & Social</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍋</div>
                <h4 className="font-semibold text-primary">Lemon</h4>
                <p className="text-xs text-muted-foreground">Zesty & Bold</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🥥</div>
                <h4 className="font-semibold text-primary">Coconut</h4>
                <p className="text-xs text-muted-foreground">Exotic & Mysterious</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍇</div>
                <h4 className="font-semibold text-primary">Grape</h4>
                <p className="text-xs text-muted-foreground">Refined & Sophisticated</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍍</div>
                <h4 className="font-semibold text-primary">Pineapple</h4>
                <p className="text-xs text-muted-foreground">Wild & Adventurous</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🥭</div>
                <h4 className="font-semibold text-primary">Mango</h4>
                <p className="text-xs text-muted-foreground">Flirty & Magnetic</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Discover Your Flavor?</h3>
          <p className="text-muted-foreground mb-8">
            Take our quiz to understand your romantic personality and start breaking your dating patterns.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="px-8">
              <Link to="/quiz">Take the Quiz</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/compatibility">Check Compatibility</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;