
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/components/auth/AuthProvider';
import { Navigation } from '@/components/layout/Navigation';
import { ArchetypeSelector } from '@/components/archetype/ArchetypeSelector';
import { Dashboard } from '@/components/dashboard/Dashboard';
import ProjectsPage from './ProjectsPage';
import LearningPage from './LearningPage';
import LabsPage from './LabsPage';
import MarketplacePage from './MarketplacePage';
import ImpactPage from './ImpactPage';
import { supabase } from '@/integrations/supabase/client';

const PlatformContent: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [hasArchetype, setHasArchetype] = useState<boolean | null>(null);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      checkUserArchetype();
    }
  }, [user, loading]);

  const checkUserArchetype = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_archetypes')
        .select('id')
        .eq('user_id', user.id)
        .single();

      setHasArchetype(!!data);
    } catch (error) {
      setHasArchetype(false);
    }
  };

  const handleArchetypeComplete = () => {
    setHasArchetype(true);
    setCurrentView('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Navigation currentView={currentView} onViewChange={setCurrentView} />
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="container mx-auto px-4 py-16 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                  AEGIS WILDLIFE
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                  Planetary Renaissance Protocol
                </h2>
                <div className="text-lg md:text-xl italic mb-8 text-muted-foreground border-l-4 border-primary/30 pl-4">
                  "When the Earth breathes, art listens. When nature speaks, intelligence creates."
                </div>
                <p className="text-base md:text-lg mb-12 text-foreground leading-relaxed">
                  Join the global conservation technology platform where art, AI, and activism unite to protect Earth's wildlife.
                </p>
                
                {/* Feature highlights for anonymous users */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🤖</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">AI Conservation</h3>
                    <p className="text-muted-foreground">Advanced AI models for wildlife monitoring and species identification</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🌍</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Global Network</h3>
                    <p className="text-muted-foreground">Connect with conservationists and projects worldwide</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💡</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Innovation Labs</h3>
                    <p className="text-muted-foreground">Cutting-edge research and development for conservation technology</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (hasArchetype === false) {
    return (
      <>
        <Navigation currentView="archetype" onViewChange={setCurrentView} />
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-8">
          <ArchetypeSelector onComplete={handleArchetypeComplete} />
        </div>
      </>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
      case 'home':
        return <Dashboard />;
      case 'projects':
        return <ProjectsPage />;
      case 'learning':
        return <LearningPage />;
      case 'labs':
        return <LabsPage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'impact':
        return <ImpactPage />;
      case 'profile':
        return (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
            <p className="text-muted-foreground">Profile management coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {renderCurrentView()}
      </div>
    </>
  );
};

const PlatformApp: React.FC = () => {
  return (
    <AuthProvider>
      <PlatformContent />
    </AuthProvider>
  );
};

export default PlatformApp;
