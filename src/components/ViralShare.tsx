import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Copy, Download, Heart, Star, TrendingUp, Sparkles, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ViralShareProps {
  flavorName: string;
  flavorEmoji: string;
  flavorSubtitle: string;
  shareUrl: string;
  onDownload?: () => void;
}

export default function ViralShare({ 
  flavorName, 
  flavorEmoji, 
  flavorSubtitle, 
  shareUrl, 
  onDownload 
}: ViralShareProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const socialPlatforms = [
    {
      name: "TikTok",
      icon: "🎵",
      color: "bg-black text-white",
      shareText: `I just discovered I'm ${flavorName} ${flavorEmoji} on Love by Flavour! ${flavorSubtitle} #lovebyflavour #datingquiz #personalitytest`,
      url: "https://www.tiktok.com/share"
    },
    {
      name: "Instagram",
      icon: "📸",
      color: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      shareText: `Just found out I'm ${flavorName} ${flavorEmoji} on Love by Flavour! ${flavorSubtitle} 💕 #lovebyflavour #datingpersonality`,
      url: "https://www.instagram.com"
    },
    {
      name: "Twitter",
      icon: "🐦",
      color: "bg-blue-500 text-white",
      shareText: `I'm ${flavorName} ${flavorEmoji} on Love by Flavour! ${flavorSubtitle} #lovebyflavour #datingquiz`,
      url: "https://twitter.com/intent/tweet"
    },
    {
      name: "Snapchat",
      icon: "👻",
      color: "bg-yellow-400 text-black",
      shareText: `Just discovered I'm ${flavorName} ${flavorEmoji} on Love by Flavour! ${flavorSubtitle}`,
      url: "https://www.snapchat.com"
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied! 📋",
        description: "Share your result with friends!",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleSocialShare = (platform: typeof socialPlatforms[0]) => {
    const encodedText = encodeURIComponent(platform.shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let shareUrlWithParams = "";
    
    if (platform.name === "Twitter") {
      shareUrlWithParams = `${platform.url}?text=${encodedText}&url=${encodedUrl}`;
    } else if (platform.name === "TikTok") {
      // TikTok doesn't have a direct share URL, so we'll copy the text
      navigator.clipboard.writeText(platform.shareText);
      toast({
        title: "Text copied for TikTok! 🎵",
        description: "Paste this in your TikTok caption",
      });
      return;
    } else {
      // For other platforms, we'll copy the text
      navigator.clipboard.writeText(platform.shareText);
      toast({
        title: `Text copied for ${platform.name}!`,
        description: "Paste this in your post",
      });
      return;
    }

    if (shareUrlWithParams) {
      window.open(shareUrlWithParams, '_blank');
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    }
  };

  return (
    <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-primary/20 animate-fade-in">
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TrendingUp className="h-6 w-6 text-primary animate-pulse" />
            <h3 className="text-xl font-bold">Share Your Flavour! 🌟</h3>
            <Sparkles className="h-6 w-6 text-yellow-500 animate-bounce" />
          </div>
          <p className="text-muted-foreground">
            Join thousands sharing their results on social media!
          </p>
        </div>

        {/* Social Platform Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {socialPlatforms.map((platform) => (
            <Button
              key={platform.name}
              variant="outline"
              className={`${platform.color} hover:scale-105 transition-all duration-300 border-0`}
              onClick={() => handleSocialShare(platform)}
            >
              <span className="text-lg mr-2">{platform.icon}</span>
              <span className="text-sm font-medium">{platform.name}</span>
            </Button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleDownload}
            variant="viral"
            className="flex-1"
          >
            <Download className="mr-2 h-4 w-4" />
            Save Image
          </Button>
          
          <Button 
            onClick={handleCopyLink}
            variant={copied ? "default" : "outline"}
            className="flex-1"
          >
            {copied ? (
              <>
                <Star className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </>
            )}
          </Button>
        </div>

        {/* Viral Stats */}
        <div className="mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>2.1M+ shares</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span>Viral on TikTok</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>96% accuracy</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 