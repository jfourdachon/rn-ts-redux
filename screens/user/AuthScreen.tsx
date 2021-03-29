import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  View,
} from "react-native";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import { KeyboardType } from "../../typescript/enums/keyboard";
import { LinearGradient } from "expo-linear-gradient";

const AuthScreen: NavigationStackScreenComponent = () => {
  const [email, setEmail] = useState("");
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
              value={email}
              isValid={false}
              email
              onInputChange={() => {}}
              keyboardType={KeyboardType.Email}
              textError="Please enter a valid email adress"
            />
            <Input
              inputId="password"
              label="Password"
              initialValue=""
              value={email}
              isValid={false}
              minLength={5}
              onInputChange={() => {}}
              keyboardType={KeyboardType.Default}
              textError="Please enter a valid password"
              secureTextEntry
            />
            <View style={styles.buttonContainer}>
              <Button title="Login" color={Colors.primary} onPress={() => {}} />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Switch to sign Up"
                color={Colors.accent}
                onPress={() => {}}
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
