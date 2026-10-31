import React from 'react';
import { HomeHero } from '../components/HomeHero';
import { FacilitiesSection } from '../components/FacilitiesSection';
import { AboutSection } from '../components/AboutSection';
import { RoomCard } from '../components/RoomCard';
import { Room } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HomePageProps {
  rooms: Room[];
  onBookRoom: (room: Room) => void;
  onNavigateToRooms: (filterParams?: any) => void;
  onEditRoom?: (room: Room) => void;
  onDeleteRoom?: (roomId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  rooms,
  onBookRoom,
  onNavigateToRooms,
  onEditRoom,
  onDeleteRoom
}) => {
  // Show featured rooms or top 3 suites
  const featuredRooms = rooms.filter(r => r.featured || r.category === 'Presidential Suite' || r.category === 'Ocean Villa' || r.category === 'Executive Suite').slice(0, 3);

  return (
    <div className="space-y-0">
      
      {/* 1. Hero with Quick Availability Search */}
      <HomeHero
        onSearch={(params) => {
          onNavigateToRooms(params);
        }}
        onExploreRooms={() => onNavigateToRooms()}
      />

      {/* 2. Featured Accommodations Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Signature Suites & Villas</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
                Featured Accommodations
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-xl">
                Discover bespoke rooms crafted with Italian marble finishes, acoustic soundproofing, and panoramic views.
              </p>
            </div>

            <button
              onClick={() => onNavigateToRooms()}
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 group"
            >
              <span>View All Available Rooms ({rooms.length})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onBook={onBookRoom}
                onEdit={onEditRoom}
                onDelete={onDeleteRoom}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 3. Facilities & Experiences */}
      <FacilitiesSection onExploreRooms={() => onNavigateToRooms()} />

      {/* 4. About & Direct Concierge Contact */}
      <AboutSection />

    </div>
  );
};
