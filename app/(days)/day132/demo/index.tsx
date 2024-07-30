import { Dimensions, StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Character } from "./typs";
import { Image } from "expo-image";
import characters from "./character.json";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type ListItemProps = {
  character: Character;
};
const ListItem = ({ character }: ListItemProps) => {
  return (
    <View
      style={{
        backgroundColor: "white"
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
        {character.name}
      </Text>
      <Image
        source={{ uri: character.image }}
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT / 2,
          resizeMode: "cover"
        }}
      />
    </View>
  );
};

const MyList = () => {
  return <ListItem character={characters.results[0]} />;
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
