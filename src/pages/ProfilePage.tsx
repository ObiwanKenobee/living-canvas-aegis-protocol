
import React from 'react';
import { ProfileManagement } from '@/components/profile/ProfileManagement';

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        <ProfileManagement />
      </div>
    </div>
  );
};

export default ProfilePage;
