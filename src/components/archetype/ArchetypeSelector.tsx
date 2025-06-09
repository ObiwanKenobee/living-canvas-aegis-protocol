
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../auth/AuthProvider';
import { toast } from 'sonner';

const archetypes = [
  {
    id: 'wildlife_memory_artist',
    name: 'Wildlife Memory Artist',
    emoji: '🎨',
    description: 'Encode animal dreams & migrations through artistic expression',
    skills: ['Digital Art', 'Data Visualization', 'Storytelling', 'Pattern Recognition']
  },
  {
    id: 'biome_intelligence_architect',
    name: 'Biome Intelligence Architect',
    emoji: '🧠',
    description: 'Design AI systems to protect and understand ecosystems',
    skills: ['Machine Learning', 'Ecosystem Modeling', 'Data Analysis', 'AI Development']
  },
  {
    id: 'rewilding_composer',
    name: 'Rewilding Composer',
    emoji: '🌱',
    description: 'Restore lost ecological symphonies and natural harmonies',
    skills: ['Acoustic Ecology', 'Sound Design', 'Environmental Science', 'Restoration']
  },
  {
    id: 'indigenous_knowledge_curator',
    name: 'Indigenous Knowledge Curator',
    emoji: '🐾',
    description: 'Honor and preserve ancestral ecological wisdom',
    skills: ['Cultural Preservation', 'Traditional Knowledge', 'Community Engagement', 'Ethnobotany']
  },
  {
    id: 'data_scientist',
    name: 'Conservation Data Scientist',
    emoji: '📊',
    description: 'Analyze patterns in nature through advanced data science',
    skills: ['Data Analysis', 'Statistics', 'Programming', 'Research Methods']
  },
  {
    id: 'tech_innovator',
    name: 'Conservation Tech Innovator',
    emoji: '💡',
    description: 'Build breakthrough technologies for wildlife protection',
    skills: ['Software Development', 'Hardware Design', 'Innovation', 'Prototyping']
  }
];

interface ArchetypeSelectorProps {
  onComplete: () => void;
}

export const ArchetypeSelector: React.FC<ArchetypeSelectorProps> = ({ onComplete }) => {
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
  const [experienceLevel, setExperienceLevel] = useState<string>('intermediate');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSaveArchetype = async () => {
    if (!selectedArchetype || !user) return;

    setLoading(true);
    try {
      const archetype = archetypes.find(a => a.id === selectedArchetype);
      
      const { error } = await supabase
        .from('user_archetypes')
        .insert({
          user_id: user.id,
          archetype_type: selectedArchetype,
          experience_level: experienceLevel,
          skills: archetype?.skills || [],
          bio: `${archetype?.description}`,
          specialization: archetype?.name
        });

      if (error) throw error;

      toast.success('Archetype saved successfully!');
      onComplete();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose Your Conservation Archetype</h2>
        <p className="text-muted-foreground">
          Select the role that best represents your passion and expertise in wildlife conservation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {archetypes.map((archetype) => (
          <Card 
            key={archetype.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedArchetype === archetype.id ? 'ring-2 ring-primary border-primary' : ''
            }`}
            onClick={() => setSelectedArchetype(archetype.id)}
          >
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">{archetype.emoji}</div>
              <CardTitle className="text-lg">{archetype.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{archetype.description}</p>
              <div className="flex flex-wrap gap-2">
                {archetype.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedArchetype && (
        <div className="text-center space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Experience Level</label>
            <select 
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          
          <Button 
            onClick={handleSaveArchetype} 
            disabled={loading}
            size="lg"
            className="px-8"
          >
            {loading ? 'Saving...' : 'Begin Your Conservation Journey'}
          </Button>
        </div>
      )}
    </div>
  );
};
