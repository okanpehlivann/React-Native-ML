import {SafeAreaView, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {runOnJS} from 'react-native-reanimated';
import {scanFaces, Face} from 'vision-camera-face-detector';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FaceDetection = () => {
  const devices = useCameraDevices();
  const device = devices.front;

  const [hasPermission, setHasPermission] = React.useState(false);
  const [faces, setFaces] = React.useState<any[]>([]);
  const [box, setBox] = React.useState<any>({});

  React.useEffect(() => {
    if (faces.length > 0 && faces[0]) {
      console.log('FACE => ', JSON.stringify(faces[0]));

      setBox({
        width: faces[0].bounds.boundingCenterX,
        height: faces[0].bounds.boundingCenterY,
        x: faces[0].bounds?.x,
        y: faces[0].bounds?.y,
        smileValue: Number.parseFloat(faces[0].smilingProbability).toFixed(2),
      });
    } else {
      setBox({});
    }
  }, [faces]);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const scannedFaces = scanFaces(frame);
    runOnJS(setFaces)(scannedFaces);
  }, []);

  if (device == null) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />

      {Object.keys(box).length > 0 ? (
        <>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontWeight: 'bold',
                fontSize: 18,
                zIndex: 4000,
              }}>
              {box?.smileValue < 0.15
                ? 'Normal'
                : box?.smileValue < 0.5
                ? 'Tebessüm'
                : box?.smileValue < 0.8
                ? 'Gülümsüyor'
                : 'Kahkaha'}
            </Text>
          </View>

          <View
            style={{
              position: 'absolute',
              top: 100,
              left: 10,
              backgroundColor:
                box?.smileValue > 0.5
                  ? 'rgba(0,255,0,0.1)'
                  : 'rgba(255,0,0,0.1)',
              height: windowHeight - 300,
              width: windowWidth - 20,
              borderWidth: 7,
              borderColor: box?.smileValue > 0.5 ? 'green' : 'red',
              zIndex: 3000,
            }}></View>
        </>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    position: 'relative',
  },
  camera: {
    flexGrow: 1,
  },
});

export default FaceDetection;
