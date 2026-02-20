import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { GraduationCap, School } from 'lucide-react';
import { NetworkStatus } from '../layout/NetworkStatus';
import { Header } from '../layout/Header';
import { SuccessCard } from '../home/SuccessCard';
export function HomePage({
  isOnline,
  logoUrl,
  completedEnrollment,
  onAdminClick,
  onStartEnrollment,
  onGoBackHome
}) {
  const [showAdminButton, setShowAdminButton] = useState(false);

  // Keyboard shortcut to toggle admin button visibility
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Press Ctrl+Shift+A to show/hide admin button
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setShowAdminButton(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      <NetworkStatus isOnline={isOnline} />
      
      <Header
        logoUrl={logoUrl}
        isOnline={isOnline}
        onAdminClick={onAdminClick}
        showAdminButton={showAdminButton}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={logoUrl}
                alt="FEPC Logo"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f6?w=120&h=120&fit=crop&crop=center';
                }}
              />
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                <School className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Welcome to FEPC Online Enrollment
          </h2>

          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of students who have chosen Far Eastern Polytechnic College for their educational journey.
            Experience quality education with modern facilities and expert faculty.
          </p>
          
          {completedEnrollment ? (
            <SuccessCard
              enrollment={completedEnrollment}
              onGoBackHome={onGoBackHome}
              onStartNewEnrollment={onStartEnrollment}
            />
          ) : (
            <div className="flex justify-center">
              <Button
                onClick={onStartEnrollment}
                size="lg"
                className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-shadow"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Start Enrollment
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}