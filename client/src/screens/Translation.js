import React from 'react';
import { Text } from 'react-native';

const Translation = ({ route, navigation }) => {
  const { imageName } = route.params;
  return <Text>{imageName}</Text>;
};

export default Translation;
