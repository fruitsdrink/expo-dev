import {
  Animated,
  FlatList,
  Image,
  View,
  Text,
  useWindowDimensions,
  Dimensions
} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import svg, { Rect, Svg } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { MovieItem } from "../lib/api";

const AnimateSvg = Animated.createAnimatedComponent(Svg);

type BackdropProps = {
  movies: MovieItem[];
  scrollX: Animated.Value;
};

const { width, height } = Dimensions.get("window");
const BACKDROP_HEIGHT = height * 0.6;
const ITEM_SIZE = width * 0.72;

export const Backdrop = ({ movies, scrollX }: BackdropProps) => {
  return (
    <View
      style={{
        position: "absolute",
        width,
        height: BACKDROP_HEIGHT
      }}
    >
      <FlatList
        data={movies}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          if (!item.backdrop) {
            return null;
          }
          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width, 0]
          });

          return (
            <MaskedView
              maskElement={
                <AnimateSvg
                  width={width}
                  height={height}
                  viewBox={`0 0 ${width} ${height}`}
                  style={{
                    transform: [{ translateX }]
                  }}
                >
                  <Rect
                    x="0"
                    y="0"
                    width={width}
                    height={height}
                    fill={"red"}
                  />
                </AnimateSvg>
              }
              style={{
                position: "absolute"
              }}
            >
              <Image
                source={{
                  uri: item.backdrop
                }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  resizeMode: "cover"
                }}
              />
            </MaskedView>
          );
        }}
        style={{ width, height: BACKDROP_HEIGHT }}
      />
      <LinearGradient
        colors={["transparent", "white"]}
        style={{
          width,
          height: BACKDROP_HEIGHT,
          position: "absolute",
          bottom: 0
        }}
      />
    </View>
  );
};
