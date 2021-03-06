import React from 'react';
import { FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { ROOT_STATE } from '../../store/combineReducers';

const ProductsOverviewScreen: NavigationStackScreenComponent = () => {
  const products = useSelector((state: ROOT_STATE) => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = () => {
  return {
    headerTitle: 'All Products',
  };
};

export default ProductsOverviewScreen;
