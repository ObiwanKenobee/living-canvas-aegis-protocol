
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  MapPin, 
  Users,
  Calendar,
  Award,
  Leaf,
  Heart,
  Globe,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const ImpactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock impact data
  const conservationMetrics = [
    { metric: 'Species Protected', value: 1247, unit: 'species', change: '+12%', color: 'text-green-600' },
    { metric: 'Habitat Restored', value: 52.3, unit: 'km²', change: '+8%', color: 'text-blue-600' },
    { metric: 'Carbon Sequestered', value: 18.7, unit: 'tons CO2', change: '+15%', color: 'text-purple-600' },
    { metric: 'Communities Engaged', value: 89, unit: 'communities', change: '+23%', color: 'text-orange-600' }
  ];

  const timeSeriesData = [
    { month: 'Jan', species: 1100, habitat: 45, carbon: 15, communities: 72 },
    { month: 'Feb', species: 1150, habitat: 47, carbon: 16, communities: 75 },
    { month: 'Mar', species: 1180, habitat: 48, carbon: 17, communities: 78 },
    { month: 'Apr', species: 1200, habitat: 50, carbon: 17.5, communities: 82 },
    { month: 'May', species: 1230, habitat: 51, carbon: 18.2, communities: 85 },
    { month: 'Jun', species: 1247, habitat: 52.3, carbon: 18.7, communities: 89 }
  ];

  const projectImpacts = [
    {
      id: '1',
      name: 'AI Elephant Tracking Kenya',
      impact: 'Reduced human-wildlife conflict by 78%',
      metrics: { species: 45, area: 2.3, communities: 5 },
      status: 'active'
    },
    {
      id: '2',
      name: 'Coral Reef Restoration Maldives',
      impact: 'Increased coral coverage by 34%',
      metrics: { species: 120, area: 0.8, communities: 3 },
      status: 'active'
    },
    {
      id: '3',
      name: 'Amazon Digital Twin Brazil',
      impact: 'Predicted deforestation hotspots with 92% accuracy',
      metrics: { species: 580, area: 15.2, communities: 12 },
      status: 'planning'
    }
  ];

  const globalRegions = [
    { region: 'Africa', projects: 34, species: 445, color: 'bg-green-500' },
    { region: 'South America', projects: 28, species: 523, color: 'bg-blue-500' },
    { region: 'Asia', projects: 22, species: 189, color: 'bg-purple-500' },
    { region: 'North America', projects: 18, species: 67, color: 'bg-orange-500' },
    { region: 'Europe', projects: 12, species: 23, color: 'bg-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Global Impact Dashboard
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Track conservation outcomes and measure planetary healing progress
            </p>
          </div>
          <Button>
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {conservationMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metric.value}
                  <span className="text-sm font-normal ml-1 text-muted-foreground">
                    {metric.unit}
                  </span>
                </div>
                <p className={`text-xs ${metric.color}`}>
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Project Impact</TabsTrigger>
            <TabsTrigger value="regional">Regional Data</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Conservation Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Conservation Progress Trends</CardTitle>
                  <CardDescription>Species protection and habitat restoration over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={timeSeriesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="species" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="habitat" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Impact Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Impact Summary</CardTitle>
                  <CardDescription>Cumulative conservation achievements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Leaf className="w-5 h-5 text-green-500" />
                      <span className="font-medium">Ecosystems Monitored</span>
                    </div>
                    <span className="text-2xl font-bold">47</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="font-medium">Lives Saved</span>
                    </div>
                    <span className="text-2xl font-bold">12,450</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Countries Active</span>
                    </div>
                    <span className="text-2xl font-bold">34</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium">UN SDG Contributions</span>
                    </div>
                    <span className="text-2xl font-bold">8</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Biodiversity Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">94.2</div>
                  <Progress value={94.2} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Overall ecosystem health score
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Conservation Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">87%</div>
                  <Progress value={87} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Success rate of protection efforts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 mb-2">78%</div>
                  <Progress value={78} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Local participation in projects
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Project Impact Tab */}
          <TabsContent value="projects" className="mt-6">
            <div className="space-y-6">
              {projectImpacts.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription className="text-green-600 font-medium">
                          {project.impact}
                        </CardDescription>
                      </div>
                      <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          <strong>{project.metrics.species}</strong> species protected
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          <strong>{project.metrics.area} km²</strong> area covered
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          <strong>{project.metrics.communities}</strong> communities involved
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Regional Data Tab */}
          <TabsContent value="regional" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Project Distribution</CardTitle>
                  <CardDescription>Conservation efforts by geographic region</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={globalRegions}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="projects" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Impact Summary</CardTitle>
                  <CardDescription>Species protection by region</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {globalRegions.map((region, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${region.color}`}></div>
                        <span className="font-medium">{region.region}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{region.species} species</div>
                        <div className="text-sm text-muted-foreground">{region.projects} projects</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Conservation Metrics Trends</CardTitle>
                <CardDescription>Track progress across multiple conservation indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="species" stroke="#8884d8" strokeWidth={2} name="Species Protected" />
                    <Line type="monotone" dataKey="habitat" stroke="#82ca9d" strokeWidth={2} name="Habitat Restored (km²)" />
                    <Line type="monotone" dataKey="carbon" stroke="#ffc658" strokeWidth={2} name="Carbon Sequestered (tons)" />
                    <Line type="monotone" dataKey="communities" stroke="#ff7c7c" strokeWidth={2} name="Communities Engaged" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ImpactPage;
