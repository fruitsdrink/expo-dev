import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetail } from "@/lib/tmdb";

export default function MovieDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["movie-detail", id],
    queryFn: () => fetchMovieDetail(id)
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

  if (error) {
    return (
      <View
        style={[
          styels.container,
          { justifyContent: "center", alignItems: "center" }
        ]}
      >
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: "500" }}>{data.title}</Text>
    </View>
  );
}

const styels = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
