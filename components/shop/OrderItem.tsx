import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import Order from '../../models/order';
import CartItem from './CartItem';

type IProps = {
  date: string;
  amount: number;
  order: Order;
};

const OrderItem = ({ date, amount, order }: IProps) => {
  const [showDetails, setShowDetails] = useState(false);
  console.log({ showDetails });
  console.log({ order });

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button title={showDetails ? 'Hide details' : 'Show details'} color={Colors.primary} onPress={() => setShowDetails(!showDetails)} />
      {showDetails && (
        <ScrollView style={styles.detailsItem}>
          {order.items.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
              deletable={false}
              onRemove={() => {}}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888',
  },
  detailsItem: {
    width: '100%'
  }
});
