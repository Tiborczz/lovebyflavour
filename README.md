# 🍓 Love by Flavour - AI-Powered Relationship Intelligence Platform

A comprehensive relationship analysis platform that uses AI to provide psychologically grounded insights into dating patterns, compatibility profiles, and personal growth opportunities. Built for Gen Z and Millennial users seeking clarity and psychological insight through flavour-based personality metaphors.

## 🎯 Overview

Love by Flavour combines established psychological frameworks with cutting-edge AI to help users understand their dating patterns, identify compatibility issues, and develop healthier relationship habits. The platform uses flavour-based personality archetypes (Vanilla, Strawberry, Chocolate, Mango) to make complex psychological concepts accessible and engaging.

## ✨ Key Features

### Core Features
- **Ex-Partner Analysis**: Multi-step questionnaire about past relationships
- **AI Personality Inference**: Uses Google Gemini to analyze responses and infer ex-partner "flavours"
- **Psychological Mapping**: Maps responses to Big Five personality traits, attachment styles, and love languages
- **Compatibility Matching**: Shows compatibility scores between different personality types
- **Personal Dashboard**: Visual dashboard showing all insights
- **Trait Management**: Input and update your own personality traits
- **Progress Tracking**: Monitor changes in compatibility insights over time

### 🤖 Enhanced AI-Powered Report Enhancer
- **Real-Time Emotional Tone Analysis**: Attachment style detection, emotional maturity assessment, communication style analysis
- **Ex-Partner Comparison Engine**: Compatibility trend analysis, conflict pattern recognition, strength mapping
- **Lifestyle Trait Matching**: Social preference analysis, activity level assessment, financial style compatibility
- **Self-Awareness Boost System**: Psychological blind spot detection, attraction pattern analysis, missing needs identification
- **Dynamic Insights Engine**: Real-time scoring, adaptive analysis, historical tracking, trigger-based generation
- **Comprehensive Scoring**: Emotional distance, compatibility quotient, flavour archetype closeness, relationship readiness

## 🏗️ Technical Architecture

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Shadcn/UI** for beautiful, accessible components
- **React Router** for navigation
- **Axios** for API communication

### Backend
- **Node.js** with Express.js
- **SQLite** database for data persistence
- **Google Gemini 1.5 Flash** for AI analysis
- **JWT** for authentication
- **CORS** enabled for cross-origin requests

### AI Integration
- **Google Generative AI** (Gemini 1.5 Flash) for psychological analysis
- **Specialized prompts** for different analysis types
- **Caching system** for performance optimization
- **Real-time processing** with progress tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google AI API key (for Gemini)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flavour-match-insight-57-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   GOOGLE_AI_API_KEY=your_google_ai_api_key_here
   JWT_SECRET=your_jwt_secret_key_here
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:8081
   ```

4. **Start the development server**
   ```bash
   npm run dev:full
   ```

   This will start both the frontend (port 8081) and backend (port 3001) servers.

5. **Open your browser**
   Navigate to `http://localhost:8081` to see the application.

## 📊 AI Analysis Types

### 1. Emotional Tone Analysis
Analyzes emotional patterns and communication styles:
- Attachment style detection (secure, anxious, avoidant, fearful-avoidant)
- Emotional maturity assessment
- Communication style analysis
- Stress response patterns
- Emotional availability scoring

### 2. Ex-Partner Comparison
Compares compatibility patterns across relationships:
- Compatibility trend analysis
- Conflict pattern recognition
- Strength mapping
- Attraction vs compatibility gap analysis

### 3. Lifestyle Trait Matching
Analyzes lifestyle compatibility:
- Social preference analysis
- Activity level assessment
- Financial style compatibility
- Career ambition alignment
- Blind spot detection

### 4. Self-Awareness Boost
Provides deep psychological insights:
- Psychological blind spot detection
- Attraction pattern analysis
- Missing needs identification
- Self-sabotage pattern recognition
- Growth opportunity mapping

## 🎨 User Interface

### Dashboard Features
- **Real-time scoring** with visual progress bars
- **Tabbed interface** for organized information
- **Color-coded metrics** for quick assessment
- **Interactive charts** and visualizations
- **Mobile-responsive** design for all devices

### Visual Indicators
- **Green (80%+)**: Excellent relationship intelligence
- **Yellow (60-79%)**: Good with room for growth
- **Red (<60%)**: Needs improvement

## 🔧 API Endpoints

### AI Analysis Endpoints
```javascript
POST /api/ai/emotional-tone          // Emotional tone analysis
POST /api/ai/ex-partner-comparison   // Ex-partner comparison
POST /api/ai/lifestyle-matching      // Lifestyle trait matching
POST /api/ai/self-awareness          // Self-awareness insights
POST /api/ai/dynamic-insights        // Dynamic insights engine
```

### Report Generation
```javascript
POST /api/ai/generate-report/:userId // Generate comprehensive report
GET /api/ai/report-history/:userId   // Get report history
```

### User Management
```javascript
GET /api/user/:userId                // Get user profile
POST /api/ex-partners/:userId        // Add ex-partner
GET /api/ex-partners/:userId         // Get ex-partners
```

## 📈 Scoring System

### Relationship Intelligence Metrics
1. **Emotional Distance** (25% weight)
2. **Compatibility Quotient** (25% weight)
3. **Flavour Archetype Closeness** (20% weight)
4. **Relationship Readiness** (30% weight)

### Score Interpretation
- **80-100%**: Excellent relationship intelligence
- **60-79%**: Good with room for growth
- **40-59%**: Needs improvement
- **0-39%**: Significant growth areas

## 🔒 Security & Privacy

- **JWT Authentication** for secure API access
- **Data encryption** in transit and at rest
- **Input validation** and sanitization
- **Rate limiting** to prevent abuse
- **User consent** management for AI analysis

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- --testPathPattern=AIInsights
```

## 📚 Documentation

- **[Enhanced AI System Documentation](./ENHANCED_AI_SYSTEM.md)** - Comprehensive guide to the AI features
- **[AI Compatibility Engine](./AI_COMPATIBILITY_ENGINE.md)** - Original AI system documentation
- **[API Documentation](./API_DOCS.md)** - Complete API reference

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Conventional commits for commit messages

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run server
```

### Environment Variables for Production
```env
GOOGLE_AI_API_KEY=your_production_api_key
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://yourdomain.com
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for providing the AI analysis capabilities
- **Shadcn/UI** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **React Team** for the amazing frontend framework

## 📞 Support

For support, email support@lovebyflavour.com or join our Discord community.

---

*Built with ❤️ for better relationships through AI-powered insights*
