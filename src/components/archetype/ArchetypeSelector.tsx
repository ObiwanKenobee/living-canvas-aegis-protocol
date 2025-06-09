
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../auth/AuthProvider';
import { toast } from '@/hooks/use-toast';

interface ArchetypeSelectorProps {
  onComplete: () => void;
}

const archetypes = [
  {
    id: 'wildlife_memory_artist',
    name: 'Wildlife Memory Artist',
    description: 'Create visual narratives and artistic interpretations of conservation data',
    icon: '🎨',
    focus: 'Creative storytelling through conservation art'
  },
  {
    id: 'biome_intelligence_architect',
    name: 'Biome Intelligence Architect',
    description: 'Design AI systems for ecosystem monitoring and analysis',
    icon: '🧠',
    focus: 'AI-powered environmental intelligence'
  },
  {
    id: 'rewilding_composer',
    name: 'Rewilding Composer',
    description: 'Orchestrate large-scale habitat restoration projects',
    icon: '🌱',
    focus: 'Ecosystem restoration and biodiversity enhancement'
  },
  {
    id: 'indigenous_knowledge_curator',
    name: 'Indigenous Knowledge Curator',
    description: 'Bridge traditional wisdom with modern conservation science',
    icon: '🐾',
    focus: 'Cultural and traditional ecological knowledge'
  },
  {
    id: 'data_scientist',
    name: 'Conservation Data Scientist',
    description: 'Analyze complex environmental datasets for insights',
    icon: '📊',
    focus: 'Data-driven conservation strategies'
  },
  {
    id: 'tech_innovator',
    name: 'Conservation Tech Innovator',
    description: 'Develop cutting-edge technology solutions for wildlife protection',
    icon: '💡',
    focus: 'Technological innovation for conservation'
  }
];

const experienceLevels = [
  { id: 'beginner', name: 'Beginner', description: 'New to conservation work' },
  { id: 'intermediate', name: 'Intermediate', description: '1-5 years experience' },
  { id: 'advanced', name: 'Advanced', description: '5+ years experience' },
  { id: 'expert', name: 'Expert', description: 'Leading practitioner in the field' }
];

const specializations = [
  'Marine Conservation', 'Forest Ecosystems', 'Wildlife Protection', 'Climate Action',
  'Biodiversity Research', 'Habitat Restoration', 'Species Recovery', 'Conservation Technology',
  'Environmental Education', 'Policy & Advocacy', 'Community Engagement', 'Sustainable Development'
];

export const ArchetypeSelector: React.FC<ArchetypeSelectorProps> = ({ onComplete }) => {
  const [selectedArchetype, setSelectedArchetype] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!selectedArchetype || !experienceLevel || !specialization || !user) {
      toast({
        title: "Please complete all fields",
        description: "All fields are required to set up your profile.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('user_archetypes')
        .insert({
          user_id: user.id,
          archetype_type: selectedArchetype,
          experience_level: experienceLevel,
          specialization: specialization
        });

      if (error) throw error;

      toast({
        title: "Profile created!",
        description: "Welcome to AEGIS WILDLIFE. Your conservation journey begins now.",
      });

      onComplete();
    } catch (error) {
      console.error('Error creating archetype:', error);
      toast({
        title: "Error",
        description: "Failed to create your profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Choose Your Conservation Archetype
        </h1>
        <p className="text-lg text-muted-foreground">
          Select the role that best represents your conservation interests and expertise
        </p>
      </div>

      {/* Archetype Selection */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Conservation Archetype</h2>
        <RadioGroup value={selectedArchetype} onValueChange={setSelectedArchetype}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {archetypes.map((archetype) => (
              <Card key={archetype.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={archetype.id} id={archetype.id} />
                    <Label htmlFor={archetype.id} className="cursor-pointer flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{archetype.icon}</span>
                        <CardTitle className="text-sm">{archetype.name}</CardTitle>
                      </div>
                    </Label>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs mb-2">
                    {archetype.description}
                  </CardDescription>
                  <Badge variant="outline" className="text-xs">
                    {archetype.focus}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Experience Level */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Experience Level</h2>
        <RadioGroup value={experienceLevel} onValueChange={setExperienceLevel}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {experienceLevels.map((level) => (
              <Card key={level.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={level.id} id={level.id} />
                    <Label htmlFor={level.id} className="cursor-pointer flex-1">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-sm">{level.name}</h3>
                        <p className="text-xs text-muted-foreground">{level.description}</p>
                      </div>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Specialization */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Primary Specialization</h2>
        <Select value={specialization} onValueChange={setSpecialization}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your primary area of focus" />
          </SelectTrigger>
          <SelectContent>
            {specializations.map((spec) => (
              <SelectItem key={spec} value={spec}>
                {spec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-6">
        <Button 
          onClick={handleSubmit} 
          disabled={loading || !selectedArchetype || !experienceLevel || !specialization}
          size="lg"
          className="px-8"
        >
          {loading ? 'Creating Profile...' : 'Complete Setup'}
        </Button>
      </div>
    </div>
  );
};
