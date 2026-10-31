import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Building2,
  ChevronRight
} from 'lucide-react';
import { RoomCategory } from '../types';

interface HomeHeroProps {
  onSearch: (params: { checkIn: string; checkOut: string; guests: number; category: string }) => void;
  onExploreRooms: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onSearch, onExploreRooms }) => {
  const getTomorrow = (addDays = 1) => {
    const d = new Date();
    d.setDate(d.getDate() + addDays);
    return d.toISOString().split('T')[0];
  };

  const [checkIn, setCheckIn] = useState(getTomorrow(1));
  const [checkOut, setCheckOut] = useState(getTomorrow(4));
  const [guests, setGuests] = useState(2);
  const [category, setCategory] = useState<string>('All');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ checkIn, checkOut, guests, category });
  };

  return (
    <section className="relative min-h-[620px] lg:min-h-[700px] flex items-center justify-center bg-slate-950 text-white overflow-hidden">
      
      {/* Background Hero Image with Deep Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          alt="HotelPro Grand Resort"
          className="w-full h-full object-cover object-center scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/60" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/40 to-slate-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>A World-Class Hospitality Experience</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl leading-tight">
          Where Timeless Luxury Meets Modern Hospitality
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
          Welcome to <strong className="text-amber-400 font-semibold">HotelPro Resort & Suites</strong>. Unwind in meticulously curated coastal suites, Michelin-caliber dining, and seamless 24/7 personalized concierge orchestration.
        </p>

        {/* Quick Search & Reservation Floating Panel */}
        <div className="mt-10 w-full max-w-5xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl p-4 sm:p-6 text-left">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            
            {/* Check-In */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Check-In Date
              </label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-colors"
                required
              />
            </div>

            {/* Check-Out */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Check-Out Date
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-colors"
                required
              />
            </div>

            {/* Guests */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-colors"
              >
                <option value={1} className="bg-slate-900">1 Guest (Solo)</option>
                <option value={2} className="bg-slate-900">2 Guests (Couple)</option>
                <option value={3} className="bg-slate-900">3 Guests (Suite)</option>
                <option value={4} className="bg-slate-900">4+ Guests (Family)</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                Room Tier
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-slate-800/90 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-colors"
              >
                <option value="All" className="bg-slate-900">All Accommodations</option>
                <option value="Deluxe" className="bg-slate-900">Deluxe Suites</option>
                <option value="Executive Suite" className="bg-slate-900">Executive Suites</option>
                <option value="Presidential Suite" className="bg-slate-900">Presidential Suite</option>
                <option value="Ocean Villa" className="bg-slate-900">Ocean Villa</option>
                <option value="Standard" className="bg-slate-900">Standard Rooms</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Search className="w-4 h-4 text-slate-950" />
                <span>Search Rooms</span>
              </button>
            </div>
          </form>
        </div>

        {/* Value Highlights */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300 font-medium">
          <div className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Forbes 5-Star Standard</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Best Rate Guarantee</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Complimentary High-speed Wi-Fi</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Flexible Free Cancellation</span>
          </div>
        </div>

      </div>
    </section>
  );
};
