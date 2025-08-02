import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Loader2, Brain, Zap, TrendingUp, RefreshCw, 
  Clock, AlertTriangle, CheckCircle, Activity,
  BarChart3, Target, Users, Heart
} from "lucide-react";
import axios from "axios";

interface RealTimeReportGeneratorProps {
  userId: string;
  userData: any;
  exPartners: any[];
  lifestyleTags: string[];
  onReportGenerated?: (report: any) => void;
  autoGenerate?: boolean;
}

interface ReportStatus {
  isGenerating: boolean;
  lastGenerated: Date | null;
  triggerType: string;
  progress: number;
  error: string | null;
}

interface ReportMetrics {
  emotionalDistance: number;
  compatibilityQuotient: number;
  flavourArchetypeCloseness: number;
  relationshipReadiness: number;
  overallScore: number;
}

export default function RealTimeReportGenerator({
  userId,
  userData,
  exPartners,
  lifestyleTags,
  onReportGenerated,
  autoGenerate = true
}: RealTimeReportGeneratorProps) {
  const [reportStatus, setReportStatus] = useState<ReportStatus>({
    isGenerating: false,
    lastGenerated: null,
    triggerType: '',
    progress: 0,
    error: null
  });
  const [currentReport, setCurrentReport] = useState<any>(null);
  const [metrics, setMetrics] = useState<ReportMetrics | null>(null);

  // Auto-generate report when data changes
  useEffect(() => {
    if (autoGenerate && exPartners.length >= 2) {
      generateReport('data_update');
    }
  }, [exPartners, userData, lifestyleTags]);

  const generateReport = useCallback(async (triggerType: string) => {
    if (!userId || exPartners.length < 2) return;

    setReportStatus(prev => ({
      ...prev,
      isGenerating: true,
      triggerType,
      progress: 0,
      error: null
    }));

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setReportStatus(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90)
        }));
      }, 500);

      const response = await axios.post(`/api/ai/generate-report/${userId}`, {
        triggerType,
        additionalData: {
          userData,
          exPartners,
          lifestyleTags,
          timestamp: new Date().toISOString()
        }
      });

      clearInterval(progressInterval);

      if (response.data.success) {
        const report = response.data.report;
        setCurrentReport(report);
        setReportStatus(prev => ({
          ...prev,
          isGenerating: false,
          lastGenerated: new Date(),
          progress: 100
        }));

        // Calculate additional metrics
        const calculatedMetrics = calculateMetrics(report, exPartners);
        setMetrics(calculatedMetrics);

        // Notify parent component
        onReportGenerated?.(report);
      }
    } catch (error) {
      console.error('Error generating report:', error);
      setReportStatus(prev => ({
        ...prev,
        isGenerating: false,
        error: 'Failed to generate report. Please try again.'
      }));
    }
  }, [userId, userData, exPartners, lifestyleTags, onReportGenerated]);

  const calculateMetrics = (report: any, partners: any[]): ReportMetrics => {
    // Calculate emotional distance based on attachment styles and emotional patterns
    const emotionalDistance = calculateEmotionalDistance(report, partners);
    
    // Calculate compatibility quotient from ex-partner analysis
    const compatibilityQuotient = report.ex_partner_comparison?.comparison_analysis?.average_compatibility_score || 0.5;
    
    // Calculate flavour archetype closeness
    const flavourArchetypeCloseness = calculateFlavourCloseness(partners);
    
    // Get relationship readiness from emotional tone analysis
    const relationshipReadiness = report.emotional_tone?.tone_analysis?.relationship_readiness || 0.5;
    
    // Calculate overall score
    const overallScore = (
      emotionalDistance * 0.25 +
      compatibilityQuotient * 0.25 +
      flavourArchetypeCloseness * 0.2 +
      relationshipReadiness * 0.3
    );

    return {
      emotionalDistance,
      compatibilityQuotient,
      flavourArchetypeCloseness,
      relationshipReadiness,
      overallScore
    };
  };

  const calculateEmotionalDistance = (report: any, partners: any[]): number => {
    // Analyze emotional patterns and calculate distance from ideal
    const emotionalProfile = report.emotional_tone?.emotional_profile;
    if (!emotionalProfile) return 0.5;

    let distance = 0;
    
    // Attachment style scoring
    const attachmentScores = {
      'secure': 0.9,
      'anxious': 0.6,
      'avoidant': 0.4,
      'fearful_avoidant': 0.3
    };
    distance += attachmentScores[emotionalProfile.attachment_style] || 0.5;
    
    // Emotional maturity
    distance += emotionalProfile.emotional_maturity || 0.5;
    
    // Emotional availability
    distance += emotionalProfile.emotional_availability || 0.5;
    
    return distance / 3;
  };

  const calculateFlavourCloseness = (partners: any[]): number => {
    if (partners.length === 0) return 0.5;
    
    // Calculate how close the user's flavour preferences are to a consistent pattern
    const flavours = partners.map(p => p.flavour);
    const flavourCounts = flavours.reduce((acc, flavour) => {
      acc[flavour] = (acc[flavour] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const maxCount = Math.max(...Object.values(flavourCounts).map(v => Number(v)));
    const totalPartners = partners.length;
    
    // Higher score for more consistent flavour preferences
    return maxCount / totalPartners;
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "text-green-600";
    if (score >= 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 0.8) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (score >= 0.6) return <Target className="w-4 h-4 text-yellow-600" />;
    return <AlertTriangle className="w-4 h-4 text-red-600" />;
  };

  const formatTriggerType = (trigger: string) => {
    return trigger.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Real-Time Report Generator
            <Badge variant="secondary" className="ml-2">
              {exPartners.length} partners
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            {reportStatus.lastGenerated && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {reportStatus.lastGenerated.toLocaleTimeString()}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => generateReport('manual_refresh')}
              disabled={reportStatus.isGenerating}
            >
              <RefreshCw className={`w-4 h-4 ${reportStatus.isGenerating ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Status and Progress */}
        {reportStatus.isGenerating && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm font-medium">
                Generating {formatTriggerType(reportStatus.triggerType)} Report...
              </span>
            </div>
            <Progress value={reportStatus.progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Analyzing {exPartners.length} relationships with AI psychology insights
            </p>
          </div>
        )}

        {/* Error Alert */}
        {reportStatus.error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{reportStatus.error}</AlertDescription>
          </Alert>
        )}

        {/* Metrics Dashboard */}
        {metrics && !reportStatus.isGenerating && (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Relationship Intelligence Metrics
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  {getScoreIcon(metrics.overallScore)}
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(metrics.overallScore)}`}>
                  {Math.round(metrics.overallScore * 100)}
                </div>
                <div className="text-xs text-muted-foreground">Overall Score</div>
              </div>

              <div className="text-center p-3 bg-accent/30 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Heart className="w-4 h-4 text-red-500" />
                </div>
                <div className={`text-lg font-bold ${getScoreColor(metrics.emotionalDistance)}`}>
                  {Math.round(metrics.emotionalDistance * 100)}
                </div>
                <div className="text-xs text-muted-foreground">Emotional Distance</div>
              </div>

              <div className="text-center p-3 bg-accent/30 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Users className="w-4 h-4 text-blue-500" />
                </div>
                <div className={`text-lg font-bold ${getScoreColor(metrics.compatibilityQuotient)}`}>
                  {Math.round(metrics.compatibilityQuotient * 100)}
                </div>
                <div className="text-xs text-muted-foreground">Compatibility</div>
              </div>

              <div className="text-center p-3 bg-accent/30 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Target className="w-4 h-4 text-green-500" />
                </div>
                <div className={`text-lg font-bold ${getScoreColor(metrics.flavourArchetypeCloseness)}`}>
                  {Math.round(metrics.flavourArchetypeCloseness * 100)}
                </div>
                <div className="text-xs text-muted-foreground">Flavour Consistency</div>
              </div>

              <div className="text-center p-3 bg-accent/30 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Activity className="w-4 h-4 text-purple-500" />
                </div>
                <div className={`text-lg font-bold ${getScoreColor(metrics.relationshipReadiness)}`}>
                  {Math.round(metrics.relationshipReadiness * 100)}
                </div>
                <div className="text-xs text-muted-foreground">Readiness</div>
              </div>
            </div>
          </div>
        )}

        {/* Report Summary */}
        {currentReport && !reportStatus.isGenerating && (
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Latest Insights Summary
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Key Findings</div>
                <div className="space-y-1">
                  {currentReport.summary?.key_findings?.slice(0, 3).map((finding: string, index: number) => (
                    <div key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      {finding}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Growth Areas</div>
                <div className="space-y-1">
                  {currentReport.summary?.growth_areas?.slice(0, 2).map((area: string, index: number) => (
                    <div key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                      {area.replace(/_/g, ' ')}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => generateReport('detailed_analysis')}
                disabled={reportStatus.isGenerating}
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Deep Analysis
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('/compatibility', '_blank')}
              >
                <Users className="w-4 h-4 mr-1" />
                View Full Report
              </Button>
            </div>
          </div>
        )}

        {/* Auto-generation Status */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Auto-generates when new data is added
            </span>
            <Badge variant={autoGenerate ? "default" : "secondary"}>
              {autoGenerate ? "Auto" : "Manual"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 