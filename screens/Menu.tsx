import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  IEmotionalPercent,
  IEmotionalValue,
} from '../components/FaceDetector/faceDetector';
import ProgressBar from '../components/ProgressBar';

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
              <Text style={styles.title}>
                NORMAL: {emotionalPercents?.normalPercent}
              </Text>
              <ProgressBar
                barColor="red"
                emotionalPercent={emotionalPercents?.normalPercent}
              />
            </View>

            <View style={{margin: 20}}>
              <Text style={styles.title}>
                MUTLU: {emotionalPercents?.happyPercent}
              </Text>
              <ProgressBar
                barColor="green"
                emotionalPercent={emotionalPercents?.happyPercent}
              />
            </View>

            <View style={{margin: 20}}>
              <Text style={styles.title}>
                ÇOK MUTLU: {emotionalPercents?.veryHappyPercent}
              </Text>
              <ProgressBar
                barColor="blue"
                emotionalPercent={emotionalPercents?.veryHappyPercent}
              />
            </View>
          </>
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default Menu;
