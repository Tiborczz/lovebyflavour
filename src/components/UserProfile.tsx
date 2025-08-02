import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { SupabaseService } from '@/lib/supabaseService'
import { 
  User, Mail, Calendar, Heart, Settings, Upload, 
  Save, Loader2, Star, Award, Target
} from 'lucide-react'

export default function UserProfile() {
  const { user, userProfile, refreshProfile } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    username: '',
    bio: '',
    favoriteQuote: '',
    relationshipGoals: '',
    lifestylePreferences: [] as string[]
  })

  useEffect(() => {
    if (userProfile) {
      setProfileData({
        username: userProfile.username || '',
        bio: userProfile.bio || '',
        favoriteQuote: userProfile.favorite_quote || '',
        relationshipGoals: userProfile.relationship_goals || '',
        lifestylePreferences: userProfile.lifestyle_preferences || []
      })
    }
  }, [userProfile])

  const handleSave = async () => {
    if (!user) return

    setIsSaving(true)
    try {
      const updates = {
        username: profileData.username,
        bio: profileData.bio,
        favorite_quote: profileData.favoriteQuote,
        relationship_goals: profileData.relationshipGoals,
        lifestyle_preferences: profileData.lifestylePreferences,
        updated_at: new Date().toISOString()
      }

      const updatedProfile = await SupabaseService.updateUserProfile(updates)
      
      if (updatedProfile) {
        await refreshProfile()
        toast({
          title: "Profile updated! ✨",
          description: "Your changes have been saved successfully.",
        })
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: "Update failed",
        description: "Please try again later.",
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const addLifestylePreference = (preference: string) => {
    if (!profileData.lifestylePreferences.includes(preference)) {
      setProfileData(prev => ({
        ...prev,
        lifestylePreferences: [...prev.lifestylePreferences, preference]
      }))
    }
  }

  const removeLifestylePreference = (preference: string) => {
    setProfileData(prev => ({
      ...prev,
      lifestylePreferences: prev.lifestylePreferences.filter(p => p !== preference)
    }))
  }

  const suggestedPreferences = [
    'Active Lifestyle', 'Career Focused', 'Family Oriented', 'Travel Lover',
    'Foodie', 'Fitness Enthusiast', 'Book Lover', 'Music Lover',
    'Art Enthusiast', 'Nature Lover', 'Tech Savvy', 'Social Butterfly'
  ]

  const getUserInitials = () => {
    if (profileData.username) {
      return profileData.username.substring(0, 2).toUpperCase()
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase()
    }
    return 'U'
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Your Profile
        </h1>
        <p className="text-muted-foreground">
          Customize your Love by Flavour experience
        </p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-2xl">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">
                {profileData.username || user?.email?.split('@')[0] || 'User'}
              </h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mr-1" />
                {user?.email}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                Joined {new Date(user?.created_at || '').toLocaleDateString()}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={profileData.username}
                onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Your display name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="favoriteQuote">Favorite Quote</Label>
              <Input
                id="favoriteQuote"
                value={profileData.favoriteQuote}
                onChange={(e) => setProfileData(prev => ({ ...prev, favoriteQuote: e.target.value }))}
                placeholder="Words you live by..."
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>

          {/* Relationship Goals */}
          <div className="space-y-2">
            <Label htmlFor="relationshipGoals">Relationship Goals</Label>
            <Textarea
              id="relationshipGoals"
              value={profileData.relationshipGoals}
              onChange={(e) => setProfileData(prev => ({ ...prev, relationshipGoals: e.target.value }))}
              placeholder="What are you looking for in relationships?"
              rows={2}
            />
          </div>

          {/* Lifestyle Preferences */}
          <div className="space-y-3">
            <Label>Lifestyle Preferences</Label>
            <div className="flex flex-wrap gap-2">
              {profileData.lifestylePreferences.map((pref) => (
                <Badge
                  key={pref}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeLifestylePreference(pref)}
                >
                  {pref} ×
                </Badge>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Suggested preferences:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPreferences
                  .filter(pref => !profileData.lifestylePreferences.includes(pref))
                  .map((pref) => (
                    <Badge
                      key={pref}
                      variant="outline"
                      className="cursor-pointer hover:bg-pink-50"
                      onClick={() => addLifestylePreference(pref)}
                    >
                      + {pref}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Your Love Journey Stats
          </CardTitle>
          <CardDescription>
            Track your progress and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <Heart className="w-8 h-8 mx-auto mb-2 text-pink-500" />
              <div className="text-2xl font-bold text-pink-600">0</div>
              <div className="text-sm text-muted-foreground">Ex-Partners Analyzed</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Target className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-muted-foreground">Pattern Insights</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Star className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-muted-foreground">Compatibility Matches</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 