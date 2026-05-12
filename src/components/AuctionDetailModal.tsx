import { useState, useEffect } from 'react';
import { X, Clock, Shield, Star, Check, Flame, ChevronRight } from 'lucide-react';
import BidModal from './BidModal';

interface AuctionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  onPlaceBidSuccess: (amount: string) => void;
}

export default function AuctionDetailModal({ isOpen, onClose, item, onPlaceBidSuccess }: AuctionDetailModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);

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
  if (!item) return null;

  const badgeIcons: Record<string, React.ReactNode> = {
    verified: <Shield size={12} className="text-blue-500" />,
    official: <Star size={12} className="text-lfc-gold fill-lfc-gold" />,
    trusted: <Check size={12} className="text-lfc-green" />
  };

  const maskName = (name: string) => {
    if (!name) return '';
    if (name.length <= 2) return name[0] + '*';
    return name[0] + '**' + name[name.length - 1];
  };

  // Mock bid history
  const bidHistory = [
    { id: '1', bidder: 'Eva', amount: item.currentBid, time: '2 mins ago' },
    { id: '2', bidder: 'Kopite99', amount: (parseInt(item.currentBid.replace(/,/g, '')) - 100).toLocaleString(), time: '15 mins ago' },
    { id: '3', bidder: 'RedFanatic', amount: (parseInt(item.currentBid.replace(/,/g, '')) - 250).toLocaleString(), time: '1 hour ago' },
    { id: '4', bidder: 'AnfieldLegend', amount: (parseInt(item.currentBid.replace(/,/g, '')) - 400).toLocaleString(), time: '3 hours ago' },
  ];

  const handleConfirmBid = (amount: string) => {
    setIsBidModalOpen(false);
    onPlaceBidSuccess(amount);
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 z-[55] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300 ${
          showContent ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0'
        }`}
        onClick={onClose}
      >
        <div 
          className={`bg-gray-50 rounded-t-3xl sm:rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transition-all duration-300 flex flex-col h-[90vh] sm:h-auto sm:max-h-[90vh] ${
            showContent 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-full sm:translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-5 py-4 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
            <h3 className="font-bold text-lg text-lfc-charcoal">Listing Details</h3>
            <button 
              onClick={onClose} 
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={18} className="text-gray-600" />
            </button>
          </div>
          
          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1 pb-24">
            {/* Image */}
            <div className="relative aspect-square w-full bg-white">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              {item.isHot && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-lfc-red text-white text-xs font-bold rounded-full flex items-center space-x-1 animate-pulse shadow-lg">
                  <Flame size={12} />
                  <span>HOT ITEM</span>
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="p-5 bg-white mb-2 shadow-sm">
              <h2 className="text-xl font-bold text-lfc-charcoal mb-3 leading-snug">{item.title}</h2>
              
              <div className="flex items-center justify-between py-3 border-y border-gray-100 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                    🏟️
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Owned by</p>
                    <div className="flex items-center space-x-1">
                      <span className="font-bold text-sm text-lfc-charcoal">@{item.seller || 'Unknown'}</span>
                      {item.sellerBadge && badgeIcons[item.sellerBadge]}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Current Bid</p>
                  <p className="font-bold text-2xl text-lfc-charcoal">{item.currentBid} <span className="text-sm text-gray-500">LFC</span></p>
                </div>
                <div className={`p-4 rounded-2xl border ${item.isHot ? 'bg-lfc-red/5 border-lfc-red/20' : 'bg-gray-50 border-gray-100'}`}>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1 flex items-center">
                    <Clock size={12} className="mr-1" /> Time Left
                  </p>
                  <p className={`font-bold text-lg ${item.isHot ? 'text-lfc-red' : 'text-lfc-charcoal'}`}>{item.timeLeft}</p>
                </div>
              </div>
            </div>

            {/* Bid History */}
            <div className="p-5 bg-white mb-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lfc-charcoal">Bid History</h3>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.bids} Bids Total</span>
              </div>
              
              <div className="space-y-0">
                {bidHistory.map((bid, index) => (
                  <div key={bid.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-gray-500">{bid.bidder.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-lfc-charcoal">@{maskName(bid.bidder)}</p>
                        <p className="text-xs text-gray-400">{bid.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-sm ${index === 0 ? 'text-lfc-green' : 'text-lfc-charcoal'}`}>
                        {bid.amount} <span className="text-xs font-semibold text-gray-400">LFC</span>
                      </p>
                      {index === 0 && <span className="text-[10px] text-lfc-green font-bold uppercase tracking-wider">Highest Bid</span>}
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-bold text-gray-600 transition-colors flex items-center justify-center space-x-1">
                <span>View Full History</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Sticky Bottom Action Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
            <button 
              onClick={() => setIsBidModalOpen(true)}
              className="w-full py-4 rounded-xl font-bold text-sm text-white shadow-lg btn-press flex items-center justify-center space-x-2 bg-lfc-charcoal hover:bg-black transition-colors"
            >
              <span>Place Bid</span>
            </button>
          </div>
        </div>
      </div>

      <BidModal 
        isOpen={isBidModalOpen}
        onClose={() => setIsBidModalOpen(false)}
        onConfirm={handleConfirmBid}
        item={item}
      />
    </>
  );
}
