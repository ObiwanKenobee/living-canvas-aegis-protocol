
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Briefcase, 
  Users, 
  Trophy, 
  TrendingUp,
  MapPin,
  Calendar,
  Target
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../auth/AuthProvider';

interface DashboardData {
  userArchetype: any;
  activeProjects: any[];
  recentMetrics: any[];
  upcomingEvents: any[];
}

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData>({
    userArchetype: null,
    activeProjects: [],
    recentMetrics: [],
    upcomingEvents: []
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch user archetype
      const { data: archetype } = await supabase
        .from('user_archetypes')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Fetch active projects
      const { data: projects } = await supabase
        .from('platform_projects')
        .select(`
          *,
          project_team_members!inner(user_id)
        `)
        .eq('project_team_members.user_id', user.id)
        .eq('status', 'active')
        .limit(5);

      // Fetch recent impact metrics
      const { data: metrics } = await supabase
        .from('impact_metrics')
        .select('*')
        .eq('recorded_by', user.id)
        .order('timestamp', { ascending: false })
        .limit(5);

      setData({
        userArchetype: archetype,
        activeProjects: projects || [],
        recentMetrics: metrics || [],
        upcomingEvents: [] // Would fetch from events table
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Guardian!</h1>
            {data.userArchetype && (
              <p className="text-lg text-muted-foreground mt-2">
                {data.userArchetype.specialization} • {data.userArchetype.experience_level} level
              </p>
            )}
          </div>
          <div className="text-6xl">
            {data.userArchetype?.archetype_type === 'wildlife_memory_artist' && '🎨'}
            {data.userArchetype?.archetype_type === 'biome_intelligence_architect' && '🧠'}
            {data.userArchetype?.archetype_type === 'rewilding_composer' && '🌱'}
            {data.userArchetype?.archetype_type === 'indigenous_knowledge_curator' && '🐾'}
            {data.userArchetype?.archetype_type === 'data_scientist' && '📊'}
            {data.userArchetype?.archetype_type === 'tech_innovator' && '💡'}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeProjects.length}</div>
            <p className="text-xs text-muted-foreground">Conservation initiatives</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Metrics</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.recentMetrics.length}</div>
            <p className="text-xs text-muted-foreground">Recorded this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collaboration Score</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Team synergy rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conservation XP</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">Experience points</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5" />
              <span>Active Projects</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.activeProjects.length > 0 ? (
              data.activeProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{project.title}</h4>
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{project.biome_focus || 'Global'}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{project.team_size} members</span>
                    </span>
                  </div>
                  <Progress value={Math.random() * 100} className="mt-2" />
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No active projects. Join a conservation initiative!
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Recent Impact</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.recentMetrics.length > 0 ? (
              data.recentMetrics.map((metric) => (
                <div key={metric.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{metric.metric_type}</h4>
                    <Badge variant="outline">
                      {metric.value} {metric.unit}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{metric.region || 'Global'}</span>
                    <Calendar className="h-3 w-3 ml-2" />
                    <span>{new Date(metric.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No impact metrics recorded yet. Start tracking your conservation efforts!
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
              <Briefcase className="h-6 w-6" />
              <span>Start Project</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
              <Users className="h-6 w-6" />
              <span>Join Team</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Log Impact</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center space-y-2">
              <Trophy className="h-6 w-6" />
              <span>View Progress</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
