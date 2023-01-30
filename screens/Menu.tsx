import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {IEmotionalValue} from '../components/FaceDetector/faceDetector';

const Menu = ({route}: any) => {
  const navigation = useNavigation();

  const [menuItems] = React.useState([
    {
      type: 'face-detector',
      text: 'Face Detector',
    },
  ]);

  const [emotionalValues, setEmotionalValues] =
    React.useState<IEmotionalValue>();

  function goToPage(type: string) {
    switch (type) {
      case 'face-detector':
        navigation.navigate('FaceDetector');
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    console.log('RENDER');
    setEmotionalValues(route.params?.emotionalValues);
  }, [route]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {menuItems?.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              style={{margin: 20}}
              onPress={() => goToPage(item.type)}>
              <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        })}

        {emotionalValues && Object.keys(emotionalValues).length > 0 ? (
          <>
            <View>
              <Text>NORMAL: {emotionalValues?.unHappyCount}</Text>
              <Text>MUTLU: {emotionalValues?.happyCount}</Text>
              <Text>ÇOK MUTLU: {emotionalValues?.veryHappyCount}</Text>
            </View>
          </>
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;
