
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Plus, 
  Users, 
  Calendar, 
  DollarSign, 
  Target, 
  TrendingUp,
  MapPin,
  Clock,
  Award,
  Filter
} from 'lucide-react';

const ProjectsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Amazon Rainforest AI Monitoring',
      description: 'Deploy AI-powered sensors to monitor deforestation and wildlife patterns in real-time',
      type: 'ai_conservation',
      status: 'active',
      progress: 68,
      biome: 'Rainforest',
      teamSize: 12,
      budget: '$2.5M',
      timeline: '18 months',
      impact: '50,000 hectares monitored',
      technologies: ['IoT Sensors', 'Machine Learning', 'Satellite Imagery'],
      teamMembers: [
        { name: 'Dr. Sarah Chen', role: 'Lead AI Researcher', avatar: '/api/placeholder/32/32' },
        { name: 'Marcus Rodriguez', role: 'Field Coordinator', avatar: '/api/placeholder/32/32' },
        { name: 'Dr. Priya Patel', role: 'Biologist', avatar: '/api/placeholder/32/32' }
      ]
    },
    {
      id: 2,
      title: 'Coral Reef Restoration Network',
      description: 'Blockchain-powered coral restoration tracking with community rewards',
      type: 'biome_restoration',
      status: 'planning',
      progress: 25,
      biome: 'Marine',
      teamSize: 8,
      budget: '$1.8M',
      timeline: '24 months',
      impact: '15 reef sites targeted',
      technologies: ['Blockchain', 'Underwater Drones', 'Community Platform'],
      teamMembers: [
        { name: 'Dr. James Miller', role: 'Marine Biologist', avatar: '/api/placeholder/32/32' },
        { name: 'Lisa Wang', role: 'Blockchain Developer', avatar: '/api/placeholder/32/32' }
      ]
    },
    {
      id: 3,
      title: 'Urban Wildlife Corridors',
      description: 'Creating connected green spaces for urban wildlife migration',
      type: 'community_outreach',
      status: 'completed',
      progress: 100,
      biome: 'Urban',
      teamSize: 15,
      budget: '$950K',
      timeline: '12 months',
      impact: '25 km of corridors created',
      technologies: ['GIS Mapping', 'Community App', 'Drone Surveys'],
      teamMembers: [
        { name: 'Alex Thompson', role: 'Urban Planner', avatar: '/api/placeholder/32/32' },
        { name: 'Dr. Nina Foster', role: 'Wildlife Ecologist', avatar: '/api/placeholder/32/32' }
      ]
    }
  ];

  const filteredProjects = projects.filter(project => 
    (activeTab === 'all' || project.type === activeTab) &&
    (filterStatus === 'all' || project.status === filterStatus)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'planning': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'paused': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

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
              Collaborative conservation initiatives making real-world impact
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Funding</p>
                  <p className="text-2xl font-bold">$18.2M</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                  <p className="text-2xl font-bold">342</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Impact Score</p>
                  <p className="text-2xl font-bold">9.2</p>
                </div>
                <Award className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Tabs and Filters */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <TabsList className="grid w-full lg:w-auto grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="ai_conservation">AI Conservation</TabsTrigger>
              <TabsTrigger value="biome_restoration">Restoration</TabsTrigger>
              <TabsTrigger value="community_outreach">Community</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2">
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Status</option>
                <option value="planning">Planning</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="paused">Paused</option>
              </select>
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {getTypeLabel(project.type)}
                      </Badge>
                      <Badge className={`${getStatusColor(project.status)} text-white text-xs`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{project.biome}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{project.teamSize} members</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span>{project.budget}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{project.timeline}</span>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Team Members */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Team:</span>
                      <div className="flex -space-x-2">
                        {project.teamMembers.slice(0, 3).map((member, index) => (
                          <Avatar key={index} className="h-6 w-6 border-2 border-background">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="text-xs">
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {project.teamMembers.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">
                              +{project.teamMembers.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Impact */}
                    <div className="pt-2 border-t border-border">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">
                          {project.impact}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectsPage;
