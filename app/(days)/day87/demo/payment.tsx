import {
  Button,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DemoScreen() {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <StatusBar hidden />
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            navigation.goBack();
          }}
        ></Pressable>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            height: "50%",
            width: "100%",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            overflow: "hidden"
          }}
        >
          <BlurView
            experimentalBlurMethod="dimezisBlurView"
            intensity={90}
            tint="light"
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button
              title="go back"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </BlurView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
