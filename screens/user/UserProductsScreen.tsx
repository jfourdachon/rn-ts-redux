import React from 'react';
import { Alert, Button, FlatList, Platform } from 'react-native';
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
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [{ text: 'No', style: 'default' }, {
      text: 'Yes', style: 'destructive', onPress: () => {
        dispatch(productsActions.deleteProduct(id));
      }
    }])
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
          <Button
            title='Delete'
            onPress={() => deleteHandler(itemData.item.id)}
            color={Colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = ({ navigation }) => {
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
    )
  };
};

export default UserProductsScreen;
