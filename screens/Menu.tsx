import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import React from 'react';

const Menu = () => {
  const navigation = useNavigation();

  const [menuItems] = React.useState([
    {
      type: 'face-detector',
      text: 'Face Detector',
    },
  ]);

  function goToPage(type: string) {
    switch (type) {
      case 'face-detector':
        navigation.navigate('FaceDetector');
        break;

      default:
        break;
    }
  }

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;
