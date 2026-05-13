import { useState, useEffect } from 'react';
import { X, Package, Truck, CheckCircle2, MapPin, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import lfcTravelSetImg from '../assets/lfc-travel-set.png';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderTrackingModal({ isOpen, onClose }: OrderTrackingModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setView('list');
      setSelectedOrder(null);
      setTimeout(() => setShowContent(true), 50);
    } else {
      setShowContent(false);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  if (!isAnimating && !isOpen) return null;

  const orders = [
    {
      id: 'LFC-20260512-8829',
      item: 'LFC Giftset (Luggage + Scarf)',
      price: '$600',
      status: 'In Transit',
      date: 'May 12, 2026',
      image: lfcTravelSetImg,
      trackingNo: 'SF1428579930',
      courier: 'SF Express',
      courierZh: '顺丰速运'
    },
    {
      id: 'LFC-20260420-1102',
      item: 'Signed 2005 Champions League Final Scarf',
      price: '4,500 LFCP',
      status: 'Delivered',
      date: 'Apr 20, 2026',
      image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      trackingNo: 'SF8839201123',
      courier: 'SF Express',
      courierZh: '顺丰速运'
    }
  ];

  const trackingNodes = [
    {
      id: 1,
      status: 'Delivered',
      desc: 'Delivered. Signed by: Collection Code (已签收, 签收人: 凭取件码签收)',
      time: 'Today 10:00 AM',
      icon: <CheckCircle2 size={16} className="text-white" />,
      color: 'bg-lfc-green',
      isCompleted: true,
      isCurrent: true
    },
    {
      id: 2,
      status: 'Out for Delivery',
      desc: 'Out for delivery. Courier: Zhang San (派件中, 派件员: 张三 13800138000)',
      time: 'Today 08:30 AM',
      icon: <Truck size={16} className="text-white" />,
      color: 'bg-lfc-charcoal',
      isCompleted: true,
      isCurrent: false
    },
    {
      id: 3,
      status: 'In Transit',
      desc: 'Arrived at Liverpool Distribution Center (快件到达【利物浦集散中心】)',
      time: 'Yesterday 21:15 PM',
      icon: <MapPin size={16} className="text-gray-400" />,
      color: 'bg-gray-200',
      isCompleted: true,
      isCurrent: false
    },
    {
      id: 4,
      status: 'In Transit',
      desc: 'Departed from London Sorting Center (快件在【伦敦分拨中心】完成分拣，准备发往下一站)',
      time: 'Yesterday 14:00 PM',
      icon: <MapPin size={16} className="text-gray-400" />,
      color: 'bg-gray-200',
      isCompleted: true,
      isCurrent: false
    },
    {
      id: 5,
      status: 'Collected',
      desc: 'Package collected by SF Express (顺丰已收取快件)',
      time: 'Yesterday 10:00 AM',
      icon: <Package size={16} className="text-gray-400" />,
      color: 'bg-gray-200',
      isCompleted: true,
      isCurrent: false
    }
  ];

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
    setView('detail');
  };

  const renderList = () => (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
      <div className="space-y-4">
        {orders.map(order => (
          <button 
            key={order.id} 
            onClick={() => handleOrderClick(order)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col text-left transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-center w-full mb-3 pb-3 border-b border-gray-50">
              <span className="text-xs text-gray-400 font-medium">{order.date}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                order.status === 'Delivered' ? 'bg-lfc-green/10 text-lfc-green' : 'bg-lfc-red/10 text-lfc-red animate-pulse'
              }`}>
                {order.status}
              </span>
            </div>
            
            <div className="flex items-center space-x-3 w-full">
              <img src={order.image} alt="Item" className="w-16 h-16 rounded-xl object-cover bg-gray-100 shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-lfc-charcoal truncate mb-1">{order.item}</h4>
                <p className="text-xs text-gray-500 mb-1">Order No. {order.id}</p>
                <p className="font-bold text-sm text-lfc-charcoal">{order.price}</p>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderDetail = () => (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* Order Item Details */}
      <div className="bg-white p-5 mb-3 shadow-sm border-b border-gray-100">
        <h4 className="font-bold text-lfc-charcoal mb-4">Item Details</h4>
        <div className="flex items-center space-x-4 mb-4">
          <img src={selectedOrder.image} alt={selectedOrder.item} className="w-20 h-20 rounded-xl object-cover border border-gray-100" />
          <div className="flex-1">
            <h5 className="font-bold text-sm text-lfc-charcoal leading-tight mb-1">{selectedOrder.item}</h5>
            <p className="text-xs text-gray-500 mb-2">Quantity: 1</p>
            <p className="font-bold text-sm text-lfc-charcoal">{selectedOrder.price}</p>
          </div>
        </div>
      </div>

      {/* Logistics Details */}
      <div className="bg-white p-5 mb-3 shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Order Number</p>
            <p className="font-bold text-sm text-lfc-charcoal">{selectedOrder.id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Courier</p>
            <div className="flex items-center justify-end space-x-1">
              <span className="font-bold text-sm text-lfc-red">{selectedOrder.courier}</span>
              <span className="text-xs text-gray-400 font-medium">({selectedOrder.courierZh})</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between border border-gray-100">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Tracking No.</span>
            <span className="font-mono text-sm font-bold text-lfc-charcoal">{selectedOrder.trackingNo}</span>
          </div>
          <button className="text-lfc-red text-xs font-bold hover:underline">Copy</button>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="p-6 pt-4 pb-10 bg-white">
        <h4 className="font-bold text-lfc-charcoal mb-6 flex items-center space-x-2">
          <Clock size={16} className="text-gray-400" />
          <span>Tracking History</span>
        </h4>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[15px] top-4 bottom-8 w-px bg-gray-200"></div>

          {/* Nodes */}
          <div className="space-y-6">
            {trackingNodes.map((node, index) => (
              <div key={node.id} className="relative flex items-start space-x-4">
                {/* Icon */}
                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ring-4 ring-white ${node.color} ${node.isCurrent ? 'shadow-lg' : ''}`}>
                  {node.icon}
                </div>
                
                {/* Content */}
                <div className={`flex-1 pt-1 ${index !== trackingNodes.length - 1 ? 'pb-2' : ''}`}>
                  <div className="flex justify-between items-start mb-1">
                    <p className={`font-bold text-sm ${node.isCurrent ? 'text-lfc-green' : 'text-lfc-charcoal'}`}>
                      {node.status}
                    </p>
                    <p className={`text-xs ${node.isCurrent ? 'text-lfc-green font-medium' : 'text-gray-400'}`}>
                      {node.time}
                    </p>
                  </div>
                  <p className={`text-xs leading-relaxed ${node.isCurrent ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                    {node.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className={`fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300 ${
        showContent ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transition-all duration-300 flex flex-col h-[90vh] sm:h-auto sm:max-h-[90vh] ${
          showContent 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-full sm:translate-y-4 sm:scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-lfc-charcoal to-gray-800 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {view === 'detail' && (
                <button 
                  type="button"
                  onClick={() => setView('list')} 
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors mr-1"
                >
                  <ChevronLeft size={18} className="text-white" />
                </button>
              )}
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Package size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white leading-tight">
                  {view === 'list' ? 'My Orders' : 'Order Details'}
                </h3>
                <p className="text-xs text-white/70">
                  {view === 'list' ? 'View your order history' : 'Track your LFC merchandise'}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={18} className="text-white" />
            </button>
          </div>
        </div>
        
        {/* Dynamic Content Area */}
        {view === 'list' ? renderList() : renderDetail()}
        
      </div>
    </div>
  );
}
