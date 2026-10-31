import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { GuestDashboard } from './pages/GuestDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { BookingModal } from './components/BookingModal';
import { PaymentModal } from './components/PaymentModal';
import { InvoiceModal } from './components/InvoiceModal';
import { RoomFormModal } from './components/RoomFormModal';
import { GuestModal } from './components/GuestModal';
import { AuthModal } from './pages/AuthPage';
import { FacilitiesSection } from './components/FacilitiesSection';
import { AboutSection } from './components/AboutSection';
import { StorageService } from './services/storage';
import { Room, Booking, GuestProfile, PaymentTransaction } from './types';

type NavigationTab = 'home' | 'rooms' | 'facilities' | 'about' | 'guest-dashboard' | 'admin-dashboard';

const MainAppContent: React.FC = () => {
  const { user, isAdmin, switchRole } = useAuth();

  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [guests, setGuests] = useState<GuestProfile[]>([]);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);

  // Room search filter passed from Hero
  const [roomPageFilters, setRoomPageFilters] = useState<any>(null);

  // Modals state
  const [bookingRoom, setBookingRoom] = useState<Room | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [bookingDraft, setBookingDraft] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [invoiceBooking, setInvoiceBooking] = useState<Booking | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isRoomFormModalOpen, setIsRoomFormModalOpen] = useState(false);

  const [viewingGuest, setViewingGuest] = useState<GuestProfile | null>(null);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Load all data from StorageService
  const refreshAllData = useCallback(() => {
    setRooms(StorageService.getRooms());
    setBookings(StorageService.getBookings());
    setGuests(StorageService.getGuests());
    setTransactions(StorageService.getTransactions());
  }, []);

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  // Handle Room Booking Start
  const handleStartBooking = (room: Room) => {
    setBookingRoom(room);
    setIsBookingModalOpen(true);
  };

  // When user proceeds from BookingModal to Checkout
  const handleProceedToPayment = (draft: any) => {
    setIsBookingModalOpen(false);
    setBookingDraft(draft);
    setIsPaymentModalOpen(true);
  };

  // When payment is authorized
  const handlePaymentSuccess = (confirmedBookingInput: any) => {
    setIsPaymentModalOpen(false);
    const result = StorageService.createBooking(confirmedBookingInput);

    if (result.success && result.booking) {
      refreshAllData();
      setInvoiceBooking(result.booking);
      setIsInvoiceModalOpen(true);
    } else {
      alert(result.error || 'Failed to confirm reservation.');
    }
  };

  // Room CRUD Handlers
  const handleAddRoom = () => {
    setEditingRoom(null);
    setIsRoomFormModalOpen(true);
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setIsRoomFormModalOpen(true);
  };

  const handleSaveRoom = (roomData: Omit<Room, 'id'> & { id?: string }) => {
    StorageService.saveRoom(roomData);
    setIsRoomFormModalOpen(false);
    refreshAllData();
  };

  const handleDeleteRoom = (roomId: string) => {
    StorageService.deleteRoom(roomId);
    refreshAllData();
  };

  // Guest CRUD Handlers
  const handleViewGuest = (guest: GuestProfile) => {
    setViewingGuest(guest);
    setIsGuestModalOpen(true);
  };

  const handleUpdateGuest = (updatedGuest: GuestProfile) => {
    StorageService.saveGuest(updatedGuest);
    setViewingGuest(updatedGuest);
    refreshAllData();
  };

  // Invoice display
  const handleViewInvoice = (booking: Booking) => {
    setInvoiceBooking(booking);
    setIsInvoiceModalOpen(true);
  };

  // Auth modal trigger
  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  // Search trigger from Hero
  const handleHeroSearch = (params: any) => {
    setRoomPageFilters(params);
    setActiveTab('rooms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={handleOpenAuth}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            rooms={rooms}
            onBookRoom={handleStartBooking}
            onNavigateToRooms={(filters) => {
              if (filters) setRoomPageFilters(filters);
              setActiveTab('rooms');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onEditRoom={isAdmin ? handleEditRoom : undefined}
            onDeleteRoom={isAdmin ? handleDeleteRoom : undefined}
          />
        )}

        {activeTab === 'rooms' && (
          <RoomsPage
            rooms={rooms}
            onBookRoom={handleStartBooking}
            onAddRoom={handleAddRoom}
            onEditRoom={handleEditRoom}
            onDeleteRoom={handleDeleteRoom}
            initialFilters={roomPageFilters}
          />
        )}

        {activeTab === 'facilities' && (
          <div className="pt-4">
            <FacilitiesSection onExploreRooms={() => setActiveTab('rooms')} />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="pt-4">
            <AboutSection />
          </div>
        )}

        {activeTab === 'guest-dashboard' && (
          <GuestDashboard
            bookings={bookings}
            onViewInvoice={handleViewInvoice}
            onExploreRooms={() => {
              setActiveTab('rooms');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRefreshData={refreshAllData}
          />
        )}

        {activeTab === 'admin-dashboard' && (
          <>
            {!isAdmin ? (
              <div className="min-h-[60vh] flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-8 max-w-md text-center border border-slate-200 shadow-xl space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                    <span className="font-serif text-2xl font-bold">403</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-slate-900">
                    Administrator Restricted
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The operations suite requires administrative credentials. You can switch to Admin mode immediately for college demonstration testing.
                  </p>
                  <button
                    onClick={() => {
                      switchRole('admin');
                      setActiveTab('admin-dashboard');
                    }}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    Switch to Admin View (Alexander Sterling)
                  </button>
                </div>
              </div>
            ) : (
              <AdminDashboard
                rooms={rooms}
                bookings={bookings}
                guests={guests}
                transactions={transactions}
                onAddRoom={handleAddRoom}
                onEditRoom={handleEditRoom}
                onDeleteRoom={handleDeleteRoom}
                onViewGuest={handleViewGuest}
                onViewInvoice={handleViewInvoice}
                onRefreshData={refreshAllData}
              />
            )}
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Modals */}
      {/* 1. Reservation Desk Modal */}
      <BookingModal
        room={bookingRoom}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onProceedToPayment={handleProceedToPayment}
        initialCheckIn={roomPageFilters?.checkIn}
        initialCheckOut={roomPageFilters?.checkOut}
        initialGuests={roomPageFilters?.guests}
      />

      {/* 2. Sandbox Payment Gateway Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        bookingDraft={bookingDraft}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* 3. Official Printable Invoice Modal */}
      <InvoiceModal
        booking={invoiceBooking}
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
      />

      {/* 4. Room Management Add / Edit Modal (Admin) */}
      <RoomFormModal
        room={editingRoom}
        isOpen={isRoomFormModalOpen}
        onClose={() => setIsRoomFormModalOpen(false)}
        onSave={handleSaveRoom}
      />

      {/* 5. Guest Dossier Modal */}
      <GuestModal
        guest={viewingGuest}
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        onUpdate={handleUpdateGuest}
        onViewInvoice={(b) => {
          setIsGuestModalOpen(false);
          handleViewInvoice(b);
        }}
      />

      {/* 6. Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onSuccess={() => {
          refreshAllData();
        }}
      />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}
