import { useState } from 'react';
import { Copy, QrCode, Settings, Package, ChevronRight, Wallet, Plus, ArrowUpRight, ArrowDownLeft, CalendarHeart, Gift, Trophy, CheckCircle2, ExternalLink, Eye, EyeOff } from 'lucide-react';
import OrderTrackingModal from '../components/OrderTrackingModal';
import SettingsModal from '../components/SettingsModal';
import ProfileEditModal from '../components/ProfileEditModal';
import ViewAllItemsModal from '../components/ViewAllItemsModal';
import avatarImg from '../assets/avatar.png';

export default function My() {
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);
  const [viewAllType, setViewAllType] = useState<'events' | 'rewards' | null>(null);
  
  // Toast State
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProfileComplete = () => {
    setIsProfileModalOpen(false);
    setProfileComplete(true);
    setToastMessage('Profile completed! +500 LFCP');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="pb-8 bg-gray-50 min-h-screen relative">
      {/* Profile Header */}
      <header className="px-5 pt-14 pb-4 glass sticky top-0 z-20 border-b border-gray-200/50">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center space-x-3 text-left group"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm group-hover:border-lfc-red transition-colors">
                <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              {!profileComplete && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-lfc-red rounded-full border-2 border-white flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                </div>
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold flex items-center space-x-2 text-lfc-charcoal">
                <span>Eva</span>
                {profileComplete && <CheckCircle2 size={14} className="text-lfc-green" />}
              </h1>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {profileComplete ? 'Premium Red Member' : 'Complete profile for +500 LFCP'}
              </p>
            </div>
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2.5 rounded-xl bg-white hover:bg-gray-50 transition-colors shadow-sm border border-gray-200 text-gray-600"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Wallet Card - Premium Design */}
      <div className="px-5 mt-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-lfc-red to-lfc-red-dark shadow-elevated border border-red-700/50">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-lfc-gold/20 rounded-full blur-3xl"></div>
            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                backgroundSize: '32px 32px'
              }}
            ></div>
          </div>
          
          <div className="relative z-10 p-6">
            {/* Top Row - Address & QR */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Wallet size={14} className="text-white/80" />
                  <span className="text-white/80 text-xs uppercase tracking-wider font-bold">My wallet</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm text-white/90 tracking-wider">0x1a2b...cd3e</span>
                  <button 
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group"
                  >
                    <Copy size={14} className={`transition-colors ${copied ? 'text-lfc-green' : 'text-white/60 group-hover:text-white'}`} />
                  </button>
                  {copied && (
                    <span className="text-xs text-lfc-green font-medium animate-fade-in-up">Copied!</span>
                  )}
                </div>
              </div>
              <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white border border-white/20 hover:bg-white/30 transition-colors">
                <QrCode size={20} />
              </button>
            </div>
            
            {/* Balance Display */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-white/70 text-xs uppercase tracking-wider font-bold">Loyalty Points</span>
                <button 
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-1 rounded hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                >
                  {showBalance ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-5xl font-extrabold text-white tracking-tight tabular-nums drop-shadow-md">
                  {showBalance ? '12,450' : '•••••'}
                </span>
                <span className="text-lfc-gold font-bold text-lg drop-shadow-md">LFCP</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2 mt-8">
              <button className="flex-1 bg-white text-lfc-red py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors btn-press flex items-center justify-center space-x-1.5 shadow-lg">
                <Plus size={16} />
                <span>Top Up</span>
              </button>
              <button className="flex-1 bg-black/20 backdrop-blur-sm text-white py-3 rounded-xl font-bold text-sm border border-white/10 hover:bg-black/30 transition-colors btn-press flex items-center justify-center space-x-1.5">
                <ArrowUpRight size={16} />
                <span>Send</span>
              </button>
              <button className="flex-1 bg-black/20 backdrop-blur-sm text-white py-3 rounded-xl font-bold text-sm border border-white/10 hover:bg-black/30 transition-colors btn-press flex items-center justify-center space-x-1.5">
                <ArrowDownLeft size={16} />
                <span>Receive</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* My Events & My Rewards */}
      <div className="px-5 mt-6 space-y-3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-lfc-charcoal">My Events</h2>
          <button 
            onClick={() => setViewAllType('events')}
            className="text-sm font-semibold text-gray-500 hover:text-lfc-red transition-colors flex items-center group"
          >
            View All 
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
        
        <UtilityItem 
          icon={<CalendarHeart size={20} />} 
          title="Anfield Viewing Party" 
          desc="May 24, 2026 • VIP Access"
          badge="Upcoming"
          badgeColor="bg-lfc-green/10 text-lfc-green"
        />
        <UtilityItem 
          icon={<CalendarHeart size={20} />} 
          title="LFC Legends Match" 
          desc="Aug 12, 2026 • VIP Access"
          badge="Upcoming"
          badgeColor="bg-lfc-green/10 text-lfc-green"
        />
      </div>

      <div className="px-5 mt-8 space-y-3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-lfc-charcoal">My Rewards</h2>
          <button 
            onClick={() => setViewAllType('rewards')}
            className="text-sm font-semibold text-gray-500 hover:text-lfc-red transition-colors flex items-center group"
          >
            View All 
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
        
        <UtilityItem 
          icon={<Trophy size={20} />} 
          title="Matchday Special Beer" 
          desc="Valid until End of Season"
          badge="Active"
          badgeColor="bg-lfc-green/10 text-lfc-green"
        />
        <UtilityItem 
          icon={<Gift size={20} />} 
          title="LFC Giftset" 
          desc="Redeemed on May 10, 2026"
          badge="Processing"
          badgeColor="bg-amber-100 text-amber-700"
        />
      </div>

      {/* Utilities List */}
      <div className="px-5 mt-8 space-y-3">
        <h2 className="text-lg font-bold text-lfc-charcoal mb-4">Quick Actions</h2>
        
        <UtilityItem 
          icon={<Package size={20} />} 
          title="Order Tracking" 
          desc="Track physical merchandise deliveries"
          badge="1 Pending"
          badgeColor="bg-amber-100 text-amber-700"
          onClick={() => setIsTrackingModalOpen(true)}
        />
        <UtilityItem 
          icon={<ExternalLink size={20} />} 
          title="Transaction History" 
          desc="View all your wallet activity"
        />
      </div>

      {/* Footer Info */}
      <div className="px-5 mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>LFC Digital Wallet v1.0</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-lfc-green rounded-full animate-pulse"></div>
            <span>All systems operational</span>
          </div>
        </div>
      </div>

      <OrderTrackingModal 
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
      />

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <ProfileEditModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onProfileComplete={handleProfileComplete}
      />

      <ViewAllItemsModal 
        isOpen={viewAllType !== null}
        onClose={() => setViewAllType(null)}
        type={viewAllType || 'events'}
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

function UtilityItem({ icon, title, desc, badge, badgeColor, onClick }: { 
  icon: React.ReactNode; 
  title: string; 
  desc: string;
  badge?: string;
  badgeColor?: string;
  onClick?: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center text-left group"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 text-lfc-charcoal flex items-center justify-center shrink-0 group-hover:from-lfc-red/10 group-hover:to-lfc-red/5 group-hover:text-lfc-red transition-colors">
        {icon}
      </div>
      <div className="ml-4 flex-1">
        <div className="flex items-center space-x-2">
          <h3 className="font-bold text-sm text-lfc-charcoal">{title}</h3>
          {badge && (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
      </div>
      <ChevronRight size={18} className="text-gray-400 group-hover:text-lfc-red group-hover:translate-x-0.5 transition-all" />
    </button>
  );
}