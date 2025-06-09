
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Star, 
  Download, 
  DollarSign, 
  Search, 
  Filter,
  Brain,
  Database,
  Wrench,
  Users,
  BookOpen,
  Cpu,
  Code,
  Plus,
  TrendingUp,
  Award,
  Shield,
  Zap
} from 'lucide-react';

const MarketplacePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const marketplaceItems = [
    {
      id: 1,
      title: 'Wildlife Species Recognition API',
      description: 'Pre-trained AI model for identifying 500+ wildlife species from camera trap images',
      type: 'ai_model',
      provider: {
        name: 'ConservationAI Inc.',
        avatar: '/api/placeholder/40/40',
        verified: true
      },
      price: 299,
      priceModel: 'subscription',
      rating: 4.9,
      downloads: 2847,
      features: [
        '500+ species recognition',
        '95% accuracy rate',
        'Real-time processing',
        'API integration',
        'Custom training'
      ],
      techSpecs: {
        accuracy: '95%',
        responseTime: '<200ms',
        supportedFormats: ['JPG', 'PNG', 'RAW'],
        integrations: ['REST API', 'Python SDK', 'Mobile SDK']
      },
      compatibility: ['Cloud', 'Edge Devices', 'Mobile Apps'],
      category: 'AI & Machine Learning',
      trending: true
    },
    {
      id: 2,
      title: 'Global Biodiversity Dataset 2024',
      description: 'Comprehensive dataset with 10M+ species observations from worldwide conservation projects',
      type: 'dataset',
      provider: {
        name: 'Global Biodiversity Consortium',
        avatar: '/api/placeholder/40/40',
        verified: true
      },
      price: 0,
      priceModel: 'free',
      rating: 4.8,
      downloads: 15234,
      features: [
        '10M+ observations',
        'GPS coordinates',
        'Temporal data',
        'Species metadata',
        'Regular updates'
      ],
      techSpecs: {
        size: '2.5 TB',
        format: 'CSV, JSON, Parquet',
        updateFrequency: 'Monthly',
        coverage: 'Global'
      },
      compatibility: ['Python', 'R', 'SQL', 'Cloud Platforms'],
      category: 'Data & Analytics',
      trending: false
    },
    {
      id: 3,
      title: 'Ecosystem Health Monitoring Platform',
      description: 'Complete IoT solution for real-time ecosystem monitoring with sensors and analytics dashboard',
      type: 'hardware',
      provider: {
        name: 'EcoTech Solutions',
        avatar: '/api/placeholder/40/40',
        verified: true
      },
      price: 2499,
      priceModel: 'one_time',
      rating: 4.7,
      downloads: 156,
      features: [
        'Multi-sensor array',
        'Solar powered',
        'Wireless connectivity',
        'Real-time dashboard',
        '5-year warranty'
      ],
      techSpecs: {
        batteryLife: '6 months',
        connectivity: 'LoRaWAN, 4G',
        sensors: 'Temperature, Humidity, Air Quality, Soil',
        range: '10km'
      },
      compatibility: ['Cloud Platforms', 'Mobile Apps', 'Third-party APIs'],
      category: 'Hardware & IoT',
      trending: true
    },
    {
      id: 4,
      title: 'Conservation Project Management Suite',
      description: 'Comprehensive software platform for managing conservation projects, teams, and impact tracking',
      type: 'software',
      provider: {
        name: 'Project Conservation Inc.',
        avatar: '/api/placeholder/40/40',
        verified: false
      },
      price: 149,
      priceModel: 'subscription',
      rating: 4.6,
      downloads: 892,
      features: [
        'Project planning tools',
        'Team collaboration',
        'Impact metrics tracking',
        'Reporting dashboard',
        'Mobile access'
      ],
      techSpecs: {
        users: 'Unlimited',
        storage: '1TB',
        integrations: '50+ tools',
        support: '24/7'
      },
      compatibility: ['Web Browser', 'iOS', 'Android'],
      category: 'Software & Tools',
      trending: false
    },
    {
      id: 5,
      title: 'Expert Conservation Consultation',
      description: 'One-on-one consultation with leading conservation experts for project planning and strategy',
      type: 'service',
      provider: {
        name: 'Dr. Sarah Chen',
        avatar: '/api/placeholder/40/40',
        verified: true
      },
      price: 200,
      priceModel: 'usage_based',
      rating: 5.0,
      downloads: 45,
      features: [
        '1-hour sessions',
        'Project review',
        'Strategy development',
        'Follow-up support',
        'Written recommendations'
      ],
      techSpecs: {
        sessionLength: '60 minutes',
        delivery: 'Video call',
        followUp: '2 weeks support',
        expertise: '15+ years'
      },
      compatibility: ['Zoom', 'Teams', 'Google Meet'],
      category: 'Services & Consulting',
      trending: false
    },
    {
      id: 6,
      title: 'Drone Mapping & Analysis Toolkit',
      description: 'Advanced software for processing drone imagery and creating detailed habitat maps',
      type: 'software',
      provider: {
        name: 'AerialConservation Ltd.',
        avatar: '/api/placeholder/40/40',
        verified: true
      },
      price: 599,
      priceModel: 'one_time',
      rating: 4.8,
      downloads: 234,
      features: [
        'Automated processing',
        'AI-powered analysis',
        '3D mapping',
        'Change detection',
        'Report generation'
      ],
      techSpecs: {
        supportedDrones: '100+ models',
        resolution: 'Up to 1cm/pixel',
        processing: 'GPU accelerated',
        export: 'Multiple formats'
      },
      compatibility: ['Windows', 'macOS', 'Linux'],
      category: 'Software & Tools',
      trending: true
    }
  ];

  const categories = [
    { name: 'AI & Machine Learning', icon: Brain, count: 23 },
    { name: 'Data & Analytics', icon: Database, count: 18 },
    { name: 'Software & Tools', icon: Wrench, count: 31 },
    { name: 'Hardware & IoT', icon: Cpu, count: 12 },
    { name: 'Services & Consulting', icon: Users, count: 15 },
    { name: 'Educational Content', icon: BookOpen, count: 8 }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ai_model': return Brain;
      case 'dataset': return Database;
      case 'software': return Code;
      case 'hardware': return Cpu;
      case 'service': return Users;
      case 'tool': return Wrench;
      default: return ShoppingCart;
    }
  };

  const getPriceDisplay = (item: any) => {
    if (item.priceModel === 'free') return 'Free';
    if (item.priceModel === 'subscription') return `$${item.price}/month`;
    if (item.priceModel === 'usage_based') return `$${item.price}/hour`;
    return `$${item.price}`;
  };

  const filteredItems = marketplaceItems.filter(item => {
    const categoryMatch = activeTab === 'all' || item.category === activeTab;
    const priceMatch = priceFilter === 'all' || 
      (priceFilter === 'free' && item.priceModel === 'free') ||
      (priceFilter === 'paid' && item.priceModel !== 'free');
    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Conservation Marketplace
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Discover and share conservation technology solutions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              List Product
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <IconComponent className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count} items</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Marketplace Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold">107</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Vendors</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Downloads</p>
                  <p className="text-2xl font-bold">89.2K</p>
                </div>
                <Download className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold">4.7</p>
                </div>
                <Star className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Marketplace Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
            <TabsList className="grid w-full lg:w-auto grid-cols-2 lg:grid-cols-6 text-xs">
              <TabsTrigger value="all">All Items</TabsTrigger>
              <TabsTrigger value="AI & Machine Learning">AI/ML</TabsTrigger>
              <TabsTrigger value="Data & Analytics">Data</TabsTrigger>
              <TabsTrigger value="Software & Tools">Software</TabsTrigger>
              <TabsTrigger value="Hardware & IoT">Hardware</TabsTrigger>
              <TabsTrigger value="Services & Consulting">Services</TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2">
              <select 
                value={priceFilter} 
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Prices</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <TabsContent value={activeTab}>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map((item) => {
                const TypeIcon = getTypeIcon(item.type);
                
                return (
                  <Card key={item.id} className="hover:shadow-lg transition-all duration-200 group">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <TypeIcon className="w-5 h-5 text-primary" />
                          <Badge variant="secondary" className="text-xs">
                            {item.type.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.trending && (
                            <Badge className="bg-orange-500 text-white text-xs">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Provider */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={item.provider.avatar} />
                            <AvatarFallback className="text-xs">
                              {item.provider.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-1">
                              <span className="text-sm font-medium">{item.provider.name}</span>
                              {item.provider.verified && (
                                <Shield className="w-3 h-3 text-blue-500" />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">{getPriceDisplay(item)}</p>
                          <p className="text-xs text-muted-foreground">{item.downloads.toLocaleString()} downloads</p>
                        </div>
                      </div>

                      {/* Key Features */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Key Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {item.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {item.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{item.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Technical Specs Preview */}
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-xs font-medium mb-2">Technical Specs:</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(item.techSpecs).slice(0, 4).map(([key, value], index) => (
                            <div key={index}>
                              <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Compatibility */}
                      <div className="flex flex-wrap gap-1">
                        {item.compatibility.slice(0, 3).map((comp, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Zap className="w-3 h-3 mr-1" />
                            {comp}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-2">
                        <Button className="flex-1" size="sm">
                          {item.priceModel === 'free' ? (
                            <>
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-1" />
                              {item.priceModel === 'subscription' ? 'Subscribe' : 'Purchase'}
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <BookOpen className="w-4 h-4" />
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

export default MarketplacePage;
