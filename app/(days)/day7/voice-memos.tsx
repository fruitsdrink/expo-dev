import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { Audio } from "expo-av";
import { Recording } from "expo-av/build/Audio";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { MemoListItem } from "@/components";

export default function VoiceMemosScreen() {
  const [recording, setRecording] = useState<Recording | undefined>(undefined);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [memos, setMemos] = useState<string[]>([]);

  const metering = useSharedValue(-100);

  async function startRecording() {
    try {
      if (permissionResponse && permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        undefined,
        1000 / 60
      );
      setRecording(recording);
      console.log("Recording started");

      recording.setOnRecordingStatusUpdate((status) => {
        metering.value = status.metering ? status.metering : -100;
      });
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (!recording) return;

    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);

    if (uri) {
      setMemos((prev) => [uri, ...prev]);
    }
  }

  const animatedRedCircle = useAnimatedStyle(() => ({
    width: withSpring(recording ? "60%" : "100%"),
    borderRadius: withTiming(recording ? 5 : 35),
  }));

  const animatedRecordWave = useAnimatedStyle(() => {
    const size = withTiming(
      interpolate(metering.value, [-160, -60, 0], [0, 0, -30])
    );
    // const size = interpolate(metering.value, [-160, -60, 0], [0, 0, -30]);

    return {
      top: size,
      left: size,
      bottom: size,
      right: size,
    };
  });

  return (
    <>
      <Stack.Screen options={{ title: "" }} />
      <View style={styles.container}>
        <FlatList
          data={memos}
          renderItem={({ item }) => <MemoListItem uri={item} />}
        />
        <View style={styles.footer}>
          <View>
            <Animated.View style={[styles.recordWave, animatedRecordWave]} />
            <Pressable
              style={styles.recordButton}
              onPress={recording ? stopRecording : startRecording}
            >
              <Animated.View style={[styles.redCircle, animatedRedCircle]} />
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  footer: {
    backgroundColor: "white",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  recordWave: {
    backgroundColor: "#ff000055",
    position: "absolute",
    top: -20,
    left: -20,
    bottom: -20,
    right: -20,
    borderRadius: 200,
  },
  recordButton: {
    width: 60,
    height: 60,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "gray",
    backgroundColor: "white",

    padding: 3,

    justifyContent: "center",
    alignItems: "center",
  },
  redCircle: {
    backgroundColor: "orangered",
    aspectRatio: 1,
    borderRadius: 35,
  },
});
