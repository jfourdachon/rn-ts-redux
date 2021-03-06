import React from 'react';
import { TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';

type Iprops = {
  children: React.ReactNode;
  style?: {};
  onPress: () => void
  useForeground: boolean
};

const Touchable = (props: Iprops) => {
  return Platform.Version >= 21 ? <TouchableNativeFeedback {...props}>{props.children}</TouchableNativeFeedback> : <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
};

export default Touchable;
