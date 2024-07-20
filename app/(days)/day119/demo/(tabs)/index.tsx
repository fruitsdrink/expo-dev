import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import posts from "@/assets/data/day119/posts.json";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import React from "react";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";

interface Post {
  id: string;
  image: string;
  image_url: string;
  caption: string;
  user: User;
}

interface User {
  id: string;
  avatar_url: string;
  image_url: string;
  username: string;
}

type PostListItemProps = {
  post: Post;
};
const PostListItem: React.FC<PostListItemProps> = ({ post }) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <View
      style={{
        backgroundColor: "white"
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
          padding: 8
        }}
      >
        <Image
          source={{ uri: post.user.image_url }}
          style={{
            width: 48,
            borderRadius: 24,
            aspectRatio: 1
          }}
        />
        <Text
          style={{
            fontWeight: "semibold"
          }}
        >
          {post.user.username}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          source={{ uri: post.image_url }}
          style={{
            width: SCREEN_WIDTH,
            aspectRatio: 4 / 3
          }}
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoadEnd={() => {
            setLoading(false);
          }}
        />
        {loading && (
          <ActivityIndicator size={"large"} style={StyleSheet.absoluteFill} />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          padding: 12
        }}
      >
        <AntDesign name="hearto" size={20} />
        <Ionicons name="chatbubble-outline" size={20} />
        <Feather name="send" size={20} />
        <Feather
          name="bookmark"
          size={20}
          style={{
            marginLeft: "auto"
          }}
        />
      </View>
    </View>
  );
};
export default function Home() {
  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          gap: 10
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <PostListItem post={item} />}
      />
    </View>
  );
}
