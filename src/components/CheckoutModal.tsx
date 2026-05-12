import { useState, useEffect } from 'react';
import { X, Shield, CheckCircle2, CreditCard, ChevronLeft } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CheckoutModal({ isOpen, onClose, onConfirm }: CheckoutModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [paymentMethod, setPaymentMethod] = useState('');

  // Form states
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setStep(1);
      setPaymentMethod('');
      setCardNumber('');
      setExpiry('');
      setCvc('');
      setAddress('');
      setTimeout(() => setShowContent(true), 50);
    } else {
      setShowContent(false);
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isOpen]);

  if (!isAnimating && !isOpen) return null;

  const handleNextStep = (method: string) => {
    setPaymentMethod(method);
    if (method === 'Visa') {
      setStep(2);
    } else {
      // For demo, immediately confirm other payment methods if selected, or just enforce Visa.
      // Let's force Visa for the demo as requested.
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber && address) {
      onConfirm();
    }
  };

  const renderStep1 = () => (
    <>
      <div className="p-6 pb-2">
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          You are about to purchase the Ultimate LFC Travel Set. Please select a payment method.
        </p>

        <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-500">Price</span>
            <span className="font-bold text-lg text-lfc-charcoal">$600</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-500">Quantity</span>
            <span className="font-bold text-lg text-lfc-charcoal">1</span>
          </div>
          <div className="h-px bg-gray-200 mb-3"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-700">Total</span>
            <span className="font-bold text-2xl text-lfc-red">$600</span>
          </div>
        </div>

        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Payment Method</label>
        <div className="space-y-2">
          {['Visa', 'Mastercard', 'American Express', 'WeChat Pay', 'Alipay'].map((method) => (
            <button
              key={method}
              onClick={() => handleNextStep(method)}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-lfc-red hover:bg-lfc-red/5 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-white transition-colors">
                  <CreditCard size={16} className="text-gray-600 group-hover:text-lfc-red" />
                </div>
                <span className="font-bold text-sm text-lfc-charcoal">{method}</span>
              </div>
              <div className="w-4 h-4 rounded-full border-2 border-gray-300 group-hover:border-lfc-red"></div>
            </button>
          ))}
        </div>
      </div>
    </>
  );

  const renderStep2 = () => (
    <form onSubmit={handleSubmit} className="p-6 flex flex-col h-full">
      <div className="flex-1 space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Card Number</label>
          <input
            type="text"
            required
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="0000 0000 0000 0000"
            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3.5 text-sm font-bold text-lfc-charcoal focus:outline-none focus:border-lfc-red transition-all"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Expiry Date</label>
            <input
              type="text"
              required
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3.5 text-sm font-bold text-lfc-charcoal focus:outline-none focus:border-lfc-red transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">CVC</label>
            <input
              type="text"
              required
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="123"
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3.5 text-sm font-bold text-lfc-charcoal focus:outline-none focus:border-lfc-red transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Billing Address</label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Anfield Road, Liverpool"
            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-3.5 text-sm font-bold text-lfc-charcoal focus:outline-none focus:border-lfc-red transition-all"
          />
        </div>

        <div className="flex items-center space-x-2 text-lfc-green text-xs mt-4 bg-lfc-green/10 p-3 rounded-xl">
          <CheckCircle2 size={14} />
          <span className="font-medium">Secure transaction via {paymentMethod}</span>
        </div>
      </div>

      <div className="pt-6 mt-4 border-t border-gray-100">
        <button
          type="submit"
          className="w-full py-4 rounded-xl font-bold text-sm text-white shadow-lg btn-press flex items-center justify-center space-x-2 bg-gradient-to-r from-lfc-red to-lfc-red-dark hover:from-red-700 hover:to-red-800"
        >
          <span>Pay $600</span>
          <CheckCircle2 size={16} />
        </button>
      </div>
    </form>
  );

  return (
    <div 
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-300 ${
        showContent ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl transition-all duration-300 flex flex-col max-h-[90vh] ${
          showContent 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Gradient */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-lfc-charcoal to-gray-800 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {step === 2 && (
                <button 
                  type="button"
                  onClick={() => setStep(1)} 
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors mr-1"
                >
                  <ChevronLeft size={18} className="text-white" />
                </button>
              )}
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Shield size={20} className="text-lfc-gold" />
              </div>
              <h3 className="font-bold text-lg text-white">Checkout</h3>
            </div>
            <button 
              onClick={onClose} 
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={18} className="text-white" />
            </button>
          </div>
        </div>
        
        {/* Content area that scrolls if needed */}
        <div className="overflow-y-auto">
          {step === 1 ? renderStep1() : renderStep2()}
        </div>
      </div>
    </div>
  );
}
