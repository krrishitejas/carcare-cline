export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vehicle {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  vin?: string;
  licensePlate?: string;
  color?: string;
  mileage: number;
  fuelEfficiency?: number;
  healthScore: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Garage {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  rating: number;
  totalReviews: number;
  imageUrl?: string;
  openingHours?: any;
  services: string[];
  isActive: boolean;
  distance?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceType {
  id: string;
  name: string;
  description?: string;
  basePrice?: number;
  durationMinutes?: number;
  category: string;
  icon?: string;
  createdAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  vehicleId: string;
  garageId: string;
  serviceTypeId: string;
  bookingDate: string;
  bookingTime: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  price?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  // Related data
  garage?: Garage;
  serviceType?: ServiceType;
  vehicle?: Vehicle;
}

export interface Expense {
  id: string;
  userId: string;
  vehicleId: string;
  category: 'fuel' | 'maintenance' | 'insurance' | 'repairs' | 'accessories' | 'car_wash' | 'parking' | 'tolls' | 'other';
  amount: number;
  description?: string;
  expenseDate: string;
  receiptUrl?: string;
  mileageAtExpense?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceReminder {
  id: string;
  userId: string;
  vehicleId: string;
  title: string;
  description?: string;
  reminderType: 'oil_change' | 'tire_rotation' | 'brake_check' | 'insurance_renewal' | 'registration_renewal' | 'inspection' | 'general_maintenance';
  dueDate?: string;
  dueMileage?: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'active' | 'completed' | 'dismissed' | 'overdue';
  completedDate?: string;
  completedMileage?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'reminder' | 'booking' | 'expense' | 'system' | 'promotion';
  isRead: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface GarageReview {
  id: string;
  userId: string;
  garageId: string;
  bookingId?: string;
  rating: number;
  reviewText?: string;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface CreateExpenseRequest {
  vehicleId: string;
  category: Expense['category'];
  amount: number;
  description?: string;
  expenseDate: string;
  mileageAtExpense?: number;
}

export interface CreateBookingRequest {
  vehicleId: string;
  garageId: string;
  serviceTypeId: string;
  bookingDate: string;
  bookingTime: string;
  notes?: string;
}

export interface CreateReminderRequest {
  vehicleId: string;
  title: string;
  description?: string;
  reminderType: ServiceReminder['reminderType'];
  dueDate?: string;
  dueMileage?: number;
  priority: ServiceReminder['priority'];
}

export interface UpdateUserRequest {
  name?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface UpdateVehicleRequest {
  make?: string;
  model?: string;
  year?: number;
  licensePlate?: string;
  color?: string;
  mileage?: number;
  imageUrl?: string;
}