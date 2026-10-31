import React from 'react';
import { 
  Waves, 
  Sparkles, 
  UtensilsCrossed, 
  Dumbbell, 
  Briefcase, 
  ConciergeBell,
  Clock,
  ArrowRight
} from 'lucide-react';
import { HOTEL_FACILITIES } from '../services/storage';

interface FacilitiesSectionProps {
  onExploreRooms: () => void;
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ onExploreRooms }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves':
        return <Waves className="w-5 h-5 text-amber-500" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-amber-500" />;
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5 text-amber-500" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-amber-500" />;
      case 'ConciergeBell':
        return <ConciergeBell className="w-5 h-5 text-amber-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-400 font-semibold text-xs uppercase tracking-widest">
            Unrivaled Resort Amenities
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-white">
            Curated Experiences & Rejuvenation
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Every amenity at HotelPro has been engineered to elevate your leisure and productivity to unprecedented heights of comfort and serenity.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOTEL_FACILITIES.map((facility) => (
            <div
              key={facility.id}
              className="group bg-slate-800/80 rounded-2xl border border-slate-700/80 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700/60 text-xs text-amber-400 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{facility.hours}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                    {getIcon(facility.icon)}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {facility.name}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-amber-400 font-semibold">
                  <span>Available to all registered guests</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action card */}
        <div className="mt-16 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-2xl p-8 sm:p-10 text-slate-950 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-amber-500/10">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Ready to experience bespoke luxury?
            </h3>
            <p className="text-slate-900/80 text-sm mt-1 max-w-xl">
              Lock in your preferred suite with immediate confirmation and zero prepayment risk.
            </p>
          </div>
          <button
            onClick={onExploreRooms}
            className="px-6 py-3 bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-95 shrink-0"
          >
            Explore Accommodations
          </button>
        </div>

      </div>
    </section>
  );
};
