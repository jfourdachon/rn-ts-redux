import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import { AutoCapitalize, KeyboardType } from "../../typescript/enums/keyboard";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { login, signup } from "../../store/actions/auth.actions";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

type FormState = {
  inputValues: {
    email: string;
    password: string;
  };

  inputValidities: {
    email: boolean;
    password: boolean;
  };
  formIsValid: boolean;
};

type ActionsReducer = {
  type: typeof FORM_INPUT_UPDATE;
  value: string;
  formIsValid: boolean;
  input: string;
};

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

const AuthScreen: NavigationStackScreenComponent = () => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");

  // prefer userReducer for handling several states
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError("");
    setisLoading(true);
    try {
      await dispatch(action);
    } catch (error) {
      setError(error.message);
    }
    setisLoading(false);
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputValue: string, inputIdentifier: string, inputValidity: boolean) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        formIsValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.AuthContainer}>
          <ScrollView>
            <Input
              inputId="email"
              label="E-mail"
              initialValue=""
              value={formState.inputValues.email}
              autoCapitalize={AutoCapitalize.None}
              isValid={false}
              email
              onInputChange={inputChangeHandler}
              keyboardType={KeyboardType.Email}
              textError="Please enter a valid email adress"
            />
            <Input
              inputId="password"
              label="Password"
              initialValue=""
              value={formState.inputValues.password}
              isValid={false}
              minLength={5}
              onInputChange={inputChangeHandler}
              keyboardType={KeyboardType.Default}
              autoCapitalize={AutoCapitalize.None}
              textError="Please enter a valid password"
              secureTextEntry
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignUp ? "Sign Up" : "Login"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignUp ? "Login" : "Sign Up"}`}
                color={Colors.accent}
                onPress={() => setIsSignUp((prevState) => !prevState)}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Authenticate",
  };
};

export default AuthScreen;

const styles = StyleSheet.create({
  AuthContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
});
