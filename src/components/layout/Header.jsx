import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Settings, Wifi, WifiOff, Home } from 'lucide-react';

export function Header({
  logoUrl,
  isOnline,
  onAdminClick,
  onBackToHome,
  showAdminButton = false,
  showBackButton = false,
  title = "Far Eastern Polytechnic College",
  subtitle = "Enrollment Portal"
}) {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt="FEPC Logo"
              className="w-8 h-8 rounded-full object-cover border-2 border-primary/20"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f6?w=40&h=40&fit=crop&crop=center';
              }}
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-base text-gray-600 flex items-center gap-1">
                {subtitle}
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500" />
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {showBackButton && onBackToHome && (
              <Button
                onClick={onBackToHome}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            )}
            
            {showAdminButton && onAdminClick && (
              <Button
                onClick={onAdminClick}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Admin
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}