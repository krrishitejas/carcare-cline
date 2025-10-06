import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {API_BASE_URL} from '@env';
import {
  User,
  Vehicle,
  Garage,
  ServiceType,
  Booking,
  Expense,
  ServiceReminder,
  Notification,
  ApiResponse,
  PaginatedResponse,
  CreateExpenseRequest,
  CreateBookingRequest,
  CreateReminderRequest,
  UpdateUserRequest,
  UpdateVehicleRequest,
} from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for adding auth token
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token if available
        // const token = await AsyncStorage.getItem('authToken');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
      },
    );
  }

  // User APIs
  async getUser(userId: string): Promise<ApiResponse<User>> {
    const response = await this.api.get(`/users/${userId}`);
    return response.data;
  }

  async updateUser(userId: string, data: UpdateUserRequest): Promise<ApiResponse<User>> {
    const response = await this.api.put(`/users/${userId}`, data);
    return response.data;
  }

  // Vehicle APIs
  async getVehicles(userId: string): Promise<ApiResponse<Vehicle[]>> {
    const response = await this.api.get(`/users/${userId}/vehicles`);
    return response.data;
  }

  async getVehicle(vehicleId: string): Promise<ApiResponse<Vehicle>> {
    const response = await this.api.get(`/vehicles/${vehicleId}`);
    return response.data;
  }

  async createVehicle(userId: string, data: Omit<Vehicle, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Vehicle>> {
    const response = await this.api.post(`/users/${userId}/vehicles`, data);
    return response.data;
  }

  async updateVehicle(vehicleId: string, data: UpdateVehicleRequest): Promise<ApiResponse<Vehicle>> {
    const response = await this.api.put(`/vehicles/${vehicleId}`, data);
    return response.data;
  }

  async deleteVehicle(vehicleId: string): Promise<ApiResponse<void>> {
    const response = await this.api.delete(`/vehicles/${vehicleId}`);
    return response.data;
  }

  // Garage APIs
  async getGarages(latitude?: number, longitude?: number, radius?: number): Promise<ApiResponse<Garage[]>> {
    const params = new URLSearchParams();
    if (latitude) params.append('lat', latitude.toString());
    if (longitude) params.append('lng', longitude.toString());
    if (radius) params.append('radius', radius.toString());
    
    const response = await this.api.get(`/garages?${params.toString()}`);
    return response.data;
  }

  async getGarage(garageId: string): Promise<ApiResponse<Garage>> {
    const response = await this.api.get(`/garages/${garageId}`);
    return response.data;
  }

  async searchGarages(query: string, filters?: {services?: string[]}): Promise<ApiResponse<Garage[]>> {
    const response = await this.api.post('/garages/search', {query, filters});
    return response.data;
  }

  // Service Type APIs
  async getServiceTypes(): Promise<ApiResponse<ServiceType[]>> {
    const response = await this.api.get('/service-types');
    return response.data;
  }

  async getServiceType(serviceTypeId: string): Promise<ApiResponse<ServiceType>> {
    const response = await this.api.get(`/service-types/${serviceTypeId}`);
    return response.data;
  }

  // Booking APIs
  async getBookings(userId: string, status?: string): Promise<ApiResponse<Booking[]>> {
    const params = status ? `?status=${status}` : '';
    const response = await this.api.get(`/users/${userId}/bookings${params}`);
    return response.data;
  }

  async getBooking(bookingId: string): Promise<ApiResponse<Booking>> {
    const response = await this.api.get(`/bookings/${bookingId}`);
    return response.data;
  }

  async createBooking(userId: string, data: CreateBookingRequest): Promise<ApiResponse<Booking>> {
    const response = await this.api.post(`/users/${userId}/bookings`, data);
    return response.data;
  }

  async updateBookingStatus(bookingId: string, status: Booking['status']): Promise<ApiResponse<Booking>> {
    const response = await this.api.patch(`/bookings/${bookingId}/status`, {status});
    return response.data;
  }

  async cancelBooking(bookingId: string): Promise<ApiResponse<Booking>> {
    const response = await this.api.patch(`/bookings/${bookingId}/cancel`);
    return response.data;
  }

  // Expense APIs
  async getExpenses(userId: string, filters?: {category?: string; startDate?: string; endDate?: string}): Promise<ApiResponse<Expense[]>> {
    const response = await this.api.post(`/users/${userId}/expenses/search`, filters || {});
    return response.data;
  }

  async getExpense(expenseId: string): Promise<ApiResponse<Expense>> {
    const response = await this.api.get(`/expenses/${expenseId}`);
    return response.data;
  }

  async createExpense(userId: string, data: CreateExpenseRequest): Promise<ApiResponse<Expense>> {
    const response = await this.api.post(`/users/${userId}/expenses`, data);
    return response.data;
  }

  async updateExpense(expenseId: string, data: Partial<CreateExpenseRequest>): Promise<ApiResponse<Expense>> {
    const response = await this.api.put(`/expenses/${expenseId}`, data);
    return response.data;
  }

  async deleteExpense(expenseId: string): Promise<ApiResponse<void>> {
    const response = await this.api.delete(`/expenses/${expenseId}`);
    return response.data;
  }

  async getExpensesSummary(userId: string, period: 'week' | 'month' | 'year'): Promise<ApiResponse<any>> {
    const response = await this.api.get(`/users/${userId}/expenses/summary?period=${period}`);
    return response.data;
  }

  // Service Reminder APIs
  async getReminders(userId: string): Promise<ApiResponse<ServiceReminder[]>> {
    const response = await this.api.get(`/users/${userId}/reminders`);
    return response.data;
  }

  async getReminder(reminderId: string): Promise<ApiResponse<ServiceReminder>> {
    const response = await this.api.get(`/reminders/${reminderId}`);
    return response.data;
  }

  async createReminder(userId: string, data: CreateReminderRequest): Promise<ApiResponse<ServiceReminder>> {
    const response = await this.api.post(`/users/${userId}/reminders`, data);
    return response.data;
  }

  async updateReminder(reminderId: string, data: Partial<CreateReminderRequest>): Promise<ApiResponse<ServiceReminder>> {
    const response = await this.api.put(`/reminders/${reminderId}`, data);
    return response.data;
  }

  async completeReminder(reminderId: string, completedMileage?: number): Promise<ApiResponse<ServiceReminder>> {
    const response = await this.api.patch(`/reminders/${reminderId}/complete`, {completedMileage});
    return response.data;
  }

  async deleteReminder(reminderId: string): Promise<ApiResponse<void>> {
    const response = await this.api.delete(`/reminders/${reminderId}`);
    return response.data;
  }

  // Notification APIs
  async getNotifications(userId: string, unreadOnly?: boolean): Promise<ApiResponse<Notification[]>> {
    const params = unreadOnly ? '?unreadOnly=true' : '';
    const response = await this.api.get(`/users/${userId}/notifications${params}`);
    return response.data;
  }

  async markNotificationAsRead(notificationId: string): Promise<ApiResponse<void>> {
    const response = await this.api.patch(`/notifications/${notificationId}/read`);
    return response.data;
  }

  async markAllNotificationsAsRead(userId: string): Promise<ApiResponse<void>> {
    const response = await this.api.patch(`/users/${userId}/notifications/read-all`);
    return response.data;
  }

  // Analytics APIs
  async getDashboardData(userId: string): Promise<ApiResponse<any>> {
    const response = await this.api.get(`/users/${userId}/dashboard`);
    return response.data;
  }
}

export const apiService = new ApiService();