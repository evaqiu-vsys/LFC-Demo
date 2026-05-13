import { useState } from 'react';
import { X, CalendarHeart, Trophy, Gift, Utensils, CheckCircle2, XCircle, Clock } from 'lucide-react';

type ItemType = 'events' | 'rewards';
type TabType = 'available' | 'used' | 'expired';

export default function ViewAllItemsModal({ 
  isOpen, 
  onClose,
  type 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  type: ItemType;
}) {
  const [activeTab, setActiveTab] = useState<TabType>('available');

  if (!isOpen) return null;

  const eventsData = {
    available: [
      { id: 1, title: 'Anfield Viewing Party', desc: 'May 24, 2026 • VIP Access', status: 'Upcoming', icon: <CalendarHeart size={20} /> },
      { id: 2, title: 'LFC Legends Match', desc: 'Aug 12, 2026 • VIP Access', status: 'Upcoming', icon: <CalendarHeart size={20} /> },
    ],
    used: [
      { id: 3, title: 'Training Ground Tour', desc: 'Mar 10, 2026 • Standard Access', status: 'Attended', icon: <CheckCircle2 size={20} /> },
    ],
    expired: [
      { id: 4, title: 'Meet & Greet with Legends', desc: 'Feb 05, 2026 • Virtual', status: 'Missed', icon: <XCircle size={20} /> },
    ]
  };

  const rewardsData = {
    available: [
      { id: 1, title: 'Matchday Special Beer', desc: 'Valid until End of Season', status: 'Active', icon: <Trophy size={20} /> },
      { id: 2, title: 'LFC Giftset', desc: 'Redeemed on May 10, 2026', status: 'Processing', icon: <Gift size={20} /> },
    ],
    used: [
      { id: 3, title: '30% Off Stadium Dining', desc: 'Redeemed on Feb 14, 2026', status: 'Used', icon: <Utensils size={20} /> },
    ],
    expired: [
      { id: 4, title: 'Lady Nara 20% Off Dining', desc: 'Expired on Jan 01, 2026', status: 'Expired', icon: <Clock size={20} /> },
    ]
  };

  const data = type === 'events' ? eventsData : rewardsData;
  const currentItems = data[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:items-center sm:justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="bg-white w-full sm:w-[450px] rounded-t-3xl sm:rounded-3xl relative z-10 animate-slide-in-bottom sm:animate-fade-in-up flex flex-col h-[85vh] sm:h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-bold text-lfc-charcoal">
            {type === 'events' ? 'My Events' : 'My Rewards'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-5 pt-4 pb-2 space-x-4 border-b border-gray-100 shrink-0 overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveTab('available')}
            className={`pb-3 text-sm font-bold whitespace-nowrap transition-colors relative ${
              activeTab === 'available' ? 'text-lfc-red' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Available
            {activeTab === 'available' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lfc-red rounded-t-full"></span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('used')}
            className={`pb-3 text-sm font-bold whitespace-nowrap transition-colors relative ${
              activeTab === 'used' ? 'text-lfc-red' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {type === 'events' ? 'Attended' : 'Used'}
            {activeTab === 'used' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lfc-red rounded-t-full"></span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('expired')}
            className={`pb-3 text-sm font-bold whitespace-nowrap transition-colors relative ${
              activeTab === 'expired' ? 'text-lfc-red' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Expired
            {activeTab === 'expired' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lfc-red rounded-t-full"></span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 bg-gray-50/50">
          {currentItems.length > 0 ? (
            <div className="space-y-3">
              {currentItems.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    activeTab === 'available' 
                      ? 'bg-lfc-red/10 text-lfc-red' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className={`font-bold text-sm ${activeTab === 'available' ? 'text-lfc-charcoal' : 'text-gray-500'}`}>
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  <div className="ml-3 shrink-0">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                      activeTab === 'available' 
                        ? (item.status === 'Processing' ? 'bg-amber-100 text-amber-700' : 'bg-lfc-green/10 text-lfc-green')
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <X size={24} className="text-gray-300" />
              </div>
              <p className="text-sm font-medium">No items found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}