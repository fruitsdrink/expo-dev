import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  StyleProp,
  ViewStyle
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { faker } from "@faker-js/faker";
import {
  AnimatedProps,
  Canvas,
  Group,
  Mask,
  Rect,
  Skia,
  SkImage,
  Image as SkiaImage,
  useImage,
  Path
} from "@shopify/react-native-skia";
import React, { useRef, useState } from "react";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const AnimationScratchCard = () => {
  const image = useImage(
    require("@/assets/images/day130/scratch_foreground.jpeg")
  );

  if (!image) {
    return <Text style={{ fontSize: 16 }}>Loading...</Text>;
  }

  return (
    <ScratchCard
      style={{
        borderRadius: 16
      }}
      image={image}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "gray",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          overflow: "hidden"
        }}
      >
        <Image
          source={require("@/assets/images/day130/gift-box.png")}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            marginBottom: 20
          }}
        />
        <Text
          style={{
            fontSize: 18,
            color: "black",
            marginBottom: 6
          }}
        >
          Cashback
        </Text>
        <Text
          style={{
            fontSize: 40,
            color: "black",
            fontWeight: "700"
          }}
        >
          $10
        </Text>
      </View>
    </ScratchCard>
  );
};

type ScratchCardProps = {
  style: StyleProp<ViewStyle>;
  image: SkImage | null;
  children?: React.ReactNode;
};
const ScratchCard: React.FC<ScratchCardProps> = ({
  style,
  image,
  children
}) => {
  const [[width, height], setSize] = useState([0, 0]);
  const [isMove, setIsMove] = useState(false);
  const [isScratched, setIsScratched] = useState(false);
  const path = useRef(Skia.Path.Make());

  const handleTouchEnd = () => {
    if (isMove) {
      setIsScratched(true);
    }
  };

  return (
    <View
      onLayout={(e) => {
        setSize([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
      }}
      style={[
        {
          position: "relative",
          width: 300,
          height: 300,
          overflow: "hidden"
        },
        style
      ]}
    >
      {Boolean(image && width && height) && (
        <>
          {isMove && <View>{children}</View>}
          <Canvas
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%"
            }}
            onTouchStart={({ nativeEvent }) => {
              path.current.moveTo(nativeEvent.locationX, nativeEvent.locationY);
            }}
            onTouchMove={({ nativeEvent }) => {
              setIsMove(true);
              path.current.lineTo(nativeEvent.locationX, nativeEvent.locationY);
            }}
            onTouchEnd={handleTouchEnd}
          >
            <Mask
              mode="luminance"
              mask={
                <Group>
                  <Rect x={0} y={0} width={1000} height={1000} color="#fff" />
                  <Path
                    path={path.current}
                    color="#000"
                    style="stroke"
                    strokeJoin={"round"}
                    strokeCap={"round"}
                    strokeWidth={50}
                  />
                </Group>
              }
            >
              {!isScratched && (
                <SkiaImage
                  image={image}
                  x={0}
                  y={0}
                  width={width}
                  height={height}
                />
              )}
            </Mask>
          </Canvas>
        </>
      )}
    </View>
  );
};

export default function DemoScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <AnimationScratchCard />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
