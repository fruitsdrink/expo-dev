import { View, FlatList } from "react-native";
import posts from "@/assets/data/day119/posts.json";
import React from "react";
import { PostListItem } from "@/components/day119/post-list-item";

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
