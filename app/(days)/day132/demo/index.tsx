import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Character } from "./typs";
import { Image } from "expo-image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ITEM_HEIGHT = SCREEN_HEIGHT / 5;

type ListItemProps = {
  character: Character;
  index: number;
};
const ListItem = ({ character, index }: ListItemProps) => {
  console.log("re-rendering: ", character.id, " index: ", index);
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        flex: 1
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "darkslategrey",
          marginVertical: 10
        }}
      >
        {index + 1 + " "}
        {character.name}
      </Text>
      <Image
        source={{ uri: character.image }}
        style={{
          width: "100%",
          aspectRatio: 1,
          resizeMode: "cover"
        }}
      />
    </View>
  );
};

const MemoListItem = memo(
  ListItem,
  (prevPorps, nextProps) => prevPorps.character.id === nextProps.character.id
);

const initUrl = "https://rickandmortyapi.com/api/character?page=1";
const MyList = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Character[]>([]);
  const [nextPage, setNextPage] = useState(initUrl);

  const fetchPage = async (url: string) => {
    if (loading) return;
    console.log("fetch: ", url);
    try {
      setLoading(true);
      const response = await fetch(nextPage);
      const json = await response.json();
      if (url === initUrl) {
        setItems(json.results);
      } else {
        setItems((prev) => {
          return [...prev, ...json.results];
        });
      }

      if (json.info.next) {
        setNextPage(json.info.next);
      } else {
        setNextPage("");
      }
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    fetchPage(initUrl);
  };

  const renderItem = useCallback(({ item, index }) => {
    return <MemoListItem character={item} index={index} />;
  }, []);

  useEffect(() => {
    onRefresh();
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        minimumViewTime: 500,
        itemVisiblePercentThreshold: 50
      },
      onViewableItemsChanged: ({ viewableItems, changed }) => {
        // console.log({
        //   viewableItems,
        //   changed
        // });
        changed.forEach((item) => {
          if (item.isViewable) {
            console.log(`++ Impression for: ${item.item.id}`);
          }
        });
      }
    }
  ]);

  if (loading && !items.length) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  if (items.length === 0) {
    // this is only to make the debug prop on FlatList work
    return null;
  }
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      onEndReached={() => {
        console.log("onEndReached");
        fetchPage(nextPage);
      }}
      contentContainerStyle={{ gap: 10 }}
      columnWrapperStyle={{ gap: 10 }}
      onEndReachedThreshold={3}
      ListHeaderComponent={() => {
        return (
          <View
            style={{
              height: 200,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>title</Text>
          </View>
        );
      }}
      ListFooterComponent={() => {
        return loading && <ActivityIndicator size={"small"} />;
      }}
      // debug
      refreshing={loading}
      onRefresh={() => console.log("onRefresh")}
      getItemLayout={(data, index) => {
        return {
          length: ITEM_HEIGHT,
          index,
          offset: (ITEM_HEIGHT + 5) * index
        };
      }}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      numColumns={2}
    />
  );
};

export default function DemoScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar hidden />
      <SafeAreaView style={styles.container}>
        <MyList />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef"
  }
});
