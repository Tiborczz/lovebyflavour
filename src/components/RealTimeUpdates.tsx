import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { SupabaseService } from '@/lib/supabaseService'
import { useToast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, Heart, Brain, Activity, 
  Bell, Wifi, WifiOff 
} from 'lucide-react'

interface RealTimeUpdatesProps {
  onExPartnerUpdate?: (data: any) => void
  onAnalysisUpdate?: (data: any) => void
  onUserUpdate?: (data: any) => void
}

export default function RealTimeUpdates({ 
  onExPartnerUpdate, 
  onAnalysisUpdate, 
  onUserUpdate 
}: RealTimeUpdatesProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isConnected, setIsConnected] = useState(false)
  const [activeConnections, setActiveConnections] = useState(0)
  const [recentActivity, setRecentActivity] = useState<any[]>([])

  useEffect(() => {
    if (!user) return

    let exPartnerSubscription: any
    let analysisSubscription: any

    // Subscribe to ex-partner changes
    try {
      exPartnerSubscription = SupabaseService.subscribeToExPartners((payload) => {
        console.log('Real-time ex-partner update:', payload)
        
        const activity = {
          id: Date.now(),
          type: 'ex_partner',
          action: payload.eventType,
          timestamp: new Date(),
          data: payload.new || payload.old
        }
        
        setRecentActivity(prev => [activity, ...prev.slice(0, 4)])
        
        // Show toast notification
        if (payload.eventType === 'INSERT') {
          toast({
            title: "New ex-partner added! 💝",
            description: "Your analysis data has been updated.",
          })
        } else if (payload.eventType === 'UPDATE') {
          toast({
            title: "Ex-partner updated! ✨",
            description: "Changes saved successfully.",
          })
        } else if (payload.eventType === 'DELETE') {
          toast({
            title: "Ex-partner removed! 🗑️",
            description: "Your data has been updated.",
          })
        }
        
        onExPartnerUpdate?.(payload)
      })

      // Subscribe to analysis changes
      analysisSubscription = SupabaseService.subscribeToAnalyses((payload) => {
        console.log('Real-time analysis update:', payload)
        
        const activity = {
          id: Date.now(),
          type: 'analysis',
          action: payload.eventType,
          timestamp: new Date(),
          data: payload.new || payload.old
        }
        
        setRecentActivity(prev => [activity, ...prev.slice(0, 4)])
        
        if (payload.eventType === 'INSERT') {
          toast({
            title: "New analysis generated! 🧠",
            description: "Fresh insights are available.",
          })
        }
        
        onAnalysisUpdate?.(payload)
      })

      setIsConnected(true)
      setActiveConnections(2)

    } catch (error) {
      console.error('Error setting up real-time subscriptions:', error)
      setIsConnected(false)
    }

    // Cleanup subscriptions
    return () => {
      if (exPartnerSubscription) {
        exPartnerSubscription.unsubscribe()
      }
      if (analysisSubscription) {
        analysisSubscription.unsubscribe()
      }
      setIsConnected(false)
      setActiveConnections(0)
    }
  }, [user, toast, onExPartnerUpdate, onAnalysisUpdate])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'ex_partner':
        return <Heart className="w-4 h-4 text-pink-500" />
      case 'analysis':
        return <Brain className="w-4 h-4 text-purple-500" />
      default:
        return <Activity className="w-4 h-4 text-blue-500" />
    }
  }

  const getActivityDescription = (activity: any) => {
    const action = activity.action?.toLowerCase()
    const type = activity.type

    if (type === 'ex_partner') {
      if (action === 'insert') return 'New ex-partner added'
      if (action === 'update') return 'Ex-partner updated'
      if (action === 'delete') return 'Ex-partner removed'
    }
    
    if (type === 'analysis') {
      if (action === 'insert') return 'New analysis generated'
      if (action === 'update') return 'Analysis updated'
    }

    return 'Activity recorded'
  }

  if (!user) return null

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            Live Updates
          </div>
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <Badge variant={isConnected ? "default" : "destructive"} className="text-xs">
              {isConnected ? 'Connected' : 'Disconnected'}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Connection Status */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Active connections: {activeConnections}</span>
          <span>User: {user.email?.split('@')[0]}</span>
        </div>

        {/* Recent Activity */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground">Recent Activity</h4>
          {recentActivity.length === 0 ? (
            <p className="text-xs text-muted-foreground py-2">
              No recent activity
            </p>
          ) : (
            <div className="space-y-2">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-center space-x-2 p-2 bg-muted/50 rounded-md"
                >
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">
                      {getActivityDescription(activity)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Real-time Features Info */}
        <div className="pt-2 border-t">
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Ex-partner tracking
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              AI analysis updates
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Live collaboration ready
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 