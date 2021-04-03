import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import { useDispatch, useSelector, useStore } from "react-redux";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";
import {
  AutoCapitalize,
  KeyboardType,
  ReturnKeyType,
} from "../../typescript/enums/keyboard";
import {
  createProduct,
  updateProduct,
} from "../../store/actions/products.actions";
import { ROOT_STATE } from "../../store/combineReducers";
import Product from "../../models/product";
import { ActionsReducer, FormState } from "../../typescript/types/screens/editProduct";
import Colors from "../../constants/Colors";

export const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

// Input reducer
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
    state.products.userProducts.find((product: Product) => product.id === prodId)
  );
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const dispatch = useDispatch();

  // prefer userReducer for handling several states
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

  const inputChangeHandler = useCallback((inputValue: string, inputIdentifier: string, inputValidity: boolean) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      formIsValid: inputValidity,
      input: inputIdentifier,
    });
  }, [dispatchFormState]);

  useEffect(() => {
    if(error) {
      Alert.alert('An error occured!', error, [{text: 'Okay'}])
    }
  }, [error])

  const submitHandler = useCallback(async() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input", "Check the erros on the form", [
        { text: "Okay" },
      ]);
      return;
    }
    setError('')
    setIsLoading(true)
    try {
      if (editedProduct) {
        await dispatch(
          updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description
          )
        );
      } else {
        await dispatch(
          createProduct(
            formState.inputValues.title,
            formState.inputValues.imageUrl,
            formState.inputValues.description,
            +formState.inputValues.price
          )
        );
      }
      navigation.goBack();
    } catch (error) {
      setError(error.message)
    }
    
    setIsLoading(false)
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  if(isLoading) {
    return <View style={styles.centered}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
    <ScrollView>
      <View style={styles.form}>
        <Input
        inputId="title"
          label="Title"
          value={formState.inputValues.title}
          keyboardType={KeyboardType.Default}
          autoCapitalize={AutoCapitalize.Sentences}
          autoCorrect={false}
          returnKeyType={ReturnKeyType.Next}
          textError="Please, provide a valid title"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ''}
          isValid={!!editedProduct}
          required
        />
        <Input
          inputId="imageUrl"
          label="Image Url"
          value={formState.inputValues.imageUrl}
          keyboardType={KeyboardType.Default}
          returnKeyType={ReturnKeyType.Next}
          textError="Please, provide a valid image url"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.imageUrl : ''}
          isValid={!!editedProduct}
          required
        />
        {editedProduct ? null : (
          <Input
            inputId="price"
            label="Price"
            value={formState.inputValues.price}
            keyboardType={KeyboardType.NumberPad}
            returnKeyType={ReturnKeyType.Next}
            textError="Please, provide a valid price"
            onInputChange={inputChangeHandler}
            initialValue={''}
            isValid={!!editedProduct}
            required
            min={0.1}
          />
        )}
        <Input
        inputId="description"
          label="Description"
          value={formState.inputValues.description}
          keyboardType={KeyboardType.Default}
          autoCapitalize={AutoCapitalize.Sentences}
          autoCorrect={true}
          returnKeyType={ReturnKeyType.Next}
          textError="Please, provide a valid description"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.description : ''}
          isValid={!!editedProduct}
          required
          minLength={5}
        />
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
