
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Award, 
  Play, 
  CheckCircle, 
  Star,
  Filter,
  Search,
  TrendingUp,
  Brain,
  Globe,
  Zap
} from 'lucide-react';

const LearningPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pathways');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const learningPathways = [
    {
      id: 1,
      title: 'AI for Conservation Fundamentals',
      description: 'Master machine learning and AI applications in wildlife conservation',
      difficulty: 'beginner',
      duration: '12 weeks',
      modules: 8,
      students: 2847,
      rating: 4.8,
      progress: 65,
      instructor: {
        name: 'Dr. Sarah Chen',
        title: 'AI Research Director',
        avatar: '/api/placeholder/40/40'
      },
      outcomes: [
        'Build wildlife detection models',
        'Analyze conservation data',
        'Deploy AI monitoring systems'
      ],
      technologies: ['Python', 'TensorFlow', 'Computer Vision'],
      certificate: true
    },
    {
      id: 2,
      title: 'Biome Restoration Engineering',
      description: 'Advanced techniques for ecosystem restoration and monitoring',
      difficulty: 'advanced',
      duration: '16 weeks',
      modules: 12,
      students: 1523,
      rating: 4.9,
      progress: 0,
      instructor: {
        name: 'Dr. Marcus Rodriguez',
        title: 'Ecosystem Engineer',
        avatar: '/api/placeholder/40/40'
      },
      outcomes: [
        'Design restoration plans',
        'Implement monitoring systems',
        'Measure ecosystem health'
      ],
      technologies: ['GIS', 'Remote Sensing', 'IoT Sensors'],
      certificate: true
    },
    {
      id: 3,
      title: 'Community Engagement for Conservation',
      description: 'Build effective community partnerships for conservation projects',
      difficulty: 'intermediate',
      duration: '8 weeks',
      modules: 6,
      students: 3201,
      rating: 4.7,
      progress: 100,
      instructor: {
        name: 'Dr. Priya Patel',
        title: 'Community Conservation Expert',
        avatar: '/api/placeholder/40/40'
      },
      outcomes: [
        'Develop engagement strategies',
        'Create educational programs',
        'Measure social impact'
      ],
      technologies: ['Social Media', 'Survey Tools', 'Mobile Apps'],
      certificate: true
    }
  ];

  const skills = [
    { name: 'Machine Learning', level: 85, category: 'Technical' },
    { name: 'Data Analysis', level: 92, category: 'Technical' },
    { name: 'Project Management', level: 78, category: 'Leadership' },
    { name: 'Community Outreach', level: 65, category: 'Social' },
    { name: 'Scientific Writing', level: 88, category: 'Communication' },
    { name: 'GIS Mapping', level: 73, category: 'Technical' }
  ];

  const achievements = [
    {
      title: 'AI Specialist',
      description: 'Completed advanced AI for Conservation pathway',
      date: '2024-02-15',
      icon: Brain,
      color: 'text-blue-500'
    },
    {
      title: 'Community Leader',
      description: 'Led 5+ community conservation projects',
      date: '2024-01-20',
      icon: Users,
      color: 'text-green-500'
    },
    {
      title: 'Research Pioneer',
      description: 'Published 3 research papers',
      date: '2023-12-10',
      icon: BookOpen,
      color: 'text-purple-500'
    },
    {
      title: 'Global Impact',
      description: 'Contributed to projects in 10+ countries',
      date: '2023-11-05',
      icon: Globe,
      color: 'text-orange-500'
    }
  ];

  const filteredPathways = learningPathways.filter(pathway => 
    difficultyFilter === 'all' || pathway.difficulty === difficultyFilter
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getProgressStatus = (progress: number) => {
    if (progress === 0) return { text: 'Start Learning', icon: Play };
    if (progress === 100) return { text: 'Completed', icon: CheckCircle };
    return { text: 'Continue', icon: BookOpen };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Learning Pathways
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Master conservation technology through expert-led courses
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Button className="w-full sm:w-auto">
              <Search className="w-4 h-4 mr-2" />
              Browse Catalog
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Courses Completed</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Learning Hours</p>
                  <p className="text-2xl font-bold">142</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Certificates</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <Award className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Skills Mastered</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pathways">Learning Pathways</TabsTrigger>
            <TabsTrigger value="skills">Skill Development</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="progress">My Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="pathways" className="mt-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
              <h2 className="text-2xl font-semibold">Available Learning Pathways</h2>
              <select 
                value={difficultyFilter} 
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPathways.map((pathway) => {
                const status = getProgressStatus(pathway.progress);
                const StatusIcon = status.icon;
                
                return (
                  <Card key={pathway.id} className="hover:shadow-lg transition-all duration-200">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={`${getDifficultyColor(pathway.difficulty)} text-white text-xs`}>
                          {pathway.difficulty.charAt(0).toUpperCase() + pathway.difficulty.slice(1)}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{pathway.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl">{pathway.title}</CardTitle>
                      <CardDescription>{pathway.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Instructor */}
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={pathway.instructor.avatar} />
                          <AvatarFallback>{pathway.instructor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{pathway.instructor.name}</p>
                          <p className="text-xs text-muted-foreground">{pathway.instructor.title}</p>
                        </div>
                      </div>

                      {/* Course Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{pathway.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                          <span>{pathway.modules} modules</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{pathway.students.toLocaleString()} students</span>
                        </div>
                        {pathway.certificate && (
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-muted-foreground" />
                            <span>Certificate</span>
                          </div>
                        )}
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1">
                        {pathway.technologies.map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Progress */}
                      {pathway.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{pathway.progress}%</span>
                          </div>
                          <Progress value={pathway.progress} className="h-2" />
                        </div>
                      )}

                      {/* Action Button */}
                      <Button className="w-full" variant={pathway.progress === 100 ? "outline" : "default"}>
                        <StatusIcon className="w-4 h-4 mr-2" />
                        {status.text}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Skill Development</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p className="font-medium">{skill.name}</p>
                          <p className="text-sm text-muted-foreground">{skill.category}</p>
                        </div>
                        <span className="text-2xl font-bold">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Achievements & Certifications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon;
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-full bg-muted ${achievement.color}`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{achievement.title}</h3>
                            <p className="text-muted-foreground mb-2">{achievement.description}</p>
                            <p className="text-sm text-muted-foreground">
                              Earned on {new Date(achievement.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Learning Progress</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Current Learning Goals</CardTitle>
                  <CardDescription>Your active learning objectives and progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Complete AI Fundamentals</span>
                      <span className="text-sm text-muted-foreground">65% complete</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Master Data Analysis</span>
                      <span className="text-sm text-muted-foreground">40% complete</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Earn Community Leader Certification</span>
                      <span className="text-sm text-muted-foreground">90% complete</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LearningPage;
