import React, { useEffect, useReducer } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import {
  AutoCapitalize,
  KeyboardType,
  ReturnKeyType,
} from "../../typescript/enums/keyboard";

type IProps = {
  label: string;
  value: string;
  inputId: string;
  keyboardType: KeyboardType;
  autoCapitalize?: AutoCapitalize;
  autoCorrect?: boolean;
  returnKeyType?: ReturnKeyType;
  textError: string;
  initialValue: string;
  isValid: boolean;
  required?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  onInputChange: (a: string, b: string, c: boolean) => void;
};

type InputState = {
  value: string;
  isValid: boolean;
  touched: boolean;
};

type InputChangeAction = {
  type: typeof INPUT_CHANGE;
  value: string;
  isValid: boolean;
};

type InputBlurAction = {
  type: typeof INPUT_BLUR
}

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state: InputState, action: InputChangeAction | InputBlurAction) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props: IProps) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.isValid,
    touched: false,
  });

  const textChangeHandler = (text: string) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  const { onInputChange, inputId } = props;
  useEffect(() => {
    if (inputState.touched) {
      onInputChange(inputState.value, inputId, inputState.isValid);
    }
  }, [inputState, onInputChange, inputId]);
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChange={(e) => textChangeHandler(e.nativeEvent.text)}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && <View style={styles.errorContainer}><Text style={styles.errorText}>{props.textError}</Text></View>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
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
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: 'open-sans',
    fontSize: 13,
    color: 'red'
  }
});
