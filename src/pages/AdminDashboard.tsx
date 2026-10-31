import React, { useState } from 'react';
import { 
  Building2, 
  CalendarCheck, 
  Users, 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Edit, 
  Trash2, 
  Sparkles, 
  CreditCard,
  BedDouble,
  RotateCcw,
  Eye,
  LogOut,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Room, Booking, GuestProfile, PaymentTransaction, BookingStatus } from '../types';
import { StorageService } from '../services/storage';

interface AdminDashboardProps {
  rooms: Room[];
  bookings: Booking[];
  guests: GuestProfile[];
  transactions: PaymentTransaction[];
  onAddRoom: () => void;
  onEditRoom: (room: Room) => void;
  onDeleteRoom: (roomId: string) => void;
  onViewGuest: (guest: GuestProfile) => void;
  onViewInvoice: (booking: Booking) => void;
  onRefreshData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  rooms,
  bookings,
  guests,
  transactions,
  onAddRoom,
  onEditRoom,
  onDeleteRoom,
  onViewGuest,
  onViewInvoice,
  onRefreshData
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'bookings' | 'rooms' | 'guests' | 'payments'>('overview');
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('All');
  const [roomFilterCategory, setRoomFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = StorageService.getAdminStats();

  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    StorageService.updateBookingStatus(bookingId, newStatus);
    onRefreshData();
  };

  const handleRoomStatusToggle = (room: Room, newStatus: Room['status']) => {
    StorageService.saveRoom({ ...room, status: newStatus });
    onRefreshData();
  };

  const filteredBookings = bookings.filter((b) => {
    if (bookingFilterStatus !== 'All' && b.status !== bookingFilterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.id.toLowerCase().includes(q) ||
        b.guestName.toLowerCase().includes(q) ||
        b.guestEmail.toLowerCase().includes(q) ||
        b.roomNumber.includes(q)
      );
    }
    return true;
  });

  const filteredRooms = rooms.filter((r) => {
    if (roomFilterCategory !== 'All' && r.category !== roomFilterCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.roomNumber.includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredGuests = guests.filter((g) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        g.fullName.toLowerCase().includes(q) ||
        g.email.toLowerCase().includes(q) ||
        g.phone.includes(q) ||
        g.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                Executive Management Console
              </span>
              <span className="text-xs text-slate-400">Live Hotel Data</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-white mt-1">
              HotelPro Operations Suite
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onAddRoom}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Add Room</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Reset HotelPro database to clean sample data?')) {
                  StorageService.resetToDefaults();
                }
              }}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
              title="Reset Sample Hotel Data"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Reset DB</span>
            </button>
          </div>
        </div>

        {/* Top 6 KPI Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Rooms</span>
              <Building2 className="w-4 h-4 text-amber-400" />
            </div>
            <p className="font-serif text-2xl font-bold text-white mt-2">{stats.totalRooms}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{stats.availableRooms} currently available</p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Occupied Rooms</span>
              <BedDouble className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="font-serif text-2xl font-bold text-white mt-2">{stats.occupiedRooms}</p>
            <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">{stats.occupancyRate}% occupancy rate</p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>In Cleaning</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="font-serif text-2xl font-bold text-white mt-2">{stats.maintenanceRooms}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Housekeeping active</p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Bookings</span>
              <CalendarCheck className="w-4 h-4 text-blue-400" />
            </div>
            <p className="font-serif text-2xl font-bold text-white mt-2">{stats.totalBookings}</p>
            <p className="text-[10px] text-blue-400 font-semibold mt-0.5">{stats.checkedInCount} checked-in now</p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Registered Guests</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <p className="font-serif text-2xl font-bold text-white mt-2">{stats.totalGuests}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Profiles on record</p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Revenue</span>
              <DollarSign className="w-4 h-4 text-amber-400" />
            </div>
            <p className="font-serif text-2xl font-bold text-amber-400 mt-2">
              ${stats.totalRevenue.toLocaleString()}
            </p>
            <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">100% Settled</p>
          </div>
        </div>

        {/* Dashboard Visual Charts & Real-time Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Revenue Distribution by Category */}
          <div className="lg:col-span-2 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-base font-bold text-white">
                  Accommodation Occupancy & Inventory Load
                </h3>
                <p className="text-xs text-slate-400">Real-time status across room tiers</p>
              </div>
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                Live Feed
              </span>
            </div>

            <div className="space-y-4 pt-2">
              {Object.entries(stats.categoryCounts).map(([cat, data]) => {
                const percent = data.total > 0 ? Math.round((data.occupied / data.total) * 100) : 0;
                return (
                  <div key={cat} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{cat}</span>
                      <span className="text-slate-400">
                        {data.occupied} of {data.total} Occupied ({percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                      <div
                        className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Room Floor Map Mini Grid */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-base font-bold text-white mb-1">
                Floor Plan Visual Grid
              </h3>
              <p className="text-xs text-slate-400 mb-4">Quick occupancy glance</p>

              <div className="grid grid-cols-4 gap-2">
                {rooms.map((room) => {
                  let bg = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300';
                  if (room.status === 'Occupied') bg = 'bg-rose-500/20 border-rose-500/40 text-rose-300';
                  if (room.status === 'Cleaning') bg = 'bg-amber-500/20 border-amber-500/40 text-amber-300';
                  if (room.status === 'Maintenance') bg = 'bg-slate-700 border-slate-600 text-slate-400';

                  return (
                    <div
                      key={room.id}
                      onClick={() => onEditRoom(room)}
                      className={`p-2 rounded-xl border text-center cursor-pointer hover:scale-105 transition-transform ${bg}`}
                      title={`Room #${room.roomNumber} - ${room.title} (${room.status})`}
                    >
                      <p className="font-bold text-xs font-mono">{room.roomNumber}</p>
                      <p className="text-[9px] uppercase tracking-wider truncate">{room.status}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Available</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-400" /> Occupied</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Clean</span>
            </div>
          </div>

        </div>

        {/* Management Tabs Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveAdminTab('overview')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 ${
              activeAdminTab === 'overview'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Recent Reservations</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('bookings')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 ${
              activeAdminTab === 'bookings'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Booking Management ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('rooms')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 ${
              activeAdminTab === 'rooms'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Room Management ({rooms.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('guests')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 ${
              activeAdminTab === 'guests'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Guest Directory ({guests.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('payments')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 ${
              activeAdminTab === 'payments'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Payment Records ({transactions.length})</span>
          </button>
        </div>

        {/* Global Search Bar inside Tab Views */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search records by ID, guest name, room number..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
            />
          </div>

          {activeAdminTab === 'bookings' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Filter Status:</span>
              <select
                value={bookingFilterStatus}
                onChange={(e) => setBookingFilterStatus(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-200"
              >
                <option value="All">All Bookings</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Checked In">Checked In</option>
                <option value="Checked Out">Checked Out</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          )}

          {activeAdminTab === 'rooms' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Filter Category:</span>
              <select
                value={roomFilterCategory}
                onChange={(e) => setRoomFilterCategory(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-slate-200"
              >
                <option value="All">All Categories</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Executive Suite">Executive Suite</option>
                <option value="Presidential Suite">Presidential Suite</option>
                <option value="Ocean Villa">Ocean Villa</option>
                <option value="Standard">Standard</option>
              </select>
            </div>
          )}
        </div>

        {/* TAB 1 & OVERVIEW: Bookings Table */}
        {(activeAdminTab === 'overview' || activeAdminTab === 'bookings') && (
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-700/80 flex items-center justify-between">
              <h3 className="font-serif font-bold text-white text-base">
                {activeAdminTab === 'overview' ? 'Latest Hotel Reservations' : 'All Reservations'}
              </h3>
              <span className="text-xs text-slate-400">
                {filteredBookings.length} booking records found
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-700 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Booking ID</th>
                    <th className="py-3 px-4">Guest Details</th>
                    <th className="py-3 px-4">Room Reserved</th>
                    <th className="py-3 px-4">Check-in / Out</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Stay Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-slate-200">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-750 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                        {b.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-white">{b.guestName}</p>
                        <p className="text-[11px] text-slate-400">{b.guestEmail}</p>
                        <p className="text-[11px] text-slate-500">{b.guestPhone}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-white">Room #{b.roomNumber}</p>
                        <p className="text-[11px] text-slate-400 truncate max-w-[140px]">{b.roomTitle}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-medium">{b.checkInDate} to</p>
                        <p className="font-medium text-slate-400">{b.checkOutDate}</p>
                        <span className="text-[10px] text-amber-500 font-semibold">{b.nights} nights</span>
                      </td>
                      <td className="py-3.5 px-4 font-serif font-bold text-white text-sm">
                        ${b.totalAmount.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.paymentStatus === 'Paid'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {b.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border bg-slate-900 ${
                            b.status === 'Checked In'
                              ? 'text-emerald-400 border-emerald-500/40'
                              : b.status === 'Confirmed'
                              ? 'text-blue-400 border-blue-500/40'
                              : b.status === 'Checked Out'
                              ? 'text-slate-400 border-slate-600'
                              : 'text-rose-400 border-rose-500/40'
                          }`}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Checked In">Checked In</option>
                          <option value="Checked Out">Checked Out</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onViewInvoice(b)}
                          className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-amber-300 font-semibold rounded-lg text-xs transition-colors inline-flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Folio
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Room Management Table & Controls */}
        {activeAdminTab === 'rooms' && (
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-700/80 flex items-center justify-between">
              <h3 className="font-serif font-bold text-white text-base">
                Hotel Room Inventory Controls
              </h3>
              <button
                onClick={onAddRoom}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Add New Room
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-700 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Room #</th>
                    <th className="py-3 px-4">Title & Image</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Rate / Night</th>
                    <th className="py-3 px-4">Capacity</th>
                    <th className="py-3 px-4">Status Selector</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-slate-200">
                  {filteredRooms.map((room) => (
                    <tr key={room.id} className="hover:bg-slate-750 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-amber-400 text-sm">
                        {room.roomNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={room.images[0]}
                            alt={room.title}
                            className="w-12 h-9 rounded-lg object-cover ring-1 ring-slate-700"
                          />
                          <div>
                            <p className="font-semibold text-white">{room.title}</p>
                            <p className="text-[11px] text-slate-400">Floor {room.floor} · {room.sizeSqFt} sq.ft</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-300">
                        {room.category}
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-amber-400 text-sm">
                        ${room.pricePerNight}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {room.capacity} Guests ({room.bedType})
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={room.status}
                          onChange={(e) => handleRoomStatusToggle(room, e.target.value as any)}
                          className="px-2.5 py-1 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200"
                        >
                          <option value="Available">Available</option>
                          <option value="Occupied">Occupied</option>
                          <option value="Cleaning">Cleaning</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onEditRoom(room)}
                            className="p-1.5 text-slate-300 hover:text-amber-400 hover:bg-slate-700 rounded-lg transition-colors"
                            title="Edit Room"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete room #${room.roomNumber} (${room.title})?`)) {
                                onDeleteRoom(room.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-700 rounded-lg transition-colors"
                            title="Delete Room"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Guest Directory Table */}
        {activeAdminTab === 'guests' && (
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-700/80 flex items-center justify-between">
              <h3 className="font-serif font-bold text-white text-base">
                Guest Directory & Profiles
              </h3>
              <span className="text-xs text-slate-400">{filteredGuests.length} profiles</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-700 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Guest Name</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">ID Proof</th>
                    <th className="py-3 px-4">Total Stays</th>
                    <th className="py-3 px-4">Lifetime Spend</th>
                    <th className="py-3 px-4">VIP Tier</th>
                    <th className="py-3 px-4 text-right">Dossier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-slate-200">
                  {filteredGuests.map((g) => (
                    <tr key={g.id} className="hover:bg-slate-750 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-white">{g.fullName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">#{g.id}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p>{g.email}</p>
                        <p className="text-slate-400">{g.phone}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {g.city}, {g.country}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-400">
                        {g.idProofType}: {g.idProofNumber}
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">
                        {g.totalBookings} visit(s)
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-amber-400">
                        ${g.totalSpent.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        {g.vipStatus ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            VIP
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[10px]">Standard</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onViewGuest(g)}
                          className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 text-amber-400 font-medium rounded-lg text-xs transition-colors flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: Payment Ledger & Financials */}
        {activeAdminTab === 'payments' && (
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-700/80 flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-white text-base">
                  Financial Transaction Ledger
                </h3>
                <p className="text-xs text-slate-400">Audited settlement history</p>
              </div>
              <span className="text-xs text-amber-400 font-mono font-bold">
                Total Volume: ${stats.totalRevenue.toLocaleString()}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-700 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Transaction ID</th>
                    <th className="py-3 px-4">Booking Ref</th>
                    <th className="py-3 px-4">Guest Name</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60 text-slate-200">
                  {transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-750 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-300">
                        {t.id}
                      </td>
                      <td className="py-3 px-4 font-mono text-amber-400">
                        {t.bookingId}
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">
                        {t.guestName}
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-emerald-400 text-sm">
                        ${t.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {t.method} {t.cardNumberMasked && <span className="font-mono text-slate-400">({t.cardNumberMasked})</span>}
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {new Date(t.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
