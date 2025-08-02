import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NewBrandLogo from "@/components/NewBrandLogo";
import { SupabaseService } from "@/lib/supabaseService";
import { useAuth } from "@/contexts/AuthContext";

import { 
  Heart, 
  Brain, 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Mail,
  Zap,
  Users,
  TrendingUp,
  Star,
  Calendar,
  Lock,
  Loader2,
  UserPlus,
  LogIn
} from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentFlavor, setCurrentFlavor] = useState(0);
  const [bubbles, setBubbles] = useState<Array<{ id: number; left: string; delay: string; size: string }>>([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 14 Complete Flavours with Enhanced Descriptions
  const flavorTypes = [
    { 
      emoji: "🍓", 
      name: "Strawberry", 
      trait: "Hopeless Romantic", 
      description: "You believe in fairy tale love and aren't afraid to wear your heart on your sleeve. You love grand gestures and deep emotional connections.",
      gradient: "bg-gradient-to-r from-pink-400 to-red-400",
      color: "#ec4899"
    },
    { 
      emoji: "🍦", 
      name: "Vanilla", 
      trait: "Steady & Loyal", 
      description: "You're the reliable one everyone can count on. You value stability, consistency, and long-term commitment over drama.",
      gradient: "bg-gradient-to-r from-yellow-100 to-yellow-200",
      color: "#fbbf24"
    },
    { 
      emoji: "🍫", 
      name: "Chocolate", 
      trait: "Intense & Deep", 
      description: "You feel everything deeply and aren't afraid of emotional complexity. You crave meaningful connections and authentic intimacy.",
      gradient: "bg-gradient-to-r from-amber-600 to-yellow-500",
      color: "#d97706"
    },
    { 
      emoji: "🍌", 
      name: "Banana", 
      trait: "Energetic & Optimistic", 
      description: "You're the sunshine in everyone's day. Naturally upbeat and encouraging, you bring out the best in your partners.",
      gradient: "bg-gradient-to-r from-yellow-400 to-yellow-500",
      color: "#eab308"
    },
    { 
      emoji: "🌿", 
      name: "Mint", 
      trait: "Fresh & Independent", 
      description: "You value your freedom and personal space. You're refreshingly honest and need a partner who respects your independence.",
      gradient: "bg-gradient-to-r from-green-400 to-teal-400",
      color: "#10b981"
    },
    { 
      emoji: "🍒", 
      name: "Cherry", 
      trait: "Sweet & Playful", 
      description: "You're flirty, fun, and know how to keep things exciting. You love the thrill of new romance and playful banter.",
      gradient: "bg-gradient-to-r from-red-400 to-pink-400",
      color: "#ef4444"
    },
    { 
      emoji: "🍬", 
      name: "Bubblegum", 
      trait: "Youthful & Spontaneous", 
      description: "You approach love with childlike wonder and spontaneity. You're fun-loving and bring out people's playful side.",
      gradient: "bg-gradient-to-r from-pink-300 to-purple-300",
      color: "#a855f7"
    },
    { 
      emoji: "☕", 
      name: "Coffee", 
      trait: "Sophisticated & Driven", 
      description: "You're ambitious and appreciate intellectual connection. You want a partner who can match your energy and ambition.",
      gradient: "bg-gradient-to-r from-amber-800 to-yellow-600",
      color: "#92400e"
    },
    { 
      emoji: "🍉", 
      name: "Watermelon", 
      trait: "Refreshing & Social", 
      description: "You're the life of the party and love bringing people together. You thrive in social settings and value community.",
      gradient: "bg-gradient-to-r from-green-400 to-pink-400",
      color: "#22c55e"
    },
    { 
      emoji: "🍋", 
      name: "Lemon", 
      trait: "Zesty & Bold", 
      description: "You're confident, outspoken, and not afraid to make the first move. You add excitement and energy to any relationship.",
      gradient: "bg-gradient-to-r from-yellow-300 to-yellow-400",
      color: "#facc15"
    },
    { 
      emoji: "🥥", 
      name: "Coconut", 
      trait: "Exotic & Mysterious", 
      description: "You're intriguingly complex with hidden depths. You take time to open up but offer rich, meaningful connections.",
      gradient: "bg-gradient-to-r from-amber-100 to-yellow-100",
      color: "#f59e0b"
    },
    { 
      emoji: "🍇", 
      name: "Grape", 
      trait: "Refined & Sophisticated", 
      description: "You appreciate quality and have refined tastes. You enjoy wine tastings, art galleries, and cultured experiences.",
      gradient: "bg-gradient-to-r from-purple-500 to-indigo-500",
      color: "#8b5cf6"
    },
    { 
      emoji: "🍍", 
      name: "Pineapple", 
      trait: "Wild & Adventurous", 
      description: "You're spontaneous and love excitement. You can't be tied down and always seek new adventures.",
      gradient: "bg-gradient-to-r from-yellow-400 to-orange-400",
      color: "#f59e0b"
    },
    { 
      emoji: "🥭", 
      name: "Mango", 
      trait: "Flirty & Magnetic", 
      description: "You're charming and love the thrill of the chase. You're naturally magnetic and draw people in.",
      gradient: "bg-gradient-to-r from-orange-400 to-red-400",
      color: "#f97316"
    }
  ];

  // Blog highlights for the bottom section
  const blogHighlights = [
    {
      title: "Why Your Dating Pattern Keeps Repeating",
      excerpt: "Understanding attachment styles can break toxic cycles",
      readTime: "3 min read",
      category: "Psychology"
    },
    {
      title: "The Science Behind Instant Chemistry",
      excerpt: "What happens in your brain during those first sparks",
      readTime: "4 min read", 
      category: "Science"
    },
    {
      title: "Red Flags vs. Different Flavours",
      excerpt: "How to tell the difference between incompatibility and toxicity",
      readTime: "5 min read",
      category: "Dating Tips"
    }
  ];

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        size: Math.random() > 0.5 ? 'w-2 h-2' : 'w-1 h-1'
      }));
      setBubbles(newBubbles);
    };

    generateBubbles();
    const interval = setInterval(generateBubbles, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Thanks for subscribing!",
      description: "We'll keep you updated on new features and insights.",
    });
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setAuthError('Please fill in all fields');
      return;
    }

    if (authMode === 'signup' && password.length < 6) {
      setAuthError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setAuthError(null);
    setAuthSuccess(null);

    try {
      console.log('Attempting authentication with:', { authMode, email: email.substring(0, 3) + '...' });
      
      if (authMode === 'signin') {
        const { data, error } = await SupabaseService.signIn(email, password);
        console.log('Sign in result:', { data: !!data, error });
        
        if (error) {
          setAuthError(error.message);
        } else {
          setAuthSuccess('Sign in successful!');
          toast({
            title: "Welcome back! 🎉",
            description: "You're now signed in to Love by Flavour",
          });
          setTimeout(() => {
            setIsAuthOpen(false);
            navigate('/quiz');
          }, 1000);
        }
      } else {
        const { data, error } = await SupabaseService.signUp(email, password);
        console.log('Sign up result:', { data: !!data, error });
        
        if (error) {
          setAuthError(error.message);
        } else {
          setAuthSuccess('Account created! Check your email for confirmation.');
          toast({
            title: "Account created! 🎉",
            description: "Please check your email to confirm your account",
          });
        }
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      setAuthError(err.message || 'Connection failed. Please check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetAuthForm = () => {
    setEmail('');
    setPassword('');
    setAuthError(null);
    setAuthSuccess(null);
    setIsLoading(false);
  };

  const openAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    resetAuthForm();
    setIsAuthOpen(true);
  };

  const nextFlavor = () => {
    setCurrentFlavor((prev) => (prev + 1) % flavorTypes.length);
  };

  const prevFlavor = () => {
    setCurrentFlavor((prev) => (prev - 1 + flavorTypes.length) % flavorTypes.length);
  };

  // Floating bubbles component
  const FloatingBubbles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={`absolute ${bubble.size} bg-white/20 rounded-full animate-bubble-float`}
          style={{
            left: bubble.left,
            animationDelay: bubble.delay,
            animationDuration: '8s'
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-candy-peach-50 via-candy-mint-50 to-candy-sky-50 relative">
      <FloatingBubbles />
      
      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <NewBrandLogo variant="full" size="lg" />
          <div className="flex items-center gap-4">
            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/about" className="text-candy-cocoa-700 hover:text-candy-cocoa-900 transition-colors">
                About
              </Link>
              <Link to="/blog" className="text-candy-cocoa-700 hover:text-candy-cocoa-900 transition-colors">
                Blog
              </Link>
              <Link to="/pricing" className="text-candy-cocoa-700 hover:text-candy-cocoa-900 transition-colors">
                Pricing
              </Link>
            </div>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-candy-cocoa-600 hidden sm:inline">
                  Welcome, {user.email?.split('@')[0]}!
                </span>
                <Link to="/quiz">
                  <Button size="sm" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => openAuth('signin')}
                  className="text-candy-cocoa-700 hover:text-candy-cocoa-900"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => openAuth('signup')}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                >
                  <UserPlus className="w-4 h-4 mr-1" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Authentication Modal */}
      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
              </div>
              Welcome to Love by Flavour
            </DialogTitle>
          </DialogHeader>

          <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'signin' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {authError && (
            <Alert variant="destructive">
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}

          {authSuccess && (
            <Alert>
              <AlertDescription>{authSuccess}</AlertDescription>
            </Alert>
          )}

          <div className="text-center text-sm text-muted-foreground">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm uppercase tracking-wider text-candy-cocoa-500 mb-4 font-medium">
            Find your Flavour. Decode your Chemistry.
          </p>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
              What Flavour Are You?
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-pink-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover your dating personality with our <strong className="text-purple-400">psychology-based quiz</strong>. 
            Find out why you're attracted to certain types and what flavour you actually need!
          </p>
        </div>
      </section>

      {/* Preview Flavours Section - NOW PROMINENT */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-candy-cocoa-800 mb-4">
            Meet the 14 Flavours
          </h2>
          <p className="text-lg text-candy-cocoa-600 max-w-2xl mx-auto">
            Each flavour represents a unique dating personality with distinct traits, patterns, and compatibility matches.
          </p>
        </div>

        {/* Flavour Grid - Mobile Scrollable, Desktop Grid */}
        <div className="md:hidden">
          {/* Mobile Carousel */}
          <div className="relative">
            <Card className="mx-4 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">{flavorTypes[currentFlavor].emoji}</div>
                <h3 className="text-2xl font-bold text-candy-cocoa-800 mb-2">
                  {flavorTypes[currentFlavor].name}
                </h3>
                <Badge variant="secondary" className="mb-4 bg-candy-peach-100 text-candy-peach-800">
                  {flavorTypes[currentFlavor].trait}
                </Badge>
                <p className="text-candy-cocoa-600 leading-relaxed">
                  {flavorTypes[currentFlavor].description}
                </p>
              </CardContent>
            </Card>
            
            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevFlavor}
                className="rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex gap-2">
                {flavorTypes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFlavor(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentFlavor ? 'bg-candy-peach-500' : 'bg-candy-peach-200'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextFlavor}
                className="rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {flavorTypes.map((flavor, index) => (
            <Card key={index} className="group hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl cursor-pointer">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {flavor.emoji}
                </div>
                <h3 className="font-bold text-candy-cocoa-800 text-sm mb-1">
                  {flavor.name}
                </h3>
                <p className="text-xs text-candy-cocoa-600">
                  {flavor.trait}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Take the Quiz CTA */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
                     <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-0 shadow-xl">
            <CardContent className="p-12">
              <div className="flex justify-center mb-6">
                <div className="bg-white rounded-full p-4 shadow-lg">
                  <Brain className="w-8 h-8 text-candy-peach-600" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-candy-cocoa-800 mb-4">
                Ready to Discover Your Flavour?
              </h2>
              
              <p className="text-lg text-candy-cocoa-600 mb-8 max-w-2xl mx-auto">
                Take our psychology-based quiz to unlock your dating personality, understand your patterns, and find your ideal matches.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <Link to="/quiz">
                    <Button size="lg" className="bg-gradient-to-r from-candy-peach-500 to-candy-mint-500 hover:from-candy-peach-600 hover:to-candy-mint-600 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                      <Heart className="w-5 h-5 mr-2" />
                      Take the Quiz
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    size="lg" 
                    onClick={() => openAuth('signup')}
                    className="bg-gradient-to-r from-candy-peach-500 to-candy-mint-500 hover:from-candy-peach-600 hover:to-candy-mint-600 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Take the Quiz
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
                
                <Link to="/about">
                  <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* AI Compatibility Engine Teaser */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-0 shadow-xl">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white rounded-full p-3 shadow-lg">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                    <Badge variant="secondary" className="bg-purple-200 text-purple-800">
                      AI-Powered
                    </Badge>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    AI Compatibility Engine
                  </h2>
                  
                  <p className="text-gray-600 mb-6">
                    Analyze your ex-partners' traits and discover your dating patterns. Our AI helps you understand why you're attracted to certain types and what you actually need for lasting love.
                  </p>
                  
                                     <div className="flex flex-col sm:flex-row gap-3">
                     <Link to="/ex-analysis">
                       <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                         <Brain className="w-4 h-4 mr-2" />
                         AI Analysis
                       </Button>
                     </Link>
                     <Link to="/match-predictor">
                       <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                         <Heart className="w-4 h-4 mr-2" />
                         Match Predictor
                       </Button>
                     </Link>
                   </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-2xl">🍓</div>
                      <div className="text-2xl">🍫</div>
                      <div className="text-2xl">🍋</div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">Your Pattern:</div>
                    <div className="text-lg font-semibold text-gray-800">
                      "You're drawn to intense, dramatic types"
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Blog Highlights */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-candy-cocoa-800 mb-4">
            Psychology Insights
          </h2>
          <p className="text-lg text-candy-cocoa-600">
            Dive deeper into the science of attraction and relationships
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {blogHighlights.map((post, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-candy-peach-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {post.excerpt}
                </p>
                
                <Link to="/blog" className="text-candy-peach-600 hover:text-candy-peach-700 text-sm font-medium flex items-center gap-1">
                  Read More
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>



      {/* Final CTA */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-candy-cocoa-800 mb-6">
            Your Love Story Starts with Understanding Your Flavour
          </h2>
          
          <p className="text-lg text-candy-cocoa-600 mb-8">
            Join thousands who've discovered their dating personality and found better relationships.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/quiz">
                <Button size="lg" className="bg-gradient-to-r from-candy-peach-500 to-candy-berry-500 hover:from-candy-peach-600 hover:to-candy-berry-600 text-white px-8 py-3 text-lg font-semibold shadow-lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Discover Your Flavour
                </Button>
              </Link>
            ) : (
              <Button 
                size="lg" 
                onClick={() => openAuth('signup')}
                className="bg-gradient-to-r from-candy-peach-500 to-candy-berry-500 hover:from-candy-peach-600 hover:to-candy-berry-600 text-white px-8 py-3 text-lg font-semibold shadow-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Discover Your Flavour
              </Button>
            )}
            
                         <Link to="/match-predictor">
               <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                 <Users className="w-4 h-4 mr-2" />
                 Find Your Matches
               </Button>
             </Link>
             
             <Link to="/pricing">
               <Button variant="ghost" size="lg" className="px-8 py-3 text-lg text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                 View Pricing
               </Button>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;