import React, { useState } from 'react';
import { 
  Building2, 
  CalendarCheck, 
  ShieldCheck, 
  UserCircle, 
  LogOut, 
  Menu, 
  X, 
  RotateCcw,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../services/storage';

interface NavbarProps {
  activeTab: 'home' | 'rooms' | 'facilities' | 'about' | 'guest-dashboard' | 'admin-dashboard';
  setActiveTab: (tab: any) => void;
  openAuthModal: (mode: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openAuthModal }) => {
  const { user, isAdmin, logout, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleRoleToggle = () => {
    if (isAdmin) {
      switchRole('guest');
      setActiveTab('guest-dashboard');
    } else {
      switchRole('admin');
      setActiveTab('admin-dashboard');
    }
    setProfileDropdownOpen(false);
  };

  const handleNavClick = (tab: any) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  HotelPro
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-400 border border-amber-400/40 px-1.5 py-0.5 rounded">
                  Resort & Suites
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block tracking-wide">
                Luxury Hospitality Operations
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'home'
                  ? 'text-amber-400 bg-slate-800/80 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('rooms')}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'rooms'
                  ? 'text-amber-400 bg-slate-800/80 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Explore Rooms
            </button>
            <button
              onClick={() => handleNavClick('facilities')}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'facilities'
                  ? 'text-amber-400 bg-slate-800/80 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Facilities
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'about'
                  ? 'text-amber-400 bg-slate-800/80 shadow-inner'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              About & Contact
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Demo Persona Switcher */}
            <div className="flex items-center bg-slate-800/90 rounded-lg p-1 border border-slate-700/80">
              <button
                onClick={() => {
                  switchRole('guest');
                  setActiveTab('guest-dashboard');
                }}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                  !isAdmin 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to Guest Experience"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                Guest Mode
              </button>
              <button
                onClick={() => {
                  switchRole('admin');
                  setActiveTab('admin-dashboard');
                }}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                  isAdmin 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to Hotel Admin Dashboard"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Mode
              </button>
            </div>

            {/* User Account / Navigation Button */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700 rounded-xl text-left transition-colors"
                >
                  <div className="hidden lg:block text-right">
                    <p className="text-xs font-semibold text-slate-100 max-w-[130px] truncate">{user.name}</p>
                    <p className="text-[10px] text-amber-400 uppercase tracking-wider font-medium">{user.role}</p>
                  </div>
                  {user.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-amber-500/40" 
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                  )}
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 text-slate-200 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-slate-800">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[11px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {user.role} privilege
                      </span>
                    </div>

                    <div className="py-1">
                      {isAdmin ? (
                        <button
                          onClick={() => {
                            setActiveTab('admin-dashboard');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-800/80 flex items-center gap-2.5"
                        >
                          <ShieldCheck className="w-4 h-4 text-amber-400" />
                          Hotel Admin Operations
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setActiveTab('guest-dashboard');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-800/80 flex items-center gap-2.5"
                        >
                          <CalendarCheck className="w-4 h-4 text-amber-400" />
                          My Reservations & Invoices
                        </button>
                      )}

                      <button
                        onClick={handleRoleToggle}
                        className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-800/80 flex items-center gap-2.5"
                      >
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        Switch to {isAdmin ? 'Guest View' : 'Admin View'}
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('Reset HotelPro database to clean sample rooms and bookings?')) {
                            StorageService.resetToDefaults();
                          }
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-slate-400 hover:bg-slate-800/80 flex items-center gap-2.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                        Reset Demo Data
                      </button>
                    </div>

                    <div className="border-t border-slate-800 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2.5"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-4 py-2 text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg shadow-md transition-all font-sans"
                >
                  Join HotelPro
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => {
                switchRole(isAdmin ? 'guest' : 'admin');
                setActiveTab(isAdmin ? 'guest-dashboard' : 'admin-dashboard');
              }}
              className="text-xs bg-slate-800 border border-slate-700 px-2 py-1 rounded text-amber-400 font-semibold"
            >
              {isAdmin ? 'Admin' : 'Guest'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'home' ? 'text-amber-400 bg-slate-800' : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('rooms')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'rooms' ? 'text-amber-400 bg-slate-800' : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              Explore Rooms
            </button>
            <button
              onClick={() => handleNavClick('facilities')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'facilities' ? 'text-amber-400 bg-slate-800' : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              Facilities
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                activeTab === 'about' ? 'text-amber-400 bg-slate-800' : 'text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              About & Contact
            </button>
          </div>

          <div className="border-t border-slate-800 pt-3">
            <p className="text-xs uppercase text-slate-500 font-semibold mb-2">Workspace & Roles</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => {
                  switchRole('guest');
                  handleNavClick('guest-dashboard');
                }}
                className={`py-2 px-3 text-xs font-semibold rounded-lg text-center ${
                  !isAdmin ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 border border-slate-800 text-slate-300'
                }`}
              >
                Guest Portal
              </button>
              <button
                onClick={() => {
                  switchRole('admin');
                  handleNavClick('admin-dashboard');
                }}
                className={`py-2 px-3 text-xs font-semibold rounded-lg text-center ${
                  isAdmin ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 border border-slate-800 text-slate-300'
                }`}
              >
                Admin Suite
              </button>
            </div>

            {user ? (
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-xs font-medium text-white">{user.name}</p>
                  <p className="text-[11px] text-slate-400">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-400 hover:text-red-300 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    openAuthModal('login');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 bg-slate-800 text-slate-200 text-xs rounded-lg font-medium text-center"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    openAuthModal('register');
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 bg-amber-500 text-slate-950 text-xs rounded-lg font-bold text-center"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
