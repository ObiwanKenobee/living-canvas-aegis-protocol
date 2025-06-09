import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/components/auth/AuthProvider';
import { Navigation } from '@/components/layout/Navigation';
import { ArchetypeSelector } from '@/components/archetype/ArchetypeSelector';
import { Dashboard } from '@/components/dashboard/Dashboard';
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
          {/* Keep existing landing page content */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <div className="container mx-auto px-4 py-16 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                  AEGIS WILDLIFE
                </h1>
                <h2 className="text-3xl font-semibold mb-4 text-foreground">
                  Planetary Renaissance Protocol
                </h2>
                <div className="text-xl italic mb-8 text-muted-foreground border-l-4 border-primary/30 pl-4">
                  "When the Earth breathes, art listens. When nature speaks, intelligence creates."
                </div>
                <p className="text-lg mb-12 text-foreground leading-relaxed">
                  Join the global conservation technology platform where art, AI, and activism unite to protect Earth's wildlife.
                </p>
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
        return <div className="p-6">Projects coming soon...</div>;
      case 'learning':
        return <div className="p-6">Learning pathways coming soon...</div>;
      case 'labs':
        return <div className="p-6">Innovation labs coming soon...</div>;
      case 'marketplace':
        return <div className="p-6">Marketplace coming soon...</div>;
      case 'impact':
        return <div className="p-6">Impact dashboard coming soon...</div>;
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
