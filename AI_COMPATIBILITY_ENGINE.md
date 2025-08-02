# 🤖 AI Compatibility Engine

## Overview

The AI Compatibility Engine is a full-stack system that analyzes dating patterns and provides personalized compatibility insights using artificial intelligence. It combines psychological frameworks with AI analysis to help users understand their dating patterns and find compatible partners.

## Features

### 🧠 Ex-Partner Analysis
- **Interactive Quiz**: Multi-step questionnaire about past relationships
- **AI Personality Inference**: Uses Google Gemini to analyze responses and infer ex-partner "flavours"
- **Psychological Mapping**: Maps responses to Big Five personality traits, attachment styles, and love languages
- **Confidence Scoring**: AI provides confidence ratings for its analysis

### 📊 Dating Pattern Recognition
- **Pattern Analysis**: Identifies recurring themes in dating history
- **Blind Spot Detection**: Highlights potential relationship pitfalls
- **Growth Recommendations**: Suggests areas for personal development
- **Attraction Patterns**: Analyzes what types of partners you're drawn to vs. what you need

### 🎯 Compatibility Matching
- **Flavour Compatibility Matrix**: Shows compatibility scores between different personality types
- **Detailed Match Analysis**: Explains why certain matches work or don't work
- **Growth Opportunities**: Suggests how relationships with different types could help you grow
- **Red Flags & Green Flags**: Identifies potential issues and positive indicators

### 📈 Personal Dashboard
- **Comprehensive Overview**: Visual dashboard showing all insights
- **Trait Management**: Input and update your own personality traits
- **Progress Tracking**: Monitor changes in compatibility insights over time
- **Export & Sharing**: Save and share compatibility reports

## Technical Architecture

### Frontend (React + TypeScript)
- **Pages**:
  - `ExPartnerAnalysis.tsx` - Multi-step ex-partner questionnaire
  - `CompatibilityDashboard.tsx` - Main insights dashboard
  - `UserTraitsInput.tsx` - Personal trait management
- **Components**: Reusable UI components using Shadcn/UI
- **Routing**: React Router for navigation
- **State Management**: React hooks for local state

### Backend (Node.js + Express)
- **Database**: SQLite with comprehensive schema for users, traits, and analysis
- **AI Service**: Google Generative AI (Gemini 1.5 Flash) integration
- **Caching**: AI response caching to reduce API costs
- **Authentication**: JWT-based user authentication
- **API Routes**:
  - `/api/ex-partners/*` - Ex-partner CRUD and analysis
  - `/api/compatibility/*` - Compatibility analysis and insights  
  - `/api/ai/*` - Direct AI service endpoints
  - `/api/user/*` - User profile and traits management

### AI Integration
- **Primary AI**: Google Gemini 1.5 Flash for analysis
- **Fallback**: OpenAI GPT-4 support (optional)
- **Prompt Engineering**: Specialized prompts for different analysis types
- **Response Parsing**: Robust JSON parsing with error handling
- **Rate Limiting**: Built-in caching and rate limiting

### Database Schema
```sql
-- Core tables
users (id, email, name, age, gender, created_at)
user_traits (user_id, trait_name, trait_value, trait_category)
ex_partners (id, user_id, nickname, duration, context, inferred_flavour)
ex_partner_traits (ex_partner_id, trait_name, trait_value)
compatibility_analyses (id, user_id, analysis_type, results, confidence)
flavours (id, name, description, traits, compatibility_matrix)
ai_cache (cache_key, response, created_at, expires_at)
```

## Psychology Frameworks

### Big Five Personality Traits
- **Extraversion**: Social energy and outgoingness
- **Agreeableness**: Cooperation and trust
- **Conscientiousness**: Organization and discipline
- **Neuroticism**: Emotional stability (inverted)
- **Openness**: Creativity and openness to experience

### Attachment Styles
- **Secure**: Comfortable with intimacy and independence
- **Anxious**: Seeks closeness but worries about partner's feelings
- **Avoidant**: Values independence, uncomfortable with closeness
- **Fearful-Avoidant**: Wants relationships but fears getting hurt

### Love Languages
- Words of Affirmation
- Quality Time
- Physical Touch
- Acts of Service
- Receiving Gifts

## API Endpoints

### Ex-Partner Analysis
```
POST /api/ex-partners/analyze
- Analyzes ex-partner quiz responses
- Returns inferred flavour and traits

GET /api/ex-partners/patterns/:userId
- Generates dating pattern analysis
- Requires 2+ ex-partners for insights
```

### Compatibility Analysis
```
GET /api/compatibility/:userId
- Comprehensive compatibility analysis
- Returns match scores for all flavours

POST /api/compatibility/analyze-pairing
- Detailed analysis between two specific flavours
```

### AI Services
```
POST /api/ai/infer-user-flavour
- Infers user's own flavour from traits

POST /api/ai/compatibility-insights
- Custom compatibility analysis
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- Google AI API key (for Gemini)

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see config.js)
4. Initialize database: `npm run server` (auto-creates tables)
5. Start development: `npm run dev:full`

### Environment Variables
```env
GOOGLE_AI_API_KEY=your_google_ai_api_key
OPENAI_API_KEY=your_openai_api_key (optional)
JWT_SECRET=your_jwt_secret
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:8081
```

## Usage Flow

1. **User Registration**: Create account and basic profile
2. **Ex-Partner Analysis**: Complete questionnaire about past relationships
3. **AI Processing**: System analyzes responses and infers personality types
4. **Pattern Recognition**: AI identifies dating patterns and blind spots
5. **Compatibility Matching**: Generate compatibility scores with different types
6. **Dashboard Review**: View comprehensive insights and recommendations
7. **Profile Updates**: Refine personal traits for better accuracy

## Future Enhancements

- **Machine Learning**: Train custom models on user data
- **Photo Analysis**: Analyze partner photos for additional insights
- **Social Integration**: Connect with dating apps for real-time matching
- **Coaching Features**: Personalized dating advice and tips
- **Community Features**: Anonymous pattern sharing and discussions
- **Mobile App**: Native iOS/Android applications

## Contributing

This is a demonstration project showcasing AI-powered relationship analysis. The system combines established psychological frameworks with modern AI to provide actionable dating insights.

---

*Built with React, Node.js, SQLite, and Google Gemini AI* 