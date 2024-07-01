import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { addMovieToWatchList, fetchMovieDetail, getImage } from "@/lib/tmdb";
import { FontAwesome } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";

export default function MovieDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const client = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["movie-detail", id],
    queryFn: () => fetchMovieDetail(id)
  });

  const { mutate, error: mutationError } = useMutation({
    mutationFn: () => addMovieToWatchList(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["watchlist-movies"] });
    }
  });

  if (isLoading) {
    return (
      <View
        style={[
          styels.container,
          { justifyContent: "center", alignItems: "center" }
        ]}
      >
        <ActivityIndicator size={"small"} />
      </View>
    );
  }

  if (error || mutationError) {
    return (
      <View
        style={[
          styels.container,
          { justifyContent: "center", alignItems: "center" }
        ]}
      >
        <Text>{error.message || mutationError.message}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: data.title }} />
      <View>
        <Image
          source={{ uri: getImage(data.backdrop_path) }}
          style={{
            width: "100%",
            height: 300
          }}
        />
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: "500" }}>{data.title}</Text>
          <View style={{ marginVertical: 10 }}>
            <Pressable
              onPress={() => mutate()}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5
              }}
            >
              <FontAwesome name="bookmark-o" size={24} color={"#333"} />
              <Text>Add to watchlist</Text>
            </Pressable>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "400" }}>
            {data.overview}
          </Text>
        </View>
      </View>
    </>
  );
}

const styels = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
