import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, MapPin, Award, Calendar, DollarSign, Edit, Save } from 'lucide-react';
import { GuestProfile, Booking } from '../types';
import { StorageService } from '../services/storage';

interface GuestModalProps {
  guest: GuestProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedGuest: GuestProfile) => void;
  onViewInvoice?: (booking: Booking) => void;
}

export const GuestModal: React.FC<GuestModalProps> = ({
  guest,
  isOpen,
  onClose,
  onUpdate,
  onViewInvoice
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [idProofType, setIdProofType] = useState('Passport');
  const [idProofNumber, setIdProofNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [vipStatus, setVipStatus] = useState(false);
  const [notes, setNotes] = useState('');

  const [guestBookings, setGuestBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (guest) {
      setFullName(guest.fullName);
      setEmail(guest.email);
      setPhone(guest.phone);
      setIdProofType(guest.idProofType || 'Passport');
      setIdProofNumber(guest.idProofNumber || '');
      setAddress(guest.address || '');
      setCity(guest.city || '');
      setCountry(guest.country || '');
      setVipStatus(guest.vipStatus || false);
      setNotes(guest.notes || '');

      // Load bookings for this guest
      const allBookings = StorageService.getBookings();
      const matched = allBookings.filter(
        b => b.guestEmail.toLowerCase() === guest.email.toLowerCase() || b.userId === guest.id
      );
      setGuestBookings(matched);
      setIsEditing(false);
    }
  }, [guest, isOpen]);

  if (!isOpen || !guest) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: GuestProfile = {
      ...guest,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      idProofType,
      idProofNumber: idProofNumber.trim(),
      address: address.trim(),
      city: city.trim(),
      country: country.trim(),
      vipStatus,
      notes: notes.trim()
    };
    onUpdate(updated);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg font-bold text-white">
                  {guest.fullName}
                </h2>
                {guest.vipStatus && (
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30 uppercase tracking-wider flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-400" />
                    VIP Guest
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">Guest Dossier #{guest.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6 text-xs">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <p className="text-slate-500 text-[11px]">Total Stays</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{guest.totalBookings} Visits</p>
            </div>
            <div>
              <p className="text-slate-500 text-[11px]">Total Hospitality Spend</p>
              <p className="text-lg font-serif font-bold text-amber-700 mt-0.5">
                ${guest.totalSpent.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-[11px]">Member Since</p>
              <p className="text-slate-900 font-semibold mt-0.5">
                {new Date(guest.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Guest Form / View Details */}
          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ID Proof Type</label>
                  <select
                    value={idProofType}
                    onChange={(e) => setIdProofType(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Passport">Passport</option>
                    <option value="Driving License">Driving License</option>
                    <option value="National ID">National ID</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ID Number</label>
                  <input
                    type="text"
                    value={idProofNumber}
                    onChange={(e) => setIdProofNumber(e.target.value)}
                    placeholder="e.g. US-981249"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City & Country</label>
                  <input
                    type="text"
                    value={city ? `${city}, ${country}` : country}
                    onChange={(e) => {
                      const parts = e.target.value.split(',');
                      setCity(parts[0]?.trim() || '');
                      setCountry(parts[1]?.trim() || '');
                    }}
                    placeholder="New York, USA"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={vipStatus}
                    onChange={(e) => setVipStatus(e.target.checked)}
                    className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                  />
                  <span className="font-semibold text-slate-800">VIP Tier Status (Elevated Concierge Attention)</span>
                </label>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Internal Concierge Notes & Preferences</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Preferences, allergies, floor preferences..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-medium text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold uppercase tracking-wider text-slate-700 text-[11px]">
                  Guest Information Record
                </h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1"
                >
                  <Edit className="w-3 h-3" />
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{guest.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{guest.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{guest.address || 'Address on file'}, {guest.city} {guest.country}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <p className="text-[11px] text-slate-500 font-semibold mb-1">Official ID Verification</p>
                  <p className="font-mono text-slate-800 font-bold">
                    {guest.idProofType}: {guest.idProofNumber || 'Verified in person'}
                  </p>
                  {guest.notes && (
                    <div className="mt-2 pt-2 border-t border-slate-200">
                      <p className="text-[10px] text-slate-500 font-semibold uppercase">Concierge Notes</p>
                      <p className="text-slate-700 text-xs mt-0.5 italic">"{guest.notes}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Past Stays / Bookings List */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold uppercase tracking-wider text-slate-700 text-[11px]">
              Guest Booking History ({guestBookings.length})
            </h3>

            {guestBookings.length === 0 ? (
              <p className="text-slate-400 py-3 text-center bg-slate-50 rounded-xl">
                No past reservations found under this guest.
              </p>
            ) : (
              <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
                {guestBookings.map((b) => (
                  <div key={b.id} className="p-3 hover:bg-slate-50 flex items-center justify-between transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">{b.id}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          b.status === 'Checked In' 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : b.status === 'Confirmed'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <p className="text-slate-600 text-xs mt-0.5">
                        Room {b.roomNumber} ({b.roomTitle}) · {b.checkInDate} to {b.checkOutDate} ({b.nights} nights)
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-serif font-bold text-slate-900 text-sm">
                        ${b.totalAmount.toFixed(2)}
                      </span>
                      {onViewInvoice && (
                        <button
                          onClick={() => onViewInvoice(b)}
                          className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
                        >
                          Invoice
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
