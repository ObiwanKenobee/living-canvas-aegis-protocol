
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDown } from 'lucide-react';

const Index = () => {
  const [selectedBiome, setSelectedBiome] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showMission, setShowMission] = useState(false);

  const biomes = [
    {
      id: 'forest',
      emoji: '🌳',
      name: 'Forest',
      description: 'Congo Basin, Amazon, Taiga',
      gradient: 'from-green-600 to-emerald-800'
    },
    {
      id: 'desert',
      emoji: '🐫',
      name: 'Desert',
      description: 'Kalahari, Atacama, Gobi',
      gradient: 'from-amber-500 to-orange-700'
    },
    {
      id: 'ocean',
      emoji: '🐋',
      name: 'Ocean',
      description: 'Coral reefs, Mangroves, Arctic ice',
      gradient: 'from-blue-500 to-cyan-700'
    },
    {
      id: 'savanna',
      emoji: '🐘',
      name: 'Savanna',
      description: 'Serengeti, Central India',
      gradient: 'from-yellow-600 to-amber-800'
    },
    {
      id: 'urban',
      emoji: '🦜',
      name: 'Urban Wild',
      description: 'Nairobi edges, Rio favelas',
      gradient: 'from-slate-600 to-purple-700'
    }
  ];

  const roles = [
    {
      id: 'artist',
      emoji: '🎨',
      name: 'Wildlife Memory Artist',
      description: 'encode animal dreams & migrations'
    },
    {
      id: 'architect',
      emoji: '🧠',
      name: 'Biome Intelligence Architect',
      description: 'design AI to protect species'
    },
    {
      id: 'composer',
      emoji: '🌱',
      name: 'Rewilding Composer',
      description: 'restore lost ecological symphonies'
    },
    {
      id: 'curator',
      emoji: '🐾',
      name: 'Indigenous Knowledge Curator',
      description: 'honor ancestral ecologies'
    }
  ];

  const missionTools = [
    { emoji: '🎼', task: 'Compose a Biome Symphony', description: 'from animal calls, soil data, and indigenous songs' },
    { emoji: '🧬', task: 'Generate a Digital Twin', description: 'of a keystone species with lifepath tracking' },
    { emoji: '🛡️', task: 'Train an AI Guardian', description: 'to predict threats using visual poetry from drones' },
    { emoji: '🧵', task: 'Weave a Living Codex', description: 'mapping myths, rituals, and climate data' },
    { emoji: '📡', task: 'Create a Global Broadcast', description: 'sharing your biome\'s story with youth worldwide' }
  ];

  const handleBeginProtocol = () => {
    if (selectedBiome && selectedRole) {
      setShowMission(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
              AEGIS WILDLIFE
            </h1>
            <h2 className="text-3xl font-semibold mb-4 text-foreground">
              Planetary Renaissance Protocol
            </h2>
            <div className="text-xl italic mb-8 text-muted-foreground border-l-4 border-primary/30 pl-4">
              "When the Earth breathes, art listens. When nature speaks, intelligence creates."
            </div>
            <p className="text-lg mb-12 text-foreground leading-relaxed">
              An interactive prompt that merges creativity, ethics, and regeneration to co-design our living future.
            </p>
            
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-8 mb-12 border border-border/50">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">🎨 The Living Canvas of the Earth</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                You are an eco-artist-engineer living in the year 2027. The Earth has called upon her guardians — 
                those who dream like Da Vinci, fight like Wangari Maathai, and build like Babbage — to design 
                the next evolution of life on Earth.
              </p>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                You've been granted access to the AEGIS WILDLIFE system.
              </Badge>
            </div>

            <ArrowDown className="mx-auto animate-bounce text-primary" size={32} />
          </div>
        </div>
      </div>

      {/* Biome Selection */}
      <div className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Select Your Biome</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {biomes.map((biome) => (
            <Card 
              key={biome.id} 
              className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                selectedBiome === biome.id ? 'border-primary shadow-lg' : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedBiome(biome.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`text-6xl mb-4 p-4 rounded-full bg-gradient-to-br ${biome.gradient} bg-opacity-10`}>
                  {biome.emoji}
                </div>
                <h4 className="text-xl font-semibold mb-2 text-foreground">{biome.name}</h4>
                <p className="text-muted-foreground">{biome.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Role Selection */}
      {selectedBiome && (
        <div className="container mx-auto px-4 py-16 bg-muted/30 rounded-lg mx-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Choose Your Role</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {roles.map((role) => (
              <Card 
                key={role.id} 
                className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  selectedRole === role.id ? 'border-primary shadow-lg' : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{role.emoji}</span>
                    <h4 className="text-lg font-semibold text-foreground">{role.name}</h4>
                  </div>
                  <p className="text-muted-foreground italic">{role.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedRole && (
            <div className="text-center mt-12">
              <Button 
                onClick={handleBeginProtocol}
                size="lg" 
                className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
              >
                Begin Your Wildlife Memory Protocol
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Mission Dashboard */}
      {showMission && (
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold mb-4 text-foreground">
              AEGIS accepts your role. Your Wildlife Memory Protocol has begun syncing.
            </h3>
            <p className="text-xl text-primary animate-pulse">
              First animal heartbeat detected...
            </p>
          </div>

          <Card className="max-w-4xl mx-auto mb-12 border-primary/30">
            <CardContent className="p-8">
              <h4 className="text-2xl font-semibold mb-6 text-foreground">Your Mission</h4>
              <p className="text-lg mb-8 text-muted-foreground leading-relaxed">
                Design a wildlife protection protocol using AI, art, sound, story, and science. 
                Use AEGIS tools to create a synthesis that honors life not as data, but as sacred narrative.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {missionTools.map((tool, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg border border-border/30">
                    <span className="text-3xl">{tool.emoji}</span>
                    <div>
                      <h5 className="font-semibold text-foreground mb-1">{tool.task}</h5>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="max-w-4xl mx-auto border-accent/30">
            <CardContent className="p-8">
              <h4 className="text-2xl font-semibold mb-4 text-foreground">🧭 Renaissance Challenge</h4>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Use the Da Vinci Codex plugin to design a flying camera-bird that camouflages in treetops 
                and sings forgotten species calls to re-attract life to depleted zones.
              </p>
              
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                <h5 className="font-semibold text-foreground mb-2">Impact Goal:</h5>
                <p className="text-muted-foreground">
                  Reawaken the senses of 8.1 billion humans to the wonder, rights, and future of Earth's more-than-human nations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-12 text-muted-foreground">
        <p className="text-lg italic">
          "Combines art, AI, and ethics into an emotional tech experience"
        </p>
        <p className="mt-2">
          Echoing the spirit of planetary heroes: Da Vinci, Wangari, Rachel Carson, Steve Irwin, Vandana Shiva
        </p>
      </footer>
    </div>
  );
};

export default Index;
