import React from 'react';
import { FlatList, Platform, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { HeaderTitle, NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { ROOT_STATE } from '../../store/combineReducers';

const OrdersScreen: NavigationStackScreenComponent = () => {
  const orders = useSelector((state: ROOT_STATE) => state.orders.orders);
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <OrderItem amount={itemData.item.totalAMount} date={itemData.item.date} onPress={() => {}} />}
    />
  );
};

OrdersScreen.navigationOptions = ({navigation}) => {
  return { 
      headerTitle: 'Your Orders',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
    };
};

export default OrdersScreen;
