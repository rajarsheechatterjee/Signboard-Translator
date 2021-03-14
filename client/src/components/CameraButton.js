import React from 'react';
import { TouchableRipple } from 'react-native-paper';

const CameraButton = ({onPress}) => (
    <TouchableRipple
      style={{
        borderColor: 'white',
        borderWidth: 3,
        marginBottom: 37,
        padding: 5,
        borderRadius: 50,
      }}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: 'white',
          width: 55,
          height: 55,
          borderRadius: 50,
          borderColor: 'white',
        }}
      />
    </TouchableRipple>;

)

export default CameraButton;