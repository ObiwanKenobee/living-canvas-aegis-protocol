
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { 
  Search, 
  Filter, 
  Plus,
  MapPin,
  Target,
  Users,
  TrendingUp
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { toast } from '@/hooks/use-toast';

const ProjectsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBiome, setFilterBiome] = useState('');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Mock data for demo - in production this would come from Supabase
  const mockProjects = [
    {
      id: '1',
      title: 'AI-Powered Elephant Tracking in Kenya',
      description: 'Using computer vision and IoT sensors to monitor elephant populations and prevent human-wildlife conflict in Maasai Mara.',
      biome_focus: 'Savanna',
      status: 'active',
      team_size: 15,
      funding_goal: 250000,
      current_funding: 187500,
      location: 'Kenya, East Africa',
      duration_months: 18,
      conservation_focus: ['Wildlife Protection', 'AI Technology', 'Community Engagement'],
      lead_researcher: {
        name: 'Dr. Amara Okafor',
        avatar: '/api/placeholder/40/40'
      }
    },
    {
      id: '2',
      title: 'Coral Reef Restoration with Biorock Technology',
      description: 'Accelerating coral growth using mineral accretion technology and monitoring recovery with underwater drones.',
      biome_focus: 'Marine',
      status: 'active',
      team_size: 8,
      funding_goal: 180000,
      current_funding: 95000,
      location: 'Maldives, Indian Ocean',
      duration_months: 24,
      conservation_focus: ['Marine Conservation', 'Climate Action', 'Restoration'],
      lead_researcher: {
        name: 'Dr. Marina Rodriguez',
        avatar: '/api/placeholder/40/40'
      }
    },
    {
      id: '3',
      title: 'Amazon Rainforest Digital Twin',
      description: 'Creating a comprehensive digital model of Amazon ecosystems using satellite data and ground sensors.',
      biome_focus: 'Tropical Forest',
      status: 'planning',
      team_size: 22,
      funding_goal: 500000,
      current_funding: 125000,
      location: 'Brazil, South America',
      duration_months: 36,
      conservation_focus: ['Forest Conservation', 'Digital Modeling', 'Biodiversity'],
      lead_researcher: {
        name: 'Dr. Carlos Silva',
        avatar: '/api/placeholder/40/40'
      }
    }
  ];

  useEffect(() => {
    // In production, fetch from Supabase
    setProjects(mockProjects);
    setLoading(false);
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBiome = !filterBiome || project.biome_focus === filterBiome;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'my-projects' && user) || 
                      project.status === activeTab;
    
    return matchesSearch && matchesBiome && matchesTab;
  });

  const handleJoinProject = async (projectId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to join projects.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Project joined!",
      description: "You've successfully joined this conservation project.",
    });
  };

  const handleSupportProject = async (projectId: string) => {
    toast({
      title: "Support feature coming soon",
      description: "Financial support for projects will be available soon.",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Conservation Projects
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Join global conservation initiatives and make a real impact
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Start Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">Worldwide initiatives</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Global Participants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,847</div>
              <p className="text-xs text-muted-foreground">Conservation heroes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Biomes Covered</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Ecosystems protected</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">Success rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterBiome} onValueChange={setFilterBiome}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by biome" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Biomes</SelectItem>
              <SelectItem value="Marine">Marine</SelectItem>
              <SelectItem value="Tropical Forest">Tropical Forest</SelectItem>
              <SelectItem value="Savanna">Savanna</SelectItem>
              <SelectItem value="Temperate Forest">Temperate Forest</SelectItem>
              <SelectItem value="Arctic">Arctic</SelectItem>
              <SelectItem value="Desert">Desert</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Project Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onJoin={handleJoinProject}
                  onSupport={handleSupportProject}
                />
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No projects found matching your criteria.</p>
                <Button className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Start a New Project
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectsPage;
