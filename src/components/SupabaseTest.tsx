import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Loader2, Database, Users, Heart } from 'lucide-react'
import { SupabaseService } from '@/lib/supabaseService'

interface TestResult {
  name: string
  status: 'pending' | 'success' | 'error'
  message?: string
  data?: any
}

export default function SupabaseTest() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runTest = async (testName: string, testFn: () => Promise<any>) => {
    setTestResults(prev => prev.map(test => 
      test.name === testName ? { ...test, status: 'pending' } : test
    ))

    try {
      const result = await testFn()
      setTestResults(prev => prev.map(test => 
        test.name === testName ? { ...test, status: 'success', data: result } : test
      ))
    } catch (error: any) {
      setTestResults(prev => prev.map(test => 
        test.name === testName ? { 
          ...test, 
          status: 'error', 
          message: error.message || 'Test failed' 
        } : test
      ))
    }
  }

  const runAllTests = async () => {
    setIsRunning(true)
    setTestResults([
      { name: 'Database Connection', status: 'pending' },
      { name: 'Flavours Table', status: 'pending' },
      { name: 'Authentication', status: 'pending' },
      { name: 'Real-time Subscription', status: 'pending' }
    ])

    // Test 1: Database Connection
    await runTest('Database Connection', async () => {
      const flavours = await SupabaseService.getAllFlavours()
      return { count: flavours.length, flavours: flavours.slice(0, 2) }
    })

    // Test 2: Flavours Table
    await runTest('Flavours Table', async () => {
      const vanilla = await SupabaseService.getFlavourByName('vanilla')
      return vanilla
    })

    // Test 3: Authentication
    await runTest('Authentication', async () => {
      const user = await SupabaseService.getCurrentUser()
      return user
    })

    // Test 4: Real-time Subscription
    await runTest('Real-time Subscription', async () => {
      return new Promise((resolve) => {
        const subscription = SupabaseService.subscribeToExPartners((payload) => {
          console.log('Real-time update:', payload)
          subscription?.unsubscribe()
          resolve({ message: 'Subscription working', payload })
        })
        
        // Resolve after 2 seconds if no real-time events
        setTimeout(() => {
          subscription?.unsubscribe()
          resolve({ message: 'Subscription setup complete' })
        }, 2000)
      })
    })

    setIsRunning(false)
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending': return <Loader2 className="w-4 h-4 animate-spin" />
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'success': return 'bg-green-100 text-green-800 border-green-200'
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">🔗 Supabase Connection Test</h1>
        <p className="text-muted-foreground">
          Test your Supabase database connection and setup
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Supabase Tests
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button 
              onClick={runAllTests} 
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              {isRunning ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Database className="w-4 h-4" />
              )}
              {isRunning ? 'Running Tests...' : 'Run All Tests'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setTestResults([])}
              disabled={isRunning}
            >
              Clear Results
            </Button>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Test Results:</h3>
              {testResults.map((test, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <span className="font-medium">{test.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(test.status)}>
                      {test.status}
                    </Badge>
                    {test.data && (
                      <span className="text-sm text-muted-foreground">
                        {typeof test.data === 'object' ? JSON.stringify(test.data).slice(0, 50) + '...' : test.data}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Status */}
          {testResults.length > 0 && (
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Connection Status:</span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                {testResults.every(r => r.status === 'success') 
                  ? '✅ All Supabase connections working perfectly!' 
                  : testResults.some(r => r.status === 'error')
                  ? '❌ Some connections failed - check your setup'
                  : '⏳ Testing connections...'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={() => window.open('https://supabase.com/dashboard/project/psgmaxelhuhtkmwcbhqi', '_blank')}
            >
              <Database className="w-4 h-4 mr-2" />
              Open Supabase Dashboard
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.open('/lbf-demo', '_blank')}
            >
              <Heart className="w-4 h-4 mr-2" />
              Test LBF Demo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 