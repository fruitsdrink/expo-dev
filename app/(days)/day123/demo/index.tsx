import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import {
  DATA,
  MarketingSlider,
  SPACING
} from "@/components/day123/MarketingSlider";
import { Icon } from "@/components/day123/Icon";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { SharedElement } from "react-navigation-shared-element";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DemoScreen({
  navigation
}: NativeStackScreenProps<RootStackParamList, "Home">) {
  return (
    <>
      <View style={styles.container}>
        <StatusBar hidden />
        <MarketingSlider />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20
          }}
        >
          {DATA.map((item) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={{
                  padding: SPACING
                }}
                onPress={() => {
                  navigation.push("Detail", { item });
                }}
              >
                <SharedElement id={`item.${item.id}.icon`}>
                  <Icon uri={item.imageUri} />
                </SharedElement>
              </TouchableOpacity>
            );
          })}
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
