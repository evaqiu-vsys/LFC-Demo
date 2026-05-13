import { X, Globe, Key, FileText, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    onClose();
    navigate('/welcome');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col justify-end sm:items-center sm:justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-gray-50 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-5 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
          <h3 className="font-bold text-lg text-lfc-charcoal">Settings</h3>
          <button 
            onClick={onClose} 
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 space-y-6">
          
          {/* Preferences Group */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-2">Preferences</h4>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100 group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                    <Globe size={16} className="text-gray-500" />
                  </div>
                  <span className="font-medium text-sm text-lfc-charcoal">Language</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400 font-medium">English (US)</span>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              </button>
            </div>
          </div>

          {/* Account Group */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-2">Account Security</h4>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                    <Key size={16} className="text-gray-500" />
                  </div>
                  <span className="font-medium text-sm text-lfc-charcoal">Change Password</span>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            </div>
          </div>

          {/* About Group */}
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-2">About</h4>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <button className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                    <FileText size={16} className="text-gray-500" />
                  </div>
                  <span className="font-medium text-sm text-lfc-charcoal">Terms & Conditions</span>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-4">
            <button 
              onClick={handleLogout}
              className="w-full py-4 bg-white border border-red-100 rounded-2xl text-lfc-red font-bold text-sm shadow-sm hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center space-x-2"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}