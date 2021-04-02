import React from "react";
import { Button, View } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import { logout } from "../store/actions/auth.actions";
import {
  ProductsStackNavigator,
  OrdersStackNavigator,
  AdminStackNavigator,
} from "./ShopStackNavigator";

export const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsStackNavigator,
    Orders: OrdersStackNavigator,
    Admin: AdminStackNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              onPress={() => {
                dispatch(logout());
                // props.navigation.navigate('Auth')
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);
