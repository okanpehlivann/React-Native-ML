import {CameraDevice} from 'react-native-vision-camera';

export interface FaceDetectorProps {
  normal: number;
  happy: number;
  veryHappy: number;
  closeCamera: (emotionalValues: IEmotionalValue) => void;
}

export interface IEmotionalValue {
  unHappyCount: number;
  happyCount: number;
  veryHappyCount: number;
}
