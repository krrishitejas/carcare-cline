import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

const ExpensesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Expenses</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 24, fontWeight: 'bold'},
});

export default ExpensesScreen;