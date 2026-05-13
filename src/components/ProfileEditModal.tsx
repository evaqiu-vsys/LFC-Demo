import { useState, useRef } from 'react';
import { X, Camera, Gift } from 'lucide-react';
import avatarImg from '../assets/avatar.png';

export default function ProfileEditModal({ 
  isOpen, 
  onClose,
  onProfileComplete
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onProfileComplete: () => void;
}) {
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onProfileComplete();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="bg-white w-full sm:w-[400px] rounded-t-3xl sm:rounded-3xl relative z-10 animate-slide-in-bottom sm:animate-fade-in-up flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-lfc-charcoal">Edit Profile</h2>
          <button 
            onClick={onClose}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {/* Promo Banner */}
          <div className="mb-6 bg-gradient-to-r from-lfc-gold/20 to-yellow-500/20 border border-lfc-gold/30 rounded-xl p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-lfc-gold to-yellow-500 rounded-full flex items-center justify-center text-lfc-charcoal shrink-0 shadow-md">
              <Gift size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-lfc-charcoal">Complete Profile Reward</p>
              <p className="text-[10px] text-gray-600">Fill in all details to earn <span className="font-bold text-lfc-red">500 LFCP</span>!</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-lfc-charcoal text-white rounded-full flex items-center justify-center shadow-lg hover:bg-black transition-colors"
                >
                  <Camera size={14} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
              <span className="text-xs font-bold text-gray-500 mt-3">Change Avatar</span>
            </div>

            {/* Form Fields */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Country/Region</label>
              <select 
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lfc-red/50 focus:border-lfc-red transition-all appearance-none"
                required
              >
                <option value="" disabled>Select your country</option>
                <option value="Thailand">Thailand</option>
                <option value="Japan">Japan</option>
                <option value="Hong Kong">Hong Kong</option>
                <option value="China">China</option>
                <option value="Australia">Australia</option>
                <option value="UK">UK</option>
                <option value="UAE">UAE</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Korea">Korea</option>
                <option value="Singapore">Singapore</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Gender</label>
              <div className="flex space-x-3">
                {['Male', 'Female', 'Other'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border ${
                      gender === g 
                        ? 'bg-lfc-charcoal text-white border-lfc-charcoal shadow-md' 
                        : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Birthday</label>
              <input 
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-lfc-red/50 focus:border-lfc-red transition-all"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !country || !gender || !birthday}
                className="w-full bg-lfc-red text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-red-700 transition-colors btn-press disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <span>Save Profile</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}