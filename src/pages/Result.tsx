import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, Share2, ArrowLeft, RefreshCcw, Users, AlertTriangle, Lightbulb, Sparkles, Flame, Shield, Eye, EyeOff, Crown, Gift, Star, Zap, TrendingUp, Download, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ResultCard from "@/components/ResultCard";
import html2canvas from "html2canvas";

interface FlavorData {
  emoji: string;
  name: string;
  subtitle: string;
  description: string;
  personalitySummary: string;
  hobbies: string[];
  loveLanguage: string;
  attachmentStyle: string;
  inBedVibe: string;
  redFlags: string[];
  idealMatches: string[];
  toxicPairings: string[];
  bigFiveTraits: {
    openness: string;
    conscientiousness: string;
    extraversion: string;
    agreeableness: string;
    neuroticism: string;
  };
  mbtiType?: string;
  enneagramType?: string;
  specificBehaviors?: string[];
  datingPatterns: string[];
  advice: string;
  patternBreaker: string;
  color: string;
}

const flavors: Record<string, FlavorData> = {
  vanilla: {
    emoji: "🍦",
    name: "Vanilla",
    subtitle: "The Steady Romantic",
    description: "You're the introvert who still believes in soulmates. Traditional yet genuine, you prefer depth over drama and consistency over chaos.",
    personalitySummary: "You're someone who values stability and loyalty above all else in relationships. You believe in taking things slow, building trust gradually, and creating a solid foundation before diving deep.",
    hobbies: ["Reading romantic novels", "Cozy movie nights", "Gardening", "Cooking comfort food", "Board games", "Long walks"],
    loveLanguage: "Acts of Service and Quality Time",
    attachmentStyle: "Secure with slight avoidant tendencies",
    inBedVibe: "More slow burn than spontaneous - you prefer emotional connection before physical intimacy",
    redFlags: ["Avoiding conflict to keep peace", "Becoming too comfortable in routine", "Suppressing your own needs to maintain harmony"],
    idealMatches: ["Banana", "Strawberry", "Mint"],
    toxicPairings: ["Cherry", "Pineapple"],
    bigFiveTraits: {
      openness: "Moderate - open to new experiences but prefer familiar territory",
      conscientiousness: "High - organized, reliable, and goal-oriented",
      extraversion: "Low-Moderate - enjoy socializing but need alone time to recharge",
      agreeableness: "High - cooperative, trusting, and empathetic",
      neuroticism: "Low - emotionally stable and calm under pressure"
    },
    mbtiType: "ISFJ - The Protector (caring, loyal, detail-oriented)",
    enneagramType: "Type 2 - The Helper (supportive, relationship-focused)",
    specificBehaviors: ["Prefers Netflix nights over clubbing", "Always remembers anniversaries and birthdays", "Keeps a tidy, cozy living space", "Enjoys cooking comfort food for loved ones", "Saves screenshots of cute couple posts"],
    datingPatterns: ["Taking relationships slowly", "Avoiding people who seem 'complicated'", "Prioritizing emotional safety over excitement"],
    advice: "Your stability is a gift, but don't let it become stagnation. Practice expressing your desires more openly, even when it feels uncomfortable.",
    patternBreaker: "Next time someone interesting seems 'too intense,' give them one genuine conversation before writing them off. Your calm energy can handle more than you think.",
    color: "bg-gradient-to-br from-blue-50 to-purple-50"
  },
  strawberry: {
    emoji: "🍓",
    name: "Strawberry",
    subtitle: "The Romantic Dreamer",
    description: "You're the hopeless romantic who feels everything deeply. Sweet, sensitive, and endlessly optimistic about love despite past heartbreaks.",
    personalitySummary: "You wear your heart on your sleeve and believe in fairy tale romance. You're incredibly empathetic and intuitive, often knowing what your partner needs before they do.",
    hobbies: ["Writing poetry or journaling", "Watching romantic movies", "Creating Pinterest boards", "Buying thoughtful gifts", "Dancing alone to love songs", "Planning surprise dates"],
    loveLanguage: "Words of Affirmation and Gift Giving",
    attachmentStyle: "Anxious - you crave deep connection but worry about abandonment",
    inBedVibe: "Passionate and emotionally intense - you need to feel loved and desired",
    redFlags: ["Ignoring red flags because you see potential", "Over-giving to undeserving partners", "Taking everything personally"],
    idealMatches: ["Banana", "Vanilla", "Coconut"],
    toxicPairings: ["Cherry", "Mango", "Pineapple"],
    bigFiveTraits: {
      openness: "High - imaginative, creative, and open to new emotional experiences",
      conscientiousness: "Moderate - can be organized when motivated but often distracted by feelings",
      extraversion: "Moderate-High - social and expressive but can be shy when hurt",
      agreeableness: "Very High - extremely empathetic and accommodating",
      neuroticism: "High - sensitive to criticism and prone to emotional ups and downs"
    },
    mbtiType: "ENFP - The Campaigner (enthusiastic, creative, people-focused)",
    enneagramType: "Type 4 - The Individualist (romantic, emotionally deep)",
    specificBehaviors: ["Screenshots love quotes for Instagram stories", "Plans elaborate surprise dates", "Cries at romantic movies (happy tears)", "Keeps a relationship vision board", "Writes long, heartfelt texts at 2am"],
    datingPatterns: ["Falling for potential rather than reality", "Putting partners on pedestals", "Sacrificing boundaries for love"],
    advice: "Your capacity for love is beautiful, but learn to love yourself with the same intensity. Set boundaries and stick to them.",
    patternBreaker: "Before your next relationship, write down your non-negotiables and refer to them when those butterflies make you want to compromise your standards.",
    color: "bg-gradient-to-br from-pink-50 to-red-50"
  },
  chocolate: {
    emoji: "🍫",
    name: "Chocolate",
    subtitle: "The Intense Enigma",
    description: "You're the complex one who craves deep, transformative connections. Passionate, mysterious, and slightly addictive to those who can handle your intensity.",
    personalitySummary: "You don't do surface-level anything. You're drawn to psychological depth, intense conversations, and relationships that challenge you to grow.",
    hobbies: ["Psychology books", "Dark academia aesthetics", "Deep conversations at 2am", "Exploring taboo topics", "Art therapy", "Solo travel to mysterious places"],
    loveLanguage: "Physical Touch and Quality Time",
    attachmentStyle: "Disorganized - you crave intimacy but fear being truly known",
    inBedVibe: "Intense and passionate - you use physical intimacy to express emotions you can't verbalize",
    redFlags: ["Creating drama to feel alive", "Testing partners' commitment through conflict", "Pushing people away when they get too close"],
    idealMatches: ["Mint", "Coffee", "Banana"],
    toxicPairings: ["Cherry", "Another Chocolate"],
    bigFiveTraits: {
      openness: "Very High - constantly seeking new experiences and deeper understanding",
      conscientiousness: "Low-Moderate - can be impulsive and scattered when emotional",
      extraversion: "Moderate - selective about who gets your energy",
      agreeableness: "Moderate - can be challenging but ultimately caring",
      neuroticism: "High - emotionally reactive and prone to overthinking"
    },
    mbtiType: "INFP - The Mediator (introspective, idealistic, values-driven)",
    enneagramType: "Type 8 - The Challenger (intense, passionate, protective)",
    specificBehaviors: ["Prefers deep 3am conversations over small talk", "Collects vintage books and dark academia aesthetics", "Listens to indie music and obscure podcasts", "Journals extensively about relationships", "Needs alone time to process emotions"],
    datingPatterns: ["Attracting unavailable or damaged partners", "Sabotaging good relationships when they feel 'too easy'", "Using conflict to create intimacy"],
    advice: "Your depth is a superpower, but learn to communicate your needs without creating chaos. Practice vulnerability without testing.",
    patternBreaker: "When you feel the urge to create drama or test someone, pause and ask yourself: 'What am I really afraid of?' Then communicate that fear directly.",
    color: "bg-gradient-to-br from-amber-50 to-orange-50"
  },

  coconut: {
    emoji: "🥥",
    name: "Coconut",
    subtitle: "The Gentle Idealist",
    description: "You're the soft-spoken dreamer who avoids conflict but loves deeply. Gentle, introspective, and surprisingly strong beneath your calm exterior.",
    personalitySummary: "You prefer harmony over confrontation and seek partners who appreciate your gentle nature. You're deeply empathetic and often put others' needs before your own.",
    hobbies: ["Meditation and mindfulness", "Nature photography", "Reading philosophy", "Gentle yoga", "Volunteering", "Quiet cafes and bookstores"],
    loveLanguage: "Acts of Service and Quality Time",
    attachmentStyle: "Secure with avoidant tendencies - you value independence while craving connection",
    inBedVibe: "Tender and emotionally connected - you prefer intimacy that feels safe and loving",
    redFlags: ["Avoiding necessary conflicts", "Suppressing your own needs", "Staying in situations that drain you"],
    idealMatches: ["Strawberry", "Vanilla", "Coffee"],
    toxicPairings: ["Cherry", "Mango", "Pineapple"],
    bigFiveTraits: {
      openness: "High - appreciate beauty, art, and philosophical discussions",
      conscientiousness: "High - reliable, thoughtful, and detail-oriented",
      extraversion: "Low - prefer small groups and meaningful one-on-one connections",
      agreeableness: "Very High - extremely considerate and accommodating",
      neuroticism: "Low-Moderate - generally calm but can internalize stress"
    },
    datingPatterns: ["Attracting people who need 'fixing'", "Avoiding partners who seem too intense", "Giving too much without receiving"],
    advice: "Your gentleness is a strength, not a weakness. Learn to set boundaries without feeling guilty - the right person will respect them.",
    patternBreaker: "Practice saying 'no' to small requests without over-explaining. Start building your 'no' muscle in low-stakes situations.",
    color: "bg-gradient-to-br from-green-50 to-blue-50"
  },
  cherry: {
    emoji: "🍒",
    name: "Cherry",
    subtitle: "The Magnetic Firecracker",
    description: "You're the attention-seeking charmer with high highs and low lows. Flirtatious, dramatic, and irresistibly captivating when you want to be.",
    personalitySummary: "You live for excitement and attention. You're the life of the party, naturally flirtatious, and can make anyone feel special - but you struggle with consistency.",
    hobbies: ["Social media content creation", "Dancing and performing", "Shopping and fashion", "Party planning", "Karaoke nights", "Networking events"],
    loveLanguage: "Words of Affirmation and Physical Touch",
    attachmentStyle: "Anxious - you need constant reassurance and validation",
    inBedVibe: "Playful and attention-seeking - you love being desired and admired",
    redFlags: ["Seeking validation from multiple sources", "Creating drama when feeling ignored", "Struggling with emotional regulation"],
    idealMatches: ["Mint", "Mango", "Pineapple"],
    toxicPairings: ["Vanilla", "Coconut", "Banana"],
    bigFiveTraits: {
      openness: "High - love new experiences and being the center of attention",
      conscientiousness: "Low - impulsive and struggle with routine",
      extraversion: "Very High - energetic, talkative, and thrive in social situations",
      agreeableness: "Moderate - can be charming but self-centered",
      neuroticism: "High - emotionally volatile and sensitive to rejection"
    },
    datingPatterns: ["Using flirtation to boost self-esteem", "Creating love triangles unconsciously", "Struggling with commitment when attention wanes"],
    advice: "Your magnetism is real, but learn to find validation from within. Practice consistency in your emotions and commitments.",
    patternBreaker: "Next time you feel the urge to flirt for validation, pause and ask yourself what you're really seeking. Then ask for it directly from your partner.",
    color: "bg-gradient-to-br from-red-50 to-pink-50"
  },
  mint: {
    emoji: "🍃",
    name: "Mint",
    subtitle: "The Balanced Strategist",
    description: "You're the logical one who still believes in love. Balanced, emotionally intelligent, and refreshingly straightforward in your approach to relationships.",
    personalitySummary: "You approach love with both your heart and your head. You're emotionally stable, communicate clearly, and seek partnerships based on mutual respect and shared goals.",
    hobbies: ["Strategy games", "Fitness routines", "Reading non-fiction", "Organizing social events", "Learning new skills", "Outdoor activities"],
    loveLanguage: "Quality Time and Acts of Service",
    attachmentStyle: "Secure - you're comfortable with intimacy and independence",
    inBedVibe: "Considerate and attentive - you focus on mutual pleasure and connection",
    redFlags: ["Being too logical about emotions", "Avoiding highly emotional partners", "Overthinking relationship decisions"],
    idealMatches: ["Chocolate", "Cherry", "Vanilla"],
    toxicPairings: ["Highly chaotic combinations"],
    bigFiveTraits: {
      openness: "Moderate-High - curious but practical about new experiences",
      conscientiousness: "High - organized, reliable, and goal-oriented",
      extraversion: "Moderate-High - social but selective about energy investment",
      agreeableness: "High - cooperative and considerate",
      neuroticism: "Low - emotionally stable and resilient"
    },
    datingPatterns: ["Taking time to evaluate compatibility", "Seeking equal partnerships", "Avoiding drama-filled relationships"],
    advice: "Your balance is rare and valuable. Don't let others make you feel boring for wanting healthy, stable love.",
    patternBreaker: "Allow yourself to be a little more spontaneous in low-risk situations. Your stability can handle some chaos.",
    color: "bg-gradient-to-br from-emerald-50 to-teal-50"
  },
  cherry: {
    emoji: "🍒",
    name: "Cherry",
    subtitle: "The Sweet & Playful",
    description: "You're flirty and fun with a hint of mischief. You love games, parties, and keeping things exciting in relationships.",
    personalitySummary: "You're the life of the party who brings joy and excitement wherever you go. You're naturally flirty and love the thrill of new romance.",
    hobbies: ["Dancing", "Party planning", "Social media", "Fashion", "Karaoke", "Game nights"],
    loveLanguage: "Physical Touch and Words of Affirmation",
    attachmentStyle: "Anxious - you love attention and validation from partners",
    inBedVibe: "Playful and experimental - you love trying new things and keeping it fun",
    redFlags: ["Seeking constant validation", "Creating drama for attention", "Difficulty with serious conversations"],
    idealMatches: ["Watermelon", "Lemon", "Bubblegum"],
    toxicPairings: ["Vanilla", "Coconut", "Coffee"],
    bigFiveTraits: {
      openness: "High - love trying new experiences and meeting new people",
      conscientiousness: "Low-Moderate - spontaneous but can be scattered",
      extraversion: "Very High - energetic, social, and love being the center of attention",
      agreeableness: "High - friendly and accommodating",
      neuroticism: "Moderate-High - sensitive to rejection and mood swings"
    },
    datingPatterns: ["Falling fast and hard", "Loving the honeymoon phase", "Getting bored when things become routine"],
    advice: "Your joy is infectious, but learn to find validation from within. The right person will love your energy without you having to perform.",
    patternBreaker: "Practice having one serious conversation per week with your partner. Depth doesn't have to kill the fun.",
    color: "bg-gradient-to-br from-red-50 to-pink-50"
  },
  bubblegum: {
    emoji: "🍬",
    name: "Bubblegum",
    subtitle: "The Youthful Optimist",
    description: "You're young at heart and love trying new things. You bring joy and laughter wherever you go with your infectious optimism.",
    personalitySummary: "You see the world through rose-colored glasses and believe in the magic of love. You're spontaneous, fun, and always up for an adventure.",
    hobbies: ["Trying new restaurants", "Photo booths", "Concerts", "Crafting", "Social events", "Making TikToks"],
    loveLanguage: "Quality Time and Gift Giving",
    attachmentStyle: "Secure with anxious tendencies - you love deeply but sometimes worry",
    inBedVibe: "Sweet and adventurous - you love connection and trying new things together",
    redFlags: ["Avoiding serious topics", "Being naive about red flags", "Expecting constant happiness"],
    idealMatches: ["Cherry", "Watermelon", "Banana"],
    toxicPairings: ["Coffee", "Grape", "Coconut"],
    bigFiveTraits: {
      openness: "Very High - always excited about new experiences",
      conscientiousness: "Moderate - organized when it matters to you",
      extraversion: "High - social, optimistic, and energetic",
      agreeableness: "Very High - kind, trusting, and accommodating",
      neuroticism: "Low-Moderate - generally positive but can be sensitive"
    },
    datingPatterns: ["Seeing the best in everyone", "Moving quickly in relationships", "Avoiding conflict"],
    advice: "Your optimism is a gift, but don't ignore red flags just to keep things positive. It's okay to have standards.",
    patternBreaker: "Before your next relationship, make a list of your non-negotiables and stick to them, even when you're excited about someone.",
    color: "bg-gradient-to-br from-pink-50 to-purple-50"
  },
  coffee: {
    emoji: "☕",
    name: "Coffee",
    subtitle: "The Sophisticated Achiever",
    description: "You're ambitious and love deep conversations. You appreciate the finer things and seek intellectual connections in relationships.",
    personalitySummary: "You're driven, sophisticated, and value intelligence in yourself and others. You prefer quality over quantity in all aspects of life.",
    hobbies: ["Reading non-fiction", "Wine tasting", "Networking events", "Art galleries", "Learning new skills", "Morning routines"],
    loveLanguage: "Quality Time and Acts of Service",
    attachmentStyle: "Secure - you're confident and know what you want",
    inBedVibe: "Confident and attentive - you appreciate skill and emotional connection",
    redFlags: ["Being too critical of partners", "Prioritizing work over relationships", "Having unrealistic standards"],
    idealMatches: ["Grape", "Chocolate", "Mint"],
    toxicPairings: ["Cherry", "Bubblegum", "Watermelon"],
    bigFiveTraits: {
      openness: "High - intellectually curious and appreciate complexity",
      conscientiousness: "Very High - organized, goal-oriented, and disciplined",
      extraversion: "Moderate - social but selective about your energy",
      agreeableness: "Moderate - kind but have strong opinions",
      neuroticism: "Low - emotionally stable and confident"
    },
    datingPatterns: ["Taking time to evaluate compatibility", "Preferring established, successful partners", "Valuing intellectual connection"],
    advice: "Your standards are important, but make sure you're not using them to avoid vulnerability. The best connections often surprise us.",
    patternBreaker: "Go on a date with someone who intrigues you but isn't your 'usual type.' You might discover new dimensions of attraction.",
    color: "bg-gradient-to-br from-amber-50 to-yellow-50"
  },
  watermelon: {
    emoji: "🍉",
    name: "Watermelon",
    subtitle: "The Social Sunshine",
    description: "You're the life of the party and love summer vibes. You're naturally social and bring people together with your warm energy.",
    personalitySummary: "You're everyone's favorite person to be around. You're optimistic, social, and have a gift for making others feel included and valued.",
    hobbies: ["Hosting parties", "Beach days", "Group fitness", "Festivals", "Team sports", "Social volunteering"],
    loveLanguage: "Quality Time and Physical Touch",
    attachmentStyle: "Secure - you're comfortable with intimacy and independence",
    inBedVibe: "Warm and generous - you love making your partner feel good",
    redFlags: ["Avoiding alone time with partners", "Needing constant social stimulation", "Difficulty with serious conversations"],
    idealMatches: ["Cherry", "Bubblegum", "Lemon"],
    toxicPairings: ["Coconut", "Coffee", "Grape"],
    bigFiveTraits: {
      openness: "High - love new experiences and meeting new people",
      conscientiousness: "Moderate - organized for social events but can be scattered",
      extraversion: "Very High - energetic, social, and optimistic",
      agreeableness: "Very High - warm, friendly, and inclusive",
      neuroticism: "Low - emotionally stable and positive"
    },
    datingPatterns: ["Meeting partners through friends", "Preferring group dates initially", "Wanting partners who fit into your social circle"],
    advice: "Your social energy is amazing, but make sure to create intimate one-on-one time with your partner. Deep connections need privacy to grow.",
    patternBreaker: "Plan a date that's just you and your partner, no friends invited. Practice being vulnerable in intimate settings.",
    color: "bg-gradient-to-br from-green-50 to-pink-50"
  },
  lemon: {
    emoji: "🍋",
    name: "Lemon",
    subtitle: "The Bold & Confident",
    description: "You're confident and not afraid to speak your mind. You add excitement and energy to relationships with your bold personality.",
    personalitySummary: "You're a natural leader who knows what you want and isn't afraid to go after it. You're direct, confident, and refreshingly honest.",
    hobbies: ["Debate clubs", "Leadership roles", "Entrepreneurship", "Public speaking", "Competitive sports", "Challenging conversations"],
    loveLanguage: "Words of Affirmation and Physical Touch",
    attachmentStyle: "Secure with avoidant tendencies - you're independent and confident",
    inBedVibe: "Confident and direct - you know what you want and aren't shy about it",
    redFlags: ["Being too blunt or harsh", "Struggling to show vulnerability", "Dominating conversations"],
    idealMatches: ["Watermelon", "Cherry", "Grape"],
    toxicPairings: ["Strawberry", "Banana", "Coconut"],
    bigFiveTraits: {
      openness: "High - love intellectual challenges and new ideas",
      conscientiousness: "High - goal-oriented and organized",
      extraversion: "High - confident, assertive, and energetic",
      agreeableness: "Low-Moderate - honest but can be blunt",
      neuroticism: "Low - emotionally stable and confident"
    },
    datingPatterns: ["Taking charge in relationships", "Preferring partners who can challenge you", "Being direct about what you want"],
    advice: "Your confidence is attractive, but remember that vulnerability creates deeper connections. It's okay to let your guard down sometimes.",
    patternBreaker: "Practice sharing one insecurity or fear with your partner. Strength includes the courage to be vulnerable.",
    color: "bg-gradient-to-br from-yellow-50 to-orange-50"
  },
  coconut: {
    emoji: "🥥",
    name: "Coconut",
    subtitle: "The Mysterious Depth",
    description: "You're unique and have hidden depths. You love travel, culture, and meaningful experiences that expand your worldview.",
    personalitySummary: "You're the intriguing one with layers to discover. You're independent, cultured, and prefer deep connections over surface-level interactions.",
    hobbies: ["Solo travel", "Learning languages", "Cultural events", "Reading philosophy", "Meditation", "Unique experiences"],
    loveLanguage: "Quality Time and Acts of Service",
    attachmentStyle: "Avoidant - you value independence and take time to open up",
    inBedVibe: "Mysterious and intense - you prefer emotional connection before physical intimacy",
    redFlags: ["Being too mysterious or distant", "Avoiding emotional intimacy", "Having unrealistic expectations"],
    idealMatches: ["Grape", "Coffee", "Mint"],
    toxicPairings: ["Cherry", "Watermelon", "Bubblegum"],
    bigFiveTraits: {
      openness: "Very High - love new cultures, ideas, and experiences",
      conscientiousness: "High - thoughtful and deliberate in your choices",
      extraversion: "Low-Moderate - prefer small groups and meaningful conversations",
      agreeableness: "Moderate - kind but maintain your boundaries",
      neuroticism: "Low-Moderate - generally stable but can be moody"
    },
    datingPatterns: ["Taking time to trust", "Preferring unique or unconventional partners", "Valuing intellectual and cultural compatibility"],
    advice: "Your depth is attractive, but don't let your walls become so high that no one can reach you. Intimacy requires some risk.",
    patternBreaker: "Share something personal about yourself on the first three dates. Connection requires gradual vulnerability.",
    color: "bg-gradient-to-br from-amber-50 to-orange-50"
  },
  grape: {
    emoji: "🍇",
    name: "Grape",
    subtitle: "The Refined Connoisseur",
    description: "You appreciate quality and have refined tastes. You enjoy wine tastings, art galleries, and cultured experiences with sophisticated partners.",
    personalitySummary: "You're the sophisticated one who appreciates the finer things in life. You're intelligent, cultured, and seek partners who can match your depth.",
    hobbies: ["Wine tasting", "Art collecting", "Classical music", "Fine dining", "Literary discussions", "Museum visits"],
    loveLanguage: "Quality Time and Gift Giving",
    attachmentStyle: "Secure with slight avoidant tendencies - you're selective about partners",
    inBedVibe: "Sophisticated and sensual - you appreciate skill, technique, and emotional connection",
    redFlags: ["Being pretentious or elitist", "Having impossibly high standards", "Judging others' tastes"],
    idealMatches: ["Coffee", "Coconut", "Lemon"],
    toxicPairings: ["Cherry", "Bubblegum", "Watermelon"],
    bigFiveTraits: {
      openness: "Very High - intellectually curious and aesthetically sensitive",
      conscientiousness: "High - organized, deliberate, and quality-focused",
      extraversion: "Moderate - social but prefer sophisticated company",
      agreeableness: "Moderate - kind but have strong preferences",
      neuroticism: "Low-Moderate - generally stable but can be critical"
    },
    datingPatterns: ["Preferring established, cultured partners", "Taking time to evaluate compatibility", "Valuing intellectual and aesthetic connection"],
    advice: "Your refined taste is wonderful, but don't let it become a barrier to authentic connection. Sometimes the best love comes in unexpected packages.",
    patternBreaker: "Go on a casual, low-key date doing something completely outside your comfort zone. You might discover new sides of attraction.",
    color: "bg-gradient-to-br from-purple-50 to-indigo-50"
  },

  banana: {
    emoji: "🍌",
    name: "Banana",
    subtitle: "The Nurturing Giver",
    description: "You're the selfless caretaker who loves through action. Stable, nurturing, and sometimes give so much that you forget about yourself.",
    personalitySummary: "You're the partner everyone wishes they had. You're incredibly giving, emotionally mature, and create safe spaces for others to be vulnerable.",
    hobbies: ["Cooking for loved ones", "Volunteering", "Gardening", "Organizing gatherings", "Learning about wellness", "Supporting friends' goals"],
    loveLanguage: "Acts of Service and Physical Touch",
    attachmentStyle: "Secure - you're comfortable with intimacy and excellent at supporting others",
    inBedVibe: "Giving and attentive - you focus on your partner's pleasure and emotional connection",
    redFlags: ["Giving too much without receiving", "Enabling unhealthy behavior", "Losing yourself in relationships"],
    idealMatches: ["Strawberry", "Vanilla", "Chocolate"],
    toxicPairings: ["Mango", "Pineapple", "Cherry"],
    bigFiveTraits: {
      openness: "Moderate - open to new experiences but prefer meaningful ones",
      conscientiousness: "High - reliable, responsible, and thoughtful",
      extraversion: "Moderate - social but prefer meaningful connections",
      agreeableness: "Very High - extremely empathetic and accommodating",
      neuroticism: "Low - emotionally stable and supportive"
    },
    datingPatterns: ["Attracting people who need healing", "Over-giving to unappreciative partners", "Staying in relationships past their expiration date"],
    advice: "Your giving nature is beautiful, but make sure you're choosing partners who can give back equally. You deserve to be cared for too.",
    patternBreaker: "Practice asking for what you need directly, without feeling guilty. Start with small requests and work your way up.",
    color: "bg-gradient-to-br from-yellow-50 to-amber-50"
  },
  pineapple: {
    emoji: "🍍",
    name: "Pineapple",
    subtitle: "The Wild Adventurer",
    description: "You're the spontaneous free spirit who makes life exciting. Unpredictable, fun-loving, and allergic to anything that feels too routine or serious.",
    personalitySummary: "You live for excitement and hate feeling trapped. You're incredibly fun to be around but struggle with traditional relationship expectations and long-term commitment.",
    hobbies: ["Extreme sports", "Spontaneous travel", "Festival hopping", "Learning random skills", "Adventure photography", "Meeting new people"],
    loveLanguage: "Physical Touch and Quality Time (adventurous kind)",
    attachmentStyle: "Avoidant - you fear commitment will limit your freedom",
    inBedVibe: "Adventurous and experimental - you love trying new things and keeping it exciting",
    redFlags: ["Running when things get serious", "Avoiding deep emotional conversations", "Keeping multiple options open"],
    idealMatches: ["Mango", "Cherry", "Watermelon"],
    toxicPairings: ["Vanilla", "Coconut", "Coffee"],
    bigFiveTraits: {
      openness: "Very High - constantly seeking new experiences and challenges",
      conscientiousness: "Very Low - impulsive and struggle with routine",
      extraversion: "Very High - energetic, adventurous, and love stimulation",
      agreeableness: "Moderate - fun but can be selfish",
      neuroticism: "Moderate - generally optimistic but can be unpredictable"
    },
    mbtiType: "ESFP - The Entertainer (spontaneous, energetic, people-focused)",
    enneagramType: "Type 7 - The Enthusiast (adventure-seeking, fear of being trapped)",
    specificBehaviors: ["Books last-minute flights to random destinations", "Has tried every extreme sport at least once", "Changes plans constantly", "Collects passport stamps and adventure photos", "Can't sit still during movies"],
    datingPatterns: ["Keeping relationships casual", "Getting restless when things feel routine", "Avoiding partners who want traditional commitment"],
    advice: "Your zest for life is infectious, but consider that the right person will add to your adventures, not limit them.",
    patternBreaker: "Next time you feel trapped in a relationship, communicate your need for adventure instead of just disappearing.",
    color: "bg-gradient-to-br from-yellow-50 to-orange-50"
  },
  mango: {
    emoji: "🥭",
    name: "Mango",
    subtitle: "The Magnetic Charmer",
    description: "You're the emotionally intense thrill-seeker who loves hard and fast. Spontaneous, passionate, and always chasing the next exciting connection.",
    personalitySummary: "You live in the moment and love with reckless abandon. You're magnetic, exciting, and can make anyone feel like the most important person in the world - at least for a while.",
    hobbies: ["Salsa dancing", "Learning new languages", "Spontaneous adventures", "Intense workout sessions", "Traveling to exotic places", "Meeting interesting people"],
    loveLanguage: "Physical Touch and Words of Affirmation",
    attachmentStyle: "Anxious with avoidant tendencies - you want intensity but fear being trapped",
    inBedVibe: "Explosive passion and high energy - you're adventurous and spontaneous",
    redFlags: ["Love bombing in early stages", "Getting bored when the honeymoon phase ends", "Making impulsive relationship decisions"],
    idealMatches: ["Pineapple", "Cherry", "Lemon"],
    toxicPairings: ["Vanilla", "Coconut", "Coffee"],
    bigFiveTraits: {
      openness: "Very High - constantly seeking new experiences and stimulation",
      conscientiousness: "Low - impulsive and struggle with long-term planning",
      extraversion: "Very High - energetic, assertive, and attention-seeking",
      agreeableness: "Moderate - can be charming but self-focused",
      neuroticism: "High - emotionally reactive and prone to dramatic mood swings"
    },
    mbtiType: "ESTP - The Entrepreneur (energetic, spontaneous, action-oriented)",
    enneagramType: "Type 3 - The Achiever (image-conscious, driven, competitive)",
    specificBehaviors: ["Always has multiple dating apps active", "Plans elaborate first dates", "Gets jealous easily but won't admit it", "Posts thirst traps on social media", "Changes relationship status frequently"],
    datingPatterns: ["Jumping into relationships quickly", "Losing interest once the chase is over", "Seeking validation through multiple connections"],
    advice: "Your passion is intoxicating, but learn to appreciate the beauty of slow-burning love. Practice commitment when things feel 'boring.'",
    patternBreaker: "The next time you feel that 'bored' feeling in a good relationship, instead of looking elsewhere, plan something exciting WITH your partner.",
    color: "bg-gradient-to-br from-orange-50 to-red-50"
  }
};

export default function Result() {
  const { flavor } = useParams<{ flavor: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [revealedSections, setRevealedSections] = useState<Set<string>>(new Set());
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const flavorData = flavor ? flavors[flavor.toLowerCase()] : null;

  if (!flavorData) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Flavor Not Found</h2>
            <p className="text-muted-foreground mb-4">
              We couldn't find that flavor profile. Let's get you back on track!
            </p>
            <Button asChild>
              <Link to="/quiz">Take the Quiz</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleShare = async () => {
    if (cardRef.current) {
      try {
        // Export card as image
        const canvas = await html2canvas(cardRef.current, { 
          backgroundColor: null,
          scale: 2,
          useCORS: true
        });
        const dataUrl = canvas.toDataURL("image/png");
        const shareText = `I just discovered I'm ${flavorData.name} ${flavorData.emoji} on Love by Flavour! ${flavorData.subtitle}`;
        const shareUrl = window.location.href;
        const file = await fetch(dataUrl)
          .then(res => res.blob())
          .then(blob => new File([blob], "love-by-flavour-result.png", { type: "image/png" }));

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: 'My Love Flavour Result',
              text: shareText,
              url: shareUrl,
              files: [file],
            });
            toast({ title: "Shared successfully!", description: "Your result is now out in the world! 🌍" });
          } catch (error) {
            toast({ title: "Share cancelled", description: "You can still download your result!" });
          }
        } else {
          // Fallback: download image
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'love-by-flavour-result.png';
          link.click();
          toast({ title: "Image downloaded!", description: "Share it anywhere you like." });
        }
      } catch (error) {
        toast({ title: "Error sharing", description: "Try copying the link instead!" });
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied!", description: "Share your result with friends! 📋" });
  };

  const toggleSection = (section: string) => {
    const newRevealed = new Set(revealedSections);
    if (newRevealed.has(section)) {
      newRevealed.delete(section);
    } else {
      newRevealed.add(section);
    }
    setRevealedSections(newRevealed);
  };

  const isRevealed = (section: string) => revealedSections.has(section);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your email service
    console.log('Email submitted:', email);
    setShowEmailModal(false);
    setEmail("");
    toast({ title: "Welcome!", description: "You'll get your first dating tip in 5 minutes! 💌" });
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Enhanced Header */}
      <header className="bg-background/90 backdrop-blur-sm border-b border-border sticky top-0 z-10">
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
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleCopyLink}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Enhanced Main Result Card */}
          <div className="relative">
            <ResultCard
              ref={cardRef}
              emoji={flavorData.emoji}
              name={flavorData.name}
              subtitle={flavorData.subtitle}
              description={flavorData.description}
              color={flavorData.color}
            />
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleShare}
                className="shadow-md animate-fade-in"
              >
                <Download className="w-4 h-4 mr-2" /> Save
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => setShowPremiumModal(true)}
                className="shadow-md animate-fade-in"
              >
                <Crown className="w-4 h-4 mr-2" /> Premium
              </Button>
            </div>
          </div>

          {/* Enhanced Social Sharing Section */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 animate-fade-in">
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-bold mb-4">Share Your Flavour! 🌟</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands sharing their results on TikTok, Instagram, and more!
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Button onClick={handleShare} className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Result
                </Button>
                <Button variant="outline" onClick={handleCopyLink}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
                <Button variant="outline" onClick={() => setShowEmailModal(true)}>
                  <Gift className="mr-2 h-4 w-4" />
                  Get Dating Tips
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Personality Deep Dive */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Your Personality Deep Dive
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">{flavorData.personalitySummary}</p>
              
              {/* Reveal Button */}
              <Button 
                variant="outline" 
                onClick={() => toggleSection('personality')}
                className="w-full"
              >
                {isRevealed('personality') ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Reveal Your Psychology Profile
                  </>
                )}
              </Button>

              {isRevealed('personality') && (
                <div className="space-y-6 animate-fade-in">
                  {/* Big Five Traits */}
                  <div>
                    <h4 className="font-semibold mb-3 text-primary">Big Five Personality Traits</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Badge variant="secondary" className="text-xs">Openness</Badge>
                        <p className="text-sm text-muted-foreground">{flavorData.bigFiveTraits.openness}</p>
                      </div>
                      <div className="space-y-2">
                        <Badge variant="secondary" className="text-xs">Conscientiousness</Badge>
                        <p className="text-sm text-muted-foreground">{flavorData.bigFiveTraits.conscientiousness}</p>
                      </div>
                      <div className="space-y-2">
                        <Badge variant="secondary" className="text-xs">Extraversion</Badge>
                        <p className="text-sm text-muted-foreground">{flavorData.bigFiveTraits.extraversion}</p>
                      </div>
                      <div className="space-y-2">
                        <Badge variant="secondary" className="text-xs">Agreeableness</Badge>
                        <p className="text-sm text-muted-foreground">{flavorData.bigFiveTraits.agreeableness}</p>
                      </div>
                      <div className="space-y-2">
                        <Badge variant="secondary" className="text-xs">Neuroticism</Badge>
                        <p className="text-sm text-muted-foreground">{flavorData.bigFiveTraits.neuroticism}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Attachment & Love Style */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-primary">Attachment Style</h4>
                      <p className="text-muted-foreground">{flavorData.attachmentStyle}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-primary">Love Language</h4>
                      <p className="text-muted-foreground">{flavorData.loveLanguage}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Lifestyle & Hobbies */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Sweetest Strengths 🍭
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Your vibe includes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {flavorData.hobbies.map((hobby, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {hobby}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">In bed you're:</h4>
                  <p className="text-muted-foreground">{flavorData.inBedVibe}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Red Flags & Dating Patterns */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Sour Spots ⚠️
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                onClick={() => toggleSection('challenges')}
                className="w-full mb-4"
              >
                {isRevealed('challenges') ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide Your Challenges
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Reveal Your Dating Challenges
                  </>
                )}
              </Button>

              {isRevealed('challenges') && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <h4 className="font-semibold mb-2 text-orange-600">Common Red Flags</h4>
                    <ul className="space-y-1">
                      {flavorData.redFlags.map((flag, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-orange-600">Your Dating Patterns</h4>
                    <ul className="space-y-1">
                      {flavorData.datingPatterns.map((pattern, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-orange-500 mt-1">•</span>
                          {pattern}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Compatibility */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-red-500" />
                Love Matches 💘
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-600 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Ideal Matches
                  </h4>
                  <div className="space-y-2">
                    {flavorData.idealMatches.map((match, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-lg">{flavors[match.toLowerCase()]?.emoji}</span>
                        <span className="text-sm font-medium">{match}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-red-600 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Toxic Pairings
                  </h4>
                  <div className="space-y-2">
                    {flavorData.toxicPairings.map((toxic, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-lg opacity-50">{flavors[toxic.toLowerCase()]?.emoji}</span>
                        <span className="text-sm text-muted-foreground">{toxic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Advice & Pattern Breaker */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Your Growth Path 🌱
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-primary">Advice for Your Flavor</h4>
                <p className="text-muted-foreground">{flavorData.advice}</p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2 text-primary">Pattern Breaker Challenge</h4>
                <p className="text-muted-foreground italic">{flavorData.patternBreaker}</p>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Call to Action */}
          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-primary/20 animate-fade-in">
            <CardContent className="pt-6 text-center">
              <h3 className="text-xl font-bold mb-4">Ready to Break Your Dating Patterns? 🚀</h3>
              <p className="text-muted-foreground mb-6">
                Use our compatibility calculator, track your dating loops, 
                or explore our blog for deeper insights into dating psychology.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Button asChild>
                  <Link to="/compatibility">
                    Check Compatibility
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/loop-tracker">
                    Track Your Patterns
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/blog">
                    Read Our Blog
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full animate-fade-in">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Unlock Premium Insights! 👑</h3>
                <p className="text-muted-foreground">
                  Get your complete dating profile, compatibility reports, and personalized advice.
                </p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm">Complete personality breakdown</span>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-pink-500" />
                  <span className="text-sm">Detailed compatibility reports</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <span className="text-sm">Personalized dating advice</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Progress tracking tools</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  <Crown className="mr-2 h-4 w-4" />
                  Get Premium - $9.99/month
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowPremiumModal(false)}
                >
                  Maybe Later
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Email Collection Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full animate-fade-in">
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <Gift className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Get Free Dating Tips! 💌</h3>
                <p className="text-muted-foreground">
                  Join 50K+ people getting weekly insights on dating psychology, compatibility tips, and relationship advice.
                </p>
              </div>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Get Free Tips
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowEmailModal(false)}
                  >
                    Skip
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}