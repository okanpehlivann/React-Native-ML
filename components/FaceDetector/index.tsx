import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, {FC, memo} from 'react';
import {FaceDetectorProps} from './faceDetector';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {runOnJS} from 'react-native-reanimated';
import {scanFaces} from 'vision-camera-face-detector';

const FaceDetector: FC<FaceDetectorProps> = props => {
  const devices = useCameraDevices();
  const device = devices.front;

  const [faces, setFaces] = React.useState<any[]>([]);

  React.useEffect(() => {
    console.log('FACE => ', JSON.stringify(faces[0]));

    // if (faces.length > 0 && faces[0]) {

    //   setBox({
    //     width: faces[0].bounds.boundingCenterX,
    //     height: faces[0].bounds.boundingCenterY,
    //     x: faces[0].bounds?.x,
    //     y: faces[0].bounds?.y,
    //     smileValue: Number.parseFloat(faces[0].smilingProbability).toFixed(2),
    //   });
    // } else {
    //   setBox({});
    // }
  }, [faces]);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      console.log('STATUS => ', status);
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
    <Camera
      style={styles.camera}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
      frameProcessorFps={5}
    />
  );
};

const styles = StyleSheet.create({
  camera: {
    flexGrow: 1,
  },
});

export default memo(FaceDetector);
