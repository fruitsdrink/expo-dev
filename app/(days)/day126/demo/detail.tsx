import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import { RootStackParamList } from "./_layout";
import { AntDesign } from "@expo/vector-icons";
import { Masonry, UserCard } from ".";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

const DetailScreen = ({ navigation, route }: Props) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <AntDesign
        name="arrowleft"
        size={28}
        color={"#fff"}
        style={{
          padding: 12,
          position: "absolute",
          top: 30,
          left: 20,
          zIndex: 2
        }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <SharedElement id={`item.${item.key}.image`}>
        <Image
          source={{ uri: item.image }}
          style={[
            StyleSheet.absoluteFillObject,
            { resizeMode: "cover", height: SCREEN_HEIGHT / 2 }
          ]}
        />
      </SharedElement>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          paddingTop: SCREEN_HEIGHT / 2 - 100
        }}
        scrollEventThrottle={16}
      >
        <SharedElement id={`item.${item.key}.userCard`}>
          <UserCard user={item.user} />
        </SharedElement>
        <Animatable.View animation={"fadeInUp"} duration={800} delay={300}>
          <Masonry />
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

DetailScreen.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;
  return [
    {
      id: `item.${item.key}.image`
    },
    {
      id: `item.${item.key}.userCard`
    }
  ];
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
