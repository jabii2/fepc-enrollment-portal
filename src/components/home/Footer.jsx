import React from 'react';
import { Badge } from '../ui/badge';
import { School, Wifi, WifiOff } from 'lucide-react';

export function Footer({ isOnline }) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <School className="w-8 h-8" />
            <h3 className="text-xl font-semibold">Far Eastern Polytechnic College</h3>
          </div>
          <p className="text-gray-400 mb-4">Excellence in Education Since 1962</p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
            <span>© 2024 FEPC. All rights reserved.</span>
            <span>•</span>
            <span>Accredited by TESDA & CHED</span>
          </div>
          <div className="flex items-center justify-center">
            {isOnline ? (
              <Badge variant="outline" className="text-green-400 border-green-400">
                <Wifi className="w-3 h-3 mr-1" />
                Online
              </Badge>
            ) : (
              <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                <WifiOff className="w-3 h-3 mr-1" />
                Offline Mode
              </Badge>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}