import { Stack } from "expo-router";
import {
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text
} from "react-native";
import { faker } from "@faker-js/faker";
import { Entypo, Feather } from "@expo/vector-icons";
import React from "react";

const { width, height } = Dimensions.get("screen");

faker.seed(10);

const data = [...Array(20).keys()].map(() => ({
  key: faker.string.uuid(),
  job: faker.animal.crocodilia()
}));

const _colors = {
  active: "#fcd259ff",
  inactive: "#fcd25900"
};

const _spacing = 10;

export default function DemoScreen() {
  const ref = React.useRef<FlatList>(null);
  const [index, setIndex] = React.useState(0);
  const [viewPosition, setViewPosition] = React.useState(0);

  React.useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
      viewOffset: viewPosition === -0.5 || viewPosition === 1 ? 0 : _spacing, // 指定活动元素距离视口的距离
      viewPosition // 指定活动元素在视口的位置， 0.5 为居中，0.2为距离左侧20%的位置
    });
  }, [index, viewPosition]);

  const toPrevIndex = () => {
    if (index === 0) {
      return;
    }
    setIndex(index - 1);
  };

  const toNextIndex = () => {
    if (index === data.length - 1) {
      return;
    }
    setIndex(index + 1);
  };

  const setAlignLeft = () => {
    setViewPosition(0);
  };
  const setAlignCenter = () => {
    setViewPosition(0.5);
  };

  const setAlignRight = () => {
    setViewPosition(1);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <FlatList
          ref={ref}
          initialScrollIndex={index}
          style={{ flexGrow: 0 }}
          data={data}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingLeft: _spacing }}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index: fIndex }) => (
            <TouchableOpacity
              onPress={() => {
                setIndex(fIndex);
              }}
            >
              <View
                style={{
                  marginRight: _spacing,
                  padding: _spacing,
                  borderWidth: 2,
                  borderColor: _colors.active,
                  borderRadius: 12,
                  backgroundColor:
                    index === fIndex ? _colors.active : _colors.inactive
                }}
              >
                <Text
                  style={{
                    color: "#36303f",
                    fontWeight: "700"
                  }}
                >
                  {item.job}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: _spacing * 10
          }}
        >
          <View
            style={{
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: "#36303f",
                fontWeight: "700",
                marginBottom: _spacing
              }}
            >
              Scroll position
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: width / 2,
                justifyContent: "center"
              }}
            >
              <TouchableOpacity onPress={setAlignLeft}>
                <View
                  style={{
                    padding: _spacing,
                    backgroundColor: "#fcd259",
                    borderRadius: _spacing,
                    marginRight: _spacing
                  }}
                >
                  <Entypo name="align-left" size={24} color={"#36303f"} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={setAlignCenter}>
                <View
                  style={{
                    padding: _spacing,
                    backgroundColor: "#fcd259",
                    borderRadius: _spacing,
                    marginRight: _spacing
                  }}
                >
                  <Entypo
                    name="align-horizontal-middle"
                    size={24}
                    color={"#36303f"}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={setAlignRight}>
                <View
                  style={{
                    padding: _spacing,
                    backgroundColor: "#fcd259",
                    borderRadius: _spacing,
                    marginRight: _spacing
                  }}
                >
                  <Entypo name="align-right" size={24} color={"#36303f"} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: "#36303f",
                fontWeight: "700",
                marginBottom: 10
              }}
            >
              Navigation
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: width / 2,
                justifyContent: "center"
              }}
            >
              <TouchableOpacity onPress={toPrevIndex}>
                <View
                  style={{
                    padding: _spacing,
                    backgroundColor: "#fcd259",
                    borderRadius: _spacing,
                    marginRight: _spacing
                  }}
                >
                  <Feather name="arrow-left" size={24} color={"#36303f"} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={toNextIndex}>
                <View
                  style={{
                    padding: _spacing,
                    backgroundColor: "#fcd259",
                    borderRadius: _spacing,
                    marginRight: _spacing
                  }}
                >
                  <Feather name="arrow-right" size={24} color={"#36303f"} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
