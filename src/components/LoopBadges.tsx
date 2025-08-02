import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Target, Heart } from "lucide-react";

interface LoopBadge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  dateUnlocked?: string;
}

const availableBadges: LoopBadge[] = [
  {
    id: "pattern-breaker",
    name: "Pattern Breaker",
    emoji: "🔓",
    description: "Completed your first pattern analysis",
    unlocked: false
  },
  {
    id: "mango-mayhem",
    name: "Escaped Mango Mayhem",
    emoji: "🥭",
    description: "Broke free from adventure-seeking chaos cycles",
    unlocked: false
  },
  {
    id: "berry-drama",
    name: "No More Berry Drama",
    emoji: "🫐",
    description: "Overcame emotional intensity addiction",
    unlocked: false
  },
  {
    id: "vanilla-burnout",
    name: "Vanilla Burnout Survivor",
    emoji: "🍦",
    description: "Found balance between stability and excitement",
    unlocked: false
  },
  {
    id: "chocolate-chaos",
    name: "Chocolate Chaos Warrior",
    emoji: "🍫",
    description: "Conquered the intensity-avoidance cycle",
    unlocked: false
  },
  {
    id: "cherry-drama",
    name: "Cherry Drama Detox",
    emoji: "🍒",
    description: "Learned to love without the theatrical ups and downs",
    unlocked: false
  },
  {
    id: "coconut-cracker",
    name: "Coconut Cracker",
    emoji: "🥥",
    description: "Stopped chasing emotionally unavailable partners",
    unlocked: false
  },
  {
    id: "strawberry-stable",
    name: "Strawberry Stability Master",
    emoji: "🍓",
    description: "Found security without losing your passionate nature",
    unlocked: false
  },
  {
    id: "flavour-detective",
    name: "Flavour Detective",
    emoji: "🔍",
    description: "Analyzed 3+ relationship patterns",
    unlocked: false
  },
  {
    id: "healthy-choice",
    name: "Healthy Choice Champion",
    emoji: "🌟",
    description: "Chose a recommended flavour match and made it work",
    unlocked: false
  }
];

export default function LoopBadges() {
  const [badges, setBadges] = useState<LoopBadge[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Load badges from localStorage
    const savedBadges = localStorage.getItem('love-by-flavour-badges');
    if (savedBadges) {
      try {
        const parsed = JSON.parse(savedBadges);
        setBadges(parsed);
      } catch (e) {
        // If parsing fails, start with default badges
        setBadges(availableBadges);
      }
    } else {
      // Auto-unlock "Pattern Breaker" badge if user has completed analysis
      const hasCompletedAnalysis = localStorage.getItem('love-by-flavour-pattern-analysis');
      const updatedBadges = availableBadges.map(badge => ({
        ...badge,
        unlocked: badge.id === 'pattern-breaker' && !!hasCompletedAnalysis,
        dateUnlocked: badge.id === 'pattern-breaker' && hasCompletedAnalysis ? new Date().toISOString() : undefined
      }));
      setBadges(updatedBadges);
      localStorage.setItem('love-by-flavour-badges', JSON.stringify(updatedBadges));
    }
  }, []);

  const unlockBadge = (badgeId: string) => {
    setBadges(prev => {
      const updated = prev.map(badge => 
        badge.id === badgeId 
          ? { ...badge, unlocked: true, dateUnlocked: new Date().toISOString() }
          : badge
      );
      localStorage.setItem('love-by-flavour-badges', JSON.stringify(updated));
      return updated;
    });
  };

  const unlockedBadges = badges.filter(badge => badge.unlocked);
  const lockedBadges = badges.filter(badge => !badge.unlocked);
  const displayBadges = showAll ? badges : unlockedBadges;

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          Your Loop Badges
        </CardTitle>
        <p className="text-muted-foreground">
          Celebrate your journey to healthier relationships
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{unlockedBadges.length} Earned</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4 text-gray-400" />
            <span>{lockedBadges.length} Available</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {unlockedBadges.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-2">No badges yet!</h3>
            <p className="text-muted-foreground">
              Complete your first pattern analysis to unlock your first badge.
            </p>
          </div>
        ) : (
          <>
            {/* Unlocked Badges */}
            {unlockedBadges.length > 0 && (
              <div>
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Your Achievements ({unlockedBadges.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {unlockedBadges.map((badge) => (
                    <div 
                      key={badge.id}
                      className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800"
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">{badge.emoji}</div>
                        <Badge className="mb-2 bg-green-100 text-green-800 border-green-200">
                          {badge.name}
                        </Badge>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          {badge.description}
                        </p>
                        {badge.dateUnlocked && (
                          <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                            Unlocked {new Date(badge.dateUnlocked).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Toggle Button */}
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2"
              >
                {showAll ? "Hide Locked Badges" : `Show All Badges (${lockedBadges.length} to unlock)`}
              </Button>
            </div>

            {/* Locked Badges */}
            {showAll && lockedBadges.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Available to Unlock ({lockedBadges.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lockedBadges.map((badge) => (
                    <div 
                      key={badge.id}
                      className="p-4 rounded-lg bg-gray-50 dark:bg-gray-950/20 border border-gray-200 dark:border-gray-800 opacity-60"
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2 grayscale">{badge.emoji}</div>
                        <Badge variant="outline" className="mb-2">
                          {badge.name}
                        </Badge>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6">
          <h3 className="font-semibold mb-2">Keep Growing! 🌱</h3>
          <p className="text-sm text-muted-foreground">
            Each badge represents a real step toward healthier relationships. 
            The more you understand your patterns, the better your choices become.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}