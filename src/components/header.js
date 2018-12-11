import React from 'react';
import { Text, View } from 'react-native';

const Header = () => {
const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{title}</Text>
    </View>
  );
};

let title = 'Samlebåndet';

const styles = {
  viewStyle: {
    backgroundColor: '#b7f588',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15
  },
  textStyle: {
    fontSize: 20
  }
};

export default Header;
