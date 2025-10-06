// CarCare Mobile App - Core JavaScript Functionality

// Global state management
const CarCareApp = {
    user: {
        name: 'Alex',
        vehicle: {
            make: 'BMW',
            model: '3 Series',
            year: 2023,
            mileage: 12450
        },
        notifications: 3
    },
    
    reminders: [
        {
            id: 1,
            type: 'oil',
            title: 'Oil Change Due',
            description: 'Overdue by 500 miles',
            status: 'urgent',
            dueDate: '2024-10-01',
            completed: false
        },
        {
            id: 2,
            type: 'insurance',
            title: 'Insurance Renewal',
            description: 'Comprehensive coverage',
            status: 'due_soon',
            dueDate: '2024-10-15',
            completed: false
        },
        {
            id: 3,
            type: 'tire',
            title: 'Tire Rotation',
            description: 'Completed last week',
            status: 'completed',
            dueDate: '2024-09-25',
            completed: true
        }
    ],
    
    expenses: [
        { id: 1, amount: 45.00, category: 'fuel', date: '2024-10-01', description: 'Shell Station' },
        { id: 2, amount: 180.00, category: 'maintenance', date: '2024-09-28', description: 'Oil Change Service' },
        { id: 3, amount: 95.00, category: 'insurance', date: '2024-09-25', description: 'Monthly Insurance' },
        { id: 4, amount: 25.00, category: 'accessories', date: '2024-09-20', description: 'Car Wash Supplies' }
    ],
    
    bookings: [
        {
            id: 1,
            service: 'car_wash',
            provider: 'AutoShine Center',
            date: '2024-10-03',
            time: '14:00',
            status: 'confirmed',
            price: 35.00
        }
    ],
    
    garages: [
        {
            id: 1,
            name: 'AutoShine Center',
            distance: '0.8 miles',
            rating: 4.8,
            services: ['car_wash', 'detailing'],
            image: 'resources/garage-1.jpg',
            lat: 40.7128,
            lng: -74.0060
        },
        {
            id: 2,
            name: 'Premium Auto Care',
            distance: '1.2 miles',
            rating: 4.6,
            services: ['oil_change', 'maintenance', 'repairs'],
            image: 'resources/garage-2.jpg',
            lat: 40.7138,
            lng: -74.0070
        },
        {
            id: 3,
            name: 'Quick Lube Express',
            distance: '1.5 miles',
            rating: 4.3,
            services: ['oil_change', 'quick_service'],
            image: 'resources/garage-3.jpg',
            lat: 40.7148,
            lng: -74.0080
        },
        {
            id: 4,
            name: 'Family Auto Repair',
            distance: '2.1 miles',
            rating: 4.7,
            services: ['repairs', 'maintenance', 'inspection'],
            image: 'resources/garage-4.jpg',
            lat: 40.7158,
            lng: -74.0090
        },
        {
            id: 5,
            name: 'Tech Auto Diagnostics',
            distance: '2.3 miles',
            rating: 4.5,
            services: ['diagnostics', 'repairs', 'maintenance'],
            image: 'resources/garage-5.jpg',
            lat: 40.7168,
            lng: -74.0100
        },
        {
            id: 6,
            name: 'Tire & Wheel Pro',
            distance: '2.8 miles',
            rating: 4.4,
            services: ['tire_service', 'alignment', 'balancing'],
            image: 'resources/garage-6.jpg',
            lat: 40.7178,
            lng: -74.0110
        }
    ]
};

// Utility functions
const Utils = {
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },
    
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    },
    
    formatTime: function(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    },
    
    getStatusColor: function(status) {
        const colors = {
            'urgent': 'text-red-600 bg-red-100',
            'due_soon': 'text-yellow-600 bg-yellow-100',
            'completed': 'text-green-600 bg-green-100',
            'confirmed': 'text-blue-600 bg-blue-100'
        };
        return colors[status] || 'text-gray-600 bg-gray-100';
    },
    
    getCategoryIcon: function(category) {
        const icons = {
            'fuel': '⛽',
            'maintenance': '🔧',
            'insurance': '🛡️',
            'repairs': '⚙️',
            'accessories': '✨',
            'car_wash': '🚗',
            'oil_change': '🛢️',
            'tire_service': '🛞'
        };
        return icons[category] || '📋';
    },
    
    showToast: function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 left-4 right-4 z-50 p-4 rounded-lg text-white ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
        }`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        anime({
            targets: toast,
            translateY: [-50, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutCubic'
        });
        
        setTimeout(() => {
            anime({
                targets: toast,
                translateY: [0, -50],
                opacity: [1, 0],
                duration: 200,
                easing: 'easeInCubic',
                complete: () => {
                    document.body.removeChild(toast);
                }
            });
        }, 3000);
    },
    
    showLoading: function(element) {
        element.innerHTML = '<div class="flex items-center justify-center py-8"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div></div>';
    },
    
    hideModal: function(modalId) {
        const modal = document.getElementById(modalId);
        const content = modal.querySelector('.bg-white, .bg-gray-800');
        
        anime({
            targets: content,
            translateY: [0, 100],
            opacity: [1, 0],
            duration: 200,
            easing: 'easeInCubic',
            complete: () => {
                modal.classList.add('hidden');
            }
        });
    },
    
    showModal: function(modalId) {
        const modal = document.getElementById(modalId);
        const content = modal.querySelector('.bg-white, .bg-gray-800');
        
        modal.classList.remove('hidden');
        
        anime({
            targets: content,
            translateY: [100, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutCubic'
        });
    }
};

// Animation helpers
const Animations = {
    fadeInUp: function(elements, delay = 0) {
        anime({
            targets: elements,
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 600,
            delay: anime.stagger(100, {start: delay}),
            easing: 'easeOutCubic'
        });
    },
    
    staggerCards: function(selector) {
        anime({
            targets: selector,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 400,
            delay: anime.stagger(100),
            easing: 'easeOutCubic'
        });
    },
    
    pulseButton: function(button) {
        anime({
            targets: button,
            scale: [1, 0.95, 1],
            duration: 200,
            easing: 'easeInOutQuad'
        });
    },
    
    slideInRight: function(element) {
        anime({
            targets: element,
            translateX: [100, 0],
            opacity: [0, 1],
            duration: 400,
            easing: 'easeOutCubic'
        });
    }
};

// Form handling
const Forms = {
    validateExpense: function(formData) {
        const errors = [];
        
        if (!formData.amount || formData.amount <= 0) {
            errors.push('Amount must be greater than 0');
        }
        
        if (!formData.category) {
            errors.push('Category is required');
        }
        
        return errors;
    },
    
    validateBooking: function(formData) {
        const errors = [];
        
        if (!formData.service) {
            errors.push('Service type is required');
        }
        
        if (!formData.date) {
            errors.push('Date is required');
        }
        
        if (!formData.time) {
            errors.push('Time is required');
        }
        
        return errors;
    },
    
    submitExpense: function(formData) {
        const errors = this.validateExpense(formData);
        
        if (errors.length > 0) {
            Utils.showToast(errors[0], 'error');
            return false;
        }
        
        const expense = {
            id: Date.now(),
            amount: parseFloat(formData.amount),
            category: formData.category,
            description: formData.description || '',
            date: new Date().toISOString().split('T')[0]
        };
        
        CarCareApp.expenses.push(expense);
        Utils.showToast('Expense added successfully!', 'success');
        return true;
    }
};

// Local storage management
const Storage = {
    save: function(key, data) {
        try {
            localStorage.setItem(`carcare_${key}`, JSON.stringify(data));
        } catch (e) {
            console.warn('Failed to save to localStorage:', e);
        }
    },
    
    load: function(key) {
        try {
            const data = localStorage.getItem(`carcare_${key}`);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.warn('Failed to load from localStorage:', e);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(`carcare_${key}`);
        } catch (e) {
            console.warn('Failed to remove from localStorage:', e);
        }
    }
};

// Navigation management
const Navigation = {
    init: function() {
        this.updateActiveNav();
        this.addNavListeners();
    },
    
    updateActiveNav: function() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                item.classList.add('active');
            }
        });
    },
    
    addNavListeners: function() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                const button = this.querySelector('svg') || this;
                Animations.pulseButton(button);
            });
        });
    }
};

// Touch and gesture handling
const Touch = {
    init: function() {
        this.addTouchFeedback();
        this.addSwipeHandlers();
    },
    
    addTouchFeedback: function() {
        const buttons = document.querySelectorAll('button, .quick-action-btn, .reminder-card');
        
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.opacity = '0.8';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
                this.style.opacity = '1';
            });
            
            button.addEventListener('touchcancel', function() {
                this.style.transform = 'scale(1)';
                this.style.opacity = '1';
            });
        });
    },
    
    addSwipeHandlers: function() {
        let startX, startY, currentX, currentY;
        
        document.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', function(e) {
            if (!startX || !startY) return;
            
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', function(e) {
            if (!startX || !startY || !currentX || !currentY) return;
            
            const diffX = startX - currentX;
            const diffY = startY - currentY;
            
            // Horizontal swipe
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left
                    this.handleSwipeLeft(e.target);
                } else {
                    // Swipe right
                    this.handleSwipeRight(e.target);
                }
            }
            
            startX = startY = currentX = currentY = null;
        }.bind(this));
    },
    
    handleSwipeLeft: function(target) {
        const reminderCard = target.closest('.reminder-card');
        if (reminderCard) {
            // Mark as complete or delete
            Utils.showToast('Swipe left detected', 'info');
        }
    },
    
    handleSwipeRight: function(target) {
        const reminderCard = target.closest('.reminder-card');
        if (reminderCard) {
            // Quick actions
            Utils.showToast('Swipe right detected', 'info');
        }
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    Navigation.init();
    Touch.init();
    
    // Load saved data
    const savedExpenses = Storage.load('expenses');
    if (savedExpenses) {
        CarCareApp.expenses = savedExpenses;
    }
    
    // Save data before page unload
    window.addEventListener('beforeunload', function() {
        Storage.save('expenses', CarCareApp.expenses);
    });
    
    // Initialize animations
    setTimeout(() => {
        const animatedElements = document.querySelectorAll('.card-shadow, .reminder-card, .bg-white');
        if (animatedElements.length > 0) {
            Animations.staggerCards(animatedElements);
        }
    }, 100);
});

// Export for global access
window.CarCareApp = CarCareApp;
window.Utils = Utils;
window.Animations = Animations;
window.Forms = Forms;
window.Storage = Storage;