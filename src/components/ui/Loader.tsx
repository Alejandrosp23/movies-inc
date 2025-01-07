import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

type LoaderProps = {
  message?: string;
};

export function Loader({ message = 'Loading...' }: LoaderProps) {
  return (
    <View style={styles.container} testID='loader'>
      <ActivityIndicator size="large" color="#007BFF" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});
