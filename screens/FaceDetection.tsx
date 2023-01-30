import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import FaceDetector from '../components/FaceDetector';

const FaceDetection = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FaceDetector device={'front'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    position: 'relative',
  },
});

export default FaceDetection;
