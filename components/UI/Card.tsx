import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

type IProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Card = ({ children, style }: IProps) => {
  return <View style={[style, styles.card]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
