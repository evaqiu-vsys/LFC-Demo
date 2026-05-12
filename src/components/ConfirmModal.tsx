import { useEffect, useState } from 'react';
import { AlertTriangle, X, Shield, CheckCircle2 } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  pointsAmount?: string;
  currency?: string;
  isDanger?: boolean;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, description, pointsAmount, currency = 'LFC', isDanger = false }: ConfirmModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Small delay for content to fade in after backdrop
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
        {/* Header with Gradient */}
        <div className={`relative px-6 py-5 ${
          isDanger 
            ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
            : 'bg-gradient-to-r from-lfc-charcoal to-gray-800'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                {isDanger ? (
                  <AlertTriangle size={20} className="text-white" />
                ) : (
                  <Shield size={20} className="text-lfc-gold" />
                )}
              </div>
              <h3 className="font-bold text-lg text-white">{title}</h3>
            </div>
            <button 
              onClick={onClose} 
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={18} className="text-white" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{description}</p>
          
          {pointsAmount && (
            <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-500">Amount</span>
                <span className="font-bold text-xl text-lfc-charcoal">{pointsAmount} <span className="text-sm font-semibold text-gray-400">{currency}</span></span>
              </div>
              <div className="h-px bg-gray-200 mb-3"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-gray-700">Total</span>
                <span className="font-bold text-2xl text-lfc-charcoal">{pointsAmount} <span className="text-base font-semibold text-gray-400">{currency}</span></span>
              </div>
            </div>
          )}
          
          {isDanger && (
            <div className="flex items-start space-x-3 text-amber-700 text-xs mb-6 bg-amber-50 p-4 rounded-xl border border-amber-100">
              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
              <p className="leading-relaxed">This action cannot be undone. Please verify all details before confirming.</p>
            </div>
          )}
          
          {!isDanger && (
            <div className="flex items-center space-x-2 text-lfc-green text-xs mb-6 bg-lfc-green/10 p-3 rounded-xl">
              <CheckCircle2 size={14} />
              <span className="font-medium">Secure transaction via LFC Digital Wallet</span>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="px-6 pb-6 grid grid-cols-2 gap-3">
          <button 
            onClick={onClose}
            className="py-4 rounded-xl font-bold text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors btn-press"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className={`py-4 rounded-xl font-bold text-sm text-white shadow-lg btn-press flex items-center justify-center space-x-2 ${
              isDanger 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                : 'bg-gradient-to-r from-lfc-red to-lfc-red-dark hover:from-red-700 hover:to-red-800'
            }`}
          >
            <span>Confirm</span>
            {!isDanger && <CheckCircle2 size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}