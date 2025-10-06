import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import ExpensesScreen from '../screens/ExpensesScreen';
import LocatorScreen from '../screens/LocatorScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VehicleDetailsScreen from '../screens/VehicleDetailsScreen';
import GarageDetailsScreen from '../screens/GarageDetailsScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import AddReminderScreen from '../screens/AddReminderScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  VehicleDetails: {vehicleId: string};
  GarageDetails: {garageId: string};
  AddExpense: {vehicleId?: string};
  AddReminder: {vehicleId?: string};
  Profile: undefined;
};

export type TabParamList = {
  Home: undefined;
  Booking: undefined;
  Expenses: undefined;
  Locator: undefined;
  Notifications: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Booking':
              iconName = 'event';
              break;
            case 'Expenses':
              iconName = 'account-balance-wallet';
              break;
            case 'Locator':
              iconName = 'location-on';
              break;
            case 'Notifications':
              iconName = 'notifications';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D72638',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="Expenses" component={ExpensesScreen} />
      <Tab.Screen name="Locator" component={LocatorScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0A2342',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VehicleDetails"
          component={VehicleDetailsScreen}
          options={{title: 'Vehicle Details'}}
        />
        <Stack.Screen
          name="GarageDetails"
          component={GarageDetailsScreen}
          options={{title: 'Garage Details'}}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpenseScreen}
          options={{title: 'Add Expense'}}
        />
        <Stack.Screen
          name="AddReminder"
          component={AddReminderScreen}
          options={{title: 'Add Reminder'}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{title: 'Profile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;