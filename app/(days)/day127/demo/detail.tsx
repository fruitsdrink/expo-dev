import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { buttons, colors, RootStackParamList, SPACING } from "./constants";
import { image } from "d3";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";

const { width, height } = Dimensions.get("window");

const AnimatableScrollView = Animatable.createAnimatableComponent(ScrollView);
const animation = {
  0: { opacity: 0, translateX: 50 },
  1: { opacity: 1, translateX: 0 }
};

const RowButton = ({
  text,
  onPress
}: {
  text: string;
  onPress: () => void;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: SPACING * 2,
        justifyContent: "space-between",
        borderColor: "rgba(0,0,0,0.1)",
        borderBottomWidth: 1,
        borderTopWidth: 1
      }}
    >
      <Text style={{ fontSize: 14 }}>{text}</Text>
      <AntDesign
        name="arrowright"
        color={"rgba(0,0,0,0.8)"}
        size={24}
        onPress={onPress}
      />
    </View>
  );
};

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

const DetailScreen = ({ navigation, route }: Props) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <AntDesign
        name="close"
        size={28}
        color={"#333"}
        style={{
          padding: 12,
          position: "absolute",
          top: SPACING * 2,
          right: 0,
          zIndex: 2
        }}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <SharedElement
        id={`item.${item.key}.image`}
        style={{ marginTop: SPACING }}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
      </SharedElement>
      <View style={styles.meta}>
        <SharedElement id={`item.${item.key}.model`}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={styles.model}
          >
            {item.model}
          </Text>
        </SharedElement>
        <SharedElement id={`item.${item.key}.desc`}>
          <Text style={styles.description}>{item.description}</Text>
        </SharedElement>
      </View>
      <AnimatableScrollView
        useNativeDriver
        animation={animation}
        delay={300}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, marginVertical: SPACING }}
        contentContainerStyle={{ padding: SPACING }}
      >
        {colors.map((color, index) => {
          return (
            <View
              key={index}
              style={[styles.switch, { backgroundColor: color }]}
            />
          );
        })}
      </AnimatableScrollView>
      {buttons.map((button, index) => {
        return (
          <Animatable.View
            useNativeDriver
            animation={animation}
            delay={300 + (index + 1) * 100}
          >
            <RowButton key={index} text={button} onPress={() => {}} />
          </Animatable.View>
        );
      })}
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
      id: `item.${item.key}.model`
    },
    {
      id: `item.${item.key}.desc`
    }
  ];
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: width * 2.1,
    height: width,
    resizeMode: "cover"
  },
  meta: {
    position: "absolute",
    top: SPACING * 4,
    left: SPACING,
    width: width * 0.6
  },
  model: {
    fontSize: 32,
    fontWeight: "700",
    position: "absolute"
  },
  description: {
    fontSize: 12,
    opacity: 0.7,
    position: "absolute",
    top: 32 + SPACING / 2
  },
  switch: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: SPACING
  }
});
