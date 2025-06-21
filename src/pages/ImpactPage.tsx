
import React, { useState } from 'react';
import { ImpactAnalytics } from '@/components/impact/ImpactAnalytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  TrendingUp, 
  Users, 
  Target,
  Award,
  Activity,
  BarChart3
} from 'lucide-react';

const ImpactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <ImpactAnalytics />
      </div>
    </div>
  );
};

export default ImpactPage;
