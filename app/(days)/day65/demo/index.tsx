import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");
const LIST_ITEM_COLOR = "#1798DE";

interface Item {
  id: number;
}

export default function DemoScreen() {
  const initialMode = useRef<boolean>(true);

  useEffect(() => {
    initialMode.current = false;
  }, []);

  // new Array(2).fill(0).map((_, index) => ({ id: index }))
  const [items, setItems] = useState<Item[]>(
    new Array(5).fill(0).map((_, index) => ({ id: index }))
  );

  const onAdd = useCallback(() => {
    setItems((currentItems) => {
      const nextItemId = (currentItems[currentItems.length - 1]?.id ?? 0) + 1;
      return [...currentItems, { id: nextItemId }];
    });
  }, []);

  const onDelete = (itemId) => {
    setItems((currentItems) => {
      return currentItems.filter((item) => item.id !== itemId);
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <TouchableOpacity style={styles.floatingButton} onPress={onAdd}>
          <Text style={{ fontSize: 40, color: "white" }}>+</Text>
        </TouchableOpacity>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingVertical: 50
          }}
          showsVerticalScrollIndicator={false}
        >
          {items.map((item, index) => {
            return (
              <Animated.View
                key={item.id}
                entering={
                  initialMode.current ? FadeIn.delay(100 * index) : FadeIn
                }
                exiting={FadeOut}
                layout={LinearTransition.delay(100)}
                onTouchEnd={() => onDelete(item.id)}
                style={styles.listItem}
              />
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  listItem: {
    height: 100,
    backgroundColor: LIST_ITEM_COLOR,
    marginVertical: 10,
    borderRadius: 12,
    width: "90%",
    alignSelf: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowRadius: 8
  },
  floatingButton: {
    width: 80,
    aspectRatio: 1,
    backgroundColor: "#000",
    borderRadius: 40,
    position: "absolute",
    bottom: 50,
    right: "5%",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
