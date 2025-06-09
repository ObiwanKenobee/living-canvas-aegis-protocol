
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Users, 
  Calendar, 
  Target,
  Heart,
  Share
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  biome_focus: string;
  status: string;
  team_size: number;
  funding_goal: number;
  current_funding: number;
  location: string;
  duration_months: number;
  conservation_focus: string[];
  lead_researcher?: {
    name: string;
    avatar?: string;
  };
}

interface ProjectCardProps {
  project: Project;
  onJoin?: (projectId: string) => void;
  onSupport?: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onJoin = () => {}, 
  onSupport = () => {} 
}) => {
  const fundingProgress = (project.current_funding / project.funding_goal) * 100;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-purple-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge 
            className={`${getStatusColor(project.status)} text-white text-xs`}
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Lead Researcher */}
        {project.lead_researcher && (
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={project.lead_researcher.avatar} />
              <AvatarFallback>
                {project.lead_researcher.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{project.lead_researcher.name}</p>
              <p className="text-xs text-muted-foreground">Lead Researcher</p>
            </div>
          </div>
        )}

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs">{project.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs">{project.team_size} members</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs">{project.duration_months} months</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs">{project.biome_focus}</span>
          </div>
        </div>

        {/* Conservation Focus Tags */}
        <div className="flex flex-wrap gap-1">
          {project.conservation_focus.slice(0, 3).map((focus, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {focus}
            </Badge>
          ))}
          {project.conservation_focus.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.conservation_focus.length - 3}
            </Badge>
          )}
        </div>

        {/* Funding Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Funding Progress</span>
            <span>${(project.current_funding / 1000).toFixed(0)}K / ${(project.funding_goal / 1000).toFixed(0)}K</span>
          </div>
          <Progress value={fundingProgress} className="h-2" />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onJoin(project.id)}
          >
            Join Project
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={() => onSupport(project.id)}
          >
            Support
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
