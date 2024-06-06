import { Stack } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function LoginScreen() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
        <View style={styles.container}>
          {/* header */}
          <View style={styles.header}>
            <Image
              style={styles.headerImg}
              source={{
                uri: "https://withfra.me/android-chrome-512x512.png"
              }}
              alt="logo"
            />
            <Text style={styles.title}>Sign in to MyApp</Text>
            <Text style={styles.subtitle}>
              Get access to your protfolio and more...
            </Text>
          </View>

          {/* form */}
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                style={styles.inputControl}
                placeholder="Enter your email address"
                placeholderTextColor={"#6b7280"}
                value={form.email}
                onChangeText={(email) => setForm({ ...form, email })}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                secureTextEntry
                style={styles.inputControl}
                placeholder="Enter your password"
                placeholderTextColor={"#6b7280"}
                value={form.password}
                onChangeText={(password) => setForm({ ...form, password })}
              />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity
                onPress={() => {
                  // login logic
                  Alert.alert("Successfully logged in!");
                }}
              >
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign in</Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{ marginTop: "auto" }}
              onPress={() => {
                // navigation.navigate("Signup");
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1
  },
  header: {
    marginVertical: 36
  },
  headerImg: {
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
    fontWeight: "500",
    color: "#929292",
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
    paddingHorizontal: 16,
    borderRadius: 12,
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
    borderColor: "#075eed",
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
