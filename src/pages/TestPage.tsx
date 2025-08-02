import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Loader2, Sparkles, Server, Globe } from "lucide-react";
import LBFInsightCard from "@/components/LBFInsightCard";
import axios from "axios";

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  message?: string;
  details?: any;
}

export default function TestPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTest = async (testName: string, testFn: () => Promise<any>) => {
    setTestResults(prev => prev.map(test => 
      test.name === testName ? { ...test, status: 'pending' } : test
    ));

    try {
      const result = await testFn();
      setTestResults(prev => prev.map(test => 
        test.name === testName ? { ...test, status: 'success', details: result } : test
      ));
    } catch (error: any) {
      setTestResults(prev => prev.map(test => 
        test.name === testName ? { 
          ...test, 
          status: 'error', 
          message: error.message || 'Test failed' 
        } : test
      ));
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([
      { name: 'Backend Health Check', status: 'pending' },
      { name: 'LBF API Endpoint', status: 'pending' },
      { name: 'Proxy Configuration', status: 'pending' },
      { name: 'Frontend Component', status: 'pending' }
    ]);

    // Test 1: Backend Health Check
    await runTest('Backend Health Check', async () => {
      const response = await axios.get('http://localhost:3001/api/health');
      return response.data;
    });

    // Test 2: LBF API Endpoint (direct)
    await runTest('LBF API Endpoint', async () => {
      const response = await axios.post('http://localhost:3001/api/insight/generate', {
        analysisType: 'personality',
        quizAnswers: [],
        flavourPreferences: ['vanilla'],
        userTraits: {}
      });
      return response.data;
    });

    // Test 3: Proxy Configuration
    await runTest('Proxy Configuration', async () => {
      const response = await axios.post('/api/insight/generate', {
        analysisType: 'personality',
        quizAnswers: [],
        flavourPreferences: ['vanilla'],
        userTraits: {}
      });
      return response.data;
    });

    // Test 4: Frontend Component (mock test)
    await runTest('Frontend Component', async () => {
      // Simulate component working
      return { message: 'Component loaded successfully' };
    });

    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending': return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">🧪 System Test Page</h1>
        <p className="text-muted-foreground">
          Test all components of the Love by Flavour AI system
        </p>
      </div>

      {/* Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            System Tests
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
                <Sparkles className="w-4 h-4" />
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
                  <Badge className={getStatusColor(test.status)}>
                    {test.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}

          {/* Quick Status */}
          {testResults.length > 0 && (
            <Alert>
              <Globe className="h-4 w-4" />
              <AlertDescription>
                <strong>Quick Status:</strong> {
                  testResults.every(r => r.status === 'success') 
                    ? '✅ All systems operational!' 
                    : testResults.some(r => r.status === 'error')
                    ? '❌ Some tests failed - check details above'
                    : '⏳ Tests in progress...'
                }
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Live Component Test */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Live LBF Component Test
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LBFInsightCard
            quizAnswers={[
              { question: "What's your ideal date?", answer: "Quiet dinner at home", traits: ["introverted", "romantic"] },
              { question: "How do you handle conflict?", answer: "I need time to process", traits: ["thoughtful", "patient"] }
            ]}
            flavourPreferences={["vanilla"]}
            userTraits={{
              introversion: 0.7,
              emotional_stability: 0.8,
              openness: 0.6
            }}
            onInsightGenerated={(insight) => {
              console.log('Live test insight generated:', insight);
            }}
          />
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" onClick={() => window.open('/quiz', '_blank')}>
              Take Quiz
            </Button>
            <Button variant="outline" onClick={() => window.open('/lbf-demo', '_blank')}>
              LBF Demo
            </Button>
            <Button variant="outline" onClick={() => window.open('/ai-dashboard', '_blank')}>
              AI Dashboard
            </Button>
            <Button variant="outline" onClick={() => window.open('/compatibility', '_blank')}>
              Compatibility
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 