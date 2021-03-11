import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Touchable from '../touchable/Touchable';
import { Ionicons } from '@expo/vector-icons';

type IProps = {
  title: string;
  quantity: number;
  amount: number;
  onRemove: () => void;
  deletable: boolean
};

const CartItem = ({ title, quantity, amount, onRemove, deletable }: IProps) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemdata}>
        <Text style={styles.quantity}>{quantity} </Text><Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.itemdata}>
        <Text style={styles.text}>${amount.toFixed(2)}</Text>
        {deletable  && 
        <Touchable useForeground onPress={onRemove} style={styles.deleteButton}>
          <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size={23} color="red" />
        </Touchable>
        }
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemdata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16,
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});
