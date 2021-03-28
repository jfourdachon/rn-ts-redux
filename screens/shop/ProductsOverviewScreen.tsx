import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Platform, StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { ROOT_STATE } from '../../store/combineReducers';
import * as cartActions from '../../store/actions/cart.actions';
import Colors from '../../constants/Colors';
import { fetchProducts } from '../../store/actions/products.actions';

const ProductsOverviewScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  const selectItemHandler = (id: string, title: string) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  const products = useSelector((state: ROOT_STATE) => state.products.availableProducts);
  useEffect(() => {
      setIsLoading(true)
      dispatch(fetchProducts())
      setIsLoading(false)
  }, [dispatch])

  if (isLoading) {
    return <View>
      <ActivityIndicator size='large' style={styles.centered} />
    </View>
  }
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            title='View Details'
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
            color={Colors.primary}
          />
          <Button
            title='To Cart'
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
            color={Colors.primary}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => {
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
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ProductsOverviewScreen;
