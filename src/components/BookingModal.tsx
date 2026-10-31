import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  ShieldCheck, 
  CreditCard, 
  AlertCircle,
  Clock,
  Plus
} from 'lucide-react';
import { Room, BookingAddOn } from '../types';
import { StorageService, AVAILABLE_ADDONS } from '../services/storage';
import { useAuth } from '../context/AuthContext';

interface BookingModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedToPayment: (bookingDraft: any) => void;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  room,
  isOpen,
  onClose,
  onProceedToPayment,
  initialCheckIn,
  initialCheckOut,
  initialGuests
}) => {
  const { user } = useAuth();

  // Tomorrow as default checkIn, 3 days after as checkOut
  const getTomorrow = (addDays = 1) => {
    const d = new Date();
    d.setDate(d.getDate() + addDays);
    return d.toISOString().split('T')[0];
  };

  const [checkInDate, setCheckInDate] = useState(initialCheckIn || getTomorrow(1));
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOut || getTomorrow(3));
  const [guestsCount, setGuestsCount] = useState(initialGuests || 2);
  const [guestName, setGuestName] = useState(user?.name || '');
  const [guestEmail, setGuestEmail] = useState(user?.email || '');
  const [guestPhone, setGuestPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [specialRequests, setSpecialRequests] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['addon-breakfast']);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);

  // Sync when room changes or modal opens
  useEffect(() => {
    if (user) {
      if (!guestName) setGuestName(user.name);
      if (!guestEmail) setGuestEmail(user.email);
      if (!guestPhone && user.phone) setGuestPhone(user.phone);
    }
  }, [user, isOpen]);

  // Calculate nights
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const diffTime = checkOut.getTime() - checkIn.getTime();
  const calculatedNights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const isValidDateRange = !isNaN(diffTime) && diffTime > 0;

  // Real-time availability check
  useEffect(() => {
    if (!room || !isValidDateRange) {
      setAvailabilityError('Please select valid check-in and check-out dates.');
      return;
    }

    const check = StorageService.checkRoomAvailability(room.id, checkInDate, checkOutDate);
    if (!check.available) {
      setAvailabilityError(check.conflictReason || 'This room is unavailable for the selected dates.');
    } else {
      setAvailabilityError(null);
    }
  }, [room, checkInDate, checkOutDate, isValidDateRange]);

  if (!isOpen || !room) return null;

  // Cost Computations
  const baseAmount = room.pricePerNight * calculatedNights;
  const taxRate = 0.12; // 12% luxury tax
  const taxAmount = Number((baseAmount * taxRate).toFixed(2));
  const serviceFee = 35; // standard hotel service charge
  
  const addOnsCost = selectedAddons.reduce((sum, id) => {
    const addon = AVAILABLE_ADDONS.find(a => a.id === id);
    return sum + (addon ? addon.price * calculatedNights : 0);
  }, 0);

  const totalAmount = Number((baseAmount + taxAmount + serviceFee + addOnsCost).toFixed(2));

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidDateRange) {
      alert('Check-out date must be after check-in date.');
      return;
    }

    if (availabilityError) {
      alert(`Room unavailable: ${availabilityError}`);
      return;
    }

    if (!guestName || !guestEmail || !guestPhone) {
      alert('Please fill in all guest contact information.');
      return;
    }

    const bookingDraft = {
      userId: user?.id || `usr-${Date.now()}`,
      guestName,
      guestEmail,
      guestPhone,
      roomId: room.id,
      roomNumber: room.roomNumber,
      roomTitle: room.title,
      roomCategory: room.category,
      checkInDate,
      checkOutDate,
      nights: calculatedNights,
      guestsCount,
      baseAmount,
      taxAmount,
      serviceFee,
      addOnsAmount: addOnsCost,
      totalAmount,
      status: 'Confirmed' as const,
      paymentStatus: 'Pending' as const,
      specialRequests: specialRequests.trim() || undefined
    };

    onProceedToPayment(bookingDraft);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              Reservation Desk · {room.category}
            </span>
            <h2 className="font-serif text-xl font-bold text-white">
              Reserve Room {room.roomNumber} - {room.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* Availability Alert if any */}
          {availabilityError && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-rose-800 text-xs">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Room Dates Unavailable</p>
                <p className="mt-0.5">{availabilityError}</p>
                <p className="mt-1 text-slate-600">Please choose alternative dates or explore another suite category.</p>
              </div>
            </div>
          )}

          {/* Dates & Guests Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                Check-in Date
              </label>
              <input
                type="date"
                value={checkInDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                Check-out Date
              </label>
              <input
                type="date"
                value={checkOutDate}
                min={checkInDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-600" />
                Guests (Max {room.capacity})
              </label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
              >
                {Array.from({ length: room.capacity }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Adult' : 'Adults'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Nights Banner */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-amber-900 font-medium">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>
                Length of Stay: <strong className="font-bold">{calculatedNights} {calculatedNights === 1 ? 'Night' : 'Nights'}</strong> ({checkInDate} to {checkOutDate})
              </span>
            </div>
            <span className="text-amber-800 font-bold">${room.pricePerNight} / night</span>
          </div>

          {/* Guest Information */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Guest Contact Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Email for Confirmation *</label>
                <input
                  type="email"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="eleanor@example.com"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Add-on Experiences */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Enhance Your Stay (Optional Packages)
              </h3>
              <span className="text-[11px] text-slate-500">Billed per night</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AVAILABLE_ADDONS.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'border-amber-500 bg-amber-50/50 shadow-sm' 
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center text-xs transition-colors ${
                        isSelected ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <Plus className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-medium text-slate-800">{addon.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900">+${addon.price}/nt</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs text-slate-600 mb-1">
              Special Requests or Dietary Preferences (Optional)
            </label>
            <input
              type="text"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="e.g. Quiet high floor, anniversary surprise, gluten-free breakfast"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {/* Price Breakdown Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>{room.title} (${room.pricePerNight} × {calculatedNights} nights)</span>
              <span>${baseAmount.toFixed(2)}</span>
            </div>
            {addOnsCost > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Selected stay add-ons</span>
                <span>${addOnsCost.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Resort service charge</span>
              <span>${serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Estimated state & luxury taxes (12%)</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900">
              <span>Total Booking Amount</span>
              <span className="text-lg font-serif text-amber-700">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!!availabilityError}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-sm rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Proceed to Secure Checkout
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
