
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  Globe, 
  Users, 
  Leaf, 
  Shield, 
  Zap,
  Target,
  Award,
  MapPin,
  Calendar,
  Activity,
  TreePine,
  Fish,
  Bird,
  Mountain,
  Waves,
  Sun
} from 'lucide-react';

const ImpactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeFilter, setTimeFilter] = useState('all-time');

  const globalMetrics = [
    {
      title: 'Hectares Protected',
      value: '2.3M',
      change: '+15.2%',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Land and marine areas under protection'
    },
    {
      title: 'Species Monitored',
      value: '12,847',
      change: '+8.7%',
      icon: Bird,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Species actively tracked by our network'
    },
    {
      title: 'Active Conservationists',
      value: '89,432',
      change: '+23.1%',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Global community members'
    },
    {
      title: 'Carbon Sequestered',
      value: '1.2M tons',
      change: '+12.5%',
      icon: Leaf,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      description: 'CO2 equivalent captured this year'
    }
  ];

  const sdgGoals = [
    { goal: 'Climate Action', progress: 78, color: 'bg-red-500', target: 'SDG 13' },
    { goal: 'Life Below Water', progress: 65, color: 'bg-blue-500', target: 'SDG 14' },
    { goal: 'Life on Land', progress: 82, color: 'bg-green-500', target: 'SDG 15' },
    { goal: 'Clean Water', progress: 71, color: 'bg-cyan-500', target: 'SDG 6' },
    { goal: 'Sustainable Cities', progress: 58, color: 'bg-orange-500', target: 'SDG 11' },
    { goal: 'Partnerships', progress: 89, color: 'bg-purple-500', target: 'SDG 17' }
  ];

  const biomeImpact = [
    {
      name: 'Tropical Rainforests',
      icon: TreePine,
      protected: '890,000 ha',
      projects: 45,
      threat_level: 'Critical',
      color: 'text-green-600',
      progress: 72
    },
    {
      name: 'Coral Reefs',
      icon: Fish,
      protected: '150,000 ha',
      projects: 28,
      threat_level: 'High',
      color: 'text-blue-600',
      progress: 58
    },
    {
      name: 'Mountain Ecosystems',
      icon: Mountain,
      protected: '560,000 ha',
      projects: 32,
      threat_level: 'Medium',
      color: 'text-gray-600',
      progress: 65
    },
    {
      name: 'Wetlands',
      icon: Waves,
      protected: '320,000 ha',
      projects: 18,
      threat_level: 'High',
      color: 'text-cyan-600',
      progress: 43
    },
    {
      name: 'Grasslands',
      icon: Sun,
      protected: '780,000 ha',
      projects: 25,
      threat_level: 'Medium',
      color: 'text-yellow-600',
      progress: 69
    }
  ];

  const recentAchievements = [
    {
      title: 'Amazon Monitoring Network Milestone',
      description: '1,000th AI camera deployed in Amazon rainforest',
      date: '2024-06-01',
      impact: '50,000 new hectares monitored',
      type: 'Technology'
    },
    {
      title: 'Great Barrier Reef Restoration',
      description: 'Successfully restored 500 hectares of coral reef',
      date: '2024-05-15',
      impact: '25 marine species populations recovered',
      type: 'Restoration'
    },
    {
      title: 'Community Conservation Awards',
      description: '50 local communities recognized for conservation efforts',
      date: '2024-05-01',
      impact: '100,000 people engaged in conservation',
      type: 'Community'
    },
    {
      title: 'Blockchain Carbon Credits Launch',
      description: 'Launched transparent carbon credit marketplace',
      date: '2024-04-20',
      impact: '$2.5M in verified carbon credits traded',
      type: 'Innovation'
    }
  ];

  const regionMetrics = [
    { region: 'Asia-Pacific', projects: 156, hectares: '1.2M', species: 4832, funding: '$12.5M' },
    { region: 'Africa', projects: 89, hectares: '890K', species: 3247, funding: '$8.3M' },
    { region: 'Americas', projects: 134, hectares: '1.1M', species: 3891, funding: '$15.2M' },
    { region: 'Europe', projects: 67, hectares: '420K', species: 1876, funding: '$6.8M' },
    { region: 'Middle East', projects: 23, hectares: '180K', species: 892, funding: '$2.1M' }
  ];

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

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
              Real-time conservation impact across our global network
            </p>
          </div>
          <div className="flex space-x-4">
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all-time">All Time</option>
              <option value="this-year">This Year</option>
              <option value="this-month">This Month</option>
              <option value="this-week">This Week</option>
            </select>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Global Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {globalMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full ${metric.bgColor}`}>
                      <IconComponent className={`w-6 h-6 ${metric.color}`} />
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {metric.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold mb-1">{metric.value}</p>
                    <p className="text-sm font-medium text-foreground mb-1">{metric.title}</p>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Impact Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="biomes">Biomes</TabsTrigger>
            <TabsTrigger value="sdg">SDG Progress</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Conservation Impact Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Conservation Impact Timeline</span>
                  </CardTitle>
                  <CardDescription>Major milestones and achievements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAchievements.slice(0, 4).map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sm">{achievement.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {achievement.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        <div className="flex justify-between items-center">
                          <p className="text-xs font-medium text-primary">{achievement.impact}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Real-time Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Real-time Activity</span>
                  </CardTitle>
                  <CardDescription>Live conservation activities worldwide</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm">New protected area established</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2 min ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Bird className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Wildlife monitoring alert</span>
                    </div>
                    <span className="text-xs text-muted-foreground">5 min ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">Community project launched</span>
                    </div>
                    <span className="text-xs text-muted-foreground">12 min ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Target className="w-4 h-4 text-orange-600" />
                      <span className="text-sm">Conservation goal achieved</span>
                    </div>
                    <span className="text-xs text-muted-foreground">18 min ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="biomes" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {biomeImpact.map((biome, index) => {
                const IconComponent = biome.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <IconComponent className={`w-6 h-6 ${biome.color}`} />
                          <CardTitle className="text-lg">{biome.name}</CardTitle>
                        </div>
                        <Badge className={`${getThreatColor(biome.threat_level)} text-white text-xs`}>
                          {biome.threat_level}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Protected Area</p>
                          <p className="font-semibold">{biome.protected}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Active Projects</p>
                          <p className="font-semibold">{biome.projects}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Conservation Progress</span>
                          <span>{biome.progress}%</span>
                        </div>
                        <Progress value={biome.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="sdg" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>UN Sustainable Development Goals Progress</span>
                </CardTitle>
                <CardDescription>Our contribution to global sustainability targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sdgGoals.map((goal, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{goal.goal}</h4>
                          <p className="text-sm text-muted-foreground">{goal.target}</p>
                        </div>
                        <span className="text-lg font-bold">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regional" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Regional Impact Summary</span>
                  </CardTitle>
                  <CardDescription>Conservation impact across different world regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Region</th>
                          <th className="text-left p-3">Projects</th>
                          <th className="text-left p-3">Hectares Protected</th>
                          <th className="text-left p-3">Species Monitored</th>
                          <th className="text-left p-3">Funding</th>
                        </tr>
                      </thead>
                      <tbody>
                        {regionMetrics.map((region, index) => (
                          <tr key={index} className="border-b hover:bg-muted/50">
                            <td className="p-3 font-medium">{region.region}</td>
                            <td className="p-3">{region.projects}</td>
                            <td className="p-3">{region.hectares}</td>
                            <td className="p-3">{region.species}</td>
                            <td className="p-3 font-medium text-green-600">{region.funding}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentAchievements.map((achievement, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{achievement.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-primary">{achievement.impact}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{new Date(achievement.date).toLocaleDateString()}</span>
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

export default ImpactPage;
