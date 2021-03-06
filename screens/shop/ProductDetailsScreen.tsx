import React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { ROOT_STATE } from '../../store/combineReducers';

const ProductDetailsScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const productId = navigation.getParam('productId');
  const selectedProduct = useSelector((state: ROOT_STATE) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  return (
    <ScrollView>
      <Image source={{ uri: selectedProduct?.imageUrl }} style={styles.image} />
      <View style={styles.buttonContainer}>
      <Button title='Add to Cart' onPress={() => {}} color={Colors.primary} />
      </View>
      <Text style={styles.price}>${selectedProduct?.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct?.description}</Text>
    </ScrollView>
  );
};

ProductDetailsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam('productTitle'),
  };
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
      marginVertical: 20
  },
  description: {
      fontSize: 14,
      textAlign: 'center',
      marginHorizontal: 20
  },
});
