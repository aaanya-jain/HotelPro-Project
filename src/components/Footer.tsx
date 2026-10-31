import React from 'react';
import { Building2, Phone, Mail, MapPin, Award, Shield, RotateCcw } from 'lucide-react';
import { StorageService } from '../services/storage';

interface FooterProps {
  onNavigate: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
                <Building2 className="w-5 h-5 text-slate-950" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                HotelPro
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              An intelligent, full-stack hospitality management suite delivering effortless room reservations, guest profile orchestration, live availability synchronization, and transparent financial records.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-amber-400">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Forbes 5-Star Certified</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-400">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>PCI-DSS Sandbox Ready</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-white font-semibold text-base mb-4 tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">
                  Welcome & Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rooms')} className="hover:text-amber-400 transition-colors">
                  Explore Accommodations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('facilities')} className="hover:text-amber-400 transition-colors">
                  Resort Amenities & Spa
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">
                  Our Legacy & Story
                </button>
              </li>
            </ul>
          </div>

          {/* Guest & Admin Suites */}
          <div>
            <h4 className="font-serif text-white font-semibold text-base mb-4 tracking-wide">
              Portals
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('guest-dashboard')} className="hover:text-amber-400 transition-colors">
                  Guest Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin-dashboard')} className="hover:text-amber-400 transition-colors">
                  Hotel Admin Console
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    if (confirm('Reset HotelPro database to clean sample rooms, guests, and bookings?')) {
                      StorageService.resetToDefaults();
                    }
                  }}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-xs text-amber-500/90 font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Sample Data
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Contact */}
          <div>
            <h4 className="font-serif text-white font-semibold text-base mb-4 tracking-wide">
              Concierge Desk
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>742 Ocean Blvd, Seaside Haven, FL 33139</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+1 (800) 555-HOTEL (4683)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>reservations@hotelpro.luxury</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} HotelPro Hospitality Management System. Built with React, Tailwind & Express/Firestore Architecture.</p>
          <div className="flex items-center gap-6">
            <span>Terms of Hospitality</span>
            <span>Privacy Policy</span>
            <span>Security Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
