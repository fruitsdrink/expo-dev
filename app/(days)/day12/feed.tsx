import { FlatList, StyleSheet, View, ViewToken } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { VideoPost } from "@/components";

const dummyPosts = [
  {
    id: "2",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4",
    caption: "Caption of the post",
  },
  {
    id: "1",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/1.mp4",
    caption: "Hey there",
  },
  {
    id: "3",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4",
    caption: "Hola",
  },
  {
    id: "4",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/4.mp4",
    caption: "Piano practice",
  },
  {
    id: "5",
    video:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/5.mp4",
    caption: "Hello World!",
  },
];

export default function FeedScreen() {
  const [activePostId, setActivePostId] = React.useState<string>("");
  const [posts, setPosts] = useState<
    { id: string; video: string; caption: string }[]
  >([]);

  useEffect(() => {
    setPosts(dummyPosts);
    setActivePostId(dummyPosts[0].id);
  }, []);

  // const onViewableItemsChanged = React.useCallback(
  //   ({
  //     viewableItems,
  //   }: {
  //     viewableItems: ViewToken<{
  //       id: string;
  //       video: string;
  //       caption: string;
  //     }>[];
  //   }) => {
  //     if (viewableItems.length > 0 && viewableItems[0].isViewable) {
  //       setActivePostId(viewableItems[0].item.id);
  //     }
  //   },
  //   []
  // );

  const viewabilityConfigCallbackPairs = React.useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged: ({
        viewableItems,
      }: {
        viewableItems: ViewToken<{
          id: string;
          video: string;
          caption: string;
        }>[];
      }) => {
        if (viewableItems.length > 0 && viewableItems[0].isViewable) {
          setActivePostId(viewableItems[0].item.id);
        }
      },
    },
  ]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" hidden={false} />

      <View style={styles.container}>
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <VideoPost post={item} activePostId={activePostId} />
          )}
          // viewabilityConfig={{
          //   itemVisiblePercentThreshold: 50,
          // }}
          // onViewableItemsChanged={onViewableItemsChanged}
          keyExtractor={(item) => item.id}
          pagingEnabled
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            console.warn("End reached");
          }}
          onEndReachedThreshold={2}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
