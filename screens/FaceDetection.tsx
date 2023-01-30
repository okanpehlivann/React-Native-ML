import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import FaceDetector from '../components/FaceDetector';
import {useNavigation} from '@react-navigation/native';
import {IEmotionalValue} from '../components/FaceDetector/faceDetector';

const FaceDetection = () => {
  const navigation = useNavigation();

  function closeCamera(emotionalValues: IEmotionalValue) {
    console.log('CLOSE CAMERA ', emotionalValues);

    navigation.navigate('Menu', {
      emotionalValues: emotionalValues,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <FaceDetector
        closeCamera={closeCamera}
        normal={0.15}
        happy={0.8}
        veryHappy={0.85}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
});

export default FaceDetection;
