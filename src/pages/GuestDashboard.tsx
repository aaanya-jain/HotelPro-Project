import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  FileText, 
  XCircle, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
  Edit, 
  Save, 
  Plus, 
  Sparkles, 
  CreditCard,
  Building2,
  AlertTriangle
} from 'lucide-react';
import { Booking } from '../types';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../services/storage';

interface GuestDashboardProps {
  bookings: Booking[];
  onViewInvoice: (booking: Booking) => void;
  onExploreRooms: () => void;
  onRefreshData: () => void;
}

export const GuestDashboard: React.FC<GuestDashboardProps> = ({
  bookings,
  onViewInvoice,
  onExploreRooms,
  onRefreshData
}) => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile'>('bookings');
  
  // Profile edit state
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [profileSaved, setProfileSaved] = useState(false);

  // Filter bookings for current logged-in guest (or show all guest bookings in demo)
  const userBookings = bookings.filter(b => 
    !user || b.guestEmail.toLowerCase() === user.email.toLowerCase() || b.userId === user.id
  );

  const handleCancelBooking = (bookingId: string) => {
    if (confirm(`Are you sure you wish to cancel reservation #${bookingId}? Full refund will be automatically routed according to hotel policy.`)) {
      const res = StorageService.cancelBooking(bookingId);
      if (res.success) {
        alert(res.message);
        onRefreshData();
      } else {
        alert(res.message);
      }
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'Confirmed':
        return <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">Confirmed</span>;
      case 'Checked In':
        return <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Checked In</span>;
      case 'Checked Out':
        return <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-300">Checked Out</span>;
      case 'Cancelled':
        return <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">Cancelled</span>;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Welcome Banner */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-400"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-bold text-2xl font-serif">
                  {user?.name?.charAt(0) || 'G'}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold">
                    Welcome, {user?.name || 'Valued Guest'}
                  </h1>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    VIP Member
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Manage your luxury suite bookings, view itemized folios, and update stay preferences.
                </p>
              </div>
            </div>

            <button
              onClick={onExploreRooms}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 self-start md:self-auto active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Make New Reservation</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'bg-slate-900 text-amber-400 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>My Reservations ({userBookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-slate-900 text-amber-400 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Personal Profile & Preferences</span>
          </button>
        </div>

        {/* Tab 1: Bookings Management */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {userBookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-slate-800">
                  No reservations yet
                </h3>
                <p className="text-xs text-slate-500">
                  Explore our luxury suites and ocean villas to book your first bespoke retreat.
                </p>
                <button
                  onClick={onExploreRooms}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md"
                >
                  Browse Available Rooms
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {userBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                          {b.id}
                        </span>
                        {getStatusBadge(b.status)}
                        <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                          {b.paymentStatus === 'Paid' ? `Paid via ${b.paymentMethod || 'Card'}` : 'Payment Pending'}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-slate-900">
                        Room {b.roomNumber} - {b.roomTitle}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          <span>Check-in: <strong className="text-slate-800">{b.checkInDate}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          <span>Check-out: <strong className="text-slate-800">{b.checkOutDate}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{b.nights} night(s) · {b.guestsCount} Guest(s)</span>
                        </div>
                      </div>

                      {b.specialRequests && (
                        <p className="text-xs text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-100 max-w-xl">
                          Special Requests: "{b.specialRequests}"
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      <div className="text-left lg:text-right">
                        <span className="text-xs text-slate-500 block">Total Folio Charge</span>
                        <span className="text-2xl font-serif font-bold text-slate-900">
                          ${b.totalAmount.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewInvoice(b)}
                          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-400" />
                          <span>View Invoice</span>
                        </button>

                        {b.status !== 'Cancelled' && b.status !== 'Checked Out' && (
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Profile Settings */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 max-w-2xl shadow-sm">
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">
              Personal Profile & Preferences
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Keep your contact details up to date for seamless room confirmations and concierge service.
            </p>

            {profileSaved && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Profile details successfully updated!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Registered Email Address</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Email is locked to your authenticated session.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
