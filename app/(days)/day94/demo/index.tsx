import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList,
  Animated,
  Image
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React from "react";
import { MovieItem, getMovies } from "./lib/api";
import Rating from "./components/rating";
import { Genres } from "./components/genres";
import { Backdrop } from "./components/backdrop";

const { width, height } = Dimensions.get("window");
const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

export default function DemoScreen() {
  const [movies, setMovies] = React.useState<MovieItem[]>([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      setMovies([{ key: "left-spacer" }, ...movies, { key: "right-spacer" }]);
      // setMovies(movies);
    };

    if (movies.length === 0) {
      fetchData();
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <Backdrop movies={movies} scrollX={scrollX} />
        <Animated.FlatList
          showsHorizontalScrollIndicator={false}
          data={movies}
          keyExtractor={(item) => item.key}
          horizontal
          snapToInterval={ITEM_SIZE}
          decelerationRate={0}
          bounces={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { x: scrollX } }
              }
            ],
            { useNativeDriver: true }
          )}
          // onScroll={(e) => {
          //   scrollX.setValue(e.nativeEvent.contentOffset.x);
          // }}
          scrollEventThrottle={16}
          contentContainerStyle={{ alignItems: "center" }}
          renderItem={({ item, index }) => {
            if (!item.poster) {
              return <View style={{ width: SPACER_ITEM_SIZE }} />;
            }
            const inputRange = [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE
            ];

            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [100, 50, 100]
              // extrapolate: "clamp"
            });

            return (
              <View style={{ width: ITEM_SIZE }}>
                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 34,
                    transform: [{ translateY }]
                  }}
                >
                  <Image
                    source={{ uri: item.poster }}
                    style={styles.posterImage}
                  />
                  <Text style={{ fontSize: 24 }} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Rating rating={item.rating ?? 0} />
                  <Genres genres={item.genres ?? []} />
                  <Text style={{ fontSize: 12 }} numberOfLines={3}>
                    {item.description}
                  </Text>
                </Animated.View>
              </View>
            );
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10
  }
});
