import { useState, useEffect } from 'react';
import { X, Clock, AlertTriangle, TrendingUp, CheckCircle2 } from 'lucide-react';

interface BidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: string) => void;
  item: {
    id: string;
    title: string;
    currentBid: string;
    timeLeft: string;
    image: string;
  } | null;
}

export default function BidModal({ isOpen, onClose, onConfirm, item }: BidModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setBidAmount('');
      setError('');
      setTimeout(() => setShowContent(true), 50);
    } else {
      setShowContent(false);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  if (!isAnimating && !isOpen) return null;
  if (!item) return null;

  const currentBidNum = parseInt(item.currentBid.replace(/,/g, ''));
  const minBid = currentBidNum + 50;

  const handleConfirm = () => {
    const amount = parseInt(bidAmount.replace(/,/g, ''));
    if (isNaN(amount) || amount < minBid) {
      setError(`Minimum bid is ${minBid.toLocaleString()} LFCP`);
      return;
    }
    onConfirm(amount.toLocaleString());
  };

  return (
    <div 
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-300 ${
        showContent ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl transition-all duration-300 flex flex-col max-h-[90vh] ${
          showContent 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-lfc-charcoal to-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <TrendingUp size={20} className="text-lfc-gold" />
              </div>
              <h3 className="font-bold text-lg text-white">Place a Bid</h3>
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
        <div className="p-6 overflow-y-auto">
          {/* Item Summary */}
          <div className="flex space-x-4 mb-6 bg-gray-50 p-3 rounded-2xl border border-gray-100">
            <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover" />
            <div className="flex-1">
              <h4 className="font-bold text-sm text-lfc-charcoal line-clamp-2">{item.title}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <Clock size={12} className="text-lfc-red" />
                <span className="text-xs font-semibold text-lfc-red">{item.timeLeft}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-medium text-gray-500">Current Top Bid</span>
            <span className="font-bold text-xl text-lfc-charcoal">{item.currentBid} <span className="text-sm font-semibold text-gray-400">LFCP</span></span>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Maximum Bid</label>
            <div className="relative">
              <input 
                type="number" 
                value={bidAmount}
                onChange={(e) => {
                  setBidAmount(e.target.value);
                  setError('');
                }}
                placeholder={`Min ${minBid.toLocaleString()}`}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-4 pl-4 pr-16 text-xl font-bold text-lfc-charcoal focus:outline-none focus:border-lfc-red focus:ring-4 focus:ring-lfc-red/10 transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">LFCP</div>
            </div>
            {error && <p className="text-lfc-red text-xs mt-2 font-medium animate-fade-in-up">{error}</p>}
          </div>

          <div className="flex items-start space-x-2 text-gray-500 text-xs bg-gray-50 p-4 rounded-xl">
            <AlertTriangle size={16} className="shrink-0 text-lfc-gold" />
            <p className="leading-relaxed">By placing a bid, you commit to buying this item if you win. Points will be locked until the auction ends.</p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="px-6 pb-6 pt-2 bg-white">
          <button 
            onClick={handleConfirm}
            className="w-full py-4 rounded-xl font-bold text-sm text-white shadow-lg btn-press flex items-center justify-center space-x-2 bg-gradient-to-r from-lfc-red to-lfc-red-dark hover:from-red-700 hover:to-red-800"
          >
            <span>Confirm Bid</span>
            <CheckCircle2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}