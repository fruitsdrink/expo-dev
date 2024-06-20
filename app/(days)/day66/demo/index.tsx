import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  ViewToken
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, { useRef } from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

const data = new Array(50).fill(0).map((_, index) => ({ id: index }));

type ListItemProps = {
  item: { id: number };
  viewableItems: SharedValue<ViewToken<{ id: number }>[]>;
};
const ListItem: React.FC<ListItemProps> = ({ item, viewableItems }) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = viewableItems.value
      .filter((vi) => vi.isViewable)
      .find((vi) => vi.item.id === item.id);

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6)
        }
      ]
    };
  }, []);

  return (
    <Animated.View
      style={[
        {
          height: 70,
          width: "90%",
          backgroundColor: "#78cad2",
          alignSelf: "center",
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center"
        },
        rStyle
      ]}
    >
      <Text
        style={{
          fontSize: 24,
          color: "#fff",
          textAlign: "center",
          lineHeight: 70
        }}
      >
        index: {item.id}
      </Text>
    </Animated.View>
  );
};

export default function DemoScreen() {
  const viewableItems = useSharedValue<ViewToken[]>([]);
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <FlatList
          data={data}
          contentContainerStyle={{
            paddingTop: 50
          }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return <ListItem item={item} viewableItems={viewableItems} />;
          }}
          ItemSeparatorComponent={() => (
            <View style={{ height: 10, width: "100%" }} />
          )}
          onViewableItemsChanged={({ viewableItems: vis }) => {
            viewableItems.value = vis;
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
