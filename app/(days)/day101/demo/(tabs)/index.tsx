import { Movie, fetchTopRatedMovies } from "@/lib/tmdb";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await fetchTopRatedMovies();
        setMovies(res.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

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
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.title}</Text>
            </View>
          );
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
