import { useState } from 'react';
import { Copy, QrCode, Settings, Package, ChevronRight, Wallet, Image as ImageIcon, Award, Shield, ExternalLink, Eye, EyeOff } from 'lucide-react';

export default function My() {
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pb-8 bg-gray-50 min-h-screen">
      {/* Header with Glass Effect */}
      <header className="px-5 pt-14 pb-4 bg-lfc-charcoal text-white sticky top-0 z-20">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <Wallet size={20} className="text-lfc-gold" />
            </div>
            <h1 className="text-2xl font-bold">My Wallet</h1>
          </div>
          <button className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Wallet Card - Premium Glass Design */}
      <div className="bg-lfc-charcoal px-5 pb-8 pt-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl border border-gray-700/50">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-lfc-gold/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-lfc-red/5 rounded-full blur-3xl"></div>
            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '32px 32px'
              }}
            ></div>
          </div>
          
          <div className="relative z-10 p-6">
            {/* Top Row - Address & QR */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-lfc-green rounded-full animate-pulse"></div>
                  <span className="text-gray-400 text-xs uppercase tracking-wider font-medium">Connected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm text-gray-300 tracking-wider">0x1a2b...cd3e</span>
                  <button 
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group"
                  >
                    <Copy size={14} className={`transition-colors ${copied ? 'text-lfc-green' : 'text-gray-400 group-hover:text-white'}`} />
                  </button>
                  {copied && (
                    <span className="text-xs text-lfc-green font-medium animate-fade-in-up">Copied!</span>
                  )}
                </div>
              </div>
              <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-lfc-charcoal shadow-lg hover:scale-105 transition-transform">
                <QrCode size={24} />
              </button>
            </div>
            
            {/* Balance Display */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-gray-500 text-xs uppercase tracking-wider font-medium">Total Balance</span>
                <button 
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-1 rounded hover:bg-white/10 transition-colors"
                >
                  {showBalance ? <EyeOff size={12} className="text-gray-500" /> : <Eye size={12} className="text-gray-500" />}
                </button>
              </div>
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-extrabold text-white tracking-tight tabular-nums">
                  {showBalance ? '~ 18,500' : '•••••'}
                </span>
                <span className="text-lfc-gold font-bold text-lg">LFC</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">≈ $2,450.00 USD</p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="flex-1 bg-lfc-gold text-lfc-charcoal py-3 rounded-xl font-bold text-sm hover:bg-lfc-gold-light transition-colors btn-press flex items-center justify-center space-x-2 shadow-lg">
                <span>Send</span>
              </button>
              <button className="flex-1 bg-white/10 backdrop-blur-sm text-white py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors btn-press flex items-center justify-center space-x-2">
                <span>Receive</span>
              </button>
            </div>
          </div>
          
          {/* Bottom decorative line */}
          <div className="h-1 bg-gradient-to-r from-lfc-red via-lfc-gold to-lfc-red"></div>
        </div>
      </div>

      {/* Asset Categories - Redesigned Grid */}
      <div className="px-5 mt-6">
        <h2 className="text-lg font-bold text-lfc-charcoal mb-4">Digital Assets</h2>
        <div className="grid grid-cols-2 gap-3">
          <AssetCategory 
            title="Membership" 
            subtitle="Premium Red"
            count={1} 
            icon={<Shield size={20} />}
            color="bg-gradient-to-br from-lfc-gold to-yellow-500"
            textColor="text-lfc-charcoal"
          />
          <AssetCategory 
            title="Benefits" 
            subtitle="3 Active"
            count={3} 
            icon={<Award size={20} />}
            color="bg-gradient-to-br from-lfc-red to-red-700"
            textColor="text-white"
          />
          <AssetCategory 
            title="Collectibles" 
            subtitle="5 Items"
            count={5} 
            icon={<ImageIcon size={20} />}
            color="bg-gradient-to-br from-blue-500 to-blue-700"
            textColor="text-white"
          />
          <AssetCategory 
            title="Badges" 
            subtitle="12 Earned"
            count={12} 
            icon={<Award size={20} />}
            color="bg-gradient-to-br from-lfc-green to-green-600"
            textColor="text-white"
          />
        </div>
      </div>

      {/* Recent NFTs Preview */}
      <div className="px-5 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-lfc-charcoal">Recent Collectibles</h2>
          <button className="text-sm font-semibold text-lfc-red hover:text-lfc-red-dark transition-colors flex items-center group">
            View All 
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
        
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
          <NFTCard 
            image="https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            name="Victory Scarf"
            rarity="Legendary"
          />
          <NFTCard 
            image="https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            name="Tunnel Pass"
            rarity="Epic"
          />
          <NFTCard 
            image="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
            name="Match Cap"
            rarity="Rare"
          />
        </div>
      </div>

      {/* Utilities List */}
      <div className="px-5 mt-8 space-y-3">
        <h2 className="text-lg font-bold text-lfc-charcoal mb-4">Quick Actions</h2>
        
        <UtilityItem 
          icon={<QrCode size={20} />} 
          title="Ticket Redemption" 
          desc="Use your stadium or partner passes"
          badge="2 Active"
          badgeColor="bg-lfc-green/10 text-lfc-green"
        />
        <UtilityItem 
          icon={<Package size={20} />} 
          title="Order Tracking" 
          desc="Track physical merchandise deliveries"
          badge="1 Pending"
          badgeColor="bg-amber-100 text-amber-700"
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
    </div>
  );
}

function AssetCategory({ title, subtitle, count, icon, color, textColor }: { 
  title: string; 
  subtitle: string;
  count: number; 
  icon: React.ReactNode;
  color: string;
  textColor: string;
}) {
  return (
    <div className={`${color} rounded-2xl p-4 text-white shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '16px 16px'
          }}
        ></div>
      </div>
      
      <div className="relative z-10">
        <div className={`w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 ${textColor}`}>
          {icon}
        </div>
        <p className="text-3xl font-bold mb-0.5">{count}</p>
        <p className="text-sm font-medium opacity-90">{title}</p>
        <p className="text-xs opacity-70 mt-0.5">{subtitle}</p>
      </div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </div>
  );
}

function NFTCard({ image, name, rarity }: { image: string, name: string, rarity: string }) {
  const rarityColors: Record<string, string> = {
    'Legendary': 'bg-purple-500',
    'Epic': 'bg-pink-500',
    'Rare': 'bg-blue-500',
    'Common': 'bg-gray-400'
  };

  return (
    <div className="shrink-0 w-32">
      <div className="aspect-square rounded-2xl overflow-hidden shadow-card mb-2 relative group">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-2 right-2">
          <span className={`${rarityColors[rarity]} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
            {rarity}
          </span>
        </div>
      </div>
      <p className="font-bold text-sm text-lfc-charcoal truncate">{name}</p>
    </div>
  );
}

function UtilityItem({ icon, title, desc, badge, badgeColor }: { 
  icon: React.ReactNode; 
  title: string; 
  desc: string;
  badge?: string;
  badgeColor?: string;
}) {
  return (
    <button className="w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center text-left group">
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