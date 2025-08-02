import dotenv from 'dotenv';

dotenv.config();

const config = {
  // AI Configuration
  googleAIApiKey: process.env.GOOGLE_AI_API_KEY || 'your_google_ai_api_key_here',
  openaiApiKey: process.env.OPENAI_API_KEY || 'your_openai_api_key_here',
  
  // Database Configuration
  dbPath: process.env.DB_PATH || './server/data/compatibility.db',
  
  // Server Configuration
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key_here_change_in_production',
  
  // Frontend URL (for CORS)
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:8081',
  
  // AI Cache Configuration
  aiCacheExpirationHours: 24
};

export default config; 