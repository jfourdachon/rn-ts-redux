import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { ROOT_STATE } from '../../store/combineReducers';
import * as cartActions from '../../store/actions/cart.actions';
import Colors from '../../constants/Colors';
import { fetchProducts } from '../../store/actions/products.actions';

const ProductsOverviewScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');

  const selectItemHandler = (id: string, title: string) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  const loadProducts = useCallback(async () => {
    setIsRefreshing(true);
    setError('');
    try {
      await dispatch(fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, setIsLoading]);

  const products = useSelector((state: ROOT_STATE) => state.products.availableProducts);
  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => setIsLoading(false));
  }, [loadProducts]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadProducts);

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured.</Text>
        <Button title='Try again' onPress={loadProducts} color={Colors.primary} />
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No product found. Maybe start to add some.</Text>
      </View>
    );
  }
  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductsOverviewScreen;
