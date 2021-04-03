import React from 'react';

import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/UI/HeaderButton';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

export const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <ProductsStackNavigator.Screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
        options={({ navigation }) => {
          return {
            headerTitle: 'All Products',
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title='Cart'
                  iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                  onPress={() => {
                    navigation.navigate('Cart');
                  }}
                />
              </HeaderButtons>
            ),
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
            ),
          };
        }}
      />
      <ProductsStackNavigator.Screen
        name='ProductDetail'
        component={ProductDetailsScreen}
        options={({ navigation }) => {
          return {
            headerTitle: navigation.getParam('productTitle'),
          };
        }}
      />
      <ProductsStackNavigator.Screen
        name='Cart'
        component={CartScreen}
        options={() => {
          return {
            headerTitle: 'Your Cart',
          };
        }}
      />
    </ProductsStackNavigator.Navigator>
  );
};

const OrderStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrderStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <OrderStackNavigator.Screen
        name='Orders'
        component={OrdersScreen}
        options={({ navigation }) => {
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
            ),
          };
        }}
      />
    </OrderStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AdminStackNavigator.Screen
        name='UserProducts'
        component={UserProductsScreen}
        options={({ navigation }) => {
          return {
            headerTitle: 'Your products',
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
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title='Cart'
                  iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                  onPress={() => {
                    navigation.navigate('EditProduct');
                  }}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <AdminStackNavigator.Screen
        name='EditProduct'
        component={EditProductScreen}
        options={({ navigation }) => {
          const submitFn = navigation.getParam('submit');
          return {
            headerTitle: navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title='Save'
                  iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                  onPress={submitFn}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
    </AdminStackNavigator.Navigator>
  );
};

/**
 * React navigation v4
 */
// export const ProductsStackNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailsScreen,
//     Cart: CartScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig: any) => (
//         <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.tintColor} />
//       ),
//     },
//     defaultNavigationOptions,
//   }
// );

// export const OrdersStackNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig: any) => (
//         <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23} color={drawerConfig.tintColor} />
//       ),
//     },
//     defaultNavigationOptions,
//   }
// );

// export const AdminStackNavigator = createStackNavigator(
//   {
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen,
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig: any) => (
//         <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23} color={drawerConfig.tintColor} />
//       ),
//     },
//     defaultNavigationOptions,
//   }
// );
