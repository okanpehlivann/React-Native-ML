import {CameraDevice} from 'react-native-vision-camera';

export interface FaceDetectorProps {
  normal: number;
  happy: number;
  veryHappy: number;
  closeCamera: (emotionalPercent: IEmotionalPercent) => void;
}

export interface IEmotionalValue {
  unHappyCount: number;
  happyCount: number;
  veryHappyCount: number;
}

export interface IEmotionalPercent {
  unHappyPercent: number;
  happyPercent: number;
  veryHappyPercent: number;
}
