
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Globe, 
  Users, 
  Target,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Download,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const mockImpactData = [
  { month: 'Jan', species: 145, habitats: 12, co2: 2400 },
  { month: 'Feb', species: 152, habitats: 14, co2: 2600 },
  { month: 'Mar', species: 161, habitats: 16, co2: 2900 },
  { month: 'Apr', species: 158, habitats: 18, co2: 3100 },
  { month: 'May', species: 167, habitats: 20, co2: 3400 },
  { month: 'Jun', species: 174, habitats: 22, co2: 3600 }
];

const mockRegionalData = [
  { name: 'Africa', value: 35, color: '#8884d8' },
  { name: 'Asia', value: 28, color: '#82ca9d' },
  { name: 'Americas', value: 22, color: '#ffc658' },
  { name: 'Europe', value: 15, color: '#ff7300' }
];

export const ImpactAnalytics: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('species');
  const [timeRange, setTimeRange] = useState('6m');

  const impactMetrics = [
    { title: 'Species Protected', value: '1,247', change: '+12%', icon: Target, color: 'text-green-600' },
    { title: 'Habitats Restored', value: '89', change: '+8%', icon: Globe, color: 'text-blue-600' },
    { title: 'CO₂ Offset (tons)', value: '45,200', change: '+15%', icon: Activity, color: 'text-purple-600' },
    { title: 'Community Members', value: '12,847', change: '+23%', icon: Users, color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Impact Analytics</h2>
          <p className="text-muted-foreground">Real-time conservation impact measurement and reporting</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{metric.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="species">Species Impact</TabsTrigger>
          <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
          <TabsTrigger value="carbon">Carbon Footprint</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Conservation Impact Trends</CardTitle>
                <CardDescription>6-month conservation progress overview</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockImpactData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="species" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="habitats" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Global Impact Distribution</CardTitle>
                <CardDescription>Impact by geographical region</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={mockRegionalData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {mockRegionalData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="species" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Species Protection Progress</CardTitle>
              <CardDescription>Detailed breakdown of species conservation efforts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { species: 'African Elephants', protected: 245, total: 400, status: 'Critical' },
                { species: 'Snow Leopards', protected: 89, total: 120, status: 'Endangered' },
                { species: 'Marine Turtles', protected: 567, total: 800, status: 'Vulnerable' },
                { species: 'Coral Reefs', protected: 1200, total: 2000, status: 'Threatened' }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{item.species}</span>
                      <Badge variant={item.status === 'Critical' ? 'destructive' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {item.protected}/{item.total}
                    </span>
                  </div>
                  <Progress value={(item.protected / item.total) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regional">
          <Card>
            <CardHeader>
              <CardTitle>Regional Conservation Impact</CardTitle>
              <CardDescription>Conservation efforts breakdown by region</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockImpactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="species" fill="#8884d8" name="Species Protected" />
                  <Bar dataKey="habitats" fill="#82ca9d" name="Habitats Restored" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="carbon">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Impact Analysis</CardTitle>
              <CardDescription>CO₂ offset and environmental impact tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={mockImpactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="co2" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
