
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Beaker, 
  Zap, 
  Brain, 
  Cpu, 
  Database, 
  Plane, 
  Satellite, 
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  Lightbulb,
  GitBranch,
  Shield,
  Globe,
  Plus
} from 'lucide-react';

const LabsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');

  const labs = [
    {
      id: 1,
      name: 'AI Wildlife Recognition Lab',
      description: 'Developing next-generation computer vision models for real-time wildlife identification and behavior analysis',
      type: 'ai_research',
      status: 'development',
      lead: {
        name: 'Dr. Sarah Chen',
        title: 'AI Research Director',
        avatar: '/api/placeholder/40/40'
      },
      team: 12,
      funding: { goal: 2500000, current: 1850000 },
      technologies: ['TensorFlow', 'PyTorch', 'Computer Vision', 'Edge Computing'],
      focus: 'Real-time species identification with 99.5% accuracy',
      outcomes: [
        'Deploy AI cameras in 50+ locations',
        'Identify 500+ species automatically',
        'Reduce monitoring costs by 80%'
      ],
      timeline: '18 months',
      progress: 65,
      publications: 8,
      collaborators: ['Stanford AI Lab', 'WWF', 'National Geographic']
    },
    {
      id: 2,
      name: 'Biome Digital Twin Laboratory',
      description: 'Creating comprehensive digital replicas of ecosystems for predictive conservation modeling',
      type: 'biotech',
      status: 'testing',
      lead: {
        name: 'Dr. Marcus Rodriguez',
        title: 'Ecosystem Modeling Lead',
        avatar: '/api/placeholder/40/40'
      },
      team: 15,
      funding: { goal: 3200000, current: 2100000 },
      technologies: ['IoT Sensors', 'Satellite Data', 'Machine Learning', 'Cloud Computing'],
      focus: 'Predictive ecosystem health modeling',
      outcomes: [
        'Model 10 critical biomes',
        'Predict climate impacts',
        'Guide restoration efforts'
      ],
      timeline: '24 months',
      progress: 45,
      publications: 5,
      collaborators: ['NASA', 'UNEP', 'Climate Research Institutes']
    },
    {
      id: 3,
      name: 'Blockchain Conservation Rewards',
      description: 'Incentivizing community conservation through transparent blockchain-based reward systems',
      type: 'blockchain',
      status: 'deployed',
      lead: {
        name: 'Dr. Priya Patel',
        title: 'Blockchain Innovation Lead',
        avatar: '/api/placeholder/40/40'
      },
      team: 8,
      funding: { goal: 1500000, current: 1500000 },
      technologies: ['Ethereum', 'Smart Contracts', 'Mobile Apps', 'IoT Integration'],
      focus: 'Community-driven conservation incentives',
      outcomes: [
        'Deploy in 25 communities',
        'Track 1M+ conservation actions',
        'Distribute $500K in rewards'
      ],
      timeline: '12 months',
      progress: 100,
      publications: 3,
      collaborators: ['Local Communities', 'Conservation Orgs', 'Tech Partners']
    },
    {
      id: 4,
      name: 'Autonomous Drone Surveillance',
      description: 'Advanced autonomous drone systems for large-scale habitat monitoring and anti-poaching operations',
      type: 'drone_technology',
      status: 'conceptual',
      lead: {
        name: 'Dr. James Miller',
        title: 'Robotics Research Lead',
        avatar: '/api/placeholder/40/40'
      },
      team: 10,
      funding: { goal: 2800000, current: 350000 },
      technologies: ['Autonomous Flight', 'Computer Vision', 'Thermal Imaging', 'AI Navigation'],
      focus: 'Intelligent surveillance and rapid response',
      outcomes: [
        'Deploy 100+ autonomous drones',
        'Cover 10,000 sq km area',
        'Reduce poaching by 90%'
      ],
      timeline: '30 months',
      progress: 15,
      publications: 1,
      collaborators: ['Defense Contractors', 'Ranger Organizations', 'Tech Startups']
    }
  ];

  const researchAreas = [
    { name: 'AI & Machine Learning', icon: Brain, projects: 15, funding: '$8.5M' },
    { name: 'Biotechnology', icon: Beaker, projects: 8, funding: '$5.2M' },
    { name: 'Drone Technology', icon: Plane, projects: 6, funding: '$3.8M' },
    { name: 'Data Analytics', icon: Database, projects: 12, funding: '$4.1M' },
    { name: 'IoT Sensors', icon: Cpu, projects: 10, funding: '$2.9M' },
    { name: 'Blockchain', icon: Shield, projects: 4, funding: '$1.7M' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'conceptual': return 'bg-gray-500';
      case 'development': return 'bg-blue-500';
      case 'testing': return 'bg-yellow-500';
      case 'deployed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ai_research': return Brain;
      case 'biotech': return Beaker;
      case 'blockchain': return Shield;
      case 'drone_technology': return Plane;
      case 'data_analytics': return Database;
      case 'iot_sensors': return Cpu;
      default: return Lightbulb;
    }
  };

  const filteredLabs = labs.filter(lab => {
    if (activeTab === 'all') return true;
    return lab.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Innovation Labs
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Cutting-edge research and development for conservation technology
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Propose Lab
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <GitBranch className="w-4 h-4 mr-2" />
              Collaborate
            </Button>
          </div>
        </div>

        {/* Research Areas Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {researchAreas.map((area, index) => {
            const IconComponent = area.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <IconComponent className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold text-sm mb-1">{area.name}</h3>
                  <p className="text-xs text-muted-foreground">{area.projects} projects</p>
                  <p className="text-xs font-medium text-green-600">{area.funding}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Lab Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Labs</p>
                  <p className="text-2xl font-bold">41</p>
                </div>
                <Beaker className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Funding</p>
                  <p className="text-2xl font-bold">$26.2M</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Researchers</p>
                  <p className="text-2xl font-bold">234</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Publications</p>
                  <p className="text-2xl font-bold">127</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Labs Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="active">All Labs</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
            <TabsTrigger value="deployed">Deployed</TabsTrigger>
            <TabsTrigger value="conceptual">Conceptual</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredLabs.map((lab) => {
                const TypeIcon = getTypeIcon(lab.type);
                const fundingProgress = (lab.funding.current / lab.funding.goal) * 100;
                
                return (
                  <Card key={lab.id} className="hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <TypeIcon className="w-5 h-5 text-primary" />
                          <Badge variant="secondary" className="text-xs">
                            {lab.type.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <Badge className={`${getStatusColor(lab.status)} text-white text-xs`}>
                          {lab.status.charAt(0).toUpperCase() + lab.status.slice(1)}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{lab.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {lab.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Lead Researcher */}
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={lab.lead.avatar} />
                          <AvatarFallback>{lab.lead.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{lab.lead.name}</p>
                          <p className="text-xs text-muted-foreground">{lab.lead.title}</p>
                        </div>
                      </div>

                      {/* Lab Metrics */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{lab.team} researchers</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{lab.timeline}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-muted-foreground" />
                          <span>{lab.publications} publications</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                          <span>{lab.collaborators.length} partners</span>
                        </div>
                      </div>

                      {/* Research Focus */}
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium text-primary mb-1">Research Focus:</p>
                        <p className="text-sm">{lab.focus}</p>
                      </div>

                      {/* Funding Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Funding Progress</span>
                          <span>${(lab.funding.current / 1000000).toFixed(1)}M / ${(lab.funding.goal / 1000000).toFixed(1)}M</span>
                        </div>
                        <Progress value={fundingProgress} className="h-2" />
                      </div>

                      {/* Research Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Research Progress</span>
                          <span>{lab.progress}%</span>
                        </div>
                        <Progress value={lab.progress} className="h-2" />
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1">
                        {lab.technologies.slice(0, 4).map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {lab.technologies.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{lab.technologies.length - 4}
                          </Badge>
                        )}
                      </div>

                      {/* Expected Outcomes */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Expected Outcomes:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {lab.outcomes.slice(0, 2).map((outcome, index) => (
                            <li key={index} className="flex items-start space-x-1">
                              <span className="text-primary">•</span>
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <Zap className="w-4 h-4 mr-1" />
                          Join Lab
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <DollarSign className="w-4 h-4 mr-1" />
                          Fund Research
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LabsPage;
