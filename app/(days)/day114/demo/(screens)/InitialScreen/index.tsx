import { View, Text, Pressable } from "react-native";
import React, { useMemo } from "react";
import { createStyles } from "./styles";
import { Image, ImageBackground } from "expo-image";
import { INITIAL_BACKGROUND, LOGO } from "@/assets/images/day114";
import { Button } from "@/components/day114/button";
import { Stack, useRouter } from "expo-router";

const InitialScreen = () => {
  const styles = useMemo(() => createStyles(), []);
  const router = useRouter();

  return (
    <View style={styles.body}>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground source={INITIAL_BACKGROUND} style={styles.background}>
        <Image source={LOGO} style={styles.logo} />
        <Text style={styles.text}>
          Make yourself stronger than your excuses
        </Text>
        <View style={styles.footer}>
          <Button
            title="Get Started"
            onPress={() => {
              router.navigate("/day114/demo/SignupScreen");
            }}
            disabled={false}
          />
          <Pressable
            onPress={() => {
              router.navigate("/day114/demo/SigninScreen");
            }}
          >
            <Text style={styles.loginText}>Or login</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default InitialScreen;
