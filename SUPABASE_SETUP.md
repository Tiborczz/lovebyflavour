# 🚀 Supabase Setup Guide for Love by Flavour

## Overview

This guide will help you migrate your Love by Flavour project from SQLite to Supabase, giving you a powerful PostgreSQL database with real-time features, built-in authentication, and easy deployment.

## 📋 Prerequisites

- ✅ Supabase account (you already have one!)
- ✅ Your Supabase API key (provided)
- ✅ Node.js and npm installed

## 🔧 Step 1: Set Up Your Supabase Database

### 1.1 Go to Your Supabase Dashboard
1. Visit [supabase.com](https://supabase.com)
2. Sign in to your account
3. Open your project: `psgmaxelhuhtkmwcbhqi`

### 1.2 Run the Database Migration
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the entire contents of `supabase-migration.sql`
3. Paste it into the SQL editor
4. Click **Run** to execute the migration

This will create:
- ✅ Users table (extends Supabase auth)
- ✅ Flavours table with default data
- ✅ Ex-partners table
- ✅ Compatibility analyses table
- ✅ AI cache table
- ✅ Row Level Security (RLS) policies
- ✅ Automatic triggers and functions

## 🔑 Step 2: Configure Environment Variables

### 2.1 Frontend Environment
Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://psgmaxelhuhtkmwcbhqi.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZ21heGVsaHVkdGttd2NiaHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNzk0ODYsImV4cCI6MjA2OTY1NTQ4Nn0.bNVMIvV7aDCpzexnnU_PKYLEJnwI2inKq3rXymaJ0I4

# OpenAI Configuration (keep your existing API key)
OPENAI_API_KEY=your_openai_api_key_here
```

### 2.2 Backend Environment
Update your `server/config.js`:

```javascript
// Add Supabase configuration
supabaseUrl: process.env.SUPABASE_URL || 'https://psgmaxelhuhtkmwcbhqi.supabase.co',
supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'your_service_role_key_here',
```

## 🛠️ Step 3: Update Your Backend

### 3.1 Install Supabase Backend Dependencies
```bash
npm install @supabase/supabase-js
```

### 3.2 Create Backend Supabase Service
Create `server/services/supabaseService.js`:

```javascript
import { createClient } from '@supabase/supabase-js'
import config from '../config.js'

const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)

export default supabase
```

### 3.3 Update Your API Routes
Replace SQLite queries with Supabase queries in your route files.

## 🎨 Step 4: Update Your Frontend

### 4.1 Authentication Components
Create authentication components using Supabase Auth:

```typescript
// src/components/Auth.tsx
import { useState } from 'react'
import { SupabaseService } from '@/lib/supabaseService'

export function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async () => {
    const { data, error } = await SupabaseService.signIn(email, password)
    if (error) console.error('Sign in error:', error)
  }

  const handleSignUp = async () => {
    const { data, error } = await SupabaseService.signUp(email, password)
    if (error) console.error('Sign up error:', error)
  }

  return (
    <div>
      {/* Your auth UI */}
    </div>
  )
}
```

### 4.2 Update Components to Use Supabase
Replace your existing database calls with SupabaseService methods:

```typescript
// Before (SQLite)
const flavours = await db.all('SELECT * FROM flavours')

// After (Supabase)
const flavours = await SupabaseService.getAllFlavours()
```

## 🔒 Step 5: Security & Authentication

### 5.1 Row Level Security (RLS)
Your database already has RLS policies set up:
- Users can only access their own data
- Ex-partners are user-specific
- Analyses are user-specific
- AI cache is shared but read-only

### 5.2 Authentication Flow
1. User signs up/signs in
2. Supabase creates user profile automatically
3. User can access their personalized data
4. All operations are secured by RLS

## 🚀 Step 6: Deploy to Production

### 6.1 Vercel Deployment
1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### 6.2 Environment Variables for Production
```bash
# Vercel Environment Variables
VITE_SUPABASE_URL=https://psgmaxelhuhtkmwcbhqi.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_key
```

## 📊 Step 7: Test Your Setup

### 7.1 Test Database Connection
```typescript
// Test in your browser console
import { SupabaseService } from '@/lib/supabaseService'

// Test flavours
const flavours = await SupabaseService.getAllFlavours()
console.log('Flavours:', flavours)

// Test authentication
const user = await SupabaseService.getCurrentUser()
console.log('Current user:', user)
```

### 7.2 Test Real-time Features
```typescript
// Subscribe to real-time updates
SupabaseService.subscribeToExPartners((payload) => {
  console.log('Ex-partner updated:', payload)
})
```

## 🎯 Benefits of Supabase Migration

### ✅ **What You Get:**
1. **PostgreSQL Database** - More powerful than SQLite
2. **Real-time Features** - Live updates across devices
3. **Built-in Authentication** - Secure user management
4. **Row Level Security** - Data protection
5. **Automatic Backups** - No data loss
6. **Scalability** - Handle thousands of users
7. **Easy Deployment** - Deploy anywhere

### 🔄 **Migration Benefits:**
- **No More Local Database** - Cloud-based solution
- **Real-time Updates** - Users see changes instantly
- **Better Security** - Built-in authentication and RLS
- **Easier Scaling** - Handle growth automatically
- **Better Performance** - Optimized PostgreSQL queries

## 🆘 Troubleshooting

### Common Issues:

1. **"Invalid API Key"**
   - Check your environment variables
   - Ensure you're using the correct key (anon vs service)

2. **"RLS Policy Violation"**
   - Make sure user is authenticated
   - Check RLS policies in Supabase dashboard

3. **"Table Not Found"**
   - Run the migration script again
   - Check table names match your code

4. **"Authentication Error"**
   - Verify Supabase URL and keys
   - Check browser console for errors

## 📞 Support

If you encounter issues:
1. Check Supabase dashboard logs
2. Review browser console errors
3. Verify environment variables
4. Test with Supabase's built-in tools

## 🎉 Next Steps

After setup:
1. **Test all features** - Quiz, AI insights, ex-partners
2. **Add real-time features** - Live updates
3. **Implement user profiles** - Avatar, preferences
4. **Add social features** - Share results
5. **Deploy to production** - Go live!

---

**Your Love by Flavour project is now powered by Supabase! 🚀** 