import { View, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Post, PostListItem } from "@/components/day119/post-list-item";
import { supabase } from "@/lib/day119/supabase";
import { EventEmitter } from "expo-location";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    console.log("🔥 读取数据");
    let { data: posts, error } = await supabase
      .from("posts")
      .select("*, user:profiles(*)");
    if (error) {
      console.error("error", error);
      Alert.alert("Error fetching posts");
    } else {
      console.log(posts);
      setPosts(posts as Post[]);
    }
  };

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
