import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import {
  createProduct,
  updateProduct,
} from "../../store/actions/products.actions";
import { ROOT_STATE } from "../../store/combineReducers";

type InputValues = {
  title: string;
  descrition: string;
  imageUrl: string;
  price: string;
};

type InputValidities = {
  title: boolean;
  description: boolean;
  imageUrl: boolean;
  price: boolean;
};

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input] : action.input
    }
    const updatedValidities = {...state.inputValidities, [action.input]: action.isValid}
    let updatedFormIsValid = true
    for(const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }
    return { updatedFormIsValid, inputValues: updatedValues, inputValidities: updatedValidities}
  }
  return state
}

const EditProductScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const prodId = navigation.getParam("productId");
  const editedProduct = useSelector((state: ROOT_STATE) =>
    state.products.userProducts.find((product) => product.id === prodId)
  );


  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    }
  }, formIsValid: false)

  const textChangeHandler = (text: string, inputIdentifier: string) => {
    let isValid = false
    if (formState.inputValues.title.trim().length > 0) {
      isValid = true
    } 
    dispatchFormState({type: FORM_INPUT_UPDATE, value: text, isValid, input: inputIdentifier })
  };

  const submitHandler = useCallback(() => {
    if (!formState.isValid) {
      Alert.alert('Wrong input', 'Check the erros on the form', [{text: 'Okay'}])
    }
    if (editedProduct) {
      dispatch(updateProduct(prodId, formState.inputValues.title, formState.inputValues.imageUrl, formState.inputValues.description));
    } else {
      dispatch(createProduct(formState.inputValues.title, formState.inputValues.imageUrl, formState.inputValues.description, +formState.inputValues.price));
    }
    navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.title}
            onChange={(e) => textChangeHandler(e.nativeEvent.text, 'title')}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect={false}
            returnKeyType="next"
            onEndEditing={() => console.log("onEndEditing")}
            onSubmitEditing={() => console.log("onSubmitEditing")}
          />
          {!formState.inputValidities.title && <Text>Please provide a valid title.</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.imageUrl}
            onChange={(e) => textChangeHandler(e.nativeEvent.text, 'imageUrl')}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.price}
              onChange={(e) => textChangeHandler(e.nativeEvent.text, 'price')}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={formState.inputValues.description}
            onChange={(e) => textChangeHandler(e.nativeEvent.text, 'description')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
  const submitFn = navigation.getParam("submit");
  return {
    headerTitle: navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
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
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

