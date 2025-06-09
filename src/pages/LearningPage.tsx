
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CourseCard } from '@/components/learning/CourseCard';
import { 
  Search, 
  BookOpen, 
  Users, 
  Award,
  TrendingUp,
  Filter
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LearningPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');

  // Mock courses data
  const mockCourses = [
    {
      id: '1',
      title: 'Introduction to Conservation Biology',
      description: 'Learn the fundamental principles of conservation biology, biodiversity protection, and ecosystem management.',
      instructor: 'Dr. Sarah Wilson',
      duration_hours: 8,
      difficulty: 'Beginner',
      category: 'Conservation Science',
      rating: 4.8,
      enrolled_count: 1247,
      progress: 45
    },
    {
      id: '2',
      title: 'AI for Wildlife Monitoring',
      description: 'Master machine learning techniques for species identification, population monitoring, and behavior analysis.',
      instructor: 'Prof. Marcus Chen',
      duration_hours: 12,
      difficulty: 'Advanced',
      category: 'Technology',
      rating: 4.9,
      enrolled_count: 856,
      progress: 20
    },
    {
      id: '3',
      title: 'Marine Ecosystem Restoration',
      description: 'Comprehensive guide to coral reef restoration, marine protected areas, and ocean conservation strategies.',
      instructor: 'Dr. Elena Rodriguez',
      duration_hours: 10,
      difficulty: 'Intermediate',
      category: 'Marine Conservation',
      rating: 4.7,
      enrolled_count: 643,
    },
    {
      id: '4',
      title: 'Community-Based Conservation',
      description: 'Learn how to engage local communities in conservation efforts and create sustainable environmental programs.',
      instructor: 'Dr. James Kimani',
      duration_hours: 6,
      difficulty: 'Beginner',
      category: 'Community Engagement',
      rating: 4.6,
      enrolled_count: 921,
    },
    {
      id: '5',
      title: 'Remote Sensing for Conservation',
      description: 'Use satellite imagery and remote sensing technology to monitor environmental changes and track conservation progress.',
      instructor: 'Dr. Lisa Park',
      duration_hours: 14,
      difficulty: 'Advanced',
      category: 'Technology',
      rating: 4.8,
      enrolled_count: 534,
      progress: 75
    },
    {
      id: '6',
      title: 'Climate Change and Biodiversity',
      description: 'Understand the impacts of climate change on ecosystems and develop adaptation strategies for wildlife protection.',
      instructor: 'Prof. David Thompson',
      duration_hours: 9,
      difficulty: 'Intermediate',
      category: 'Climate Science',
      rating: 4.7,
      enrolled_count: 1089,
    }
  ];

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || course.category === filterCategory;
    const matchesDifficulty = !filterDifficulty || course.difficulty === filterDifficulty;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'enrolled' && course.progress !== undefined) ||
                      (activeTab === 'completed' && course.progress === 100) ||
                      (activeTab === 'beginner' && course.difficulty === 'Beginner');
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesTab;
  });

  const handleEnrollCourse = async (courseId: string) => {
    toast({
      title: "Enrolled successfully!",
      description: "You've been enrolled in this course. Start learning now!",
    });
  };

  const handleContinueCourse = async (courseId: string) => {
    toast({
      title: "Resuming course",
      description: "Welcome back! Let's continue where you left off.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Conservation Learning Hub
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Master conservation skills with expert-led courses and hands-on training
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">Expert-led training</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,847</div>
              <p className="text-xs text-muted-foreground">Global community</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,234</div>
              <p className="text-xs text-muted-foreground">Professional credentials</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">Success rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="Conservation Science">Conservation Science</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Marine Conservation">Marine Conservation</SelectItem>
              <SelectItem value="Community Engagement">Community Engagement</SelectItem>
              <SelectItem value="Climate Science">Climate Science</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="enrolled">My Courses</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={handleEnrollCourse}
                  onContinue={handleContinueCourse}
                />
              ))}
            </div>
            
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No courses found matching your criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LearningPage;
