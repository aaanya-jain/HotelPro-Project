import React, { useState } from 'react';
import { 
  Users, 
  Maximize2, 
  Bed, 
  Star, 
  Check, 
  Calendar, 
  Edit, 
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Room } from '../types';
import { useAuth } from '../context/AuthContext';

interface RoomCardProps {
  room: Room;
  onBook: (room: Room) => void;
  onEdit?: (room: Room) => void;
  onDelete?: (roomId: string) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onBook, onEdit, onDelete }) => {
  const { isAdmin } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (room.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (room.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
    }
  };

  const getStatusColor = (status: Room['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Occupied':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Cleaning':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Maintenance':
        return 'bg-slate-100 text-slate-700 border-slate-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Image Gallery Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={room.images[currentImageIndex] || room.images[0]}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Status and Room Number Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
            Room {room.roomNumber}
          </span>
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-md border shadow-sm ${getStatusColor(room.status)}`}>
            {room.status}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm flex items-center gap-1 text-xs font-bold text-slate-800">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span>{room.rating.toFixed(1)}</span>
          <span className="text-[10px] text-slate-400 font-normal">({room.reviewCount})</span>
        </div>

        {/* Image Carousel Controls */}
        {room.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-slate-950/40 backdrop-blur-sm px-2 py-1 rounded-full">
              {room.images.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === currentImageIndex ? 'bg-amber-400 w-3' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Room Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-amber-700 font-semibold uppercase tracking-wider mb-1.5">
            <span>{room.category}</span>
            <span className="text-slate-400 font-normal">Floor {room.floor}</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-amber-700 transition-colors">
            {room.title}
          </h3>

          <p className="text-slate-600 text-xs line-clamp-2 mb-4 leading-relaxed">
            {room.description}
          </p>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-slate-600 text-xs mb-4">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>Up to {room.capacity} guests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">{room.bedType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{room.sizeSqFt} sq.ft</span>
            </div>
          </div>

          {/* Amenities tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {room.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-md"
              >
                <Check className="w-3 h-3 text-amber-600" />
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-[11px] text-slate-400 px-1 py-0.5 self-center">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold font-serif text-slate-900">
                ${room.pricePerNight}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ night</span>
            </div>
            <span className="text-[10px] text-slate-400 block">+ taxes & fees</span>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEdit?.(room)}
                  className="p-2 text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors border border-slate-200"
                  title="Edit Room"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete?.(room.id)}
                  className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200"
                  title="Delete Room"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onBook(room)}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Book
                </button>
              </div>
            ) : (
              <button
                onClick={() => onBook(room)}
                className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                Reserve Room
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
