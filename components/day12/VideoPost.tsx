import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type VideoPostType = {
  id: string;
  video: string;
  caption: string;
};
export const VideoPost = ({
  post,
  activePostId,
}: {
  post: VideoPostType;
  activePostId: string;
}) => {
  const video = useRef<Video | null>(null);
  const [status, setStatus] = useState<AVPlaybackStatus>();

  const isPlaying = status?.isLoaded && status.isPlaying;

  const { height } = useWindowDimensions();

  useEffect(() => {
    if (!video.current) return;

    if (activePostId === post.id) {
      video.current?.replayAsync();
    } else {
      video.current?.stopAsync();
    }
  }, [activePostId]);

  const onPress = () => {
    // console.log("🚀 ~ FeedScreen ~ status:", status);

    if (!status?.isLoaded) {
      return;
    }

    if (
      status.durationMillis &&
      status.positionMillis >= status.durationMillis
    ) {
      video.current?.replayAsync();
    } else {
      if (!video.current) return;
      if (!isPlaying) {
        video.current.playAsync();
      } else {
        video.current.pauseAsync();
      }
    }
  };

  return (
    <>
      <View style={[styles.container, { height }]}>
        <Video
          ref={video}
          source={{ uri: post.video }}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          onPlaybackStatusUpdate={(status) => {
            // console.log("🚀 ~ status:", status);

            setStatus(status);
          }}
        />

        <Pressable onPress={onPress} style={styles.content}>
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={[StyleSheet.absoluteFill, styles.overlay]}
          />

          {!status?.isLoaded && (
            <ActivityIndicator
              style={{
                position: "absolute",
                alignSelf: "center",
                top: "50%",
              }}
            />
          )}
          {status?.isLoaded && !isPlaying && (
            <Ionicons
              style={{
                position: "absolute",
                alignSelf: "center",
                top: "50%",
              }}
              name="play"
              size={70}
              color={"rgba(255,255,255,0.6)"}
            />
          )}

          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.footer}>
              <View style={styles.leftColumn}>
                <Text style={styles.caption}>{post.caption}</Text>
              </View>

              <View style={styles.rightColumn}>
                <Ionicons name="heart" size={32} color="white" />
                <Ionicons name="share-social" size={32} color="white" />
                <Ionicons name="bookmark" size={32} color="white" />
              </View>
            </View>
          </SafeAreaView>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    // backgroundColor: "rgba(0,0,0,0.1)" ,
    padding: 10,
  },
  overlay: {
    top: "50%",
    // backgroundColor: "red",
  },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  leftColumn: {
    flex: 1,
  },
  caption: {
    color: "white",
    fontSize: 18,
  },
  rightColumn: {
    gap: 12,
  },
});
