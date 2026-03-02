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

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setShowAdminButton(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <NetworkStatus isOnline={isOnline} />
      
      <Header
        logoUrl={logoUrl}
        isOnline={isOnline}
        onAdminClick={onAdminClick}
        showAdminButton={showAdminButton}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* Logo Badge */}
          <div className="flex justify-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary-400/20 blur-2xl rounded-full"></div>
              <img
                src={logoUrl}
                alt="FEPC Logo"
                className="relative w-28 h-28 rounded-full object-cover ring-4 ring-white shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = '/image/fepc_logo.png';
                }}
              />
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-full p-3 shadow-lg ring-4 ring-white">
                <School className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          {/* Main Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Welcome to FEPC<br className="sm:hidden" /> Online Enrollment
          </h2>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students pursuing their dreams at Far Eastern Polytechnic College. Experience quality education with world-class facilities and dedicated faculty.
          </p>
          
          {/* Action Section */}
          {completedEnrollment ? (
            <SuccessCard
              enrollment={completedEnrollment}
              onGoBackHome={onGoBackHome}
              onStartNewEnrollment={onStartEnrollment}
            />
          ) : (
            <div className="flex justify-center gap-4 flex-wrap">
              <Button
                onClick={onStartEnrollment}
                size="lg"
                className="gap-2 text-base px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl transition-all border-b-4 border-secondary-500 font-bold"
              >
                <GraduationCap className="w-5 h-5" />
                Start Enrollment Now
              </Button>
            </div>
          )}
        </div>

        {/* Features Grid */}
        {!completedEnrollment && (
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "Quality Education",
                description: "Access to comprehensive academic programs designed for your success"
              },
              {
                icon: School,
                title: "Modern Facilities",
                description: "State-of-the-art learning environment with cutting-edge technology"
              },
              {
                icon: GraduationCap,
                title: "Expert Faculty",
                description: "Learn from experienced educators passionate about your growth"
              }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-xl bg-white border-t-4 border-secondary-500 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="inline-block p-3 bg-primary-100 rounded-lg text-primary-700 group-hover:bg-primary-200 transition-colors mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}