import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import { ROOT_STATE } from '../../store/combineReducers';
import * as cartActions from '../../store/actions/cart.actions';
import * as orderActions from '../../store/actions/order.actions'
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import Card from '../../components/UI/Card';


const CartScreen: NavigationStackScreenComponent = () => {
  const cartTotalAmount = useSelector((state: ROOT_STATE) => state.cart.totalAmount);
  const cartItems = useSelector((state: ROOT_STATE) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        id: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a,b) => a.id > b.id ? 1 : -1);
  });
  const dispatch = useDispatch()
  return (
    <Card style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) as any * 100) / 100}</Text>
        </Text>
        <Button title='Order Now' onPress={() => {dispatch(orderActions.addOrder(cartItems, cartTotalAmount))}} color={Colors.accent} disabled={cartItems.length === 0} />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <CartItem
            title={itemData.item.productTitle}
            quantity={itemData.item.quantity}
            amount={itemData.item.sum}
            onRemove={() => {dispatch(cartActions.removeFromCart(itemData.item.id))}}
            deletable
          />
        )}
      />
    </Card>
  );
};

CartScreen.navigationOptions = () => {
    return {
        headerTitle: 'Your Cart'
    }
}

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    marginVertical: 20,
    marginHorizontal: 8
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 15,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});
