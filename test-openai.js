const axios = require('axios');

async function testOpenAIAPI() {
  try {
    console.log('Testing OpenAI API integration...');
    
    const testData = {
      userTraits: {
        personality: {
          extraversion: 0.7,
          agreeableness: 0.8,
          conscientiousness: 0.6,
          neuroticism: 0.4,
          openness: 0.9
        }
      },
      quizAnswers: {
        "How do you handle conflict?": "I prefer direct communication",
        "What's your ideal weekend?": "Mix of social and quiet time"
      },
      flavourPreferences: ["chocolate", "strawberry"],
      analysisType: "personality"
    };

    console.log('Sending test request to /api/insight/generate...');
    console.log('Test data:', JSON.stringify(testData, null, 2));

    const response = await axios.post('http://localhost:3001/api/insight/generate', testData, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });

    console.log('✅ API Response received!');
    console.log('Status:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));

  } catch (error) {
    console.error('❌ API Test failed!');
    console.error('Error:', error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Is the server running?');
      console.error('Make sure to run: npm run dev:full');
    }
  }
}

// Test server health first
async function testServerHealth() {
  try {
    console.log('Testing server health...');
    const response = await axios.get('http://localhost:3001/api/health');
    console.log('✅ Server is running!');
    console.log('Health response:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Server is not running!');
    console.error('Please start the server with: npm run dev:full');
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting OpenAI API tests...\n');
  
  const serverHealthy = await testServerHealth();
  
  if (serverHealthy) {
    console.log('\n--- Testing OpenAI API ---\n');
    await testOpenAIAPI();
  }
  
  console.log('\n🏁 Tests completed!');
}

runTests(); 