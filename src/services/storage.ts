import { 
  Room, 
  Booking, 
  GuestProfile, 
  PaymentTransaction, 
  HotelFacility, 
  RoomCategory, 
  BookingStatus,
  PaymentStatus,
  User
} from '../types';

const STORAGE_KEYS = {
  ROOMS: 'hotelpro_rooms_v1',
  BOOKINGS: 'hotelpro_bookings_v1',
  GUESTS: 'hotelpro_guests_v1',
  TRANSACTIONS: 'hotelpro_transactions_v1',
  USERS: 'hotelpro_users_v1',
  CURRENT_USER: 'hotelpro_current_user_v1',
};

// Initial Seed Data - Luxury Hotel Portfolio
export const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-101',
    roomNumber: '101',
    title: 'Deluxe Garden Haven',
    category: 'Deluxe',
    pricePerNight: 220,
    capacity: 2,
    bedType: '1 King Bed',
    floor: 1,
    sizeSqFt: 450,
    description: 'Immerse in tranquility with panoramic garden terrace views, plush Italian cotton bedding, and marble rainfall shower.',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Available',
    amenities: ['High-speed Wi-Fi', 'Smart TV 55"', 'Espresso Machine', 'Mini Bar', 'Marble Bath', 'Private Balcony', 'Climate Control'],
    rating: 4.9,
    reviewCount: 42,
    featured: true
  },
  {
    id: 'room-102',
    roomNumber: '102',
    title: 'Superior Coastal Suite',
    category: 'Deluxe',
    pricePerNight: 280,
    capacity: 3,
    bedType: '1 King Bed + 1 Daybed',
    floor: 1,
    sizeSqFt: 520,
    description: 'Breathtaking partial ocean vista with custom mahogany furnishings, dual vanity sinks, and dedicated work lounge.',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Occupied',
    amenities: ['High-speed Wi-Fi', 'Ocean View', 'Balcony', 'Nespresso Bar', 'Dyson Hairdryer', 'Safe Box', 'Room Service 24/7'],
    rating: 4.8,
    reviewCount: 38
  },
  {
    id: 'room-201',
    roomNumber: '201',
    title: 'Executive Skyline Suite',
    category: 'Executive Suite',
    pricePerNight: 450,
    capacity: 4,
    bedType: '2 Queen Beds',
    floor: 2,
    sizeSqFt: 780,
    description: 'Elevated luxury tailored for discerning executives and families. Features separate living parlor, dining nook, and soaking tub.',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Available',
    amenities: ['Lounge Access', 'Soaking Tub', 'Double Vanity', 'Smart Climate', 'Butler Service', 'Complimentary Champagne', 'High-speed Wi-Fi'],
    rating: 5.0,
    reviewCount: 64,
    featured: true
  },
  {
    id: 'room-202',
    roomNumber: '202',
    title: 'Grand Executive Suite',
    category: 'Executive Suite',
    pricePerNight: 490,
    capacity: 3,
    bedType: '1 California King Bed',
    floor: 2,
    sizeSqFt: 820,
    description: 'Grand parlor with floor-to-ceiling glass, acoustic sound insulation, walk-in dressing wardrobe, and fine art curation.',
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490359854-dfba19688d70?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Available',
    amenities: ['Walk-in Closet', 'Champagne Bar', 'Panoramic Views', 'Luxury Toiletries', 'Turn-down Service', 'High-speed Wi-Fi'],
    rating: 4.95,
    reviewCount: 29
  },
  {
    id: 'room-301',
    roomNumber: '301',
    title: 'Presidential Royal Suite',
    category: 'Presidential Suite',
    pricePerNight: 950,
    capacity: 4,
    bedType: '1 Emperor Bed + 1 King Bed',
    floor: 3,
    sizeSqFt: 1450,
    description: 'The pinnacle of hospitality. Private elevator foyer, grand piano lounge, private chef pantry, and wraparound terrace with whirlpool.',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Occupied',
    amenities: ['Private Whirlpool', 'Private Elevator', '24/7 Butler', 'Chauffeured Limousine', 'Grand Piano', 'Wine Cellar', 'Infinity Balcony'],
    rating: 5.0,
    reviewCount: 19,
    featured: true
  },
  {
    id: 'room-302',
    roomNumber: '302',
    title: 'Azure Horizon Ocean Villa',
    category: 'Ocean Villa',
    pricePerNight: 820,
    capacity: 4,
    bedType: '2 King Beds',
    floor: 3,
    sizeSqFt: 1200,
    description: 'Direct shoreline setting with private plunge pool, outdoor rain shower, teak sun-deck, and personalized stargazing equipment.',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Available',
    amenities: ['Private Plunge Pool', 'Direct Beach Path', 'Outdoor Shower', 'Personalized Mini Bar', 'Sunset Veranda', 'Dedicated Host'],
    rating: 4.98,
    reviewCount: 51,
    featured: true
  },
  {
    id: 'room-103',
    roomNumber: '103',
    title: 'Standard Heritage Classic',
    category: 'Standard',
    pricePerNight: 160,
    capacity: 2,
    bedType: '1 Queen Bed',
    floor: 1,
    sizeSqFt: 340,
    description: 'Thoughtfully appointed sanctuary combining classic warmth with modern comfort, ergonomic workstation, and courtyard stillness.',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Available',
    amenities: ['High-speed Wi-Fi', 'Smart TV 43"', 'Coffee Maker', 'In-room Safe', 'Rain Shower', 'Quiet Courtyard View'],
    rating: 4.7,
    reviewCount: 76
  },
  {
    id: 'room-104',
    roomNumber: '104',
    title: 'Classic Twin Comfort',
    category: 'Standard',
    pricePerNight: 175,
    capacity: 2,
    bedType: '2 Twin XL Beds',
    floor: 1,
    sizeSqFt: 360,
    description: 'Ideal for colleagues or friends traveling together, featuring dual plush twin beds, premium bedding, and city view.',
    images: [
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=1200&q=80'
    ],
    status: 'Cleaning',
    amenities: ['High-speed Wi-Fi', 'Dual Bedding', 'Work Desk', 'En-suite Bath', 'Tea Station', 'Soundproof Windows'],
    rating: 4.65,
    reviewCount: 31
  }
];

export const INITIAL_GUESTS: GuestProfile[] = [
  {
    id: 'gst-1',
    fullName: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    phone: '+1 (555) 234-5678',
    idProofType: 'Passport',
    idProofNumber: 'US-8821901',
    address: '450 Park Avenue, Apt 14B',
    city: 'New York',
    country: 'United States',
    vipStatus: true,
    totalBookings: 4,
    totalSpent: 4280,
    notes: 'Prefers high floor, extra hypoallergenic pillows, sparkling water.',
    createdAt: '2026-04-12T10:00:00Z'
  },
  {
    id: 'gst-2',
    fullName: 'Dr. Marcus Sterling',
    email: 'marcus.sterling@example.org',
    phone: '+44 20 7946 0912',
    idProofType: 'Driving License',
    idProofNumber: 'UK-DL49921',
    address: '12 Kensington Gardens',
    city: 'London',
    country: 'United Kingdom',
    vipStatus: true,
    totalBookings: 2,
    totalSpent: 1900,
    notes: 'Late check-in frequent, business billing.',
    createdAt: '2026-06-20T14:30:00Z'
  },
  {
    id: 'gst-3',
    fullName: 'Sophia Rodriguez',
    email: 'sophia.rodriguez@example.com',
    phone: '+1 (555) 891-3420',
    idProofType: 'Passport',
    idProofNumber: 'E9381023',
    address: '782 Ocean Drive',
    city: 'Miami',
    country: 'United States',
    vipStatus: false,
    totalBookings: 1,
    totalSpent: 660,
    notes: 'Celebrating wedding anniversary.',
    createdAt: '2026-09-05T09:15:00Z'
  },
  {
    id: 'gst-4',
    fullName: 'Kenji Takahashi',
    email: 'kenji.takahashi@example.jp',
    phone: '+81 3 5555 0143',
    idProofType: 'National ID',
    idProofNumber: 'JP-9018231',
    address: '3-14 Roppongi, Minato-ku',
    city: 'Tokyo',
    country: 'Japan',
    vipStatus: false,
    totalBookings: 1,
    totalSpent: 1350,
    notes: 'Requested quiet wing.',
    createdAt: '2026-10-01T16:45:00Z'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'HP-2026-9101',
    userId: 'gst-1',
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor.vance@example.com',
    guestPhone: '+1 (555) 234-5678',
    roomId: 'room-102',
    roomNumber: '102',
    roomTitle: 'Superior Coastal Suite',
    roomCategory: 'Deluxe',
    checkInDate: '2026-10-29',
    checkOutDate: '2026-11-03',
    nights: 5,
    guestsCount: 2,
    baseAmount: 1400,
    taxAmount: 168,
    serviceFee: 50,
    addOnsAmount: 120, // Breakfast package
    totalAmount: 1738,
    status: 'Checked In',
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    specialRequests: 'Sparkling water upon arrival & extra feather pillows.',
    createdAt: '2026-10-20T11:20:00Z'
  },
  {
    id: 'HP-2026-9102',
    userId: 'gst-2',
    guestName: 'Dr. Marcus Sterling',
    guestEmail: 'marcus.sterling@example.org',
    guestPhone: '+44 20 7946 0912',
    roomId: 'room-301',
    roomNumber: '301',
    roomTitle: 'Presidential Royal Suite',
    roomCategory: 'Presidential Suite',
    checkInDate: '2026-10-30',
    checkOutDate: '2026-11-04',
    nights: 5,
    guestsCount: 3,
    baseAmount: 4750,
    taxAmount: 570,
    serviceFee: 120,
    addOnsAmount: 250, // Butler dining
    totalAmount: 5690,
    status: 'Checked In',
    paymentStatus: 'Paid',
    paymentMethod: 'Bank Transfer',
    specialRequests: 'Chauffeured airport transfer needed.',
    createdAt: '2026-10-15T15:40:00Z'
  },
  {
    id: 'HP-2026-9103',
    userId: 'gst-3',
    guestName: 'Sophia Rodriguez',
    guestEmail: 'sophia.rodriguez@example.com',
    guestPhone: '+1 (555) 891-3420',
    roomId: 'room-101',
    roomNumber: '101',
    roomTitle: 'Deluxe Garden Haven',
    roomCategory: 'Deluxe',
    checkInDate: '2026-11-05',
    checkOutDate: '2026-11-08',
    nights: 3,
    guestsCount: 2,
    baseAmount: 660,
    taxAmount: 79.2,
    serviceFee: 30,
    addOnsAmount: 60,
    totalAmount: 829.2,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    specialRequests: 'Anniversary cake and flower setup.',
    createdAt: '2026-10-25T08:10:00Z'
  },
  {
    id: 'HP-2026-9104',
    userId: 'gst-4',
    guestName: 'Kenji Takahashi',
    guestEmail: 'kenji.takahashi@example.jp',
    guestPhone: '+81 3 5555 0143',
    roomId: 'room-201',
    roomNumber: '201',
    roomTitle: 'Executive Skyline Suite',
    roomCategory: 'Executive Suite',
    checkInDate: '2026-11-10',
    checkOutDate: '2026-11-13',
    nights: 3,
    guestsCount: 2,
    baseAmount: 1350,
    taxAmount: 162,
    serviceFee: 40,
    addOnsAmount: 0,
    totalAmount: 1552,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'Debit Card',
    specialRequests: 'High floor corner view.',
    createdAt: '2026-10-28T14:00:00Z'
  }
];

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'TXN-908123',
    bookingId: 'HP-2026-9101',
    guestName: 'Eleanor Vance',
    amount: 1738,
    method: 'Credit Card',
    status: 'Paid',
    cardNumberMasked: '•••• •••• •••• 4242',
    timestamp: '2026-10-20T11:21:00Z'
  },
  {
    id: 'TXN-908124',
    bookingId: 'HP-2026-9102',
    guestName: 'Dr. Marcus Sterling',
    amount: 5690,
    method: 'Bank Transfer',
    status: 'Paid',
    timestamp: '2026-10-15T15:42:00Z'
  },
  {
    id: 'TXN-908125',
    bookingId: 'HP-2026-9103',
    guestName: 'Sophia Rodriguez',
    amount: 829.2,
    method: 'Credit Card',
    status: 'Paid',
    cardNumberMasked: '•••• •••• •••• 5555',
    timestamp: '2026-10-25T08:12:00Z'
  },
  {
    id: 'TXN-908126',
    bookingId: 'HP-2026-9104',
    guestName: 'Kenji Takahashi',
    amount: 1552,
    method: 'Debit Card',
    status: 'Paid',
    cardNumberMasked: '•••• •••• •••• 9812',
    timestamp: '2026-10-28T14:02:00Z'
  }
];

export const HOTEL_FACILITIES: HotelFacility[] = [
  {
    id: 'fac-1',
    name: 'Azure Infinity Pool',
    description: 'Heated rooftop pool offering uninterrupted ocean views, private cabanas, and artisan cocktail bar.',
    icon: 'Waves',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
    hours: '06:00 AM - 10:00 PM'
  },
  {
    id: 'fac-2',
    name: 'Aura Spa & Wellness',
    description: 'Full-spectrum wellness sanctuary with Himalayan salt sauna, hydrotherapy baths, and organic botanical rituals.',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    hours: '08:00 AM - 09:00 PM'
  },
  {
    id: 'fac-3',
    name: 'L’Étoile Fine Dining',
    description: 'Michelin-starred restaurant showcasing modern culinary artistry with locally harvested coastal ingredients and vintage wine cellar.',
    icon: 'UtensilsCrossed',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    hours: '07:00 AM - 11:30 PM'
  },
  {
    id: 'fac-4',
    name: 'Grand Fitness Center',
    description: 'State-of-the-art Technogym equipment, private yoga pavilion, and resident personal training staff.',
    icon: 'Dumbbell',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    hours: '24 Hours Daily'
  },
  {
    id: 'fac-5',
    name: 'Executive Boardroom & Hall',
    description: 'High-tech corporate meeting suites with 4K teleconferencing, ergonomic seating, and discreet concierge catering.',
    icon: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80',
    hours: '07:00 AM - 10:00 PM'
  },
  {
    id: 'fac-6',
    name: '24/7 Royal Concierge & Valet',
    description: 'Curated city tours, yacht charters, private airport limousine transfers, and seamless luggage handling.',
    icon: 'ConciergeBell',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    hours: '24 Hours Daily'
  }
];

export const AVAILABLE_ADDONS = [
  { id: 'addon-breakfast', name: 'Gourmet Buffet Breakfast', price: 28 },
  { id: 'addon-transfer', name: 'Luxury Airport Chauffeur (Round-trip)', price: 75 },
  { id: 'addon-spa', name: 'Aura Spa Daily Thermal Pass', price: 45 },
  { id: 'addon-latecheckout', name: 'Guaranteed 3:00 PM Late Check-out', price: 35 },
];

// Helper to initialize local storage
function getInitialData<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
  }
  localStorage.setItem(key, JSON.stringify(defaultValue));
  return defaultValue;
}

export const StorageService = {
  // Reset all data to factory demo defaults
  resetToDefaults: () => {
    localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(INITIAL_ROOMS));
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
    localStorage.setItem(STORAGE_KEYS.GUESTS, JSON.stringify(INITIAL_GUESTS));
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
    window.location.reload();
  },

  // Rooms
  getRooms: (): Room[] => {
    return getInitialData<Room[]>(STORAGE_KEYS.ROOMS, INITIAL_ROOMS);
  },

  getRoomById: (id: string): Room | undefined => {
    const rooms = StorageService.getRooms();
    return rooms.find(r => r.id === id);
  },

  saveRoom: (roomData: Omit<Room, 'id'> & { id?: string }): Room => {
    const rooms = StorageService.getRooms();
    let updatedRoom: Room;

    if (roomData.id) {
      // Edit existing
      updatedRoom = roomData as Room;
      const index = rooms.findIndex(r => r.id === roomData.id);
      if (index !== -1) {
        rooms[index] = updatedRoom;
      } else {
        rooms.push(updatedRoom);
      }
    } else {
      // Create new
      const newId = `room-${Date.now()}`;
      updatedRoom = {
        ...roomData,
        id: newId,
        rating: 5.0,
        reviewCount: 1
      };
      rooms.unshift(updatedRoom);
    }

    localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
    return updatedRoom;
  },

  deleteRoom: (id: string): boolean => {
    const rooms = StorageService.getRooms();
    const filtered = rooms.filter(r => r.id !== id);
    if (filtered.length !== rooms.length) {
      localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(filtered));
      return true;
    }
    return false;
  },

  // Check room availability for specific dates (Double-booking prevention algorithm)
  // Two date intervals [start1, end1] and [start2, end2] overlap if: start1 < end2 AND end1 > start2
  checkRoomAvailability: (
    roomId: string,
    checkInDate: string,
    checkOutDate: string,
    excludeBookingId?: string
  ): { available: boolean; conflictReason?: string } => {
    const room = StorageService.getRoomById(roomId);
    if (!room) {
      return { available: false, conflictReason: 'Room not found' };
    }

    if (room.status === 'Maintenance') {
      return { available: false, conflictReason: 'Room is currently under scheduled maintenance.' };
    }

    const bookings = StorageService.getBookings();
    const checkIn = new Date(checkInDate).getTime();
    const checkOut = new Date(checkOutDate).getTime();

    if (isNaN(checkIn) || isNaN(checkOut) || checkIn >= checkOut) {
      return { available: false, conflictReason: 'Invalid check-in or check-out dates.' };
    }

    // Check for active bookings for this room
    const conflictingBooking = bookings.find(b => {
      if (b.roomId !== roomId) return false;
      if (excludeBookingId && b.id === excludeBookingId) return false;
      if (b.status === 'Cancelled' || b.status === 'Checked Out') return false;

      const bCheckIn = new Date(b.checkInDate).getTime();
      const bCheckOut = new Date(b.checkOutDate).getTime();

      // Overlap condition
      return checkIn < bCheckOut && checkOut > bCheckIn;
    });

    if (conflictingBooking) {
      return {
        available: false,
        conflictReason: `Room is reserved from ${conflictingBooking.checkInDate} to ${conflictingBooking.checkOutDate} (Booking #${conflictingBooking.id}).`
      };
    }

    return { available: true };
  },

  // Bookings
  getBookings: (): Booking[] => {
    return getInitialData<Booking[]>(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
  },

  getBookingById: (id: string): Booking | undefined => {
    const bookings = StorageService.getBookings();
    return bookings.find(b => b.id === id);
  },

  createBooking: (bookingInput: Omit<Booking, 'id' | 'createdAt'>): { success: boolean; booking?: Booking; error?: string } => {
    // 1. Verify availability
    const availCheck = StorageService.checkRoomAvailability(
      bookingInput.roomId,
      bookingInput.checkInDate,
      bookingInput.checkOutDate
    );

    if (!availCheck.available) {
      return {
        success: false,
        error: availCheck.conflictReason || 'This room is not available for selected dates.'
      };
    }

    const bookings = StorageService.getBookings();
    const uniqueNumber = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingInput,
      id: `HP-2026-${uniqueNumber}`,
      createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

    // Also update room status if checkIn is today or past
    const today = new Date().toISOString().split('T')[0];
    if (newBooking.checkInDate <= today && newBooking.checkOutDate >= today) {
      const rooms = StorageService.getRooms();
      const rIdx = rooms.findIndex(r => r.id === newBooking.roomId);
      if (rIdx !== -1) {
        rooms[rIdx].status = 'Occupied';
        localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
      }
    }

    // Auto-update or create guest record
    StorageService.syncGuestFromBooking(newBooking);

    // Record payment transaction
    if (newBooking.paymentStatus === 'Paid') {
      StorageService.recordTransaction({
        id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        bookingId: newBooking.id,
        guestName: newBooking.guestName,
        amount: newBooking.totalAmount,
        method: newBooking.paymentMethod || 'Credit Card',
        status: 'Paid',
        cardNumberMasked: '•••• •••• •••• 4242',
        timestamp: new Date().toISOString()
      });
    }

    return { success: true, booking: newBooking };
  },

  updateBookingStatus: (id: string, status: BookingStatus): boolean => {
    const bookings = StorageService.getBookings();
    const idx = bookings.findIndex(b => b.id === id);
    if (idx === -1) return false;

    const oldBooking = bookings[idx];
    bookings[idx] = {
      ...oldBooking,
      status,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

    // Sync room status if checked in or checked out
    const rooms = StorageService.getRooms();
    const rIdx = rooms.findIndex(r => r.id === oldBooking.roomId);
    if (rIdx !== -1) {
      if (status === 'Checked In') {
        rooms[rIdx].status = 'Occupied';
      } else if (status === 'Checked Out') {
        rooms[rIdx].status = 'Cleaning';
      } else if (status === 'Cancelled') {
        // If no other active booking today, mark available
        rooms[rIdx].status = 'Available';
      }
      localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
    }

    return true;
  },

  updateBookingPayment: (id: string, paymentStatus: PaymentStatus, method: any): boolean => {
    const bookings = StorageService.getBookings();
    const idx = bookings.findIndex(b => b.id === id);
    if (idx === -1) return false;

    bookings[idx].paymentStatus = paymentStatus;
    if (method) bookings[idx].paymentMethod = method;
    bookings[idx].updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

    if (paymentStatus === 'Paid') {
      StorageService.recordTransaction({
        id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        bookingId: bookings[idx].id,
        guestName: bookings[idx].guestName,
        amount: bookings[idx].totalAmount,
        method: method || 'Credit Card',
        status: 'Paid',
        cardNumberMasked: '•••• •••• •••• 4242',
        timestamp: new Date().toISOString()
      });
    }

    return true;
  },

  cancelBooking: (id: string): { success: boolean; message: string } => {
    const success = StorageService.updateBookingStatus(id, 'Cancelled');
    if (success) {
      return { success: true, message: 'Reservation cancelled successfully. Refund will process within 3-5 business days.' };
    }
    return { success: false, message: 'Failed to cancel reservation.' };
  },

  // Guests
  getGuests: (): GuestProfile[] => {
    return getInitialData<GuestProfile[]>(STORAGE_KEYS.GUESTS, INITIAL_GUESTS);
  },

  saveGuest: (guest: GuestProfile): void => {
    const guests = StorageService.getGuests();
    const idx = guests.findIndex(g => g.id === guest.id);
    if (idx !== -1) {
      guests[idx] = guest;
    } else {
      guests.unshift(guest);
    }
    localStorage.setItem(STORAGE_KEYS.GUESTS, JSON.stringify(guests));
  },

  deleteGuest: (id: string): boolean => {
    const guests = StorageService.getGuests();
    const filtered = guests.filter(g => g.id !== id);
    localStorage.setItem(STORAGE_KEYS.GUESTS, JSON.stringify(filtered));
    return true;
  },

  syncGuestFromBooking: (booking: Booking): void => {
    const guests = StorageService.getGuests();
    const existing = guests.find(g => g.email.toLowerCase() === booking.guestEmail.toLowerCase());

    if (existing) {
      existing.totalBookings += 1;
      existing.totalSpent += booking.totalAmount;
      if (existing.totalSpent > 2500) {
        existing.vipStatus = true;
      }
      StorageService.saveGuest(existing);
    } else {
      const newGuest: GuestProfile = {
        id: `gst-${Date.now()}`,
        fullName: booking.guestName,
        email: booking.guestEmail,
        phone: booking.guestPhone,
        idProofType: 'Passport',
        idProofNumber: 'Pending Verification',
        address: 'Registered Online',
        city: 'Guest City',
        country: 'Global',
        vipStatus: booking.totalAmount > 2000,
        totalBookings: 1,
        totalSpent: booking.totalAmount,
        createdAt: new Date().toISOString()
      };
      StorageService.saveGuest(newGuest);
    }
  },

  // Transactions
  getTransactions: (): PaymentTransaction[] => {
    return getInitialData<PaymentTransaction[]>(STORAGE_KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS);
  },

  recordTransaction: (txn: PaymentTransaction): void => {
    const txns = StorageService.getTransactions();
    txns.unshift(txn);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(txns));
  },

  // Admin Dashboard Statistics Aggregator
  getAdminStats: () => {
    const rooms = StorageService.getRooms();
    const bookings = StorageService.getBookings();
    const guests = StorageService.getGuests();
    const transactions = StorageService.getTransactions();

    const totalRooms = rooms.length;
    const availableRooms = rooms.filter(r => r.status === 'Available').length;
    const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
    const maintenanceRooms = rooms.filter(r => r.status === 'Maintenance' || r.status === 'Cleaning').length;

    const totalBookings = bookings.length;
    const activeBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Checked In').length;
    const checkedInCount = bookings.filter(b => b.status === 'Checked In').length;
    
    // Revenue calculations
    const totalRevenue = transactions
      .filter(t => t.status === 'Paid')
      .reduce((sum, t) => sum + t.amount, 0);

    const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

    // Category breakdown
    const categoryCounts: Record<string, { total: number; occupied: number }> = {};
    rooms.forEach(r => {
      if (!categoryCounts[r.category]) {
        categoryCounts[r.category] = { total: 0, occupied: 0 };
      }
      categoryCounts[r.category].total += 1;
      if (r.status === 'Occupied') {
        categoryCounts[r.category].occupied += 1;
      }
    });

    return {
      totalRooms,
      availableRooms,
      occupiedRooms,
      maintenanceRooms,
      totalBookings,
      activeBookings,
      checkedInCount,
      totalGuests: guests.length,
      totalRevenue,
      occupancyRate,
      categoryCounts
    };
  }
};
