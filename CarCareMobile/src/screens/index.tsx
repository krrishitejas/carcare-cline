import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

const ProfileScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Profile</Text>
  </SafeAreaView>
);

const VehicleDetailsScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Vehicle Details</Text>
  </SafeAreaView>
);

const GarageDetailsScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Garage Details</Text>
  </SafeAreaView>
);

const AddExpenseScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Add Expense</Text>
  </SafeAreaView>
);

const AddReminderScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Add Reminder</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 24, fontWeight: 'bold'},
});

export {
  ProfileScreen,
  VehicleDetailsScreen,
  GarageDetailsScreen,
  AddExpenseScreen,
  AddReminderScreen,
};