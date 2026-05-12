import { useState, useEffect } from 'react';
import { X, Upload, PlusCircle, CheckCircle2 } from 'lucide-react';

interface CreateAuctionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: any) => void;
}

export default function CreateAuctionModal({ isOpen, onClose, onConfirm }: CreateAuctionModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('24h');
  const [assetType, setAssetType] = useState('Collectible');

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setTitle('');
      setPrice('');
      setDuration('24h');
      setAssetType('Collectible');
      setTimeout(() => setShowContent(true), 50);
    } else {
      setShowContent(false);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  if (!isAnimating && !isOpen) return null;

  const handleConfirm = () => {
    if (!title || !price) return;
    
    onConfirm({
      id: Date.now().toString(),
      title,
      currentBid: price,
      timeLeft: duration,
      seller: 'Alex_YNWA',
      sellerBadge: 'verified',
      bids: 0,
      image: 'https://images.unsplash.com/photo-1629872430082-93d8912beccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isHot: true
    });
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        showContent ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transition-all duration-300 flex flex-col max-h-[90vh] ${
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
                <PlusCircle size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-lg text-white">Create Listing</h3>
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
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Image Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
              <Upload size={20} className="text-lfc-red" />
            </div>
            <p className="text-sm font-bold text-lfc-charcoal">Upload Asset Image</p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF up to 10MB</p>
          </div>
          
          {/* Form Fields */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Item Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Signed Match Ball"
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-sm font-bold text-lfc-charcoal focus:outline-none focus:border-lfc-red focus:ring-4 focus:ring-lfc-red/10 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Starting Bid</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-4 pr-12 text-sm font-bold text-lfc-charcoal focus:outline-none focus:border-lfc-red focus:ring-4 focus:ring-lfc-red/10 transition-all"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">LFC</div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Duration</label>
              <select 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-sm font-bold text-lfc-charcoal focus:outline-none focus:border-lfc-red focus:ring-4 focus:ring-lfc-red/10 transition-all appearance-none"
              >
                <option value="12h">12 Hours</option>
                <option value="24h">24 Hours</option>
                <option value="3d">3 Days</option>
                <option value="7d">7 Days</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Asset Type</label>
            <div className="flex space-x-2">
              {['Collectible', 'Ticket', 'Merch'].map(type => (
                <button
                  key={type}
                  onClick={() => setAssetType(type)}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                    assetType === type
                      ? 'bg-lfc-charcoal text-white shadow-md'
                      : 'bg-white border-2 border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

        </div>
        
        {/* Actions */}
        <div className="px-6 pb-6 pt-2 bg-white">
          <button 
            onClick={handleConfirm}
            disabled={!title || !price}
            className="w-full py-4 rounded-xl font-bold text-sm text-white shadow-lg btn-press flex items-center justify-center space-x-2 bg-gradient-to-r from-lfc-red to-lfc-red-dark hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Create Listing</span>
            <CheckCircle2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}