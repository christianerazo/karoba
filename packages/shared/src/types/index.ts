// Tipos compartidos para toda la aplicación

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  country: string;
  city: string;
  images: string[];
  rating: number;
  price: number;
  currency: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  category: DestinationCategory;
  amenities: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum DestinationCategory {
  HOTEL = 'hotel',
  RESTAURANT = 'restaurant',
  ATTRACTION = 'attraction',
  ACTIVITY = 'activity',
  TRANSPORT = 'transport'
}

export interface Booking {
  id: string;
  userId: string;
  destinationId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export interface Review {
  id: string;
  userId: string;
  destinationId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}