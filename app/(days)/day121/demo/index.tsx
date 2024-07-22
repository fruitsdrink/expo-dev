import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useState } from "react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DemoScreen() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
        <View style={styles.container}>
          <StatusBar hidden />
          <View style={styles.header}>
            <Image
              style={styles.headerImage}
              source={{ uri: "https://withfra.me/android-chrome-512x512.png" }}
            />

            <Text style={styles.title}>Sign in to MyApp</Text>
            <Text style={styles.subtitle}>
              Get access to your portfolio and more
            </Text>
          </View>
          {/* form */}
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                style={styles.inputControl}
                placeholder="Enter your email address"
                placeholderTextColor={"#6b7280"}
                autoCapitalize={"none"}
                autoCorrect={false}
                autoComplete={"off"}
                keyboardType="email-address"
                value={form.email}
                onChangeText={(email) => setForm({ ...form, email })}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.inputControl}
                placeholder="Enter your password"
                placeholderTextColor={"#6b7280"}
                autoCapitalize={"none"}
                autoCorrect={false}
                autoComplete={"off"}
                secureTextEntry={true}
                value={form.password}
                onChangeText={(password) => setForm({ ...form, password })}
              />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign in</Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{
                marginTop: "auto"
              }}
            >
              <Text style={styles.formFooter}>
                Don't have an account?{" "}
                <Text
                  style={{
                    textDecorationLine: "underline"
                  }}
                >
                  Sign up
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  header: {
    marginVertical: 36
  },
  headerImage: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginBottom: 36
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#1e1e1e",
    marginBottom: 6,
    textAlign: "center"
  },
  subtitle: {
    fontSize: 15,
    color: "#929292",
    fontWeight: "500",
    textAlign: "center"
  },
  form: {
    marginBottom: 24,
    flex: 1
  },
  input: {
    marginBottom: 16
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8
  },
  inputControl: {
    height: 44,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 15,
    fontWeight: "500",
    color: "#222"
  },
  formAction: {
    marginVertical: 24
  },
  btn: {
    backgroundColor: "#075eec",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#075eec",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff"
  },
  formFooter: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15
  }
});
