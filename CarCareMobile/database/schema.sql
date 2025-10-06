-- CarCare Mobile App Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    avatar_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    vin VARCHAR(17),
    license_plate VARCHAR(20),
    color VARCHAR(30),
    mileage INTEGER DEFAULT 0,
    fuel_efficiency DECIMAL(4,2),
    health_score INTEGER DEFAULT 100,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Garages/Service Centers table
CREATE TABLE IF NOT EXISTS garages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    rating DECIMAL(2,1) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0,
    image_url VARCHAR(500),
    opening_hours JSONB,
    services TEXT[] NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service types table
CREATE TABLE IF NOT EXISTS service_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2),
    duration_minutes INTEGER,
    category VARCHAR(30) NOT NULL,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    garage_id UUID REFERENCES garages(id) ON DELETE SET NULL,
    service_type_id UUID REFERENCES service_types(id) ON DELETE SET NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
    price DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    category VARCHAR(30) NOT NULL CHECK (category IN ('fuel', 'maintenance', 'insurance', 'repairs', 'accessories', 'car_wash', 'parking', 'tolls', 'other')),
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    expense_date DATE NOT NULL,
    receipt_url VARCHAR(500),
    mileage_at_expense INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Service reminders table
CREATE TABLE IF NOT EXISTS service_reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    reminder_type VARCHAR(30) NOT NULL CHECK (reminder_type IN ('oil_change', 'tire_rotation', 'brake_check', 'insurance_renewal', 'registration_renewal', 'inspection', 'general_maintenance')),
    due_date DATE,
    due_mileage INTEGER,
    priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dismissed', 'overdue')),
    completed_date DATE,
    completed_mileage INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(30) NOT NULL CHECK (type IN ('reminder', 'booking', 'expense', 'system', 'promotion')),
    is_read BOOLEAN DEFAULT false,
    action_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Garage reviews table
CREATE TABLE IF NOT EXISTS garage_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    garage_id UUID REFERENCES garages(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, garage_id, booking_id)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_vehicles_user_id ON vehicles(user_id);
CREATE INDEX IF NOT EXISTS idx_garages_location ON garages(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_garage_id ON bookings(garage_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings(booking_date, booking_time);
CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON expenses(category);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(expense_date);
CREATE INDEX IF NOT EXISTS idx_reminders_user_id ON service_reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_due_date ON service_reminders(due_date);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read);

-- Insert sample service types
INSERT INTO service_types (name, description, base_price, duration_minutes, category, icon) VALUES
('Basic Car Wash', 'Exterior wash, dry, and tire shine', 25.00, 30, 'car_wash', 'car-wash'),
('Premium Car Wash', 'Full service including interior vacuum', 45.00, 45, 'car_wash', 'car-wash'),
('Full Detailing', 'Complete interior and exterior detailing', 120.00, 180, 'car_wash', 'sparkles'),
('Oil Change', 'Engine oil and filter replacement', 45.00, 30, 'maintenance', 'oil-can'),
('Tire Rotation', 'Rotate tires for even wear', 35.00, 45, 'maintenance', 'tire'),
('Brake Inspection', 'Complete brake system check', 75.00, 60, 'maintenance', 'brake-warning'),
('General Inspection', 'Comprehensive vehicle inspection', 100.00, 90, 'maintenance', 'clipboard-check')
ON CONFLICT DO NOTHING;

-- Insert sample garages
INSERT INTO garages (name, address, latitude, longitude, phone, rating, total_reviews, services) VALUES
('AutoShine Center', '123 Main St, New York, NY 10001', 40.7128, -74.0060, '(555) 123-4567', 4.8, 125, ARRAY['car_wash', 'detailing']),
('Premium Auto Care', '456 Broadway, New York, NY 10013', 40.7138, -74.0070, '(555) 234-5678', 4.6, 89, ARRAY['oil_change', 'maintenance', 'repairs']),
('Quick Lube Express', '789 Park Ave, New York, NY 10021', 40.7148, -74.0080, '(555) 345-6789', 4.3, 156, ARRAY['oil_change', 'quick_service']),
('Family Auto Repair', '321 5th Ave, New York, NY 10016', 40.7158, -74.0090, '(555) 456-7890', 4.7, 203, ARRAY['repairs', 'maintenance', 'inspection']),
('Tech Auto Diagnostics', '654 Madison Ave, New York, NY 10022', 40.7168, -74.0100, '(555) 567-8901', 4.5, 78, ARRAY['diagnostics', 'repairs', 'maintenance']),
('Tire & Wheel Pro', '987 Lexington Ave, New York, NY 10075', 40.7178, -74.0110, '(555) 678-9012', 4.4, 92, ARRAY['tire_service', 'alignment', 'balancing'])
ON CONFLICT DO NOTHING;