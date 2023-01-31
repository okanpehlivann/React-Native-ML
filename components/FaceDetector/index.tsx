import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {FC, memo} from 'react';
import {
  FaceDetectorProps,
  IEmotionalPercent,
  IEmotionalValue,
} from './faceDetector';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {runOnJS} from 'react-native-reanimated';
import {Face, scanFaces} from 'vision-camera-face-detector';

const FaceDetector: FC<FaceDetectorProps> = props => {
  const devices = useCameraDevices();
  const device = devices.front;

  const [faces, setFaces] = React.useState<Face[]>([]);
  const [emotionalValues] = React.useState<IEmotionalValue>({
    normalCount: 0,
    happyCount: 0,
    veryHappyCount: 0,
  });

  const [emotionalPercents] = React.useState<IEmotionalPercent>({
    normalPercent: 0,
    happyPercent: 0,
    veryHappyPercent: 0,
  });

  React.useEffect(() => {
    if (faces.length > 0 && faces[0]) {
      const smileValue = Number(faces[0]?.smilingProbability.toFixed(2));

      if (smileValue < props.normal) {
        emotionalValues.normalCount += 1;
      } else if (smileValue > props.normal && smileValue < props.happy) {
        emotionalValues.happyCount += 1;
      } else if (smileValue > props.veryHappy) {
        emotionalValues.veryHappyCount += 1;
      }
    }
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

  async function closeCamera() {
    const emotionalPercents = await calcEmotionalPercents(emotionalValues);

    props.closeCamera(emotionalPercents);
  }

  function calcEmotionalPercents(
    emotionalValues: IEmotionalValue,
  ): IEmotionalPercent {
    const total =
      emotionalValues.happyCount +
      emotionalValues.normalCount +
      emotionalValues.veryHappyCount;

    (emotionalPercents.normalPercent = Number(
      ((emotionalValues.normalCount / total) * 100).toFixed(2),
    )),
      (emotionalPercents.happyPercent = Number(
        ((emotionalValues.happyCount / total) * 100).toFixed(2),
      ));

    emotionalPercents.veryHappyPercent = Number(
      ((emotionalValues.veryHappyCount / total) * 100).toFixed(2),
    );

    return emotionalPercents;
  }

  return (
    <View style={styles.camera}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={10}
      />

      <TouchableOpacity onPress={closeCamera} style={styles.close}>
        <Text style={styles.closeBtn}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    flexGrow: 1,
    position: 'relative',
  },

  close: {
    position: 'absolute',
    top: 45,
    right: 15,
  },
  closeBtn: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default memo(FaceDetector);
