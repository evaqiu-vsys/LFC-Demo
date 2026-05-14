import { useState, useEffect } from 'react';
import { X, PlusCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface CreateAuctionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item: any) => void;
}

export default function CreateAuctionModal({ isOpen, onClose, onConfirm }: CreateAuctionModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [activeTab, setActiveTab] = useState<'wallet' | 'custom'>('wallet');

  const userAssets = [
    { id: '1', title: 'Vintage Scarf NFT', type: 'Collectible', image: 'https://images.unsplash.com/photo-1629872430082-93d8912beccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: '2', title: 'LFC vs Man Utd Ticket', type: 'Ticket', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: '3', title: 'Signed Match Ball', type: 'Collectible', image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
  ];

  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('24h');

  // Custom upload state
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customImage, setCustomImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setActiveTab('wallet');
      setSelectedAssetId('');
      setPrice('');
      setDuration('24h');
      setCustomTitle('');
      setCustomDesc('');
      setCustomImage(null);
      setTimeout(() => setShowContent(true), 50);
    } else {
      setShowContent(false);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  if (!isAnimating && !isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleConfirm = () => {
    if (activeTab === 'wallet') {
      if (!selectedAssetId || !price) return;
      
      const asset = userAssets.find(a => a.id === selectedAssetId);
      
      onConfirm({
        id: Date.now().toString(),
        title: asset?.title || 'Unknown',
        currentBid: price,
        timeLeft: duration,
        seller: 'Eva',
        sellerBadge: 'verified',
        bids: 0,
        image: asset?.image || 'https://images.unsplash.com/photo-1629872430082-93d8912beccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        isHot: true,
        isCustom: false
      });
    } else {
      if (!customTitle || !customImage || !price) return;

      onConfirm({
        id: Date.now().toString(),
        title: customTitle,
        description: customDesc,
        currentBid: price,
        timeLeft: duration,
        seller: 'Eva',
        sellerBadge: 'verified',
        bids: 0,
        image: customImage,
        isHot: false,
        isCustom: true
      });
    }
  };

  const isWalletValid = selectedAssetId && price;
  const isCustomValid = customTitle && customImage && price;
  const isValid = activeTab === 'wallet' ? isWalletValid : isCustomValid;

  return (
    <div 
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-300 ${
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
        <div className="relative px-6 py-5 bg-gradient-to-r from-lfc-charcoal to-gray-800 shrink-0">
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
          {/* Tabs */}
          <div className="flex space-x-2 p-1 bg-gray-100 rounded-xl shrink-0">
            <button
              onClick={() => setActiveTab('wallet')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                activeTab === 'wallet' 
                  ? 'bg-white text-lfc-charcoal shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              From Wallet
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                activeTab === 'custom' 
                  ? 'bg-white text-lfc-charcoal shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Custom Upload
            </button>
          </div>

          {activeTab === 'wallet' ? (
            /* Asset Selection */
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Select Asset from Wallet</label>
              <div className="grid grid-cols-1 gap-3">
                {userAssets.map(asset => (
                  <div 
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`flex items-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedAssetId === asset.id 
                        ? 'border-lfc-red bg-lfc-red/5' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <img src={asset.image} alt={asset.title} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                    <div className="ml-3 flex-1">
                      <p className="font-bold text-sm text-lfc-charcoal">{asset.title}</p>
                      <p className="text-xs text-gray-500">{asset.type}</p>
                    </div>
                    {selectedAssetId === asset.id && (
                      <div className="w-6 h-6 rounded-full bg-lfc-red flex items-center justify-center">
                        <CheckCircle2 size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Custom Upload Form */
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Upload Image</label>
                <div className="relative w-full h-32 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center overflow-hidden hover:bg-gray-100 transition-colors cursor-pointer">
                  {customImage ? (
                    <img src={customImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <ImageIcon size={24} className="mb-2" />
                      <span className="text-xs font-medium">Tap to upload image</span>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Title</label>
                <input 
                  type="text" 
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Signed Jersey"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3 text-sm font-bold text-lfc-charcoal focus:outline-none focus:border-lfc-red focus:ring-4 focus:ring-lfc-red/10 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                <textarea 
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  placeholder="Describe your item..."
                  rows={2}
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3 text-sm font-medium text-lfc-charcoal focus:outline-none focus:border-lfc-red focus:ring-4 focus:ring-lfc-red/10 transition-all resize-none"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 shrink-0">
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
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">LFCP</div>
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

        </div>
        
        {/* Actions */}
        <div className="px-6 pb-6 pt-2 bg-white shrink-0">
          <button 
            onClick={handleConfirm}
            disabled={!isValid}
            className="w-full py-4 rounded-xl font-bold text-sm text-white shadow-lg btn-press flex items-center justify-center space-x-2 bg-gradient-to-r from-lfc-red to-lfc-red-dark hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{activeTab === 'custom' ? 'Submit for Approval' : 'Create Listing'}</span>
            <CheckCircle2 size={16} />
          </button>
          {activeTab === 'custom' && (
            <p className="text-[10px] text-center text-gray-400 mt-3">
              Custom uploads require operator approval before appearing in the marketplace.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
