import React, { forwardRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResultCardProps {
  emoji: string;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  className?: string;
}

// Forward ref for html2canvas compatibility
const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(
  ({ emoji, name, subtitle, description, color, className = "" }, ref) => (
    <div ref={ref} className={`w-full max-w-md mx-auto ${className}`}>
      <Card className={`${color} border-2 border-primary/20 shadow-lg animate-fade-in`}>
        <CardContent className="pt-8 text-center">
          <div className="text-8xl mb-4 animate-scale-in">{emoji}</div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            {name}
          </h1>
          <p className="text-lg font-semibold text-primary mb-2">{subtitle}</p>
          <p className="text-base text-muted-foreground mb-4">{description}</p>
          <Badge className="mt-2 px-4 py-2 text-base rounded-full bg-primary/10 text-primary font-medium">
            #LoveByFlavour
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
);

ResultCard.displayName = "ResultCard";

export default ResultCard; 