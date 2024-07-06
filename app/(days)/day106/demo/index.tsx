import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Image,
  ScrollView
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SharedElement } from "react-navigation-shared-element";
import Animated from "react-native-reanimated";
import { transition } from "./lib";

export interface Story {
  id: string;
  source: number;
  user: string;
  avatar: number;
  video?: number;
}

export type SnapchatRoutes = {
  Snapchat: undefined;
  Story: { story: Story };
};

const margin = 16;
const borderRadius = 5;
const width = Dimensions.get("window").width / 2 - margin * 2;

interface StoryThumbnailProps {
  story: Story;
}

const StoryThumbnail = ({ story }: StoryThumbnailProps) => {
  const router = useRouter();
  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={() => {
        // navigation.navigate();
        // router.navigate("/day106/demo/story");
        router.navigate({
          pathname: "/day106/demo/story",
          params: { story: JSON.stringify(story) }
        });
      }}
    >
      <View style={[storyThumnailStyles.container]}>
        <Image source={story.source} style={storyThumnailStyles.image} />
        <Animated.Image
          sharedTransitionTag={`shared-${story.id}`}
          sharedTransitionStyle={transition}
          source={story.source}
          style={storyThumnailStyles.image}
        />
      </View>
    </Pressable>
  );
};

const storyThumnailStyles = StyleSheet.create({
  container: {
    width,
    height: width * 1.77,
    marginTop: 16,
    borderRadius
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
    borderRadius
  }
});

export const stories: Story[] = [
  {
    id: "2",
    source: require("@/assets/images/day106/stories/2.jpg"),
    user: "derek.russel",
    avatar: require("@/assets/images/day106/avatars/derek.russel.png")
  },
  {
    id: "4",
    source: require("@/assets/images/day106/stories/4.jpg"),
    user: "jmitch",
    avatar: require("@/assets/images/day106/avatars/jmitch.png")
  },
  {
    id: "7",
    source: require("@/assets/images/day106/stories/7.jpg"),
    user: "andrea.schmidt",
    avatar: require("@/assets/images/day106/avatars/andrea.schmidt.png"),
    video: require("@/assets/images/day106/stories/7.mp4")
  },
  {
    id: "5",
    source: require("@/assets/images/day106/stories/5.jpg"),
    user: "monicaa",
    avatar: require("@/assets/images/day106/avatars/monicaa.png")
  },
  {
    id: "3",
    source: require("@/assets/images/day106/stories/3.jpg"),
    user: "alexandergarcia",
    avatar: require("@/assets/images/day106/avatars/alexandergarcia.png")
  },
  {
    id: "1",
    source: require("@/assets/images/day106/stories/1.jpg"),
    user: "andrea.schmidt",
    avatar: require("@/assets/images/day106/avatars/andrea.schmidt.png")
  },
  {
    id: "6",
    source: require("@/assets/images/day106/stories/6.jpg"),
    user: "andrea.schmidt",
    avatar: require("@/assets/images/day106/avatars/andrea.schmidt.png")
  }
];

export default function index() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        {stories.map((story) => (
          <StoryThumbnail key={story.id} story={story} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  }
});
