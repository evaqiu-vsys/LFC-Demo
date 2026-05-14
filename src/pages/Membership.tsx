import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, Lock, Crown, Star, ChevronRight, Sparkles, Zap, Gift, Plane, GlassWater } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';
import BenefitQRModal from '../components/BenefitQRModal';
import BenefitAddressModal from '../components/BenefitAddressModal';

export default function Membership() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedBenefitTitle, setSelectedBenefitTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#compare-benefits') {
      const el = document.getElementById('compare-benefits');
      if (el) {
        setTimeout(() => {
          const scrollContainer = el.closest('main') || document.querySelector('main');
          if (scrollContainer) {
            // Account for sticky header
            const y = el.getBoundingClientRect().top + scrollContainer.scrollTop - scrollContainer.getBoundingClientRect().top - 80;
            scrollContainer.scrollTo({ top: y, behavior: 'smooth' });
          } else {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, [location]);

  const handleUpgrade = () => {
    setIsUpgraded(true);
    setIsModalOpen(false);
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };

  const tiers = [
    { name: 'Kop Starter', level: 1, color: 'bg-gray-400' },
    { name: 'Anfield Silver', level: 2, color: 'bg-gray-400' },
    { name: 'Premium Red', level: 3, color: 'bg-lfc-red' },
    { name: 'Diamond Elite', level: 4, color: 'bg-lfc-gold' },
  ];

  const currentTierIndex = isUpgraded ? 3 : 2;

  return (
    <div className="pb-28 bg-gray-50 min-h-screen relative">
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div className="absolute inset-0 bg-lfc-gold/20 animate-pulse"></div>
          <div className="relative z-10 text-center animate-fade-in-up">
            <div className="w-24 h-24 bg-lfc-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl animate-bounce">
              <Crown size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-lfc-charcoal mb-2">Welcome to Diamond Elite!</h2>
            <p className="text-gray-600">Your membership has been upgraded</p>
          </div>
        </div>
      )}

      {/* Glass Header */}
      <header className="px-5 pt-14 pb-4 glass sticky top-0 z-20 border-b border-gray-200/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-lfc-red rounded-xl flex items-center justify-center shadow-lg">
            <Crown size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-lfc-charcoal">Membership</h1>
        </div>
      </header>

      {/* Tier Progress */}
      <div className="px-5 mt-6">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-bold text-lfc-charcoal">Your Journey</h2>
          <span className="text-sm text-gray-500">{currentTierIndex + 1} of 4 tiers</span>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center mb-6">
          {tiers.map((tier, index) => (
            <div key={tier.name} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center relative overflow-hidden ${
                index <= currentTierIndex 
                  ? tier.color + ' text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-400'
              }`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-overlay">
                  <SoccerIcon className="w-10 h-10" />
                </div>
                <div className="relative z-10 flex items-center justify-center">
                  {index <= currentTierIndex ? (
                    <Check size={14} strokeWidth={4} />
                  ) : (
                    <span className="text-xs font-bold">{tier.level}</span>
                  )}
                </div>
              </div>
              {index < tiers.length - 1 && (
                <div className={`flex-1 h-1 mx-1 rounded-full ${
                  index < currentTierIndex ? 'bg-lfc-gold' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Tier Card - Premium Ticket Design */}
      <div className="px-5">
        <div className="relative">
          {/* Main Card */}
          <div className="bg-gradient-to-br from-lfc-charcoal via-lfc-charcoal-light to-gray-900 rounded-3xl shadow-elevated overflow-hidden relative">
            {/* Ticket perforation effect */}
            <div className="absolute left-20 top-0 bottom-0 w-px">
              <div className="h-full border-l-2 border-dashed border-gray-600/50"></div>
              {/* Perforation circles */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-50 rounded-full"></div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-50 rounded-full"></div>
            </div>
            
            <div className="flex">
              {/* Left Section - Tier Number */}
              <div className="w-20 flex flex-col items-center justify-center py-8 relative">
                <span className="transform -rotate-90 text-xs font-mono tracking-[0.3em] text-gray-500 whitespace-nowrap font-bold">
                  TIER-0{currentTierIndex + 1}
                </span>
              </div>
              
              {/* Right Section - Details */}
              <div className="flex-1 p-6 relative">
                {/* Watermark */}
                <div className="absolute top-2 right-2 opacity-[0.08]">
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png" className="w-20 h-20" alt="" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-2 mb-3">
                    <Star size={14} className="text-lfc-gold fill-lfc-gold" />
                    <span className="text-lfc-gold text-xs font-bold tracking-widest uppercase">Current Tier</span>
                  </div>
                  
                  <h3 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                    {isUpgraded ? 'Diamond Elite' : 'Premium Red'}
                  </h3>
                  
                  <div className="flex items-center space-x-4 mt-4">
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Valid Until</p>
                      <p className="text-white font-mono text-sm tracking-wider">31 MAY 2027</p>
                    </div>
                    <div className="h-8 w-px bg-gray-700"></div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Member ID</p>
                      <p className="text-white font-mono text-sm tracking-wider">LFC-8829-X</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Section */}
            <div className="px-6 pb-6 pt-2">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-400 font-medium">
                  {isUpgraded ? '50,000' : '12,450'} pts
                </span>
                <span className="text-lfc-gold font-bold">
                  {isUpgraded ? 'Max' : '50,000 pts'}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-lfc-gold to-lfc-gold-light h-2 rounded-full transition-all duration-1000"
                  style={{ width: isUpgraded ? '100%' : '25%' }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-right">
                {isUpgraded ? 'Max tier reached' : '37,550 pts to Diamond Elite'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Benefits - Always shown as they are at least Premium Red */}
      <div className="px-5 mt-8 mb-6">
        <h2 className="text-lg font-bold text-lfc-charcoal mb-4">Your Premium Benefits</h2>
        <div className="space-y-3">
          <BenefitCard 
            icon={<Plane size={20} className="text-lfc-charcoal" />}
            title="1-Year Premium Airport Lounge Access"
            desc="Provides entry to premium lounges in 90% of airports globally."
            onUse={() => {
              setSelectedBenefitTitle('1-Year Premium Airport Lounge Access');
              setIsQRModalOpen(true);
            }}
          />
          <BenefitCard 
            icon={<GlassWater size={20} className="text-lfc-charcoal" />}
            title="1-Year Asian Vault Whisky Club Access"
            desc="A one-year exclusive membership to the club."
            onUse={() => {
              setSelectedBenefitTitle('1-Year Asian Vault Whisky Club Access');
              setIsQRModalOpen(true);
            }}
          />
          <BenefitCard 
            icon={<Gift size={20} className="text-lfc-charcoal" />}
            title="LFC Giftset (Luggage + Scarf)"
            desc="A physical set containing official branded luggage (suitcase) and a classic matchday scarf."
            onUse={() => {
              setSelectedBenefitTitle('LFC Giftset');
              setIsAddressModalOpen(true);
            }}
          />
        </div>
      </div>

      {/* Compare Benefits - Refined Table */}
      <div id="compare-benefits" className="px-5 mt-8">
        <h2 className="text-lg font-bold text-lfc-charcoal mb-4">Compare Benefits</h2>
        
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="flex items-center p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Benefit</div>
            <div className="w-20 text-center text-xs font-bold text-gray-500">Current</div>
            <div className="w-20 text-center">
              <span className="px-2 py-1 bg-lfc-gold/20 text-lfc-gold text-[10px] font-bold rounded-full">
                NEXT
              </span>
            </div>
          </div>
          
          <BenefitRow title="Early Ticket Access" current={true} next={true} />
          <BenefitRow title="Retail Discount" current={isUpgraded ? "15%" : "10%"} next={isUpgraded ? "20%" : "15%"} />
          <BenefitRow title="Exclusive Events" current={isUpgraded} next={true} />
          <BenefitRow title="Anfield Lounge" current={isUpgraded} next={true} />
          <BenefitRow title="Priority Support" current={isUpgraded} next={true} />
          <BenefitRow title="Digital Badges" current={isUpgraded ? "Elite" : "Premium"} next={isUpgraded ? "Max" : "Elite"} isLast />
        </div>
      </div>

      {/* Upgrade CTA Card */}
      {!isUpgraded && (
        <div className="px-5 mt-6">
          <div className="bg-gradient-to-br from-lfc-red to-lfc-red-dark rounded-2xl p-6 text-white shadow-elevated relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap size={16} className="text-lfc-gold" />
                    <span className="text-lfc-gold text-xs font-bold uppercase tracking-wider">Upgrade Available</span>
                  </div>
                  <h3 className="font-bold text-xl">Unlock Diamond Elite</h3>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Crown size={24} className="text-white" />
                </div>
              </div>
              
              <p className="text-white/80 text-sm mb-5 leading-relaxed">
                Get exclusive stadium access, premium digital collectibles, and VIP matchday experiences.
              </p>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-white text-lfc-red font-bold py-4 rounded-xl shadow-lg hover:bg-gray-100 transition-all btn-press flex items-center justify-center space-x-2"
              >
                <span>Upgrade Now</span>
                <ChevronRight size={18} />
              </button>
              
              <p className="text-center text-white/60 text-xs mt-3">
                Or rent individual benefits per match
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Already Premium State & Benefits */}
      {isUpgraded && (
        <div className="px-5 mt-6 space-y-6">
          <div className="bg-gradient-to-br from-lfc-gold to-yellow-500 rounded-2xl p-6 text-lfc-charcoal shadow-elevated relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles size={32} className="text-lfc-gold" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-1">You're Diamond Elite!</h3>
                <p className="text-lfc-charcoal/70 text-sm">Enjoy all exclusive benefits</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleUpgrade}
        title="Confirm Upgrade"
        description="Upgrade to Diamond Elite for 37,550 LFCP points. Unlock exclusive benefits and experiences."
        pointsAmount="37,550"
      />

      <BenefitQRModal 
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        title={selectedBenefitTitle}
      />

      <BenefitAddressModal 
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title={selectedBenefitTitle}
      />
    </div>
  );
}

function SoccerIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 15l-3-2.5.5-4.5h5l.5 4.5L12 15z" fill="currentColor" fillOpacity="0.4" />
      <path d="M12 15v7" />
      <path d="M9 12.5L2.5 14" />
      <path d="M15 12.5L21.5 14" />
      <path d="M9.5 8L5.5 3" />
      <path d="M14.5 8l4-5" />
    </svg>
  );
}

function BenefitCard({ icon, title, desc, onUse }: { icon: React.ReactNode, title: string, desc: string, onUse: () => void }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-card border border-gray-100 flex flex-col justify-between">
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-lfc-gold/10 flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-sm text-lfc-charcoal leading-tight mb-1">{title}</h4>
          <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
        </div>
      </div>
      <button 
        onClick={onUse}
        className="w-full py-2.5 rounded-xl text-sm font-bold text-lfc-charcoal bg-gray-100 hover:bg-gray-200 transition-colors btn-press flex items-center justify-center space-x-1"
      >
        <span>Access Benefit</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

function BenefitRow({ title, current, next, isLast = false }: { title: string, current: string | boolean, next: string | boolean, isLast?: boolean }) {
  const renderValue = (val: string | boolean, isNext: boolean) => {
    if (typeof val === 'string') {
      return (
        <span className={`font-bold text-sm ${isNext ? 'text-lfc-gold' : 'text-gray-600'}`}>
          {val}
        </span>
      );
    }
    if (val) {
      return <Check size={18} className={isNext ? 'text-lfc-gold' : 'text-gray-600'} strokeWidth={3} />;
    }
    return <Lock size={14} className="text-gray-300" />;
  };

  return (
    <div className={`flex items-center p-4 ${!isLast ? 'border-b border-gray-100' : ''} hover:bg-gray-50/50 transition-colors`}>
      <div className="flex-1 text-sm font-medium text-lfc-charcoal">{title}</div>
      <div className="w-20 flex justify-center">{renderValue(current, false)}</div>
      <div className="w-20 flex justify-center bg-lfc-gold/10 rounded-lg py-2">
        {renderValue(next, true)}
      </div>
    </div>
  );
}