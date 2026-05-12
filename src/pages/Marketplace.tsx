import { useState } from 'react';
import { Clock, Filter, Flame, Search, Heart, TrendingUp, Shield, Star, ChevronRight, Plus } from 'lucide-react';
import BidModal from '../components/BidModal';
import CreateAuctionModal from '../components/CreateAuctionModal';
import AuctionDetailModal from '../components/AuctionDetailModal';

export default function Marketplace() {
  const [activeTab, setActiveTab] = useState('Auctions');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Modal states
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState<any>(null);
  
  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const showSuccessToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePlaceBid = (item: any) => {
    setSelectedAuction(item);
    setIsBidModalOpen(true);
  };

  const handleShowDetails = (item: any) => {
    setSelectedAuction(item);
    setIsDetailModalOpen(true);
  };

  const handleConfirmBid = (amount: string) => {
    setIsBidModalOpen(false);
    showSuccessToast(`Successfully placed bid of ${amount} LFC`);
  };

  const handleConfirmCreate = (item: any) => {
    setIsCreateModalOpen(false);
    showSuccessToast(`Listing "${item.title}" created successfully`);
  };

  const tabs = ['Auctions', 'Buy Now', 'Rentals', 'My Listings'];

  return (
    <div className="pb-24 bg-gray-50 min-h-screen relative">
      {/* Success Toast */}
      <div className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${
        showToast ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="bg-lfc-green text-white px-4 py-3 rounded-2xl shadow-lg flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <Check size={16} />
          </div>
          <p className="font-bold text-sm flex-1">{toastMessage}</p>
        </div>
      </div>

      {/* Floating Action Button for Create Auction */}
      <button 
        onClick={() => setIsCreateModalOpen(true)}
        className="fixed bottom-20 right-5 z-40 w-14 h-14 bg-lfc-charcoal text-white rounded-full flex items-center justify-center shadow-elevated hover:bg-black transition-transform hover:scale-105 active:scale-95"
      >
        <Plus size={24} />
      </button>

      {/* Glass Header */}
      <header className="px-5 pt-14 pb-2 glass sticky top-0 z-20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-lfc-red rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-lfc-charcoal">Marketplace</h1>
          </div>
          <button className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
            <Search size={20} className="text-gray-600" />
          </button>
        </div>
        
        {/* Tabs - Pill Style */}
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-lfc-red text-white shadow-lg' 
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Stats Bar */}
      <div className="px-5 mt-4">
        <div className="flex space-x-3">
          <StatCard label="Live Auctions" value="12" icon={<Flame size={14} className="text-lfc-red" />} color="red" />
          <StatCard label="Total Volume" value="45.2K" icon={<TrendingUp size={14} className="text-lfc-green" />} color="green" />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-5 mt-4">
        <div className="flex justify-between items-center bg-white rounded-xl p-3 shadow-card border border-gray-100">
          <span className="text-sm font-semibold text-gray-600">6 items found</span>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <Filter size={16} className="text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">Filter</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-5 mt-4">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {['All', 'Collectibles', 'Tickets', 'Merchandise', 'NFTs'].map((cat, idx) => (
            <button 
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                idx === 0 
                  ? 'bg-lfc-charcoal text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Auction List - Redesigned Cards */}
      <div className="px-5 mt-6 space-y-4">
        <AuctionCard 
          id="1"
          image="https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
          title="Signed 2005 Champions League Final Scarf"
          seller="Kopite99"
          sellerBadge="verified"
          currentBid="4,500"
          timeLeft="00:04:12"
          bids={24}
          isHot
          isFavorite={favorites.includes('1')}
          onToggleFavorite={() => toggleFavorite('1')}
          onPlaceBid={() => handlePlaceBid({
            id: '1',
            title: "Signed 2005 Champions League Final Scarf",
            currentBid: "4,500",
            timeLeft: "00:04:12",
            image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            seller: "Kopite99",
            sellerBadge: "verified",
            bids: 24,
            isHot: true
          })}
          onShowDetails={() => handleShowDetails({
            id: '1',
            title: "Signed 2005 Champions League Final Scarf",
            currentBid: "4,500",
            timeLeft: "00:04:12",
            image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            seller: "Kopite99",
            sellerBadge: "verified",
            bids: 24,
            isHot: true
          })}
        />
        
        <AuctionCard 
          id="2"
          image="https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
          title="VIP Matchday Experience - Anfield Tunnel Access"
          seller="OfficialLFC"
          sellerBadge="official"
          currentBid="15,000"
          timeLeft="12:45:00"
          bids={8}
          isFavorite={favorites.includes('2')}
          onToggleFavorite={() => toggleFavorite('2')}
          onPlaceBid={() => handlePlaceBid({
            id: '2',
            title: "VIP Matchday Experience - Anfield Tunnel Access",
            currentBid: "15,000",
            timeLeft: "12:45:00",
            image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            seller: "OfficialLFC",
            sellerBadge: "official",
            bids: 8
          })}
          onShowDetails={() => handleShowDetails({
            id: '2',
            title: "VIP Matchday Experience - Anfield Tunnel Access",
            currentBid: "15,000",
            timeLeft: "12:45:00",
            image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            seller: "OfficialLFC",
            sellerBadge: "official",
            bids: 8
          })}
        />
        
        <AuctionCard 
          id="3"
          image="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
          title="Limited Edition 2024/25 Third Kit - Match Worn"
          seller="RedFanatic"
          sellerBadge="trusted"
          currentBid="850"
          timeLeft="02:10:00"
          bids={42}
          isHot
          isFavorite={favorites.includes('3')}
          onToggleFavorite={() => toggleFavorite('3')}
          onPlaceBid={() => handlePlaceBid({
            id: '3',
            title: "Limited Edition 2024/25 Third Kit - Match Worn",
            currentBid: "850",
            timeLeft: "02:10:00",
            image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            seller: "RedFanatic",
            sellerBadge: "trusted",
            bids: 42,
            isHot: true
          })}
          onShowDetails={() => handleShowDetails({
            id: '3',
            title: "Limited Edition 2024/25 Third Kit - Match Worn",
            currentBid: "850",
            timeLeft: "02:10:00",
            image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            seller: "RedFanatic",
            sellerBadge: "trusted",
            bids: 42,
            isHot: true
          })}
        />

        <AuctionCard 
          id="4"
          image="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
          title="Historic Programme: First European Cup Win 1977"
          seller="VintageCollector"
          sellerBadge="verified"
          currentBid="2,200"
          timeLeft="5d 12h"
          bids={15}
          isFavorite={favorites.includes('4')}
          onToggleFavorite={() => toggleFavorite('4')}
          onPlaceBid={() => handlePlaceBid({
            id: '4',
            title: "Historic Programme: First European Cup Win 1977",
            currentBid: "2,200",
            timeLeft: "5d 12h",
            image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            seller: "VintageCollector",
            sellerBadge: "verified",
            bids: 15
          })}
          onShowDetails={() => handleShowDetails({
            id: '4',
            title: "Historic Programme: First European Cup Win 1977",
            currentBid: "2,200",
            timeLeft: "5d 12h",
            image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            seller: "VintageCollector",
            sellerBadge: "verified",
            bids: 15
          })}
        />
      </div>

      {/* Load More */}
      <div className="px-5 mt-6 mb-8">
        <button className="w-full py-4 bg-white rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center space-x-2">
          <span>Load More</span>
          <ChevronRight size={18} />
        </button>
      </div>

      <BidModal 
        isOpen={isBidModalOpen} 
        onClose={() => setIsBidModalOpen(false)} 
        onConfirm={handleConfirmBid}
        item={selectedAuction}
      />
      
      <CreateAuctionModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onConfirm={handleConfirmCreate}
      />
      
      <AuctionDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        item={selectedAuction}
        onPlaceBidSuccess={handleConfirmBid}
      />
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string, value: string, icon: React.ReactNode, color: 'red' | 'green' }) {
  const colorClasses = {
    red: 'bg-lfc-red/10 text-lfc-red',
    green: 'bg-lfc-green/10 text-lfc-green'
  };

  return (
    <div className="flex-1 bg-white rounded-xl p-3 shadow-card border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500 font-medium">{label}</span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
      <p className="text-xl font-bold text-lfc-charcoal">{value}</p>
    </div>
  );
}

function AuctionCard({ 
  id: _id, image, title, seller, sellerBadge, currentBid, timeLeft, bids, isHot = false, isFavorite, onToggleFavorite, onPlaceBid, onShowDetails
}: { 
  id: string;
  image: string; 
  title: string; 
  seller: string; 
  sellerBadge: 'verified' | 'official' | 'trusted';
  currentBid: string; 
  timeLeft: string;
  bids: number;
  isHot?: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPlaceBid: () => void;
  onShowDetails?: () => void;
}) {
  const badgeIcons = {
    verified: <Shield size={12} className="text-blue-500" />,
    official: <Star size={12} className="text-lfc-gold fill-lfc-gold" />,
    trusted: <Check size={12} className="text-lfc-green" />
  };

  const badgeLabels = {
    verified: 'Verified',
    official: 'Official',
    trusted: 'Trusted'
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-gray-100">
      <div className="flex">
        {/* Image Section */}
        <div className="w-36 relative shrink-0 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10"></div>
          
          {/* Hot Badge */}
          {isHot && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-lfc-red text-white text-[10px] font-bold rounded-full flex items-center space-x-1 animate-pulse shadow-lg">
              <Flame size={10} />
              <span>HOT</span>
            </div>
          )}
          
          {/* Favorite Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
            className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all"
          >
            <Heart size={14} className={isFavorite ? 'text-lfc-red fill-lfc-red' : 'text-gray-400'} />
          </button>
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            {/* Title */}
            <h3 className="font-bold text-sm text-lfc-charcoal leading-snug line-clamp-2 mb-2 group-hover:text-lfc-red transition-colors">
              {title}
            </h3>
            
            {/* Seller */}
            <div className="flex items-center space-x-1.5 mb-3">
              {badgeIcons[sellerBadge]}
              <span className="text-xs text-gray-500">@{seller}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                sellerBadge === 'official' ? 'bg-lfc-gold/20 text-lfc-gold' :
                sellerBadge === 'verified' ? 'bg-blue-50 text-blue-600' :
                'bg-lfc-green/10 text-lfc-green'
              }`}>
                {badgeLabels[sellerBadge]}
              </span>
            </div>
          </div>
          
          {/* Bottom Row */}
          <div className="flex items-end justify-between">
            {/* Bid Info */}
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Current Bid</p>
              <p className="font-bold text-lg text-lfc-charcoal">{currentBid} <span className="text-sm font-semibold text-gray-500">LFC</span></p>
              <p className="text-xs text-gray-400">{bids} bids</p>
            </div>
            
            {/* Time Left */}
            <div className={`flex flex-col items-end px-3 py-2 rounded-xl ${
              isHot ? 'bg-lfc-red/10' : 'bg-gray-100'
            }`}>
              <div className={`flex items-center space-x-1 text-xs font-bold mb-0.5 ${
                isHot ? 'text-lfc-red' : 'text-gray-600'
              }`}>
                <Clock size={12} />
                <span>{timeLeft}</span>
              </div>
              <span className="text-[10px] text-gray-400">remaining</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Bar */}
      <div className="px-4 py-3 border-t border-gray-100 flex space-x-3">
        <button 
          onClick={onPlaceBid}
          className="flex-1 bg-lfc-red text-white py-2 rounded-xl font-bold text-sm hover:opacity-90 transition-colors btn-press"
        >
          Bid
        </button>
        <button 
          onClick={onShowDetails}
          className="flex-1 py-2 border-2 border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Details
        </button>
      </div>
    </div>
  );
}

function Check({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}