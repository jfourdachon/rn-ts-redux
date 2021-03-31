import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import { fetchOrders } from "../../store/actions/order.actions";
import { ROOT_STATE } from "../../store/combineReducers";

const OrdersScreen: NavigationStackScreenComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state: ROOT_STATE) => state.orders.orders);

  const dispatch = useDispatch();
  const loadOrders = async () => {
    setIsLoading(true);
    await dispatch(fetchOrders());
    setIsLoading(false);
  };
  useEffect(() => {
    loadOrders();
  }, [dispatch]);


  if (orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No product found. Maybe start to add some.</Text>
      </View>
    );
  }

  return isLoading ? (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  ) : (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAMount}
          date={itemData.item.readableDate}
          order={itemData.item}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
