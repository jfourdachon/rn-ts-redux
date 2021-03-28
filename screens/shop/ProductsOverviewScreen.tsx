import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
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
  const [error, setError] = useState('')

  const selectItemHandler = (id: string, title: string) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  const loadProducts = useCallback(async () => {
    setError('')
    setIsLoading(true)
    try {
      await dispatch(fetchProducts())
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  },[dispatch, setError, setIsLoading])

  const products = useSelector((state: ROOT_STATE) => state.products.availableProducts);
  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  if(error) {
    return <View style={styles.centered}>
    <Text>An error occured.</Text>
    <Button title='Try again' onPress={loadProducts} color={Colors.primary} />
  </View>
  }
  if (isLoading) {
    return <View style={styles.centered}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  }

  if(!isLoading && products.length === 0) {
    return <View style={styles.centered}>
      <Text>No product found. Maybe start to add some.</Text>
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
