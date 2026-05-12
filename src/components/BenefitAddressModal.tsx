import { useState, useEffect } from 'react';
import { X, MapPin, CheckCircle2 } from 'lucide-react';

interface BenefitAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function BenefitAddressModal({ isOpen, onClose, title }: BenefitAddressModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setIsSuccess(false);
      setName('');
      setPhone('');
      setAddress('');
      setTimeout(() => setShowContent(true), 50);
    } else {
      setShowContent(false);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  if (!isAnimating && !isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && address) {
      setIsSuccess(true);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-300 ${
        showContent ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transition-all duration-300 ${
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

        {isSuccess ? (
          <div className="p-8 flex flex-col items-center animate-fade-in-up">
            <div className="w-20 h-20 bg-lfc-green/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} className="text-lfc-green" />
            </div>
            <h4 className="font-bold text-2xl text-lfc-charcoal text-center mb-2">Submitted Successfully!</h4>
            <p className="text-gray-500 text-center mb-8">
              Your shipping details for <span className="font-bold text-lfc-charcoal">{title}</span> have been received. We will update the tracking number in your My Wallet &gt; Order Tracking once shipped.
            </p>
            <button 
              onClick={onClose}
              className="w-full py-4 rounded-xl font-bold text-sm text-white bg-lfc-charcoal hover:bg-black transition-colors btn-press shadow-lg"
            >
              Got it
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <h4 className="font-bold text-lfc-charcoal mb-4 leading-tight">Enter Shipping Address for {title}</h4>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eva"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3.5 text-sm font-bold text-lfc-charcoal focus:outline-none focus:border-lfc-red transition-all"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +44 7700 900077"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3.5 text-sm font-bold text-lfc-charcoal focus:outline-none focus:border-lfc-red transition-all"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Address</label>
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, City, Postal Code"
                  rows={3}
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3.5 text-sm font-bold text-lfc-charcoal focus:outline-none focus:border-lfc-red transition-all resize-none"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-amber-700 text-xs mt-4 bg-amber-50 p-3 rounded-xl mb-6">
              <MapPin size={14} className="shrink-0" />
              <span className="font-medium">Please ensure the address is correct as it cannot be changed later.</span>
            </div>
            
            <div className="flex space-x-3">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-4 rounded-xl font-bold text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors btn-press"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 py-4 rounded-xl font-bold text-sm text-white shadow-lg btn-press flex items-center justify-center space-x-2 bg-gradient-to-r from-lfc-red to-lfc-red-dark hover:from-red-700 hover:to-red-800"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
