import React from 'react';
import { WifiOff } from 'lucide-react';

export function NetworkStatus({ isOnline }) {
  if (isOnline) return null;

  return (
    <div className="bg-yellow-500 text-white px-4 py-2 text-center text-sm font-medium">
      <div className="flex items-center justify-center gap-2">
        <WifiOff className="w-4 h-4" />
        Working Offline - Data will sync when connection is restored
      </div>
    </div>
  );
}