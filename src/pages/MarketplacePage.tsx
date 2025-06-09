
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductCard } from '@/components/marketplace/ProductCard';
import { 
  Search, 
  ShoppingCart, 
  DollarSign, 
  Package,
  TrendingUp,
  Plus,
  Filter
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const MarketplacePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterType, setFilterType] = useState('');

  // Mock products data
  const mockProducts = [
    {
      id: '1',
      name: 'Wildlife Camera Trap AI Model',
      description: 'Pre-trained computer vision model for automatic wildlife species identification with 97% accuracy.',
      price: 299,
      category: 'AI Models',
      seller: {
        name: 'TechForNature',
        avatar: '/api/placeholder/40/40',
        rating: 4.9
      },
      rating: 4.8,
      reviews_count: 127,
      type: 'digital' as const
    },
    {
      id: '2',
      name: 'Biodiversity Survey Dataset - Amazon',
      description: 'Comprehensive species occurrence dataset covering 50,000 km² of Amazon rainforest with GPS coordinates.',
      price: 149,
      category: 'Data Sets',
      seller: {
        name: 'Amazon Research Institute',
        avatar: '/api/placeholder/40/40',
        rating: 4.7
      },
      rating: 4.9,
      reviews_count: 89,
      type: 'digital' as const
    },
    {
      id: '3',
      name: 'Conservation Impact Assessment',
      description: 'Professional consulting service for measuring and reporting conservation project outcomes.',
      price: 2500,
      category: 'Consulting',
      seller: {
        name: 'EcoMetrics Consulting',
        avatar: '/api/placeholder/40/40',
        rating: 4.8
      },
      rating: 4.7,
      reviews_count: 34,
      type: 'service' as const
    },
    {
      id: '4',
      name: 'Acoustic Monitoring Kit',
      description: 'Complete hardware solution for recording and analyzing wildlife sounds in remote locations.',
      price: 1899,
      category: 'Equipment',
      seller: {
        name: 'WildTech Solutions',
        avatar: '/api/placeholder/40/40',
        rating: 4.6
      },
      rating: 4.5,
      reviews_count: 56,
      type: 'physical' as const
    },
    {
      id: '5',
      name: 'Ecosystem Modeling Software',
      description: 'Advanced simulation software for predicting ecosystem changes and conservation outcomes.',
      price: 599,
      category: 'Software',
      seller: {
        name: 'EcoSim Technologies',
        avatar: '/api/placeholder/40/40',
        rating: 4.8
      },
      rating: 4.6,
      reviews_count: 78,
      type: 'digital' as const
    },
    {
      id: '6',
      name: 'Marine Life Identification Guide',
      description: 'Interactive digital field guide with 5,000+ marine species photos and identification features.',
      price: 79,
      category: 'Research Tools',
      seller: {
        name: 'Ocean Knowledge Co.',
        avatar: '/api/placeholder/40/40',
        rating: 4.7
      },
      rating: 4.8,
      reviews_count: 203,
      type: 'digital' as const
    }
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    const matchesType = !filterType || product.type === filterType;
    const matchesTab = activeTab === 'all' || 
                      product.category.toLowerCase().includes(activeTab) ||
                      product.type === activeTab;
    
    return matchesSearch && matchesCategory && matchesType && matchesTab;
  });

  const handleAddToCart = async (productId: string) => {
    toast({
      title: "Added to cart!",
      description: "Product has been added to your shopping cart.",
    });
  };

  const handleWishlist = async (productId: string) => {
    toast({
      title: "Added to wishlist",
      description: "Product saved to your wishlist for later.",
    });
  };

  const handleViewDetails = async (productId: string) => {
    toast({
      title: "Product details",
      description: "Detailed product view coming soon.",
    });
  };

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
              Discover and share tools, data, and services for conservation work
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            List Product
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">847</div>
              <p className="text-xs text-muted-foreground">Tools & resources</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sellers</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="text-xs text-muted-foreground">Verified providers</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.4M</div>
              <p className="text-xs text-muted-foreground">Community value</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Quality score</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products..."
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
              <SelectItem value="AI Models">AI Models</SelectItem>
              <SelectItem value="Data Sets">Data Sets</SelectItem>
              <SelectItem value="Research Tools">Research Tools</SelectItem>
              <SelectItem value="Equipment">Equipment</SelectItem>
              <SelectItem value="Software">Software</SelectItem>
              <SelectItem value="Consulting">Consulting</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Product Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="digital">Digital</SelectItem>
              <SelectItem value="physical">Physical</SelectItem>
              <SelectItem value="service">Service</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="digital">Digital</TabsTrigger>
            <TabsTrigger value="physical">Physical</TabsTrigger>
            <TabsTrigger value="service">Services</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onWishlist={handleWishlist}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found matching your criteria.</p>
                <Button className="mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  List Your Product
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MarketplacePage;
