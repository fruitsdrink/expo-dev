import { StyleSheet, View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from "react-native-reanimated";
import { TinderCard } from "@/components";

const dummuUsers = [
  {
    id: 1,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg",
    name: "1 Dani",
  },
  {
    id: 2,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/2.jpg",
    name: "2 Jon",
  },
  {
    id: 3,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/3.jpg",
    name: "3 Dani",
  },
  {
    id: 4,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/4.jpeg",
    name: "4 Alice",
  },
  {
    id: 5,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/5.jpg",
    name: "5 Dani",
  },
  {
    id: 6,
    image:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/6.jpg",
    name: "6 Kelsey",
  },
];

export default function TinderScreen() {
  const [users, setUsers] = useState(dummuUsers);
  const activeIndex = useSharedValue(0);
  const [index, setIndex] = useState(0);

  useAnimatedReaction(
    () => activeIndex.value,
    (value, prevValue) => {
      if (Math.abs(value) !== index) {
        runOnJS(setIndex)(Math.floor(value));
      }
    }
  );

  useEffect(() => {
    if (index > users.length - 3) {
      console.log("🚀 ~ uLast 2 cards reamining. Fetch more!");
      setUsers((users) => [...users, ...dummuUsers]);
    }
  }, [index]);

  const onResponse = (res: boolean) => {
    console.log("on response", res);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShown: false,
        }}
      />

      <View style={styles.container}>
        <Text style={{ top: 70, position: "absolute" }}>
          Current index: {index}
        </Text>
        {users.map((user, index) => (
          <TinderCard
            key={`${user.id}-${index}`}
            user={user}
            numOfCards={users.length}
            index={index}
            activeIndex={activeIndex}
            onResponse={onResponse}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
