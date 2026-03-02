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
    <header className="sticky top-0 z-40 bg-gradient-to-r from-primary-700 to-primary-800 border-b-4 border-secondary-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-4 flex-1">
            <div className="flex-shrink-0">
              <img
                src={logoUrl}
                alt="FEPC Logo"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-secondary-400 shadow-md"
                onError={(e) => {
                  e.currentTarget.src = '/image/fepc_logo.png';
                }}
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-white truncate">{title}</h1>
              <div className="flex items-center gap-2 text-sm text-secondary-200">
                <span>{subtitle}</span>
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-secondary-300 flex-shrink-0" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-300 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {showBackButton && onBackToHome && (
              <Button
                onClick={onBackToHome}
                className="gap-2 hidden sm:flex bg-secondary-500 hover:bg-secondary-600 text-white font-semibold"
                size="sm"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
            )}
            
            {showAdminButton && onAdminClick && (
              <Button
                onClick={onAdminClick}
                className="gap-2 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold"
                size="sm"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}