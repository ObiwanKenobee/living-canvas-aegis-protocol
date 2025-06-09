
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Users, 
  Star, 
  BookOpen,
  Play
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration_hours: number;
  difficulty: string;
  category: string;
  rating: number;
  enrolled_count: number;
  progress?: number;
  thumbnail?: string;
}

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
  onContinue?: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onEnroll = () => {}, 
  onContinue = () => {} 
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const isEnrolled = course.progress !== undefined;

  return (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>
          <Badge 
            className={`${getDifficultyColor(course.difficulty)} text-white text-xs`}
          >
            {course.difficulty}
          </Badge>
        </div>
        
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {course.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Instructor */}
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">{course.instructor}</span>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs">{course.duration_hours}h duration</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs">{course.enrolled_count} enrolled</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-xs">{course.rating.toFixed(1)} rating</span>
          </div>
        </div>

        {/* Progress (if enrolled) */}
        {isEnrolled && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          {isEnrolled ? (
            <Button 
              className="w-full"
              onClick={() => onContinue(course.id)}
            >
              <Play className="w-4 h-4 mr-2" />
              Continue Learning
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onEnroll(course.id)}
            >
              Enroll Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
