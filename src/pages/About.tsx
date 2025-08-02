import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, Brain, Users, Target } from "lucide-react";
import NewBrandLogo from "@/components/NewBrandLogo";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-candy-peach-50 via-candy-mint-50 to-candy-sky-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/">
            <NewBrandLogo variant="full" size="lg" />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/quiz" className="text-candy-cocoa-700 hover:text-candy-cocoa-900 transition-colors">
              <Button variant="outline" className="hidden md:flex">
                Take Quiz
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Main Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
              The Psychology Behind Love by Flavour
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-pink-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            We use proven psychological frameworks to help you understand your dating patterns, 
            break toxic cycles, and find healthier relationships through the power of <strong className="text-purple-400">metaphor</strong>.
          </p>
        </div>

        {/* Creator Message */}
        <Card className="mb-16 border-pink-200 bg-gradient-to-br from-candy-peach-50 to-candy-mint-50 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <Heart className="w-8 h-8 text-pink-500" />
              <h2 className="text-3xl font-bold text-candy-cocoa-800">From the Creator</h2>
            </div>
            <p className="text-lg text-candy-cocoa-600 leading-relaxed mb-4">
              This site was built with love by <strong className="text-purple-500">Lee</strong>, a passionate student of psychology and human behaviour. 
              It's not just a quiz — it's a mirror into your emotional flavour.
            </p>
            <p className="text-lg text-candy-cocoa-600 leading-relaxed">
              Love by Flavour was born from a simple observation: we all have patterns in dating, 
              but most of us can't see them clearly. By using fruit and flavor metaphors, we make 
              complex psychology accessible and memorable. My goal is to help you understand your 
              romantic personality, recognize your patterns, and make conscious choices about love.
            </p>
          </CardContent>
        </Card>

        {/* The Science */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-pink-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Brain className="w-8 h-8 text-purple-500" />
                <h3 className="text-2xl font-bold text-candy-cocoa-800">The Science</h3>
              </div>
              <p className="text-candy-cocoa-600 mb-4">
                Our flavor system is grounded in established psychological research:
              </p>
              <ul className="space-y-2 text-candy-cocoa-600">
                <li>• <strong className="text-purple-500">Big Five Personality Traits</strong> - The gold standard in personality psychology</li>
                <li>• <strong className="text-purple-500">Attachment Theory</strong> - How we bond and connect in relationships</li>
                <li>• <strong className="text-purple-500">Behavioral Patterns</strong> - Recognizing cycles in dating choices</li>
                <li>• <strong className="text-purple-500">Relationship Research</strong> - What actually predicts compatibility</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-pink-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-8 h-8 text-pink-500" />
                <h3 className="text-2xl font-bold text-candy-cocoa-800">Why Metaphors Work</h3>
              </div>
              <p className="text-candy-cocoa-600 mb-4">
                We chose food metaphors because they're:
              </p>
              <ul className="space-y-2 text-candy-cocoa-600">
                <li>• <strong className="text-pink-500">Intuitive</strong> - Everyone understands flavors and preferences</li>
                <li>• <strong className="text-pink-500">Non-judgmental</strong> - No flavor is "better" than another</li>
                <li>• <strong className="text-pink-500">Memorable</strong> - Easier to remember than clinical terms</li>
                <li>• <strong className="text-pink-500">Shareable</strong> - Fun to discuss with friends and partners</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Meet the Flavors */}
        <Card className="mb-16 border-pink-200 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <Users className="w-8 h-8 text-purple-500" />
              <h3 className="text-2xl font-bold text-candy-cocoa-800">Meet the Fourteen Flavors</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍦</div>
                <h4 className="font-semibold text-candy-cocoa-800">Vanilla</h4>
                <p className="text-xs text-candy-cocoa-500">Steady & Loyal</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍓</div>
                <h4 className="font-semibold text-candy-cocoa-800">Strawberry</h4>
                <p className="text-xs text-candy-cocoa-500">Hopeless Romantic</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍫</div>
                <h4 className="font-semibold text-candy-cocoa-800">Chocolate</h4>
                <p className="text-xs text-candy-cocoa-500">Intense & Deep</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍌</div>
                <h4 className="font-semibold text-candy-cocoa-800">Banana</h4>
                <p className="text-xs text-candy-cocoa-500">Energetic & Optimistic</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🌿</div>
                <h4 className="font-semibold text-candy-cocoa-800">Mint</h4>
                <p className="text-xs text-candy-cocoa-500">Fresh & Independent</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍒</div>
                <h4 className="font-semibold text-candy-cocoa-800">Cherry</h4>
                <p className="text-xs text-candy-cocoa-500">Sweet & Playful</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍬</div>
                <h4 className="font-semibold text-candy-cocoa-800">Bubblegum</h4>
                <p className="text-xs text-candy-cocoa-500">Youthful & Spontaneous</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">☕</div>
                <h4 className="font-semibold text-candy-cocoa-800">Coffee</h4>
                <p className="text-xs text-candy-cocoa-500">Sophisticated & Driven</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍉</div>
                <h4 className="font-semibold text-candy-cocoa-800">Watermelon</h4>
                <p className="text-xs text-candy-cocoa-500">Refreshing & Social</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍋</div>
                <h4 className="font-semibold text-candy-cocoa-800">Lemon</h4>
                <p className="text-xs text-candy-cocoa-500">Zesty & Bold</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🥥</div>
                <h4 className="font-semibold text-candy-cocoa-800">Coconut</h4>
                <p className="text-xs text-candy-cocoa-500">Exotic & Mysterious</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍇</div>
                <h4 className="font-semibold text-candy-cocoa-800">Grape</h4>
                <p className="text-xs text-candy-cocoa-500">Refined & Sophisticated</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🍍</div>
                <h4 className="font-semibold text-candy-cocoa-800">Pineapple</h4>
                <p className="text-xs text-candy-cocoa-500">Wild & Adventurous</p>
              </div>
              <div className="text-center p-3">
                <div className="text-3xl mb-2">🥭</div>
                <h4 className="font-semibold text-candy-cocoa-800">Mango</h4>
                <p className="text-xs text-candy-cocoa-500">Flirty & Magnetic</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
              Ready to Discover Your Flavor?
            </span>
          </h3>
          <p className="text-xl text-pink-400 mb-8 max-w-2xl mx-auto">
            Take our quiz to understand your romantic personality and start breaking your dating patterns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg">
              <Link to="/quiz">Take the Quiz</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 border-pink-300 text-candy-cocoa-700 hover:bg-pink-50">
              <Link to="/compatibility">Check Compatibility</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;