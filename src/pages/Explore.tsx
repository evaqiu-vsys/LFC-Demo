import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, Utensils, Beer, ChevronRight, CheckCircle2, ArrowRight, Video, Navigation, Search, Filter, MapPin, Gift } from 'lucide-react';
import CheckoutModal from '../components/CheckoutModal';
import diningImg from '../assets/dining-reward.png';
import beerImg from '../assets/beer-reward.png';
import academyImg from '../assets/academy-reward.png';
import ladynaraImg from '../assets/ladynara-reward.png';
import ConfirmModal from '../components/ConfirmModal';

export default function Explore() {
  const [points, setPoints] = useState(12450);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#rewards') {
      const el = document.getElementById('rewards');
      if (el) {
        setTimeout(() => {
          // Adjust scroll position to account for sticky header
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCountry, setActiveCountry] = useState('All');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Checkout Modal State (for paid events)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Redeem Confirmation State (for point rewards)
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<{title: string, points: number} | null>(null);

  // Toast State
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleBookEvent = () => {
    setIsCheckoutOpen(true);
  };

  const handleCheckoutConfirm = () => {
    setIsCheckoutOpen(false);
    setToastMessage('Event Booking Successful!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRedeemClick = (title: string, requiredPoints: number) => {
    setSelectedReward({ title, points: requiredPoints });
    setIsRedeemModalOpen(true);
  };

  const handleConfirmRedeem = () => {
    if (selectedReward) {
      setPoints(prev => prev - selectedReward.points);
      setIsRedeemModalOpen(false);
      setToastMessage(`Successfully redeemed: ${selectedReward.title}!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="pb-28 bg-gray-50 min-h-screen relative">
      {/* Header */}
      <header className="px-5 pt-14 pb-4 glass sticky top-0 z-20 border-b border-gray-200/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-lfc-red rounded-xl flex items-center justify-center shadow-lg shrink-0">
            <Gift size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-lfc-charcoal leading-none">Explore</h1>
            <div className="flex items-center space-x-1.5 mt-1">
              <span className="text-xs text-gray-500 font-medium leading-none">Your Points:</span>
              <span className="text-xs font-bold text-lfc-red leading-none">{points.toLocaleString()} LFCP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Promotional Banners Carousel */}
      <div className="mt-4 pb-2">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-5 snap-x snap-mandatory">
          
          {/* Banner 1 */}
          <div className="relative rounded-3xl overflow-hidden shadow-elevated group shrink-0 w-[85vw] max-w-sm snap-center">
            <div className="absolute inset-0 bg-gray-900">
              <img 
                src="https://images.unsplash.com/photo-1431324155629-1a6d0a6ebbfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="LFC Legends Match" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            </div>
            
            <div className="relative z-10 p-6 pt-24">
              <div className="inline-block px-3 py-1 mb-3 bg-lfc-gold text-lfc-charcoal text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                Featured Event
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-2 leading-tight drop-shadow-lg">
                LFC Legends Match
              </h2>
              <p className="text-white/80 text-sm mb-4 line-clamp-2">
                Meet Steven Gerrard and watch the legends play. Exclusive VIP access available now.
              </p>
              <button 
                onClick={() => handleBookEvent()}
                className="w-full py-3.5 bg-lfc-red text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition-colors btn-press flex items-center justify-center space-x-2"
              >
                <span>Book VIP Ticket</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative rounded-3xl overflow-hidden shadow-elevated group shrink-0 w-[85vw] max-w-sm snap-center">
            <div className="absolute inset-0 bg-gray-900">
              <img 
                src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Anfield Stadium Tour" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            </div>
            
            <div className="relative z-10 p-6 pt-24">
              <div className="inline-block px-3 py-1 mb-3 bg-white text-lfc-charcoal text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                Exclusive Tour
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-2 leading-tight drop-shadow-lg">
                Anfield Experience
              </h2>
              <p className="text-white/80 text-sm mb-4 line-clamp-2">
                Walk through the player's tunnel and touch the iconic "This Is Anfield" sign.
              </p>
              <button 
                onClick={() => handleBookEvent()}
                className="w-full py-3.5 bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold rounded-xl shadow-lg hover:bg-white/30 transition-colors btn-press flex items-center justify-center space-x-2"
              >
                <span>Book Tour</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-5 mt-6">
        {/* Search Input & Filter Toggle */}
        <div className="flex space-x-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lfc-red/50 focus:border-lfc-red transition-all shadow-sm"
              placeholder="Search rewards and events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={`px-4 py-3 rounded-xl flex items-center justify-center transition-all shadow-sm border ${
              isFiltersOpen || activeCategory !== 'All' || activeCountry !== 'All'
                ? 'bg-lfc-charcoal text-white border-lfc-charcoal' 
                : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            <Filter size={18} />
          </button>
        </div>

        {/* Collapsible Filters */}
        <div 
          className={`transition-all duration-300 overflow-hidden ${
            isFiltersOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
                <Filter size={12} />
                <span>Category</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['All', 'Dining', 'Academy', 'Merch', 'Events'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeCategory === cat 
                        ? 'bg-lfc-red text-white shadow-sm' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center space-x-1">
                <MapPin size={12} />
                <span>Location</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['All', 'Thailand', 'Japan', 'Hong Kong', 'China', 'Australia', 'UK', 'UAE', 'Malaysia', 'Korea', 'Singapore'].map(country => (
                  <button 
                    key={country}
                    onClick={() => setActiveCountry(country)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeCountry === country 
                        ? 'bg-lfc-red text-white shadow-sm' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fan Events Section (Paid) */}
      <div className="px-5 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-lfc-charcoal">Fan Events</h2>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Book Now</span>
        </div>
        
        <div className="space-y-4">
          <EventCard 
            title="Anfield Viewing Party"
            desc="Watch the away game against Man City on the giant screens at Anfield."
            date="May 24, 2026"
            price={45}
            icon={<Video size={20} className="text-white" />}
            color="bg-blue-600"
            onBook={() => handleBookEvent()}
          />
          <EventCard 
            title="Training Ground Tour"
            desc="Exclusive access to the AXA Training Centre with a guided tour."
            date="June 2, 2026"
            price={80}
            icon={<Navigation size={20} className="text-white" />}
            color="bg-emerald-600"
            onBook={() => handleBookEvent()}
          />
        </div>
      </div>

      {/* Rewards Section (Points) */}
      <div id="rewards" className="px-5 mt-8 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-lfc-charcoal">Member Rewards</h2>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Use Points</span>
        </div>
        
        <div className="columns-2 gap-3 [&>div]:mb-3">
          {/* Reward: Lady Nara */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 flex flex-col relative overflow-hidden group break-inside-avoid">
            {/* Real Image Header */}
            <div className="h-28 relative overflow-hidden bg-gray-900 w-full">
              <img 
                src={ladynaraImg} 
                alt="Lady Nara Dining" 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 flex items-center space-x-1.5">
                <Sparkles size={12} className="text-lfc-gold" />
                <span className="text-[10px] font-bold text-lfc-gold uppercase tracking-wider drop-shadow-md">Premium Member</span>
              </div>
            </div>
            
            <div className="p-3 relative z-10 flex flex-col">
              <div className="flex flex-col space-y-1.5 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-400 text-white flex items-center justify-center shrink-0 shadow-lg -mt-8 relative border-2 border-white">
                  <Utensils size={18} />
                </div>
                <div className="flex-1 mt-1">
                  <h3 className="font-bold text-sm text-lfc-charcoal leading-snug mb-1">Lady Nara 20% Off Dining</h3>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 line-clamp-2">Enjoy a 20% discount on exquisite Thai cuisine at Lady Nara.</p>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-baseline space-x-1">
                  <span className="font-extrabold text-base text-lfc-red">1,000</span>
                  <span className="text-xs font-bold text-gray-400">PTS</span>
                </div>
                <button 
                  onClick={() => handleRedeemClick('Lady Nara 20% Off Dining', 1000)}
                  className="px-3 py-1.5 bg-lfc-charcoal text-white text-[10px] font-bold rounded-lg shadow-md hover:bg-black transition-colors btn-press"
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>

          {/* Reward 1 */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 flex flex-col relative overflow-hidden group break-inside-avoid">
            {/* Real Image Header */}
            <div className="h-28 relative overflow-hidden bg-gray-900 w-full">
              <img 
                src={diningImg} 
                alt="Stadium Dining" 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 flex items-center space-x-1.5">
                <Sparkles size={12} className="text-lfc-gold" />
                <span className="text-[10px] font-bold text-lfc-gold uppercase tracking-wider drop-shadow-md">Premium Member</span>
              </div>
            </div>
            
            <div className="p-3 relative z-10 flex flex-col">
              <div className="flex flex-col space-y-1.5 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lfc-red to-lfc-red-dark text-white flex items-center justify-center shrink-0 shadow-lg -mt-8 relative border-2 border-white">
                  <Utensils size={18} />
                </div>
                <div className="flex-1 mt-1">
                  <h3 className="font-bold text-sm text-lfc-charcoal leading-snug mb-1">30% Off Stadium Dining</h3>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 line-clamp-2">Enjoy a 30% discount at all Anfield stadium restaurants and partner dining locations.</p>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-baseline space-x-1">
                  <span className="font-extrabold text-base text-lfc-red">1,500</span>
                  <span className="text-xs font-bold text-gray-400">PTS</span>
                </div>
                <button 
                  onClick={() => handleRedeemClick('30% Off Stadium Dining', 1500)}
                  className="px-3 py-1.5 bg-lfc-charcoal text-white text-[10px] font-bold rounded-lg shadow-md hover:bg-black transition-colors btn-press"
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>

          {/* Reward 2 */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 flex flex-col relative overflow-hidden group break-inside-avoid">
            {/* Real Image Header */}
            <div className="h-28 relative overflow-hidden bg-gray-900 w-full">
              <img 
                src={beerImg} 
                alt="Happy Hour Beer" 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 flex items-center space-x-1.5">
                <Sparkles size={12} className="text-lfc-gold" />
                <span className="text-[10px] font-bold text-lfc-gold uppercase tracking-wider drop-shadow-md">Matchday Special</span>
              </div>
            </div>
            
            <div className="p-3 relative z-10 flex flex-col">
              <div className="flex flex-col space-y-1.5 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lfc-gold to-yellow-500 text-lfc-charcoal flex items-center justify-center shrink-0 shadow-lg -mt-8 relative border-2 border-white">
                  <Beer size={18} />
                </div>
                <div className="flex-1 mt-1">
                  <h3 className="font-bold text-sm text-lfc-charcoal leading-snug mb-1">Happy Hour Buy-1-Get-1</h3>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 line-clamp-2">Buy one get one free on all draft beers at designated LFC fan pubs during matchdays.</p>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-baseline space-x-1">
                  <span className="font-extrabold text-base text-lfc-red">800</span>
                  <span className="text-xs font-bold text-gray-400">PTS</span>
                </div>
                <button 
                  onClick={() => handleRedeemClick('Happy Hour Buy-1-Get-1 Beer', 800)}
                  className="px-3 py-1.5 bg-lfc-charcoal text-white text-[10px] font-bold rounded-lg shadow-md hover:bg-black transition-colors btn-press"
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>

          {/* Reward 3: Academy Trial */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 flex flex-col relative overflow-hidden group break-inside-avoid">
            {/* Real Image Header */}
            <div className="h-28 relative overflow-hidden bg-gray-900 w-full">
              <img 
                src={academyImg} 
                alt="Liverpool Academy" 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 flex items-center space-x-1.5">
                <Sparkles size={12} className="text-lfc-gold" />
                <span className="text-[10px] font-bold text-lfc-gold uppercase tracking-wider drop-shadow-md">Exclusive</span>
              </div>
            </div>
            
            <div className="p-3 relative z-10 flex flex-col">
              <div className="flex flex-col space-y-1.5 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center shrink-0 shadow-lg -mt-8 relative border-2 border-white">
                  <Navigation size={18} />
                </div>
                <div className="flex-1 mt-1">
                  <h3 className="font-bold text-sm text-lfc-charcoal leading-snug mb-1">Liverpool Academy 60-min Trial</h3>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 line-clamp-2">LFC International Academy Hong Kong Youth Training Program 60-minute trial session.</p>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-baseline space-x-1">
                  <span className="font-extrabold text-base text-lfc-red">2,000</span>
                  <span className="text-xs font-bold text-gray-400">PTS</span>
                </div>
                <button 
                  onClick={() => handleRedeemClick('Liverpool Academy 60-min Trial', 2000)}
                  className="px-3 py-1.5 bg-lfc-charcoal text-white text-[10px] font-bold rounded-lg shadow-md hover:bg-black transition-colors btn-press"
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal (Used for Events) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onConfirm={handleCheckoutConfirm}
      />

      {/* Redeem Confirmation Modal (Used for Points) */}
      <ConfirmModal 
        isOpen={isRedeemModalOpen}
        onClose={() => setIsRedeemModalOpen(false)}
        onConfirm={handleConfirmRedeem}
        title="Confirm Redemption"
        description={`You are about to redeem "${selectedReward?.title}". This will deduct points from your wallet.`}
        pointsAmount={selectedReward?.points.toString()}
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

function EventCard({ title, desc, date, price, icon, color, onBook }: {
  title: string;
  desc: string;
  date: string;
  price: number;
  icon: React.ReactNode;
  color: string;
  onBook: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-card border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between group hover:shadow-card-hover transition-all">
      <div className="flex items-start space-x-4 mb-4 sm:mb-0">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${color}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-sm text-lfc-charcoal leading-snug mb-1">{title}</h3>
          <p className="text-xs text-gray-500 mb-2">{desc}</p>
          <div className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-[10px] font-bold text-gray-600">
            {date}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between sm:flex-col sm:items-end w-full sm:w-auto border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0 mt-2 sm:mt-0">
        <div className="text-lg font-bold text-lfc-charcoal mb-0 sm:mb-2">
          ${price}
        </div>
        <button 
          onClick={onBook}
          className="px-5 py-2 bg-gray-100 text-lfc-charcoal hover:bg-gray-200 text-xs font-bold rounded-xl transition-colors btn-press flex items-center space-x-1"
        >
          <span>Book</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}