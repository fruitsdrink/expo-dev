import { Stack } from "expo-router";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { PEXELS_API_KEY, PEXELS_API_URL } from "@/config";
import { Photo, type PexelResponse } from "@/types/pexels.dto";
import { useEffect, useRef, useState } from "react";

const { width, height } = Dimensions.get("screen");
const _ImageSize = 80;
const _Spacing = 10;

const fetchImagesFromPexels = async () => {
  const data = await fetch(PEXELS_API_URL, {
    headers: {
      Authorization: PEXELS_API_KEY
    }
  });

  const { photos } = (await data.json()) as PexelResponse;

  return photos;
};

export default function Day34DemoScreen() {
  const [images, setImages] = useState<Photo[]>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const topRef = useRef<FlatList>();
  const thumbRef = useRef<FlatList>();

  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchImagesFromPexels();
      setImages(images);
    };

    fetchImages();
  }, []);

  const scrollToActiveIndex = (index: number) => {
    // console.log("🚀 ~ setActiveIndex ~ index:", index);
    setActiveIndex(index);
    topRef?.current.scrollToOffset({
      offset: index * width,
      animated: true
    });
    // 方法1
    // if (index * (_ImageSize + _Spacing) - _ImageSize / 2 > width / 2) {
    //   thumbRef.current.scrollToOffset({
    //     offset: index * (_ImageSize + _Spacing) - width / 2 + _ImageSize / 2,
    //     animated: true
    //   });
    // } else {
    //   thumbRef.current.scrollToOffset({
    //     offset: 0,
    //     animated: true
    //   });
    // }
    // 方法2
    thumbRef?.current.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5
    });
  };

  if (!images) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000"
        }}
      >
        <Text style={{ color: "white" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <FlatList
          ref={topRef}
          data={images}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(ev) => {
            scrollToActiveIndex(
              Math.floor(ev.nativeEvent.contentOffset.x / width)
            );
          }}
          renderItem={({ item }) => (
            <View
              style={{
                width,
                height
              }}
            >
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    justifyContent: "center",
                    alignItems: "center"
                  }
                ]}
              >
                <Text style={{ color: "white" }}>Loading</Text>
              </View>

              <Image
                source={{
                  uri: item.src.portrait
                }}
                alt={item.alt}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          )}
        />
        <FlatList
          ref={thumbRef}
          data={images}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            position: "absolute",
            bottom: _ImageSize
          }}
          contentContainerStyle={{
            paddingHorizontal: _Spacing
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
              <View
                style={{
                  width: _ImageSize,
                  height: _ImageSize,
                  marginRight: _Spacing,
                  borderRadius: 12,
                  overflow: "hidden",
                  borderWidth: 2,
                  borderColor: activeIndex === index ? "#fff" : "transparent"
                }}
              >
                <View
                  style={[
                    StyleSheet.absoluteFill,
                    {
                      justifyContent: "center",
                      alignItems: "center"
                    }
                  ]}
                >
                  <Text style={{ color: "white" }}>Loading</Text>
                </View>

                <Image
                  source={{
                    uri: item.src.portrait
                  }}
                  alt={item.alt}
                  style={StyleSheet.absoluteFillObject}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <StatusBar style="auto" hidden={true} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  }
});
