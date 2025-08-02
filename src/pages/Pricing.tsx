import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import NewBrandLogo from "@/components/NewBrandLogo";
import { 
  Heart, 
  Brain, 
  Sparkles, 
  Check, 
  Crown, 
  Zap, 
  Users, 
  TrendingUp,
  Lock,
  Unlock,
  Star,
  Gift,
  Shield,
  Palette,
  MessageCircle,
  BarChart3,
  Infinity,
  ArrowRight
} from "lucide-react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      emoji: '🥄',
      subtitle: 'Taste Your Flavour',
      description: 'Perfect for discovering your basic dating personality',
      price: { monthly: 0, annual: 0 },
      popular: false,
      gradient: 'bg-gradient-to-br from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      buttonStyle: 'bg-gray-600 hover:bg-gray-700 text-white',
      buttonText: 'Start for Free',
      features: [
        { icon: Heart, text: '1 Personality Quiz', included: true },
        { icon: Palette, text: 'Basic Flavour Result', included: true },
        { icon: Users, text: 'Limited Compatibility Matches', included: true },
        { icon: Brain, text: 'AI Analysis of Past Partners', included: false },
        { icon: BarChart3, text: 'Pattern Recognition', included: false },
        { icon: Crown, text: 'Premium Insights', included: false }
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      emoji: '🍨',
      subtitle: 'Unlock Your Patterns',
      description: 'Discover why you\'re attracted to certain types and break toxic cycles',
      price: { monthly: 4.99, annual: 3.99 },
      popular: true,
      gradient: 'bg-gradient-to-br from-purple-100 to-pink-100',
      borderColor: 'border-purple-300',
      buttonStyle: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white',
      buttonText: 'Go Premium',
      features: [
        { icon: Infinity, text: 'Unlimited Quizzes', included: true },
        { icon: Brain, text: 'AI Compatibility Engine', included: true },
        { icon: Palette, text: 'Flavour Moodboard Unlock', included: true },
        { icon: Users, text: 'Store up to 3 Ex-Partners', included: true },
        { icon: MessageCircle, text: 'Bonus Blog Content Access', included: true },
        { icon: BarChart3, text: 'Dating Pattern Analysis', included: true }
      ]
    },
    {
      id: 'vip',
      name: 'VIP',
      emoji: '🍓',
      subtitle: 'Decode Your Destiny',
      description: 'Unlock your complete romantic blueprint and get personalized guidance',
      price: { monthly: 11.99, annual: 8.99 },
      popular: false,
      gradient: 'bg-gradient-to-br from-pink-100 to-red-100',
      borderColor: 'border-pink-400',
      buttonStyle: 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white',
      buttonText: 'Unlock VIP',
      features: [
        { icon: Star, text: 'Everything in Premium', included: true },
        { icon: Unlock, text: 'Hidden Flavours & Rare Combos', included: true },
        { icon: Zap, text: 'Real-time LBF Analysis', included: true },
        { icon: MessageCircle, text: 'Weekly Personalized Advice', included: true },
        { icon: Infinity, text: 'Unlimited Ex-Partner Analysis', included: true },
        { icon: Crown, text: 'Priority Feature Access', included: true },
        { icon: Gift, text: 'Early Access & Exclusive Badges', included: true }
      ]
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.price.monthly === 0) return 'Free';
    const price = isAnnual ? plan.price.annual : plan.price.monthly;
    return `£${price.toFixed(2)}`;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.price.monthly === 0) return null;
    const monthlyTotal = plan.price.monthly * 12;
    const annualTotal = plan.price.annual * 12;
    const savings = monthlyTotal - annualTotal;
    return savings > 0 ? `Save £${savings.toFixed(2)}` : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/">
            <NewBrandLogo variant="full" size="lg" />
          </Link>
          <Link to="/quiz">
            <Button variant="outline" className="hidden md:flex">
              Try Free Quiz
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-800">
            <Sparkles className="w-3 h-3 mr-1" />
            Psychology-Powered Insights
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Unlock Your Love Story
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Stop repeating the same dating mistakes. Discover your patterns, understand your attractions, 
            and find who you're <strong className="text-purple-500">actually</strong> meant for.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-lg font-medium ${!isAnnual ? 'text-purple-600' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-purple-500"
            />
            <span className={`text-lg font-medium ${isAnnual ? 'text-purple-600' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 animate-pulse">
                Save up to 25%
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={plan.id} 
              className={`relative border-2 ${plan.borderColor} ${plan.gradient} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-4 ring-purple-200 ring-opacity-50' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-bold">
                    <Crown className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-4 animate-bounce">{plan.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <p className="text-lg font-semibold text-purple-600 mb-2">{plan.subtitle}</p>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <div className="text-4xl font-black text-gray-800">
                    {getPrice(plan)}
                    {plan.price.monthly > 0 && (
                      <span className="text-lg font-normal text-gray-500">
                        /{isAnnual ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {isAnnual && getSavings(plan) && (
                    <div className="text-sm text-green-600 font-medium mt-1">
                      {getSavings(plan)}
                    </div>
                  )}
                </div>
                
                <Button className={`w-full py-3 text-lg font-bold ${plan.buttonStyle} shadow-lg hover:shadow-xl transition-all duration-300`}>
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardHeader>
              
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          feature.included 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {feature.included ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Lock className="w-3 h-3" />
                          )}
                        </div>
                        <IconComponent className={`w-4 h-4 ${
                          feature.included ? 'text-purple-500' : 'text-gray-400'
                        }`} />
                        <span className={`text-sm ${
                          feature.included ? 'text-gray-700' : 'text-gray-400'
                        }`}>
                          {feature.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Social Proof & Trust */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-black text-purple-600 mb-2">94%</div>
              <p className="text-gray-600">Better understand their patterns</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-pink-600 mb-2">87%</div>
              <p className="text-gray-600">Make healthier dating choices</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-red-600 mb-2">76%</div>
              <p className="text-gray-600">Find more compatible matches</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Still Wondering If This Is Right for You?
              </h2>
              <p className="text-gray-600 mb-6">
                Start with our free quiz to see how accurate our psychology-based insights really are. 
                No commitment, just pure self-discovery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/quiz">
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8">
                    <Heart className="w-4 h-4 mr-2" />
                    Try Free Quiz
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="px-8">
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
          <Shield className="w-4 h-4" />
          <span>Powered by real psychology + AI. No random results.</span>
        </div>
        <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
          <Link to="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-600">Terms of Service</Link>
          <Link to="/about" className="hover:text-gray-600">About</Link>
        </div>
      </footer>
    </div>
  );
};

export default Pricing; 