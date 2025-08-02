import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { supabase } from '@/lib/supabase'
import { SupabaseService } from '@/lib/supabaseService'
import { Loader2, CheckCircle, XCircle, Wifi } from 'lucide-react'

export default function SupabaseConnectionTest() {
  const [isLoading, setIsLoading] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<string>('')
  const [testResults, setTestResults] = useState<any[]>([])

  const runConnectionTest = async () => {
    setIsLoading(true)
    setTestResults([])
    setConnectionStatus('Testing connection...')

    const results = []

    try {
      // Test 1: Basic Connection
      setConnectionStatus('Testing basic connection...')
      const { data, error } = await supabase.from('flavours').select('count(*)')
      
      if (error) {
        results.push({
          test: 'Basic Connection',
          status: 'failed',
          message: `Error: ${error.message}`,
          details: error
        })
      } else {
        results.push({
          test: 'Basic Connection',
          status: 'passed',
          message: 'Successfully connected to Supabase'
        })
      }

      // Test 2: Auth Service Test
      setConnectionStatus('Testing auth service...')
      try {
        const { data: session } = await supabase.auth.getSession()
        results.push({
          test: 'Auth Service',
          status: 'passed',
          message: 'Auth service is working',
          details: session ? 'User logged in' : 'No active session'
        })
      } catch (authError: any) {
        results.push({
          test: 'Auth Service',
          status: 'failed',
          message: `Auth error: ${authError.message}`,
          details: authError
        })
      }

      // Test 3: Environment Variables
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      if (supabaseUrl && supabaseKey) {
        results.push({
          test: 'Environment Variables',
          status: 'passed',
          message: 'Environment variables are loaded',
          details: `URL: ${supabaseUrl.substring(0, 30)}...`
        })
      } else {
        results.push({
          test: 'Environment Variables',
          status: 'failed',  
          message: 'Environment variables not found',
          details: `URL: ${supabaseUrl || 'missing'}, KEY: ${supabaseKey ? 'present' : 'missing'}`
        })
      }

      // Test 4: Try to fetch flavours
      setConnectionStatus('Testing data retrieval...')
      try {
        const flavours = await SupabaseService.getAllFlavours()
        results.push({
          test: 'Data Retrieval',
          status: 'passed',
          message: `Retrieved ${flavours.length} flavours`,
          details: flavours.slice(0, 3).map(f => f.name).join(', ')
        })
      } catch (dataError: any) {
        results.push({
          test: 'Data Retrieval',
          status: 'failed',
          message: `Data error: ${dataError.message}`,
          details: dataError
        })
      }

    } catch (generalError: any) {
      results.push({
        test: 'General Connection',
        status: 'failed',
        message: `Connection failed: ${generalError.message}`,
        details: generalError
      })
    }

    setTestResults(results)
    setConnectionStatus('Test completed')
    setIsLoading(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Loader2 className="w-4 h-4 animate-spin" />
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wifi className="w-5 h-5" />
          Supabase Connection Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{connectionStatus}</span>
          <Button onClick={runConnectionTest} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              'Run Connection Test'
            )}
          </Button>
        </div>

        {testResults.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium">Test Results:</h4>
            {testResults.map((result, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                {getStatusIcon(result.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{result.test}</span>
                    <Badge variant={result.status === 'passed' ? 'default' : 'destructive'}>
                      {result.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {result.message}
                  </p>
                  {result.details && (
                    <details className="mt-2">
                      <summary className="text-xs text-muted-foreground cursor-pointer">
                        Show details
                      </summary>
                      <pre className="text-xs bg-muted p-2 rounded mt-1 overflow-auto">
                        {typeof result.details === 'string' 
                          ? result.details 
                          : JSON.stringify(result.details, null, 2)
                        }
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <Alert>
          <AlertDescription>
            If you see connection failures, make sure:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Your .env.local file exists and has the correct Supabase credentials</li>
              <li>You've run the database migration in your Supabase dashboard</li>
              <li>Your Supabase project is active and not paused</li>
              <li>You're not behind a firewall blocking the connection</li>
            </ul>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
} 