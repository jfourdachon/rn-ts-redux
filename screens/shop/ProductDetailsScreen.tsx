import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import { ROOT_STATE } from '../../store/combineReducers';
import * as cartActions from '../../store/actions/cart.actions'
import Product from '../../models/product';

const ProductDetailsScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const productId = navigation.getParam('productId');
  const selectedProduct = useSelector((state: ROOT_STATE) =>
    state.products.availableProducts.find((product: Product) => product.id === productId)
  );

  const dispatch = useDispatch()

  const dispatchProduct = () => {
      if (selectedProduct) {
        dispatch(cartActions.addToCart(selectedProduct))
      }
  }

  return (
    <ScrollView>
      <Image source={{ uri: selectedProduct?.imageUrl }} style={styles.image} />
      <View style={styles.buttonContainer}>
      <Button title='Add to Cart' onPress={dispatchProduct} color={Colors.primary} />
      </View>
      <Text style={styles.price}>${selectedProduct?.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct?.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  image: {
      width: '100%',
      height: 300
  },
  buttonContainer: {
      marginVertical: 10,
      alignItems: 'center'
  },
  price: {
      fontSize: 20,
      color: '#888',
      textAlign: 'center',
      marginVertical: 20,
        fontFamily:  'open-sans-bold'

  },
  description: {
      fontSize: 14,
      textAlign: 'center',
      marginHorizontal: 20,
    fontFamily:  'open-sans'

  },
});
