import { createClient } from '@supabase/supabase-js'

// Hardcoded credentials for now - move to .env.local in production
const supabaseUrl = 'https://psgmaxelhudtkmwcbhqi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZ21heGVsaHVkdGttd2NiaHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNzk0ODYsImV4cCI6MjA2OTY1NTQ4Nn0.bNVMIvV7aDCpzexnnU_PKYLEJnwI2inKq3rXymaJ0I4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          username?: string
          avatar_url?: string
          bio?: string
          favorite_quote?: string
          relationship_goals?: string
          lifestyle_preferences?: string[]
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
          username?: string
          avatar_url?: string
          bio?: string
          favorite_quote?: string
          relationship_goals?: string
          lifestyle_preferences?: string[]
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          username?: string
          avatar_url?: string
          bio?: string
          favorite_quote?: string
          relationship_goals?: string
          lifestyle_preferences?: string[]
        }
      }
      flavours: {
        Row: {
          id: string
          name: string
          description: string
          emoji: string
          personality_traits: string[]
          compatibility_scores: Record<string, number>
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          emoji: string
          personality_traits: string[]
          compatibility_scores: Record<string, number>
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          emoji?: string
          personality_traits?: string[]
          compatibility_scores?: Record<string, number>
          created_at?: string
        }
      }
      ex_partners: {
        Row: {
          id: string
          user_id: string
          flavour: string
          duration: string
          outcome: string
          lessons: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          flavour: string
          duration: string
          outcome: string
          lessons: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          flavour?: string
          duration?: string
          outcome?: string
          lessons?: string
          created_at?: string
        }
      }
      compatibility_analyses: {
        Row: {
          id: string
          user_id: string
          analysis_type: string
          analysis_data: any
          insights: string
          confidence_score: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          analysis_type: string
          analysis_data: any
          insights: string
          confidence_score: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          analysis_type?: string
          analysis_data?: any
          insights?: string
          confidence_score?: number
          created_at?: string
        }
      }
      ai_cache: {
        Row: {
          id: string
          query_hash: string
          response_data: any
          created_at: string
          expires_at: string
        }
        Insert: {
          id?: string
          query_hash: string
          response_data: any
          created_at?: string
          expires_at: string
        }
        Update: {
          id?: string
          query_hash?: string
          response_data?: any
          created_at?: string
          expires_at?: string
        }
      }
    }
  }
} 