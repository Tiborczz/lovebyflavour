-- Love by Flavour Supabase Database Migration
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Flavours table
CREATE TABLE IF NOT EXISTS public.flavours (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    emoji TEXT NOT NULL,
    personality_traits TEXT[] NOT NULL,
    compatibility_scores JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ex-partners table
CREATE TABLE IF NOT EXISTS public.ex_partners (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    flavour TEXT NOT NULL,
    duration TEXT NOT NULL,
    outcome TEXT NOT NULL,
    lessons TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compatibility analyses table
CREATE TABLE IF NOT EXISTS public.compatibility_analyses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    analysis_type TEXT NOT NULL,
    analysis_data JSONB NOT NULL,
    insights TEXT NOT NULL,
    confidence_score DECIMAL(3,2) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI cache table
CREATE TABLE IF NOT EXISTS public.ai_cache (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    query_hash TEXT UNIQUE NOT NULL,
    response_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Insert default flavours
INSERT INTO public.flavours (name, description, emoji, personality_traits, compatibility_scores) VALUES
('vanilla', 'Steady and reliable lover with traditional values', '🍦', 
 ARRAY['loyal', 'patient', 'romantic', 'traditional'], 
 '{"strawberry": 0.7, "chocolate": 0.8, "mango": 0.6}'::jsonb),
('strawberry', 'Passionate and spontaneous with a zest for life', '🍓', 
 ARRAY['passionate', 'adventurous', 'emotional', 'spontaneous'], 
 '{"vanilla": 0.7, "chocolate": 0.9, "mango": 0.8}'::jsonb),
('chocolate', 'Deep and complex with intellectual depth', '🍫', 
 ARRAY['intellectual', 'mysterious', 'intense', 'thoughtful'], 
 '{"vanilla": 0.8, "strawberry": 0.9, "mango": 0.7}'::jsonb),
('mango', 'Sweet and optimistic with a sunny disposition', '🥭', 
 ARRAY['optimistic', 'cheerful', 'social', 'energetic'], 
 '{"vanilla": 0.6, "strawberry": 0.8, "chocolate": 0.7}'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ex_partners_user_id ON public.ex_partners(user_id);
CREATE INDEX IF NOT EXISTS idx_compatibility_analyses_user_id ON public.compatibility_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_cache_query_hash ON public.ai_cache(query_hash);
CREATE INDEX IF NOT EXISTS idx_ai_cache_expires_at ON public.ai_cache(expires_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ex_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compatibility_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_cache ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for ex_partners table
CREATE POLICY "Users can view their own ex-partners" ON public.ex_partners
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ex-partners" ON public.ex_partners
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ex-partners" ON public.ex_partners
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ex-partners" ON public.ex_partners
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for compatibility_analyses table
CREATE POLICY "Users can view their own analyses" ON public.compatibility_analyses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analyses" ON public.compatibility_analyses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for ai_cache table (read-only for all authenticated users)
CREATE POLICY "Authenticated users can read AI cache" ON public.ai_cache
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert AI cache" ON public.ai_cache
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 