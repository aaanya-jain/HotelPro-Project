import React, { useState, useEffect } from 'react';
import { X, Building2, Image, Check, Plus, AlertCircle } from 'lucide-react';
import { Room, RoomCategory, RoomStatus } from '../types';

interface RoomFormModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (roomData: Omit<Room, 'id'> & { id?: string }) => void;
}

const CATEGORIES: RoomCategory[] = [
  'Standard',
  'Deluxe',
  'Executive Suite',
  'Presidential Suite',
  'Ocean Villa'
];

const STATUSES: RoomStatus[] = [
  'Available',
  'Occupied',
  'Cleaning',
  'Maintenance'
];

const STANDARD_AMENITIES = [
  'High-speed Wi-Fi',
  'Smart TV 55"',
  'Espresso Machine',
  'Mini Bar',
  'Marble Bath',
  'Private Balcony',
  'Climate Control',
  'Ocean View',
  'Soaking Tub',
  'Butler Service',
  'Private Plunge Pool',
  'Safe Box',
  'Turn-down Service'
];

export const RoomFormModal: React.FC<RoomFormModalProps> = ({ room, isOpen, onClose, onSave }) => {
  const [roomNumber, setRoomNumber] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<RoomCategory>('Deluxe');
  const [pricePerNight, setPricePerNight] = useState<number>(250);
  const [capacity, setCapacity] = useState<number>(2);
  const [bedType, setBedType] = useState('1 King Bed');
  const [floor, setFloor] = useState<number>(1);
  const [sizeSqFt, setSizeSqFt] = useState<number>(450);
  const [description, setDescription] = useState('');
  const [imagesText, setImagesText] = useState('');
  const [status, setStatus] = useState<RoomStatus>('Available');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState('');

  useEffect(() => {
    if (room) {
      setRoomNumber(room.roomNumber);
      setTitle(room.title);
      setCategory(room.category);
      setPricePerNight(room.pricePerNight);
      setCapacity(room.capacity);
      setBedType(room.bedType);
      setFloor(room.floor);
      setSizeSqFt(room.sizeSqFt);
      setDescription(room.description);
      setImagesText(room.images.join('\n'));
      setStatus(room.status);
      setSelectedAmenities(room.amenities || []);
    } else {
      // Default new room
      setRoomNumber(`${Math.floor(100 + Math.random() * 899)}`);
      setTitle('New Luxury Suite');
      setCategory('Deluxe');
      setPricePerNight(280);
      setCapacity(2);
      setBedType('1 King Bed');
      setFloor(2);
      setSizeSqFt(480);
      setDescription('Exquisite accommodation with designer furnishings and tranquil views.');
      setImagesText(
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80\nhttps://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
      );
      setStatus('Available');
      setSelectedAmenities(['High-speed Wi-Fi', 'Smart TV 55"', 'Espresso Machine', 'Mini Bar', 'Marble Bath']);
    }
  }, [room, isOpen]);

  if (!isOpen) return null;

  const toggleAmenity = (name: string) => {
    setSelectedAmenities(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  const handleAddCustomAmenity = () => {
    if (customAmenity.trim() && !selectedAmenities.includes(customAmenity.trim())) {
      setSelectedAmenities(prev => [...prev, customAmenity.trim()]);
      setCustomAmenity('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const images = imagesText
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    if (images.length === 0) {
      images.push('https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80');
    }

    const payload = {
      ...(room ? { id: room.id } : {}),
      roomNumber: roomNumber.trim(),
      title: title.trim(),
      category,
      pricePerNight: Number(pricePerNight),
      capacity: Number(capacity),
      bedType: bedType.trim(),
      floor: Number(floor),
      sizeSqFt: Number(sizeSqFt),
      description: description.trim(),
      images,
      status,
      amenities: selectedAmenities,
      rating: room?.rating || 5.0,
      reviewCount: room?.reviewCount || 1,
      featured: room?.featured || false
    };

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif text-lg font-bold text-white">
              {room ? `Edit Room #${room.roomNumber}` : 'Add New Hotel Room'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[82vh] overflow-y-auto space-y-4 text-xs">
          
          {/* Room Number & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Room Number *</label>
              <input
                type="text"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                placeholder="e.g. 204"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Room Display Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Deluxe Garden Haven"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                required
              />
            </div>
          </div>

          {/* Category, Status, Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as RoomCategory)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Current Status *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as RoomStatus)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              >
                {STATUSES.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Price Per Night ($) *</label>
              <input
                type="number"
                min={50}
                max={10000}
                value={pricePerNight}
                onChange={(e) => setPricePerNight(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-bold"
                required
              />
            </div>
          </div>

          {/* Capacity, Bed Type, Floor, Size */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-slate-600 mb-1">Max Guests</label>
              <input
                type="number"
                min={1}
                max={10}
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Floor</label>
              <input
                type="number"
                min={1}
                max={50}
                value={floor}
                onChange={(e) => setFloor(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Size (sq. ft)</label>
              <input
                type="number"
                min={150}
                max={5000}
                value={sizeSqFt}
                onChange={(e) => setSizeSqFt(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Bed Configuration</label>
              <input
                type="text"
                value={bedType}
                onChange={(e) => setBedType(e.target.value)}
                placeholder="1 King Bed"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Room Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe view, ambiance, fixtures, bedding..."
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              required
            />
          </div>

          {/* Image URLs */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center justify-between">
              <span>Image URLs (One URL per line)</span>
              <span className="text-[11px] text-slate-400">High-resolution photography recommended</span>
            </label>
            <textarea
              rows={2}
              value={imagesText}
              onChange={(e) => setImagesText(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {/* Amenities Multi-Select */}
          <div>
            <label className="block font-semibold text-slate-700 mb-2">Amenities & Features</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {STANDARD_AMENITIES.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                      isSelected
                        ? 'bg-amber-500 border-amber-500 text-slate-950 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    {amenity}
                  </button>
                );
              })}
            </div>

            {/* Custom amenity input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customAmenity}
                onChange={(e) => setCustomAmenity(e.target.value)}
                placeholder="Add custom amenity (e.g. Telescope, Jacuzzi)"
                className="px-3 py-1.5 text-xs border border-slate-300 rounded-lg flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomAmenity();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddCustomAmenity}
                className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-medium hover:bg-slate-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all"
            >
              {room ? 'Update Room Record' : 'Save & Publish Room'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
