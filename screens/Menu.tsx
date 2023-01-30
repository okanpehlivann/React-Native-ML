import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  IEmotionalPercent,
  IEmotionalValue,
} from '../components/FaceDetector/faceDetector';

const Menu = ({route}: any) => {
  const navigation = useNavigation();

  const [menuItems] = React.useState([
    {
      type: 'face-detector',
      text: 'Duygu Durumunu Ölç',
    },
  ]);

  const [emotionalPercents, setEmotionalPercents] =
    React.useState<IEmotionalPercent>();

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
    setEmotionalPercents(route.params?.emotionalPercents);
  }, [route]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {menuItems?.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                margin: 20,
                backgroundColor: 'gray',
                padding: 10,
                borderRadius: 10,
              }}
              onPress={() => goToPage(item.type)}>
              <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
                {item.text}
              </Text>
            </TouchableOpacity>
          );
        })}

        {emotionalPercents && Object.keys(emotionalPercents).length > 0 ? (
          <>
            <View style={{margin: 20}}>
              <Text style={{}}>
                NORMAL: {emotionalPercents?.unHappyPercent}
              </Text>
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
                      width: `${emotionalPercents?.unHappyPercent}%`,
                      height: 10,
                      backgroundColor: 'red',
                      borderRadius: 20,
                    }}></View>
                </View>
              </View>
            </View>

            <View style={{margin: 20}}>
              <Text style={{}}>MUTLU: {emotionalPercents?.happyPercent}</Text>
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
                      width: `${emotionalPercents?.happyPercent}%`,
                      height: 10,
                      backgroundColor: 'green',
                      borderRadius: 20,
                    }}></View>
                </View>
              </View>
            </View>

            <View style={{margin: 20}}>
              <Text style={{}}>
                ÇOK MUTLU: {emotionalPercents?.veryHappyPercent}
              </Text>
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
                      width: `${emotionalPercents?.veryHappyPercent}%`,
                      height: 10,
                      backgroundColor: 'blue',
                      borderRadius: 20,
                    }}></View>
                </View>
              </View>
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
