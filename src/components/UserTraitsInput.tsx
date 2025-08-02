import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Heart, 
  Activity, 
  Coffee, 
  Moon, 
  Palette, 
  Target,
  ArrowRight,
  ArrowLeft,
  Save,
  Sparkles
} from 'lucide-react';

interface UserTraits {
  // Personal Information
  age: string;
  gender: string;
  location: string;
  
  // Physical Preferences
  height: string;
  hair_color: string;
  eye_color: string;
  body_type: string;
  tattoos: string;
  piercings: string;
  
  // Lifestyle
  diet: string;
  exercise_frequency: string;
  smoking: string;
  drinking: string;
  sleep_schedule: string;
  work_schedule: string;
  
  // Interests & Hobbies
  hobbies: string[];
  music_genres: string[];
  movie_genres: string[];
  travel_frequency: string;
  
  // Relationship Goals
  relationship_type: string;
  want_children: string;
  pet_preference: string;
  living_situation: string;
  
  // Personality Traits (Self-Assessment)
  introversion_extraversion: number;
  emotional_stability: number;
  openness_to_experience: number;
  agreeableness: number;
  conscientiousness: number;
  
  // Love Languages
  primary_love_language: string;
  secondary_love_language: string;
  
  // Deal Breakers & Green Flags
  deal_breakers: string[];
  green_flags: string[];
  
  // Additional Notes
  additional_notes: string;
}

interface UserTraitsInputProps {
  onSave?: (traits: UserTraits) => void;
  initialTraits?: Partial<UserTraits>;
}

const UserTraitsInput: React.FC<UserTraitsInputProps> = ({ onSave, initialTraits = {} }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [traits, setTraits] = useState<UserTraits>({
    // Personal Information
    age: '',
    gender: '',
    location: '',
    
    // Physical Preferences
    height: '',
    hair_color: '',
    eye_color: '',
    body_type: '',
    tattoos: 'none',
    piercings: 'none',
    
    // Lifestyle
    diet: '',
    exercise_frequency: '',
    smoking: 'never',
    drinking: '',
    sleep_schedule: '',
    work_schedule: '',
    
    // Interests & Hobbies
    hobbies: [],
    music_genres: [],
    movie_genres: [],
    travel_frequency: '',
    
    // Relationship Goals
    relationship_type: '',
    want_children: '',
    pet_preference: '',
    living_situation: '',
    
    // Personality Traits (Self-Assessment)
    introversion_extraversion: 50,
    emotional_stability: 50,
    openness_to_experience: 50,
    agreeableness: 50,
    conscientiousness: 50,
    
    // Love Languages
    primary_love_language: '',
    secondary_love_language: '',
    
    // Deal Breakers & Green Flags
    deal_breakers: [],
    green_flags: [],
    
    // Additional Notes
    additional_notes: '',
    
    ...initialTraits
  });

  const { toast } = useToast();

  const sections = [
    { id: 'personal', title: 'Personal Info', icon: User, color: 'from-blue-500 to-cyan-500' },
    { id: 'physical', title: 'Physical Traits', icon: Palette, color: 'from-pink-500 to-rose-500' },
    { id: 'lifestyle', title: 'Lifestyle', icon: Activity, color: 'from-green-500 to-emerald-500' },
    { id: 'interests', title: 'Interests', icon: Coffee, color: 'from-purple-500 to-violet-500' },
    { id: 'relationship', title: 'Relationship Goals', icon: Heart, color: 'from-red-500 to-pink-500' },
    { id: 'personality', title: 'Personality', icon: Sparkles, color: 'from-yellow-500 to-orange-500' },
    { id: 'preferences', title: 'Preferences', icon: Target, color: 'from-indigo-500 to-purple-500' }
  ];

  const progress = ((currentSection + 1) / sections.length) * 100;

  const updateTrait = (key: keyof UserTraits, value: any) => {
    setTraits(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleArrayItem = (key: keyof UserTraits, item: string) => {
    const currentArray = traits[key] as string[];
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateTrait(key, newArray);
  };

  const handleSave = async () => {
    try {
      if (onSave) {
        await onSave(traits);
      }
      toast({
        title: "Profile Updated! ✨",
        description: "Your traits have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const renderPersonalSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            placeholder="25"
            value={traits.age}
            onChange={(e) => updateTrait('age', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={traits.gender} onValueChange={(value) => updateTrait('gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="woman">Woman</SelectItem>
              <SelectItem value="man">Man</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="City, State/Country"
          value={traits.location}
          onChange={(e) => updateTrait('location', e.target.value)}
        />
      </div>
    </div>
  );

  const renderPhysicalSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            placeholder="5'8&quot;, 175cm, etc."
            value={traits.height}
            onChange={(e) => updateTrait('height', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hair_color">Hair Color</Label>
          <Select value={traits.hair_color} onValueChange={(value) => updateTrait('hair_color', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select hair color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blonde">Blonde</SelectItem>
              <SelectItem value="brown">Brown</SelectItem>
              <SelectItem value="black">Black</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="gray">Gray</SelectItem>
              <SelectItem value="other">Other/Dyed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="eye_color">Eye Color</Label>
          <Select value={traits.eye_color} onValueChange={(value) => updateTrait('eye_color', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select eye color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brown">Brown</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="hazel">Hazel</SelectItem>
              <SelectItem value="gray">Gray</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="body_type">Body Type</Label>
          <Select value={traits.body_type} onValueChange={(value) => updateTrait('body_type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select body type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slim">Slim</SelectItem>
              <SelectItem value="athletic">Athletic</SelectItem>
              <SelectItem value="average">Average</SelectItem>
              <SelectItem value="curvy">Curvy</SelectItem>
              <SelectItem value="plus-size">Plus Size</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Tattoos</Label>
          <RadioGroup value={traits.tattoos} onValueChange={(value) => updateTrait('tattoos', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="tattoos-none" />
              <Label htmlFor="tattoos-none">None</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="few" id="tattoos-few" />
              <Label htmlFor="tattoos-few">A few</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="many" id="tattoos-many" />
              <Label htmlFor="tattoos-many">Many</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label>Piercings</Label>
          <RadioGroup value={traits.piercings} onValueChange={(value) => updateTrait('piercings', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="piercings-none" />
              <Label htmlFor="piercings-none">None</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ears" id="piercings-ears" />
              <Label htmlFor="piercings-ears">Ears only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multiple" id="piercings-multiple" />
              <Label htmlFor="piercings-multiple">Multiple</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );

  const renderLifestyleSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Diet</Label>
          <Select value={traits.diet} onValueChange={(value) => updateTrait('diet', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select diet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="omnivore">Omnivore</SelectItem>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="pescatarian">Pescatarian</SelectItem>
              <SelectItem value="keto">Keto</SelectItem>
              <SelectItem value="paleo">Paleo</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Exercise Frequency</Label>
          <Select value={traits.exercise_frequency} onValueChange={(value) => updateTrait('exercise_frequency', value)}>
            <SelectTrigger>
              <SelectValue placeholder="How often do you exercise?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="few-times-week">Few times a week</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="occasionally">Occasionally</SelectItem>
              <SelectItem value="rarely">Rarely</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Smoking</Label>
          <RadioGroup value={traits.smoking} onValueChange={(value) => updateTrait('smoking', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="never" id="smoking-never" />
              <Label htmlFor="smoking-never">Never</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="socially" id="smoking-socially" />
              <Label htmlFor="smoking-socially">Socially</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="regularly" id="smoking-regularly" />
              <Label htmlFor="smoking-regularly">Regularly</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label>Drinking</Label>
          <Select value={traits.drinking} onValueChange={(value) => updateTrait('drinking', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select drinking habits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="never">Never</SelectItem>
              <SelectItem value="rarely">Rarely</SelectItem>
              <SelectItem value="socially">Socially</SelectItem>
              <SelectItem value="regularly">Regularly</SelectItem>
              <SelectItem value="frequently">Frequently</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Sleep Schedule</Label>
          <Select value={traits.sleep_schedule} onValueChange={(value) => updateTrait('sleep_schedule', value)}>
            <SelectTrigger>
              <SelectValue placeholder="When do you sleep?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="early-bird">Early Bird (9-10 PM)</SelectItem>
              <SelectItem value="normal">Normal (10-11 PM)</SelectItem>
              <SelectItem value="night-owl">Night Owl (12+ AM)</SelectItem>
              <SelectItem value="irregular">Irregular Schedule</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Work Schedule</Label>
          <Select value={traits.work_schedule} onValueChange={(value) => updateTrait('work_schedule', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select work schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9-5">9-5 Weekdays</SelectItem>
              <SelectItem value="flexible">Flexible Hours</SelectItem>
              <SelectItem value="shift-work">Shift Work</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderInterestsSection = () => {
    const hobbyOptions = [
      'Reading', 'Cooking', 'Gaming', 'Sports', 'Art', 'Music', 'Dancing', 'Photography',
      'Hiking', 'Travel', 'Yoga', 'Meditation', 'Gardening', 'Writing', 'Movies', 'Theater'
    ];

    const musicGenres = [
      'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'Country', 'R&B',
      'Indie', 'Alternative', 'Metal', 'Folk', 'Reggae', 'Blues', 'Punk', 'World'
    ];

    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Hobbies & Interests</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {hobbyOptions.map(hobby => (
              <div key={hobby} className="flex items-center space-x-2">
                <Checkbox
                  id={`hobby-${hobby}`}
                  checked={traits.hobbies.includes(hobby)}
                  onCheckedChange={() => toggleArrayItem('hobbies', hobby)}
                />
                <Label htmlFor={`hobby-${hobby}`} className="text-sm">{hobby}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Music Genres</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {musicGenres.map(genre => (
              <div key={genre} className="flex items-center space-x-2">
                <Checkbox
                  id={`music-${genre}`}
                  checked={traits.music_genres.includes(genre)}
                  onCheckedChange={() => toggleArrayItem('music_genres', genre)}
                />
                <Label htmlFor={`music-${genre}`} className="text-sm">{genre}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Travel Frequency</Label>
          <Select value={traits.travel_frequency} onValueChange={(value) => updateTrait('travel_frequency', value)}>
            <SelectTrigger>
              <SelectValue placeholder="How often do you travel?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frequent">Frequent traveler (Monthly+)</SelectItem>
              <SelectItem value="occasional">Occasional (Few times a year)</SelectItem>
              <SelectItem value="yearly">Yearly vacation</SelectItem>
              <SelectItem value="rarely">Rarely travel</SelectItem>
              <SelectItem value="never">Don't travel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  const renderRelationshipSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Relationship Type</Label>
          <Select value={traits.relationship_type} onValueChange={(value) => updateTrait('relationship_type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="What are you looking for?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="serious">Serious relationship</SelectItem>
              <SelectItem value="casual">Casual dating</SelectItem>
              <SelectItem value="marriage">Marriage-minded</SelectItem>
              <SelectItem value="open">Open to anything</SelectItem>
              <SelectItem value="friends">Friends first</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Children</Label>
          <Select value={traits.want_children} onValueChange={(value) => updateTrait('want_children', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Do you want children?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="want-children">Want children</SelectItem>
              <SelectItem value="have-children">Have children</SelectItem>
              <SelectItem value="dont-want">Don't want children</SelectItem>
              <SelectItem value="unsure">Unsure</SelectItem>
              <SelectItem value="open">Open to children</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Pet Preference</Label>
          <Select value={traits.pet_preference} onValueChange={(value) => updateTrait('pet_preference', value)}>
            <SelectTrigger>
              <SelectValue placeholder="How do you feel about pets?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="love-pets">Love pets</SelectItem>
              <SelectItem value="have-pets">Have pets</SelectItem>
              <SelectItem value="allergic">Allergic to pets</SelectItem>
              <SelectItem value="no-pets">Don't want pets</SelectItem>
              <SelectItem value="neutral">Neutral about pets</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Living Situation</Label>
          <Select value={traits.living_situation} onValueChange={(value) => updateTrait('living_situation', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Current living situation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alone">Live alone</SelectItem>
              <SelectItem value="roommates">With roommates</SelectItem>
              <SelectItem value="family">With family</SelectItem>
              <SelectItem value="partner">With partner</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderPersonalitySection = () => (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Rate yourself on these personality dimensions (0 = strongly disagree, 100 = strongly agree)
      </p>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Introversion ← → Extraversion</Label>
            <Badge variant="outline">{traits.introversion_extraversion}%</Badge>
          </div>
          <Slider
            value={[traits.introversion_extraversion]}
            onValueChange={(value) => updateTrait('introversion_extraversion', value[0])}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Prefer quiet time</span>
            <span>Love social energy</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Emotional Stability</Label>
            <Badge variant="outline">{traits.emotional_stability}%</Badge>
          </div>
          <Slider
            value={[traits.emotional_stability]}
            onValueChange={(value) => updateTrait('emotional_stability', value[0])}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Often stressed</span>
            <span>Very calm</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Openness to Experience</Label>
            <Badge variant="outline">{traits.openness_to_experience}%</Badge>
          </div>
          <Slider
            value={[traits.openness_to_experience]}
            onValueChange={(value) => updateTrait('openness_to_experience', value[0])}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Prefer routine</span>
            <span>Love new experiences</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Agreeableness</Label>
            <Badge variant="outline">{traits.agreeableness}%</Badge>
          </div>
          <Slider
            value={[traits.agreeableness]}
            onValueChange={(value) => updateTrait('agreeableness', value[0])}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Competitive</span>
            <span>Very cooperative</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Conscientiousness</Label>
            <Badge variant="outline">{traits.conscientiousness}%</Badge>
          </div>
          <Slider
            value={[traits.conscientiousness]}
            onValueChange={(value) => updateTrait('conscientiousness', value[0])}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Spontaneous</span>
            <span>Very organized</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesSection = () => {
    const loveLanguages = [
      'Words of Affirmation',
      'Quality Time',
      'Physical Touch',
      'Acts of Service',
      'Receiving Gifts'
    ];

    const commonDealBreakers = [
      'Smoking', 'Heavy drinking', 'Drug use', 'Dishonesty', 'Jealousy',
      'Poor hygiene', 'Rudeness', 'Different life goals', 'No ambition',
      'Constant negativity', 'Controlling behavior', 'Infidelity'
    ];

    const commonGreenFlags = [
      'Good communication', 'Emotional intelligence', 'Ambition', 'Kindness',
      'Sense of humor', 'Loyalty', 'Independence', 'Shared values',
      'Physical attraction', 'Intellectual connection', 'Emotional support',
      'Similar interests'
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Primary Love Language</Label>
            <Select value={traits.primary_love_language} onValueChange={(value) => updateTrait('primary_love_language', value)}>
              <SelectTrigger>
                <SelectValue placeholder="How do you prefer to receive love?" />
              </SelectTrigger>
              <SelectContent>
                {loveLanguages.map(language => (
                  <SelectItem key={language} value={language.toLowerCase().replace(' ', '_')}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Secondary Love Language</Label>
            <Select value={traits.secondary_love_language} onValueChange={(value) => updateTrait('secondary_love_language', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Second preference" />
              </SelectTrigger>
              <SelectContent>
                {loveLanguages.map(language => (
                  <SelectItem key={language} value={language.toLowerCase().replace(' ', '_')}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Deal Breakers</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {commonDealBreakers.map(dealBreaker => (
              <div key={dealBreaker} className="flex items-center space-x-2">
                <Checkbox
                  id={`dealbreaker-${dealBreaker}`}
                  checked={traits.deal_breakers.includes(dealBreaker)}
                  onCheckedChange={() => toggleArrayItem('deal_breakers', dealBreaker)}
                />
                <Label htmlFor={`dealbreaker-${dealBreaker}`} className="text-sm">{dealBreaker}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Green Flags</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {commonGreenFlags.map(greenFlag => (
              <div key={greenFlag} className="flex items-center space-x-2">
                <Checkbox
                  id={`greenflag-${greenFlag}`}
                  checked={traits.green_flags.includes(greenFlag)}
                  onCheckedChange={() => toggleArrayItem('green_flags', greenFlag)}
                />
                <Label htmlFor={`greenflag-${greenFlag}`} className="text-sm">{greenFlag}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additional_notes">Additional Notes</Label>
          <Textarea
            id="additional_notes"
            placeholder="Anything else you'd like to share about yourself or what you're looking for in a partner..."
            value={traits.additional_notes}
            onChange={(e) => updateTrait('additional_notes', e.target.value)}
            rows={4}
          />
        </div>
      </div>
    );
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0: return renderPersonalSection();
      case 1: return renderPhysicalSection();
      case 2: return renderLifestyleSection();
      case 3: return renderInterestsSection();
      case 4: return renderRelationshipSection();
      case 5: return renderPersonalitySection();
      case 6: return renderPreferencesSection();
      default: return renderPersonalSection();
    }
  };

  const currentSectionData = sections[currentSection];
  const IconComponent = currentSectionData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Your Profile
          </h1>
          <p className="text-muted-foreground">
            Help our AI understand you better for more accurate compatibility matching
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Section Navigation */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {sections.map((section, index) => {
              const IconComp = section.icon;
              return (
                <Button
                  key={section.id}
                  variant={currentSection === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentSection(index)}
                  className={currentSection === index ? `bg-gradient-to-r ${section.color} text-white` : ''}
                >
                  <IconComp className="mr-1 h-4 w-4" />
                  {section.title}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Current Section */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className={`p-3 bg-gradient-to-r ${currentSectionData.color} rounded-full`}>
                <IconComponent className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className={`text-2xl bg-gradient-to-r ${currentSectionData.color} bg-clip-text text-transparent`}>
              {currentSectionData.title}
            </CardTitle>
            <CardDescription>
              Section {currentSection + 1} of {sections.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderCurrentSection()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between max-w-4xl mx-auto mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSave}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Progress
            </Button>
            
            {currentSection < sections.length - 1 ? (
              <Button
                onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Complete Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTraitsInput; 