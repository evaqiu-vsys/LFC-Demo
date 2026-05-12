import { useState } from 'react';
import { Bell, ChevronRight, Gift, ShoppingBag, Trophy, ArrowUpRight, Sparkles, Ticket } from 'lucide-react';

export default function Home() {
  const [points] = useState(12450);

  return (
    <div className="pb-8 bg-gray-50 min-h-screen">
      {/* Glass Header */}
      <header className="px-5 pt-14 pb-4 flex justify-between items-center glass sticky top-0 z-20 border-b border-gray-200/50">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-lfc-red rounded-lg flex items-center justify-center shadow-lg">
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png" 
              alt="LFC" 
              className="h-6 w-auto brightness-0 invert"
            />
          </div>
          <span className="font-bold text-lfc-charcoal text-lg tracking-tight">LFC</span>
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
                      src="https://i.pravatar.cc/150?img=33" 
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
                  <p className="font-bold text-xl text-white tracking-tight">Alex_YNWA</p>
                </div>
              </div>
              
              <div className="px-3 py-1.5 bg-lfc-gold/20 backdrop-blur-sm rounded-full border border-lfc-gold/30">
                <span className="text-lfc-gold text-xs font-bold uppercase tracking-wider">
                  Premium
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
                <span className="text-lfc-gold ml-2 font-bold text-lg">LFC</span>
              </div>
              <div className="flex items-center mt-2 space-x-2">
                <div className="flex items-center space-x-1 px-2 py-0.5 bg-lfc-green/20 rounded-full">
                  <ArrowUpRight size={12} className="text-lfc-green" />
                  <span className="text-lfc-green text-xs font-bold">+12% this month</span>
                </div>
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
          onClick={() => {}}
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
          <div className="h-52 relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Travel Set" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-lfc-gold text-lfc-charcoal text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                Limited Edition
              </span>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="font-bold text-xl text-white mb-1 drop-shadow-lg">Cultural Fusion Travel Set</h3>
              <p className="text-white/80 text-sm">LFC x Japan Collaboration</p>
            </div>
          </div>
          
          <div className="p-5">
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              Exclusive luggage collection celebrating our Japanese fanbase. Premium materials with iconic LFC branding.
            </p>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs text-gray-400 font-medium">Price</span>
                <p className="font-bold text-2xl text-lfc-charcoal">$650</p>
              </div>
              <button className="bg-lfc-charcoal text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-lg btn-press flex items-center space-x-2">
                <span>Details</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tickets Section */}
      <div className="px-5 mt-8">
        <h2 className="text-xl font-bold text-lfc-charcoal mb-4">Upcoming Match</h2>
        <div className="bg-gradient-to-r from-lfc-red to-lfc-red-dark rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs font-medium mb-1">Sat, 18 May • Anfield</p>
              <p className="font-bold text-lg">LFC vs Wolves</p>
              <p className="text-white/60 text-sm mt-1">Premier League</p>
            </div>
            <button className="px-4 py-2 bg-white text-lfc-red font-bold text-sm rounded-xl btn-press">
              Get Tickets
            </button>
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