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
import Input from "../../components/UI/Input";
import {
  AutoCapitalize,
  KeyboardType,
  ReturnKeyType,
} from "../../enums/keyboard";
import {
  createProduct,
  updateProduct,
} from "../../store/actions/products.actions";
import { ROOT_STATE } from "../../store/combineReducers";

type FormState = {
  inputValues: {
    title: string;
    imageUrl: string;
    price: string;
    description: string;
  };

  inputValidities: {
    title: boolean;
    imageUrl: boolean;
    price: boolean;
    description: boolean;
  };
  formIsValid: boolean;
};

type ActionsReducer = {
  type: typeof FORM_INPUT_UPDATE;
  value: string;
  formIsValid: boolean;
  input: string;
};

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state: FormState, action: ActionsReducer) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.formIsValid,
    };
    let updatedFormIsValid = true;
    for (const [key, value] of Object.entries(updatedValidities)) {
      updatedFormIsValid = updatedFormIsValid && value;
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  return state;
};

const EditProductScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const prodId = navigation.getParam("productId");
  const editedProduct = useSelector((state: ROOT_STATE) =>
    state.products.userProducts.find((product) => product.id === prodId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: false,
  });

  const textChangeHandler = (text: string, inputIdentifier: string) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      formIsValid: isValid,
      input: inputIdentifier,
    });
  };

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input", "Check the erros on the form", [
        { text: "Okay" },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description
        )
      );
    } else {
      dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description,
          +formState.inputValues.price
        )
      );
    }
    navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          label="Title"
          value={formState.inputValues.title}
          keyboardType={KeyboardType.Default}
          autoCapitalize={AutoCapitalize.Sentences}
          autoCorrect={false}
          returnKeyType={ReturnKeyType.Next}
          textError="Please, provide a valid title"
        />
        <Input
          label="Image Url"
          value={formState.inputValues.imageUrl}
          keyboardType={KeyboardType.Default}
          returnKeyType={ReturnKeyType.Next}
          textError="Please, provide a valid image url"
        />
        {editedProduct ? null : (
          <Input
            label="Price"
            value={formState.inputValues.price}
            keyboardType={KeyboardType.NumberPad}
            returnKeyType={ReturnKeyType.Next}
            textError="Please, provide a valid price"
          />
        )}
        <Input
          label="Description"
          value={formState.inputValues.description}
          keyboardType={KeyboardType.Default}
          autoCapitalize={AutoCapitalize.Sentences}
          autoCorrect={true}
          returnKeyType={ReturnKeyType.Next}
          textError="Please, provide a valid description"
        />
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
});
