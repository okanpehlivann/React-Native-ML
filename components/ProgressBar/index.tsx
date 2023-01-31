import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {ProgressBarProps} from './progressBar';

const ProgressBar: FC<ProgressBarProps> = props => {
  return (
    <View>
      <View
        style={{
          width: '100%',
          height: 10,
          backgroundColor: 'gray',
          marginTop: 20,
          borderRadius: 20,
        }}>
        <View
          style={{
            width: `${props.emotionalPercent}%`,
            height: 10,
            backgroundColor: `${props.barColor}`,
            borderRadius: 20,
          }}></View>
      </View>
    </View>
  );
};

export default ProgressBar;
