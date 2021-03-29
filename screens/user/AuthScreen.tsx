import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import { KeyboardType } from "../../typescript/enums/keyboard";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Card style={styles.AuthContainer}>
        <ScrollView>
          <Input
            inputId="email"
            label="E-mail"
            initialValue=""
            value={email}
            isValid
            onInputChange={() => {}}
            keyboardType={KeyboardType.Email}
            textError="Please enter a valid email adress"
          />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  AuthContainer: {},
  screen: {},
});
