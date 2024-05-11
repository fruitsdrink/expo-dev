import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AVPlaybackStatus, Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

interface Props {
  uri: string;
}
export const MemoListItem: React.FC<Props> = ({ uri }) => {
  const [sound, setSound] = useState<Sound>();
  const [status, setStatus] = useState<AVPlaybackStatus>();

  const isPlaying = status?.isLoaded ? status.isPlaying : false;
  const position = status?.isLoaded ? status.positionMillis : 0;
  const duration = status?.isLoaded
    ? status.durationMillis
      ? status.durationMillis
      : 1
    : 1;
  const progress = position / duration;

  const formatMillis = (millis: number) => {
    const minutes = Math.floor(millis / (1000 * 60));
    const seconds = Math.floor((millis % (1000 * 60)) / 1000);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const loadSound = useCallback(async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { progressUpdateIntervalMillis: 1000 / 120 },
      onPlaybackStatusUpdate
    );

    setSound(sound);
  }, [uri]);

  const onPlaybackStatusUpdate = useCallback(
    async (status: AVPlaybackStatus) => {
      // console.log(JSON.stringify(status, null, 2));
      setStatus(status);
      if (status.isLoaded && status.didJustFinish) {
        setTimeout(async () => {
          // await sound?.setPositionAsync(0);
          await loadSound();
        }, 1000 / 60);
      }
    },
    [sound]
  );

  useEffect(() => {
    loadSound();
  }, [uri]);

  async function playSound() {
    if (sound) {
      // await sound.playAsync();
      if (status?.isLoaded && status.isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
        // await sound.replayAsync();
      }
      // console.log("play sound");
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <FontAwesome
        onPress={() => playSound()}
        name={isPlaying ? "pause" : "play"}
        size={24}
        color={"gray"}
      />
      <View style={styles.playbackContainer}>
        <View style={styles.playbackBackground} />
        <View
          style={[styles.playbackIndicator, { left: `${progress * 100}%` }]}
        />
        <Text
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            color: "gray",
            fontSize: 12,
          }}
        >
          {formatMillis(position || 0)} / {formatMillis(duration || 0)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  playbackContainer: {
    flex: 1,
    height: 50,
    justifyContent: "center",
  },
  playbackBackground: {
    height: 3,
    backgroundColor: "gainsboro",
    borderRadius: 5,
  },
  playbackIndicator: {
    width: 16,
    aspectRatio: 1,
    backgroundColor: "royalblue",
    borderRadius: 8,
    position: "absolute",
  },
});
