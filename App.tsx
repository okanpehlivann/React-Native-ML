import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FaceDetection from './screens/FaceDetection';
import Menu from './screens/Menu';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="FaceDetector" component={FaceDetection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
