import { MovieItem, fetchTopRatedMovies } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

type MovieListItemProps = {
  movie: MovieItem;
};
const MovieListItem: React.FC<MovieListItemProps> = ({ movie }) => {
  return (
    <Link href={`/day101/demo/${movie.id}`} asChild>
      <Pressable style={{ flex: 1 }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
          }}
          style={{
            width: "100%",
            aspectRatio: 3 / 5,
            borderRadius: 10
          }}
        />
        {/* <Text>{movie.title}</Text> */}
      </Pressable>
    </Link>
  );
};

export default function MoviesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["top-rated-movies"],
    queryFn: () => fetchTopRatedMovies(1)
  });

  // const [data, setData] = useState<Movie[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetchTopRatedMovies();
  //       setData(res.results);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchMovies();
  // }, []);

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
    <View style={styels.container}>
      <FlatList
        data={data.results}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <MovieListItem movie={item} />;
        }}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
}

const styels = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
