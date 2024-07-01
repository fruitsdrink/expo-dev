import { MovieItem, fetchTopRatedMovies, getImage } from "@/lib/tmdb";
import { useInfiniteQuery } from "@tanstack/react-query";
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
            uri: getImage(movie.poster_path)
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
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching
  } = useInfiniteQuery({
    queryKey: ["top-rated-movies"],
    queryFn: ({ pageParam }) => fetchTopRatedMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      // console.log({
      //   lastPage,
      //   pages
      // });
      return lastPage.page + 1;
    }
  });
  // console.log(data);

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

  const movies = data.pages.map((page) => page.results).flat();

  return (
    <View style={styels.container}>
      <FlatList
        data={movies}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <MovieListItem movie={item} />;
        }}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        refreshing={isRefetching}
        onEndReached={() => {
          // console.log("end reached");
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onStartReached={() => {
          console.log("start reached");
        }}
        onRefresh={() => {
          console.log("refresh");
          refetch();
        }}
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
