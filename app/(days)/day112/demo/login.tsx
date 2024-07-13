import { View, Text, StyleSheet, TextInput, Alert, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { API_URL, useAuth } from "../context/auth-context";
import axios from "axios";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();

  useEffect(() => {
    const fn = async () => {
      const result = await axios.get(`${API_URL}/users`);
      console.log(result);
    };
    // fn();
  }, []);

  const login = async () => {
    console.log("onLogin: ", onRegister);
    const result = await onLogin(email, password);
    if (result && result.error) {
      Alert.alert(result.msg);
    }
  };

  const register = async () => {
    const result = await onRegister(email, password);
    if (result && result.error) {
      Alert.alert(result.msg);
    } else {
      await login();
    }
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <Text>login</Text>
        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            autoCapitalize="none"
            style={styles.input}
            value={email}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button onPress={login} title="Login" />
          <Button onPress={register} title="Register" />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    marginTop: 40,
    gap: 12,
    width: "80%"
  },
  input: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4
  }
});
