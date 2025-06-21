
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Shield, 
  Activity, 
  Database,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  UserCheck,
  Ban,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const mockSystemMetrics = [
  { time: '00:00', users: 1240, projects: 87, api_calls: 15420 },
  { time: '04:00', users: 890, projects: 92, api_calls: 12800 },
  { time: '08:00', users: 2100, projects: 105, api_calls: 28500 },
  { time: '12:00', users: 3200, projects: 118, api_calls: 35200 },
  { time: '16:00', users: 2800, projects: 125, api_calls: 31800 },
  { time: '20:00', users: 1950, projects: 112, api_calls: 24600 }
];

const mockUsers = [
  { id: 1, name: 'Dr. Sarah Wilson', email: 'wilson@oceaninst.org', archetype: 'Analyst', status: 'active', projects: 12 },
  { id: 2, name: 'Marcus Chen', email: 'chen@techfornature.com', archetype: 'Developer', status: 'active', projects: 8 },
  { id: 3, name: 'Elena Rodriguez', email: 'rodriguez@marine.org', archetype: 'Visionary', status: 'suspended', projects: 15 },
  { id: 4, name: 'James Kimani', email: 'kimani@wildkenya.org', archetype: 'Guardian', status: 'active', projects: 6 }
];

const mockProjects = [
  { id: 1, name: 'AI Elephant Tracking', lead: 'Dr. Sarah Wilson', status: 'active', participants: 15, budget: 250000 },
  { id: 2, name: 'Coral Restoration', lead: 'Elena Rodriguez', status: 'planning', participants: 8, budget: 180000 },
  { id: 3, name: 'Amazon Digital Twin', lead: 'Marcus Chen', status: 'active', participants: 22, budget: 500000 },
  { id: 4, name: 'Arctic Ice Monitoring', lead: 'James Kimani', status: 'completed', participants: 12, budget: 150000 }
];

export const AdminDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [userFilter, setUserFilter] = useState('all');

  const systemStats = [
    { title: 'Total Users', value: '12,847', change: '+5.2%', icon: Users, color: 'text-blue-600' },
    { title: 'Active Projects', value: '127', change: '+3.1%', icon: Activity, color: 'text-green-600' },
    { title: 'System Uptime', value: '99.9%', change: '0%', icon: CheckCircle, color: 'text-emerald-600' },
    { title: 'API Requests', value: '1.2M', change: '+12%', icon: Database, color: 'text-purple-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'suspended': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      case 'planning': return 'bg-blue-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Admin Dashboard</h2>
          <p className="text-muted-foreground">System overview and management controls</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'}>
                    {stat.change}
                  </span> from last period
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="projects">Project Management</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Active users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockSystemMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Usage</CardTitle>
                <CardDescription>API calls per hour</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockSystemMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="api_calls" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system events and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'user_join', message: 'New user Dr. Emma Thompson joined', time: '2 minutes ago', status: 'info' },
                  { type: 'project_created', message: 'Project "Marine Sanctuary AI" created', time: '15 minutes ago', status: 'success' },
                  { type: 'system_alert', message: 'High API usage detected', time: '1 hour ago', status: 'warning' },
                  { type: 'security', message: 'Failed login attempts from IP 192.168.1.100', time: '2 hours ago', status: 'error' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' :
                      activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Input placeholder="Search users..." className="w-64" />
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage platform users and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Archetype</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.archetype}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`} />
                          <span className="capitalize">{user.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.projects}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Ban className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
              <CardDescription>Monitor and manage conservation projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Lead</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.lead}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                          <span className="capitalize">{project.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>{project.participants}</TableCell>
                      <TableCell>${project.budget.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <AlertTriangle className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Monitor system performance and uptime</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { service: 'API Gateway', status: 'healthy', uptime: '99.9%' },
                  { service: 'Database', status: 'healthy', uptime: '99.8%' },
                  { service: 'AI Processing', status: 'warning', uptime: '98.5%' },
                  { service: 'File Storage', status: 'healthy', uptime: '99.9%' }
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        service.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <span className="font-medium">{service.service}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{service.uptime}</div>
                      <div className="text-xs text-muted-foreground capitalize">{service.status}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Usage</CardTitle>
                <CardDescription>Current system resource utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { resource: 'CPU Usage', value: 45, max: 100, unit: '%' },
                  { resource: 'Memory', value: 6.2, max: 16, unit: 'GB' },
                  { resource: 'Storage', value: 2.1, max: 10, unit: 'TB' },
                  { resource: 'Bandwidth', value: 120, max: 1000, unit: 'Mbps' }
                ].map((resource, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{resource.resource}</span>
                      <span>{resource.value}{resource.unit} / {resource.max}{resource.unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(resource.value / resource.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Alerts</CardTitle>
                <CardDescription>Recent security events and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { type: 'Failed Login', count: 15, severity: 'high', time: '1 hour ago' },
                  { type: 'Suspicious API Usage', count: 3, severity: 'medium', time: '3 hours ago' },
                  { type: 'Rate Limit Exceeded', count: 8, severity: 'low', time: '6 hours ago' },
                  { type: 'New Device Login', count: 2, severity: 'info', time: '12 hours ago' }
                ].map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className={`w-4 h-4 ${
                        alert.severity === 'high' ? 'text-red-500' :
                        alert.severity === 'medium' ? 'text-yellow-500' :
                        alert.severity === 'low' ? 'text-blue-500' : 'text-gray-500'
                      }`} />
                      <div>
                        <div className="font-medium">{alert.type}</div>
                        <div className="text-xs text-muted-foreground">{alert.time}</div>
                      </div>
                    </div>
                    <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                      {alert.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
                <CardDescription>Manage permissions and access levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Admin Users</span>
                    <Badge>3</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Project Leads</span>
                    <Badge>47</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Contributors</span>
                    <Badge>1,245</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Observers</span>
                    <Badge>11,552</Badge>
                  </div>
                </div>
                <Button className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Manage Permissions
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
