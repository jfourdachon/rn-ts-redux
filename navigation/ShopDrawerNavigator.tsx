import React from 'react';
import { Button, Platform, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import { logout } from '../store/actions/auth.actions';
import { ProductsNavigator, OrdersNavigator, AdminNavigator } from './ShopStackNavigator';
import { Ionicons } from '@expo/vector-icons';
import NotificationsScreen from '../screens/Notifications';

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch = useDispatch();

  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
              <DrawerItemList {...props} />
              <Button
                title='Logout'
                onPress={() => {
                  dispatch(logout());
                  // props.navigation.navigate('Auth')
                }}
              />
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{ activeTintColor: Colors.primary }}
    >
      <ShopDrawerNavigator.Screen
        name='Products'
        component={ProductsNavigator}
        options={{
          drawerIcon: (drawerConfig: any) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={drawerConfig.tintColor}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Orders'
        component={OrdersNavigator}
        options={{
          drawerIcon: (props: any) => (
            <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23} color={props.color} />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Admin'
        component={AdminNavigator}
        options={{
          drawerIcon: (props: any) => (
            <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={23} color={props.color} />
          ),
        }}
      />
        <ShopDrawerNavigator.Screen
        name='Notifications'
        component={NotificationsScreen}
        options={{
          drawerIcon: (props: any) => (
            <Ionicons name={Platform.OS === 'android' ? 'md-notifications' : 'ios-notifications'} size={23} color={props.color} />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

/**
 *  React navigation v4
 */
// export const ShopNavigator = createDrawerNavigator(
//   {
//     Products: ProductsStackNavigator,
//     Orders: OrdersStackNavigator,
//     Admin: AdminStackNavigator,
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.primary,
//     },
//     contentComponent: (props) => {
//       const dispatch = useDispatch();
//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
//             <DrawerItems {...props} />
//             <Button
//               title="Logout"
//               onPress={() => {
//                 dispatch(logout());
//                 // props.navigation.navigate('Auth')
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     },
//   }
// );
