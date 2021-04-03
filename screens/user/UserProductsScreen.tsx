import React from 'react';
import { Alert, Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { ROOT_STATE } from '../../store/combineReducers';
import * as productsActions from '../../store/actions/products.actions';
import Colors from '../../constants/Colors';

const UserProductsScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const userProducts = useSelector((state: ROOT_STATE) => state.products.userProducts);
  const dispatch = useDispatch();
  const editProductHandler = (id: string) => {
    navigation.navigate('EditProduct', { productId: id });
  };

  const deleteHandler = (id: string) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No product found. Maybe start to add some.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            title='Edit'
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
            color={Colors.primary}
          />
          <Button title='Delete' onPress={() => deleteHandler(itemData.item.id)} color={Colors.primary} />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
