
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Star, 
  ShoppingCart, 
  Heart,
  Download,
  Eye
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  seller: {
    name: string;
    avatar?: string;
    rating: number;
  };
  rating: number;
  reviews_count: number;
  image?: string;
  type: 'digital' | 'physical' | 'service';
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onWishlist?: (productId: string) => void;
  onViewDetails?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart = () => {}, 
  onWishlist = () => {},
  onViewDetails = () => {}
}) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Research Tools': 'bg-blue-500',
      'AI Models': 'bg-purple-500',
      'Data Sets': 'bg-green-500',
      'Equipment': 'bg-orange-500',
      'Consulting': 'bg-pink-500',
      'Software': 'bg-indigo-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'digital': return <Download className="w-3 h-3" />;
      case 'service': return <Eye className="w-3 h-3" />;
      default: return <ShoppingCart className="w-3 h-3" />;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge 
            className={`${getCategoryColor(product.category)} text-white text-xs`}
          >
            {product.category}
          </Badge>
          <div className="flex items-center space-x-1">
            {getTypeIcon(product.type)}
            <Button variant="ghost" size="sm" onClick={() => onWishlist(product.id)}>
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <CardTitle className="text-lg group-hover:text-primary transition-colors cursor-pointer"
                  onClick={() => onViewDetails(product.id)}>
          {product.name}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Seller Info */}
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={product.seller.avatar} />
            <AvatarFallback>
              {product.seller.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">{product.seller.name}</p>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-xs text-muted-foreground">
                {product.seller.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Product Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviews_count} reviews)
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price}
          </span>
          {product.type === 'digital' && (
            <Badge variant="outline" className="text-xs">
              Instant Download
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onAddToCart(product.id)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onViewDetails(product.id)}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
