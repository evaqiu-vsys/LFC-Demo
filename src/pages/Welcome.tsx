import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Award } from 'lucide-react';

import logoImg from '../assets/lfc-logo.png';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-lfc-red relative overflow-hidden flex flex-col">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
        
        {/* Animated circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-lfc-gold/10 rounded-full blur-3xl animate-float delay-300"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-float delay-500"></div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo Section */}
        <div className="flex flex-col items-center animate-fade-in-up">
          <div className="relative mb-6">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150"></div>
            <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-2xl relative z-10 p-2 mx-auto">
              <img 
                src={logoImg} 
                alt="LFC Travel Loyalty Logo" 
                className="w-full h-full object-contain relative z-10"
              />
            </div>
          </div>
          
          <h1 className="text-4xl font-extrabold text-white text-center tracking-tight mb-2 drop-shadow-lg">
            LFC Travel
          </h1>
          <div className="flex items-center space-x-2 mb-3">
            <span className="h-px w-8 bg-lfc-gold/60"></span>
            <p className="text-lfc-gold font-semibold tracking-[0.3em] uppercase text-xs text-center">
              Loyalty
            </p>
            <span className="h-px w-8 bg-lfc-gold/60"></span>
          </div>
          <p className="text-white/70 text-center text-sm max-w-xs">
            Join the world's most passionate football community
          </p>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 mb-8 animate-fade-in-up delay-200">
          <FeaturePill icon={<Shield size={14} />} text="Secure Wallet" />
          <FeaturePill icon={<Zap size={14} />} text="Instant Rewards" />
          <FeaturePill icon={<Award size={14} />} text="Exclusive Access" />
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-3 animate-fade-in-up delay-300">
          <button 
            onClick={() => navigate('/auth', { state: { isRegister: false } })}
            className="group w-full bg-white text-lfc-red font-bold py-4 px-6 rounded-2xl shadow-elevated btn-press hover:shadow-gold transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>Sign In</span>
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
          
          <button 
            onClick={() => navigate('/auth', { state: { isRegister: true } })}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold py-4 px-6 rounded-2xl hover:bg-white/20 transition-all duration-300 btn-press"
          >
            Create Account
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-auto pt-8 text-center animate-fade-in-up delay-400">
          <p className="text-white/40 text-xs">
            Trusted by 100M+ fans worldwide
          </p>
        </div>
      </div>
    </div>
  );
}

function FeaturePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
      <span className="text-lfc-gold">{icon}</span>
      <span className="text-white/90 text-xs font-medium">{text}</span>
    </div>
  );
}