import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

type IProps = {
    title: string;
    onPress: () => {}
}

const CustomHeaderButton = (props: IProps) => {
  return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Platform.OS === 'android' ? 'white' : Colors.primary} />;
};

export default CustomHeaderButton
const styles = StyleSheet.create({});
