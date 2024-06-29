import { Dimensions, StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function DemoScreen() {
  const sheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = ["40%"];
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <TouchableOpacity
          onPress={() => {
            sheetRef.current.snapToIndex(0);
            setIsOpen(true);
          }}
        >
          <Text>open</Text>
        </TouchableOpacity>
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => setIsOpen(false)}
        >
          <BottomSheetView>
            <Text>Hello</Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
