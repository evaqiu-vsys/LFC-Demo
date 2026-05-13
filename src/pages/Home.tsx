import { useState } from 'react';
import { Bell, ChevronRight, Gift, ShoppingBag, Trophy, ArrowUpRight, Sparkles, Ticket, X, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import lfcTravelSetImg from '../assets/lfc-travel-set.png';
import CheckoutModal from '../components/CheckoutModal';

import logoImg from '../assets/lfc-logo.png';
import avatarImg from '../assets/avatar.png';

export default function Home() {
  const navigate = useNavigate();
  const [points] = useState(12450);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isCheckoutConfirmOpen, setIsCheckoutConfirmOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Purchase Successful!');

  const handleCheckoutConfirm = () => {
    setIsCheckoutConfirmOpen(false);
    setIsOfferModalOpen(false);
    setToastMessage('Purchase Successful!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="pb-8 bg-gray-50 min-h-screen">
      {/* Glass Header */}
      <header className="px-5 pt-14 pb-4 flex justify-between items-center glass sticky top-0 z-20 border-b border-gray-200/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg p-1 overflow-hidden">
            <img 
              src={logoImg}
              alt="LFC Travel Loyalty" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-bold text-lfc-charcoal text-lg tracking-tight leading-tight whitespace-nowrap">LFC Travel<br/><span className="text-sm text-lfc-red">Loyalty</span></span>
        </div>
        
        <button className="relative p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors group">
          <Bell size={20} className="text-gray-700 group-hover:text-lfc-red transition-colors" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-lfc-red rounded-full border-2 border-white animate-pulse"></span>
        </button>
      </header>

      {/* Hero Card - Premium Design */}
      <div className="px-5 mt-4">
        <div className="relative overflow-hidden rounded-3xl shadow-elevated">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-lfc-charcoal via-lfc-charcoal-light to-gray-900"></div>
          
          {/* Animated shimmer overlay */}
          <div className="absolute inset-0 animate-shimmer opacity-30"></div>
          
          {/* Pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}
          ></div>
          
          {/* Large logo watermark */}
          <div className="absolute -right-6 -top-6 opacity-[0.08]">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png" 
              className="w-48 h-48" 
              alt="" 
            />
          </div>
          
          <div className="relative z-10 p-6">
            {/* User Info Row */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-2 border-lfc-gold p-0.5 overflow-hidden bg-gray-800 shadow-lg">
                    <img 
                      src={avatarImg} 
                      alt="Avatar" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-lfc-green rounded-full border-2 border-lfc-charcoal flex items-center justify-center">
                    <Sparkles size={10} className="text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">Welcome back</p>
                  <p className="font-bold text-xl text-white tracking-tight">Eva</p>
                </div>
              </div>
              
              <div className="px-3 py-1.5 bg-lfc-red/20 backdrop-blur-sm rounded-full border border-lfc-red/30">
                <span className="text-lfc-red text-xs font-bold uppercase tracking-wider">
                  Premium Red
                </span>
              </div>
            </div>
            
            {/* Points Display */}
            <div>
              <p className="text-gray-400 text-sm mb-1 font-medium">Loyalty Points</p>
              <div className="flex items-baseline">
                <span className="text-5xl font-extrabold text-white tracking-tight tabular-nums">
                  {points.toLocaleString()}
                </span>
                <span className="text-lfc-gold ml-2 font-bold text-lg">LFCP</span>
              </div>
              <div className="flex items-center mt-2 space-x-2">
              </div>
            </div>
          </div>
          
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>

      {/* Quick Actions - Refined */}
      <div className="grid grid-cols-2 gap-4 px-5 mt-6">
        <ActionButton 
          icon={<Gift size={22} />} 
          label="Explore Rewards" 
          color="red"
          onClick={() => navigate('/explore#rewards')}
        />
        <ActionButton 
          icon={<Trophy size={22} />} 
          label="Upgrade Tier" 
          color="outline"
          onClick={() => {}}
        />
      </div>

      {/* Featured Offer - Card Redesign */}
      <div className="px-5 mt-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-lfc-charcoal">Featured</h2>
            <span className="px-2 py-0.5 bg-lfc-red/10 text-lfc-red text-[10px] font-bold rounded-full uppercase">
              New
            </span>
          </div>
          <button className="text-sm font-semibold text-gray-500 hover:text-lfc-red transition-colors flex items-center group">
            View All 
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
        
        <div className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-gray-100">
          <div className="h-52 relative overflow-hidden bg-gray-900">
            {/* LFC Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png" className="w-full h-full object-cover blur-sm mix-blend-overlay" alt="" />
            </div>
            {/* Main Image */}
            <img 
              src={lfcTravelSetImg} 
              alt="Travel Set" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-normal opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-lfc-gold text-lfc-charcoal text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                Limited Edition
              </span>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="font-bold text-xl text-white mb-1 drop-shadow-lg">Ultimate LFC Travel Set</h3>
              <p className="text-white/80 text-sm">Premium Suitcase & Scarf Bundle</p>
            </div>
          </div>
          
          <div className="p-5">
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Travel like a champion. Get the official LFC branded luggage set paired with our classic matchday scarf.
            </p>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs text-gray-400 font-medium">Bundle Price</span>
                <div className="flex items-baseline space-x-2">
                  <p className="font-bold text-2xl text-lfc-charcoal">$600</p>
                  <p className="text-xs text-gray-400 line-through">$850</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOfferModalOpen(true)}
                className="bg-lfc-charcoal text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-lg btn-press flex items-center space-x-2"
              >
                <span>Details</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity - Refined List */}
      <div className="px-5 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-lfc-charcoal">Recent Activity</h2>
          <button className="text-sm font-semibold text-gray-500 hover:text-lfc-red transition-colors flex items-center group">
            See All 
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
        
        <div className="space-y-3">
          <ActivityItem 
            icon={<Ticket size={18} />}
            title="Matchday Check-in" 
            desc="LFC vs Arsenal" 
            points="+50" 
            date="Today" 
            type="positive"
          />
          <ActivityItem 
            icon={<ShoppingBag size={18} />}
            title="Reward Redeemed" 
            desc="Anfield Stadium Tour" 
            points="-2,000" 
            date="2 days ago" 
            type="negative"
          />
          <ActivityItem 
            icon={<Trophy size={18} />}
            title="Marketplace Sale" 
            desc="Vintage Scarf NFT" 
            points="+450" 
            date="1 week ago" 
            type="positive"
          />
        </div>
      </div>

      {/* Offer Details Modal */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsOfferModalOpen(false)}>
          <div 
            className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-48 shrink-0 bg-gray-900">
              <div className="absolute inset-0 opacity-20">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png" className="w-full h-full object-cover blur-sm mix-blend-overlay" alt="" />
              </div>
              <img 
                src={lfcTravelSetImg} 
                alt="Travel Set" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-normal opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <button 
                onClick={() => setIsOfferModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center transition-colors border border-white/20"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="flex items-center space-x-2 mb-3">
                <span className="px-2 py-1 bg-lfc-gold/20 text-lfc-gold text-[10px] font-bold rounded-full uppercase tracking-wider">Limited Edition</span>
                <span className="px-2 py-1 bg-lfc-red/10 text-lfc-red text-[10px] font-bold rounded-full uppercase tracking-wider">Bundle</span>
              </div>
              
              <h3 className="text-2xl font-bold text-lfc-charcoal mb-4">Ultimate LFC Travel Set</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="mt-0.5"><ShoppingBag size={18} className="text-lfc-red" /></div>
                  <div>
                    <p className="font-bold text-sm text-lfc-charcoal">LFC Giftset ($600 value)</p>
                    <p className="text-xs text-gray-500 mt-1">A physical set containing official branded luggage (suitcase) and a classic matchday scarf.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="mt-0.5"><Ticket size={18} className="text-lfc-red" /></div>
                  <div>
                    <p className="font-bold text-sm text-lfc-charcoal">1-Year Premium Airport Lounge Access ($300 value)</p>
                    <p className="text-xs text-gray-500 mt-1">This provides entry to premium lounges in 90% of airports globally.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="mt-0.5"><Trophy size={18} className="text-lfc-red" /></div>
                  <div>
                    <p className="font-bold text-sm text-lfc-charcoal">1-Year Asian Vault Whisky Club ($100 value)</p>
                    <p className="text-xs text-gray-500 mt-1">A one-year exclusive membership to the club.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 bg-lfc-gold/10 p-3 rounded-xl border border-lfc-gold/20">
                  <div className="mt-0.5"><Sparkles size={18} className="text-lfc-gold" /></div>
                  <div>
                    <p className="font-bold text-sm text-lfc-charcoal">Bonus Rewards</p>
                    <p className="text-xs text-gray-600 mt-1">Includes <span className="font-bold text-lfc-red">3,000 points</span> and an instant upgrade to <span className="font-bold text-lfc-gold">Diamond membership</span>.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 font-medium">Total Value: $850</p>
                  <p className="font-bold text-2xl text-lfc-charcoal">$600 <span className="text-sm font-medium text-gray-500 line-through ml-1">$850</span></p>
                </div>
                <button 
                  onClick={() => setIsCheckoutConfirmOpen(true)}
                  className="bg-lfc-red text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-lfc-red-dark transition-colors shadow-lg btn-press"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutConfirmOpen}
        onClose={() => setIsCheckoutConfirmOpen(false)}
        onConfirm={handleCheckoutConfirm}
      />

      {/* Success Toast */}
      <div 
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-[80] transition-all duration-300 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-lfc-charcoal text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-3 whitespace-nowrap">
          <div className="w-6 h-6 bg-lfc-green rounded-full flex items-center justify-center shrink-0">
            <CheckCircle2 size={14} className="text-white" />
          </div>
          <span className="font-bold text-sm">{toastMessage}</span>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, color, onClick }: { icon: React.ReactNode, label: string, color: 'red' | 'outline', onClick: () => void }) {
  const baseClasses = "flex flex-col items-center justify-center p-5 rounded-2xl font-bold transition-all duration-300 btn-press shadow-card hover:shadow-card-hover";
  
  const colorClasses = color === 'red' 
    ? "bg-lfc-red text-white hover:bg-lfc-red-dark"
    : "bg-white text-lfc-charcoal border-2 border-gray-200 hover:border-lfc-red hover:text-lfc-red";

  return (
    <button onClick={onClick} className={`${baseClasses} ${colorClasses}`}>
      <span className="mb-2">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}

function ActivityItem({ icon, title, desc, points, date, type }: { 
  icon: React.ReactNode;
  title: string; 
  desc: string; 
  points: string; 
  date: string;
  type: 'positive' | 'negative';
}) {
  return (
    <div className="flex items-center p-4 bg-white rounded-2xl shadow-card border border-gray-100 hover:shadow-card-hover transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
        type === 'positive' ? 'bg-lfc-green/10 text-lfc-green' : 'bg-gray-100 text-gray-600'
      }`}>
        {icon}
      </div>
      <div className="ml-4 flex-1 min-w-0">
        <p className="font-bold text-sm text-lfc-charcoal truncate">{title}</p>
        <p className="text-xs text-gray-500 truncate">{desc}</p>
      </div>
      <div className="text-right ml-3">
        <p className={`font-bold text-sm ${type === 'positive' ? 'text-lfc-green' : 'text-lfc-charcoal'}`}>
          {points}
        </p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </div>
  );
}