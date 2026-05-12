import { useState, useEffect } from 'react';
import { X, QrCode } from 'lucide-react';

interface BenefitQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function BenefitQRModal({ isOpen, onClose, title }: BenefitQRModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => setShowContent(true), 50);
    } else {
      setShowContent(false);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  if (!isAnimating && !isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-300 ${
        showContent ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl transition-all duration-300 ${
          showContent 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative px-6 py-5 bg-gradient-to-r from-lfc-charcoal to-gray-800">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-white">Redeem Benefit</h3>
            <button 
              onClick={onClose} 
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={18} className="text-white" />
            </button>
          </div>
        </div>
        
        <div className="p-6 flex flex-col items-center">
          <h4 className="font-bold text-lfc-charcoal text-center mb-6 leading-tight">{title}</h4>
          
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col items-center w-full mb-6 relative">
            {/* Animated scanning line effect */}
            <div className="absolute top-4 bottom-4 left-4 right-4 overflow-hidden pointer-events-none rounded-xl">
              <div className="w-full h-1 bg-lfc-green/50 shadow-[0_0_10px_2px_rgba(0,168,120,0.4)] absolute top-0 animate-[scan_2s_ease-in-out_infinite]"></div>
            </div>
            
            <QrCode size={200} className="text-lfc-charcoal" />
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            Present this QR code to the staff to redeem your access.
          </p>
        </div>
        
        <div className="px-6 pb-6 pt-2">
          <button 
            onClick={onClose}
            className="w-full py-4 rounded-xl font-bold text-sm text-lfc-charcoal bg-gray-100 hover:bg-gray-200 transition-colors btn-press"
          >
            Done
          </button>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>
    </div>
  );
}
