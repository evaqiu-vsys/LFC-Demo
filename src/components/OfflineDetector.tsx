import { useState, useEffect } from 'react';
import { WifiOff, RefreshCw, AlertCircle } from 'lucide-react';

export default function OfflineDetector({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOffline, setShowOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setTimeout(() => setShowOffline(false), 500);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial state
    if (!navigator.onLine) {
      setShowOffline(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  if (!showOffline) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Offline Banner */}
      <div className={`fixed top-0 left-0 right-0 z-[70] transition-transform duration-500 ${
        isOnline ? '-translate-y-full' : 'translate-y-0'
      }`}>
        <div className="bg-amber-500 text-white px-4 py-3 flex items-center justify-center space-x-2">
          <WifiOff size={18} />
          <span className="font-medium text-sm">You're offline</span>
        </div>
      </div>

      {/* Main Content or Offline Message */}
      {isOnline ? (
        children
      ) : (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-elevated p-8 max-w-sm w-full text-center border border-gray-100">
            <div className="w-20 h-20 bg-lfc-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <WifiOff size={40} className="text-lfc-red" />
            </div>
            
            <h2 className="text-2xl font-bold text-lfc-charcoal mb-3">
              You're offline
            </h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              LFC Loyalty Demo needs an internet connection to load images and assets.
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={handleReload}
                className="w-full bg-lfc-red text-white font-bold py-4 rounded-xl hover:bg-lfc-red-dark transition-colors btn-press flex items-center justify-center space-x-2 shadow-lg"
              >
                <RefreshCw size={18} />
                <span>Retry Connection</span>
              </button>
              
              <button 
                onClick={() => setShowOffline(false)}
                className="w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Continue Anyway
              </button>
            </div>
            
            <div className="mt-6 flex items-start space-x-2 text-xs text-gray-400 bg-gray-50 p-3 rounded-xl">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <p className="text-left">
                If you're in Chrome DevTools, check that "Offline" is not selected in the Network tab.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}