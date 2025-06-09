
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Home, 
  Briefcase, 
  BookOpen, 
  Beaker, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { AuthModal } from '../auth/AuthModal';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'labs', label: 'Innovation Labs', icon: Beaker },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
    { id: 'impact', label: 'Impact Dashboard', icon: BarChart3 },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNavigation = (view: string) => {
    onViewChange(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 
                className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer"
                onClick={() => handleNavigation('home')}
              >
                AEGIS WILDLIFE
              </h1>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex space-x-1">
                {navigationItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={currentView === item.id ? 'default' : 'ghost'}
                      onClick={() => handleNavigation(item.id)}
                      className="flex items-center space-x-2 text-sm"
                      size="sm"
                    >
                      <Icon size={16} />
                      <span className="hidden xl:inline">{item.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {/* Desktop User Menu */}
                  <div className="hidden md:block">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.user_metadata?.avatar_url} />
                            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuItem onClick={() => handleNavigation('profile')}>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleSignOut}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Mobile Menu */}
                  <div className="lg:hidden">
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="sm" className="md:hidden">
                          <Menu className="h-5 w-5" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-72">
                        <div className="flex flex-col h-full">
                          <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold">Menu</h2>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <X className="h-5 w-5" />
                            </Button>
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            {navigationItems.map(item => {
                              const Icon = item.icon;
                              return (
                                <Button
                                  key={item.id}
                                  variant={currentView === item.id ? 'default' : 'ghost'}
                                  onClick={() => handleNavigation(item.id)}
                                  className="w-full justify-start space-x-3"
                                >
                                  <Icon size={18} />
                                  <span>{item.label}</span>
                                </Button>
                              );
                            })}
                          </div>
                          
                          {/* Mobile User Actions */}
                          <div className="border-t pt-4 space-y-2">
                            <Button
                              variant="ghost"
                              onClick={() => handleNavigation('profile')}
                              className="w-full justify-start space-x-3"
                            >
                              <Settings size={18} />
                              <span>Profile</span>
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={handleSignOut}
                              className="w-full justify-start space-x-3"
                            >
                              <LogOut size={18} />
                              <span>Sign Out</span>
                            </Button>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </>
              ) : (
                <Button onClick={() => setShowAuthModal(true)} size="sm">
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};
