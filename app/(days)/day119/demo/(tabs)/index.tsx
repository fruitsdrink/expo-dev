import { View, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { PostListItem } from "@/components/day119/post-list-item";
import { Post, supabase } from "@/lib/day119/supabase";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let { data: posts, error } = await supabase
        .from("posts")
        .select("*, user:profiles(*), likes:likes(*)")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("error", error);
        Alert.alert("Error fetching posts");
      } else {
        console.log(JSON.stringify(posts, null, 2));
        setPosts(posts as Post[]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
        onRefresh={fetchPosts}
        refreshing={loading}
      />
    </View>
  );
}
