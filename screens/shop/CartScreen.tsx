import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { ROOT_STATE } from '../../store/combineReducers';

const CartScreen = () => {

const cartTotalAmount = useSelector((state: ROOT_STATE) => state.cart.totalAmount)

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${cartTotalAmount}</Text>
        </Text>
        <Button title='Order Now' onPress={() => {}} />
      </View>
      <View>
        <Text>Cart Items</Text>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
    screen: {
        marginVertical: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginHorizontal: 15,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});
