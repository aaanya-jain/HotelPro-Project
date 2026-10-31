export type UserRole = 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export type RoomCategory = 'Standard' | 'Deluxe' | 'Executive Suite' | 'Presidential Suite' | 'Ocean Villa';
export type RoomStatus = 'Available' | 'Occupied' | 'Maintenance' | 'Cleaning';

export interface Room {
  id: string;
  roomNumber: string;
  title: string;
  category: RoomCategory;
  pricePerNight: number;
  capacity: number; // max guests
  bedType: string; // e.g. "King Bed", "2 Queen Beds"
  floor: number;
  sizeSqFt: number;
  description: string;
  images: string[];
  status: RoomStatus;
  amenities: string[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export type BookingStatus = 'Confirmed' | 'Checked In' | 'Checked Out' | 'Cancelled';
export type PaymentStatus = 'Paid' | 'Pending' | 'Refunded' | 'Failed';
export type PaymentMethod = 'Credit Card' | 'Debit Card' | 'PayPal' | 'Bank Transfer' | 'Cash at Counter';

export interface BookingAddOn {
  id: string;
  name: string;
  price: number;
}

export interface Booking {
  id: string; // e.g. "HP-2026-8941"
  userId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  roomNumber: string;
  roomTitle: string;
  roomCategory: RoomCategory;
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  nights: number;
  guestsCount: number;
  baseAmount: number;
  taxAmount: number;
  serviceFee: number;
  addOnsAmount: number;
  totalAmount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  specialRequests?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PaymentTransaction {
  id: string; // e.g. "TXN-908123"
  bookingId: string;
  guestName: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  cardNumberMasked?: string;
  timestamp: string;
}

export interface GuestProfile {
  id: string;
  userId?: string;
  fullName: string;
  email: string;
  phone: string;
  idProofType: string;
  idProofNumber: string;
  address: string;
  city: string;
  country: string;
  vipStatus: boolean;
  totalBookings: number;
  totalSpent: number;
  notes?: string;
  createdAt: string;
}

export interface HotelFacility {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  hours: string;
}
