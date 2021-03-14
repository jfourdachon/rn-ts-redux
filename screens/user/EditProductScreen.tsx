import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { createProduct, updateProduct } from '../../store/actions/products.actions';
import { ROOT_STATE } from '../../store/combineReducers';


const EditProductScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const prodId = navigation.getParam('productId');
  const editedProduct = useSelector((state: ROOT_STATE) =>
    state.products.userProducts.find((product) => product.id === prodId)
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

  const dispatch = useDispatch()


  const submitHandler = useCallback(() => {
      if (editedProduct) {
          dispatch(updateProduct(prodId, title, imageUrl, description))
      } else {
          dispatch(createProduct(title, imageUrl, description, +price))
      }
      navigation.goBack()
  },[dispatch, prodId, title, description, imageUrl, price])

  useEffect(() => {
      navigation.setParams({ submit: submitHandler })
  }, [submitHandler])


  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} value={title} onChange={(e) => setTitle(e.nativeEvent.text)} />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput style={styles.input} value={imageUrl} onChange={(e) => setImageUrl(e.nativeEvent.text)} />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput style={styles.input} value={price} onChange={(e) => setPrice(e.nativeEvent.text)} />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} value={description} onChange={(e) => setDescription(e.nativeEvent.text)} />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
  const submitFn = navigation.getParam('submit')
  return {
    headerTitle: navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Save'
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};
export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
