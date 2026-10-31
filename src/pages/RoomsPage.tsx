import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Plus, 
  Building2, 
  Calendar,
  X,
  Check,
  RotateCcw
} from 'lucide-react';
import { Room, RoomCategory } from '../types';
import { RoomCard } from '../components/RoomCard';
import { useAuth } from '../context/AuthContext';

interface RoomsPageProps {
  rooms: Room[];
  onBookRoom: (room: Room) => void;
  onAddRoom: () => void;
  onEditRoom: (room: Room) => void;
  onDeleteRoom: (roomId: string) => void;
  initialFilters?: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    category?: string;
  };
}

const CATEGORIES: ('All' | RoomCategory)[] = [
  'All',
  'Standard',
  'Deluxe',
  'Executive Suite',
  'Presidential Suite',
  'Ocean Villa'
];

export const RoomsPage: React.FC<RoomsPageProps> = ({
  rooms,
  onBookRoom,
  onAddRoom,
  onEditRoom,
  onDeleteRoom,
  initialFilters
}) => {
  const { isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilters?.category || 'All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [minCapacity, setMinCapacity] = useState<number>(initialFilters?.guests || 1);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');

  // Filtered and sorted rooms
  const filteredRooms = useMemo(() => {
    return rooms
      .filter((room) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = room.title.toLowerCase().includes(q);
          const matchNumber = room.roomNumber.toLowerCase().includes(q);
          const matchDesc = room.description.toLowerCase().includes(q);
          const matchAmenity = room.amenities.some(a => a.toLowerCase().includes(q));
          if (!matchTitle && !matchNumber && !matchDesc && !matchAmenity) return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && room.category !== selectedCategory) {
          return false;
        }

        // Status filter
        if (selectedStatus !== 'All' && room.status !== selectedStatus) {
          return false;
        }

        // Price filter
        if (room.pricePerNight > maxPrice) {
          return false;
        }

        // Capacity filter
        if (room.capacity < minCapacity) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
        if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [rooms, searchQuery, selectedCategory, selectedStatus, maxPrice, minCapacity, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setMaxPrice(1000);
    setMinCapacity(1);
    setSortBy('recommended');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-amber-700 font-semibold text-xs uppercase tracking-widest">
              Accommodations Portfolio
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
              Explore Luxury Rooms & Suites
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Showing {filteredRooms.length} of {rooms.length} handcrafted hotel rooms
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={onAddRoom}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 self-start sm:self-auto border border-amber-500/30"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Add New Hotel Room</span>
            </button>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 mb-8 space-y-4">
          
          {/* Top Row: Search & Category Chips */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by room name, number (#102), or amenity..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Buttons (Functional Tabs) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-amber-400 shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Controls: Price Slider, Status, Capacity, Sort */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            
            {/* Price Slider */}
            <div>
              <div className="flex items-center justify-between mb-1 text-slate-700 font-semibold">
                <span>Max Price / Night</span>
                <span className="text-amber-700 font-bold">${maxPrice}</span>
              </div>
              <input
                type="range"
                min={150}
                max={1000}
                step={25}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>

            {/* Minimum Guests Capacity */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Guest Capacity</label>
              <select
                value={minCapacity}
                onChange={(e) => setMinCapacity(Number(e.target.value))}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-700"
              >
                <option value={1}>1+ Guests (Any)</option>
                <option value={2}>2+ Guests</option>
                <option value={3}>3+ Guests</option>
                <option value={4}>4+ Guests</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Room Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-700"
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available Now</option>
                <option value="Occupied">Currently Occupied</option>
                <option value="Cleaning">In Housekeeping</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="block text-slate-700 font-semibold mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-700 font-medium"
                >
                  <option value="recommended">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Guest Rating</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleResetFilters}
                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600"
                title="Reset Filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Room Results Grid */}
        {filteredRooms.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-slate-800">
              No matching accommodations found
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your price range or clearing the category and search filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onBook={onBookRoom}
                onEdit={onEditRoom}
                onDelete={onDeleteRoom}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
