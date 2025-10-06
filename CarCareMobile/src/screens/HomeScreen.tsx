import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import {apiService} from '../services/api';
import {
  User,
  Vehicle,
  ServiceReminder,
  Expense,
  Notification,
} from '../types';

const HomeScreen = ({navigation}: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [reminders, setReminders] = useState<ServiceReminder[]>([]);
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // For demo purposes, using mock data
      const mockUser: User = {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        phone: '(555) 123-4567',
        avatarUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockVehicle: Vehicle = {
        id: '1',
        userId: '1',
        make: 'BMW',
        model: '3 Series',
        year: 2023,
        mileage: 12450,
        healthScore: 95,
        color: 'Black',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockReminders: ServiceReminder[] = [
        {
          id: '1',
          userId: '1',
          vehicleId: '1',
          title: 'Oil Change Due',
          description: 'Overdue by 500 miles',
          reminderType: 'oil_change',
          dueDate: '2024-10-01',
          priority: 'urgent',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          userId: '1',
          vehicleId: '1',
          title: 'Insurance Renewal',
          description: 'Comprehensive coverage',
          reminderType: 'insurance_renewal',
          dueDate: '2024-10-15',
          priority: 'medium',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      setUser(mockUser);
      setVehicle(mockVehicle);
      setReminders(mockReminders);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const getStatusColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '#DC2626';
      case 'high':
        return '#F59E0B';
      case 'medium':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getCategoryIcon = (reminderType: string) => {
    switch (reminderType) {
      case 'oil_change':
        return '🛢️';
      case 'insurance_renewal':
        return '🛡️';
      case 'tire_rotation':
        return '🛞';
      default:
        return '🔧';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              <Image
                source={{uri: user?.avatarUrl || 'https://via.placeholder.com/40'}}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.greeting}>Good morning, {user?.name || 'User'}!</Text>
                <Text style={styles.vehicleInfo}>
                  Your {vehicle?.make} {vehicle?.model} is ready for service
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => navigation.navigate('Notifications')}>
              <Text style={styles.notificationIcon}>🔔</Text>
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Vehicle Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{vehicle?.mileage?.toLocaleString() || '0'}</Text>
              <Text style={styles.statLabel}>Miles</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>8.2</Text>
              <Text style={styles.statLabel}>MPG</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{vehicle?.healthScore || 0}%</Text>
              <Text style={styles.statLabel}>Health</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionPrimary]}
              onPress={() => navigation.navigate('Booking')}>
              <Text style={styles.actionIcon}>🚗</Text>
              <Text style={styles.actionText}>Book Wash</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionSecondary]}
              onPress={() => navigation.navigate('Locator')}>
              <Text style={styles.actionIcon}>📍</Text>
              <Text style={styles.actionText}>Find Garage</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionTertiary]}
              onPress={() => navigation.navigate('AddExpense')}>
              <Text style={styles.actionIcon}>💰</Text>
              <Text style={styles.actionText}>Add Expense</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Service Reminders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Service Reminders</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddReminder')}>
              <Text style={styles.addButton}>+ Add</Text>
            </TouchableOpacity>
          </View>
          
          {reminders.map((reminder) => (
            <View key={reminder.id} style={styles.reminderCard}>
              <View style={styles.reminderContent}>
                <View style={styles.reminderIconContainer}>
                  <Text style={styles.reminderIcon}>
                    {getCategoryIcon(reminder.reminderType)}
                  </Text>
                </View>
                <View style={styles.reminderInfo}>
                  <Text style={styles.reminderTitle}>{reminder.title}</Text>
                  <Text style={styles.reminderDescription}>{reminder.description}</Text>
                </View>
                <View style={styles.reminderStatus}>
                  <Text
                    style={[
                      styles.statusText,
                      {color: getStatusColor(reminder.priority)},
                    ]}>
                    {reminder.priority.toUpperCase()}
                  </Text>
                  <Text style={styles.dueDate}>
                    Due: {new Date(reminder.dueDate || '').toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Expense Summary */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>This Month's Expenses</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Expenses')}>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.expenseCard}>
            <View style={styles.expenseSummary}>
              <View style={styles.expenseItem}>
                <Text style={styles.expenseValue}>$245</Text>
                <Text style={styles.expenseLabel}>Fuel</Text>
              </View>
              <View style={styles.expenseItem}>
                <Text style={styles.expenseValue}>$180</Text>
                <Text style={styles.expenseLabel}>Maintenance</Text>
              </View>
              <View style={styles.expenseItem}>
                <Text style={styles.expenseValue}>$95</Text>
                <Text style={styles.expenseLabel}>Insurance</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text>✅</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Car wash booked</Text>
                <Text style={styles.activitySubtitle}>AutoShine Center - Tomorrow 2:00 PM</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text>💰</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Expense added</Text>
                <Text style={styles.activitySubtitle}>Fuel - $45.00 at Shell Station</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#0A2342',
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  vehicleInfo: {
    color: '#93C5FD',
    fontSize: 14,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#DC2626',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#93C5FD',
    fontSize: 12,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  addButton: {
    color: '#D72638',
    fontSize: 16,
    fontWeight: '600',
  },
  viewAllButton: {
    color: '#D72638',
    fontSize: 14,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 4,
    borderRadius: 12,
  },
  actionPrimary: {
    backgroundColor: '#FEF2F2',
  },
  actionSecondary: {
    backgroundColor: '#EFF6FF',
  },
  actionTertiary: {
    backgroundColor: '#F0FDF4',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  reminderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#D72638',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reminderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reminderIcon: {
    fontSize: 20,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  reminderDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  reminderStatus: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  expenseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expenseSummary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  expenseItem: {
    alignItems: 'center',
  },
  expenseValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  expenseLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
});

export default HomeScreen;