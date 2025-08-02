import { supabase } from './supabase'
import type { Database } from './supabase'

type User = Database['public']['Tables']['users']['Row']
type Flavour = Database['public']['Tables']['flavours']['Row']
type ExPartner = Database['public']['Tables']['ex_partners']['Row']
type CompatibilityAnalysis = Database['public']['Tables']['compatibility_analyses']['Row']
type AICache = Database['public']['Tables']['ai_cache']['Row']

export class SupabaseService {
  // User operations
  static async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error fetching user:', error)
      return null
    }

    return data
  }

  static async updateUserProfile(updates: Partial<User>): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating user:', error)
      return null
    }

    return data
  }

  // Flavour operations
  static async getAllFlavours(): Promise<Flavour[]> {
    const { data, error } = await supabase
      .from('flavours')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching flavours:', error)
      return []
    }

    return data || []
  }

  static async getFlavourByName(name: string): Promise<Flavour | null> {
    const { data, error } = await supabase
      .from('flavours')
      .select('*')
      .eq('name', name)
      .single()

    if (error) {
      console.error('Error fetching flavour:', error)
      return null
    }

    return data
  }

  // Ex-partner operations
  static async getExPartners(): Promise<ExPartner[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from('ex_partners')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching ex-partners:', error)
      return []
    }

    return data || []
  }

  static async addExPartner(exPartner: Omit<ExPartner, 'id' | 'user_id' | 'created_at'>): Promise<ExPartner | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('ex_partners')
      .insert({
        ...exPartner,
        user_id: user.id
      })
      .select()
      .single()

    if (error) {
      console.error('Error adding ex-partner:', error)
      return null
    }

    return data
  }

  static async updateExPartner(id: string, updates: Partial<ExPartner>): Promise<ExPartner | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('ex_partners')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating ex-partner:', error)
      return null
    }

    return data
  }

  static async deleteExPartner(id: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { error } = await supabase
      .from('ex_partners')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error deleting ex-partner:', error)
      return false
    }

    return true
  }

  // Compatibility analysis operations
  static async getCompatibilityAnalyses(): Promise<CompatibilityAnalysis[]> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
      .from('compatibility_analyses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching compatibility analyses:', error)
      return []
    }

    return data || []
  }

  static async addCompatibilityAnalysis(analysis: Omit<CompatibilityAnalysis, 'id' | 'user_id' | 'created_at'>): Promise<CompatibilityAnalysis | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('compatibility_analyses')
      .insert({
        ...analysis,
        user_id: user.id
      })
      .select()
      .single()

    if (error) {
      console.error('Error adding compatibility analysis:', error)
      return null
    }

    return data
  }

  // AI Cache operations
  static async getAICache(queryHash: string): Promise<AICache | null> {
    const { data, error } = await supabase
      .from('ai_cache')
      .select('*')
      .eq('query_hash', queryHash)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (error) {
      console.error('Error fetching AI cache:', error)
      return null
    }

    return data
  }

  static async setAICache(queryHash: string, responseData: any, expiresInHours: number = 24): Promise<AICache | null> {
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + expiresInHours)

    const { data, error } = await supabase
      .from('ai_cache')
      .upsert({
        query_hash: queryHash,
        response_data: responseData,
        expires_at: expiresAt.toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error setting AI cache:', error)
      return null
    }

    return data
  }

  // Authentication helpers
  static async signUp(email: string, password: string) {
    return await supabase.auth.signUp({
      email,
      password
    })
  }

  static async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  }

  static async signOut() {
    return await supabase.auth.signOut()
  }

  static async resetPassword(email: string) {
    return await supabase.auth.resetPasswordForEmail(email)
  }

  // Real-time subscriptions
  static subscribeToExPartners(callback: (payload: any) => void) {
    return supabase
      .channel('ex_partners_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ex_partners'
        },
        callback
      )
      .subscribe()
  }

  static subscribeToAnalyses(callback: (payload: any) => void) {
    return supabase
      .channel('analyses_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'compatibility_analyses'
        },
        callback
      )
      .subscribe()
  }
} 