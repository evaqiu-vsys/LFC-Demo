import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Mail, Lock, User, Gift, Check, ArrowRight, Shield } from 'lucide-react';
import logoImg from '../assets/lfc-logo.png';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDefaultRegister = location.state?.isRegister || false;

  const [isRegister, setIsRegister] = useState(isDefaultRegister);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      // Show surprise gift modal upon successful registration
      setShowGiftModal(true);
    } else {
      // Go directly to home on login
      navigate('/home');
    }
  };

  const handleClaimGift = () => {
    setShowGiftModal(false);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-lfc-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-lfc-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      {/* Header */}
      <div className="px-5 py-4 flex items-center relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 relative z-10 pb-12">
        {/* Logo and Welcome Text */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg p-1.5 mb-4">
            <img 
              src={logoImg} 
              alt="LFC Travel Loyalty Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-lfc-charcoal tracking-tight mb-2">
            {isRegister ? 'Join the Club' : 'Welcome Back'}
          </h1>
          <p className="text-gray-500 text-sm text-center">
            {isRegister 
              ? 'Create an account to unlock exclusive benefits and start earning points.' 
              : 'Sign in to access your LFC Travel Loyalty account.'}
          </p>
        </div>

        {/* Form Area */}
        <div className="bg-white rounded-3xl shadow-elevated p-6 w-full max-w-sm mx-auto">
          {/* Toggle Tabs */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                !isRegister ? 'bg-white text-lfc-charcoal shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                isRegister ? 'bg-white text-lfc-charcoal shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Full Name</label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lfc-red/50 focus:border-lfc-red transition-all"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Email Address</label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lfc-red/50 focus:border-lfc-red transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Password</label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lfc-red/50 focus:border-lfc-red transition-all"
                />
              </div>
            </div>

            {!isRegister && (
              <div className="flex justify-end pt-1">
                <button type="button" className="text-xs font-bold text-lfc-red hover:text-red-700 transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-lfc-red text-white font-bold py-3.5 rounded-xl shadow-lg shadow-lfc-red/30 hover:bg-red-700 transition-all btn-press flex justify-center items-center space-x-2"
              >
                <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Surprise Gift Modal for Registration */}
      {showGiftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-fade-in-up relative">
            {/* Confetti Background Effect */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-lfc-red to-red-600"></div>
            
            <div className="relative z-10 px-6 pt-10 pb-6 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-5 rotate-12 transform hover:rotate-0 transition-all duration-300">
                <Gift size={40} className="text-lfc-gold" />
              </div>
              
              <h3 className="text-2xl font-extrabold text-lfc-charcoal mb-2">Welcome Gift!</h3>
              <p className="text-gray-500 text-sm mb-6 px-2">
                Thank you for joining LFC Travel Loyalty. We've prepared a surprise starter pack just for you!
              </p>
              
              <div className="w-full bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6 space-y-3">
                <div className="flex items-center space-x-3 bg-white p-2 rounded-xl shadow-sm border border-gray-50">
                  <div className="w-10 h-10 bg-lfc-gold/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-lfc-gold font-bold">500</span>
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-bold text-lfc-charcoal">Bonus Points</p>
                    <p className="text-[10px] text-gray-500">To start your journey</p>
                  </div>
                  <Check size={16} className="text-lfc-green" />
                </div>
                
                <div className="flex items-center space-x-3 bg-white p-2 rounded-xl shadow-sm border border-gray-50">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <Shield size={18} className="text-blue-500" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-bold text-lfc-charcoal">Kop Starter Tier</p>
                    <p className="text-[10px] text-gray-500">Membership activated</p>
                  </div>
                  <Check size={16} className="text-lfc-green" />
                </div>
              </div>
              
              <button 
                onClick={handleClaimGift}
                className="w-full bg-lfc-charcoal text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-black transition-all btn-press"
              >
                Claim & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}