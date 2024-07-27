import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList,
  StyleProp,
  ViewStyle,
  Animated
} from "react-native";
import { PhotoGraphy, RootStackParamList } from "./_layout";
import { faker } from "@faker-js/faker";
import MasonryList from "@react-native-seoul/masonry-list";
import TouchableScale from "react-native-touchable-scale";
import React from "react";
import { SharedElement } from "react-navigation-shared-element";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const photographys = [...Array(10).keys()].map((i) => {
  return {
    key: String(i),
    title: faker.person.jobTitle(),
    description: faker.commerce.productDescription(),
    location: faker.location.streetAddress(true),
    image: faker.image.urlLoremFlickr({ category: "nature" }),
    user: {
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
      job: faker.person.jobTitle(),
      details: [
        {
          label: "Shots",
          value: faker.number.int({ min: 100, max: 400 })
        },
        {
          label: "Followers",
          value: faker.number.int({ min: 100, max: 2000 })
        },
        {
          label: "Following",
          value: faker.number.int({ min: 100, max: 2000 })
        }
      ]
    }
  };
});

type User = {
  name: string;
  avatar: string;
  job: string;
  details: { label: string; value: number }[];
};

type UserProps = {
  user: User;
};
export const UserCard = ({ user }: UserProps) => {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
        width: SCREEN_WIDTH * 0.9
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Image
          source={{ uri: user.avatar }}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
        <View
          style={{
            gap: 10,
            marginLeft: 20
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800"
            }}
          >
            {user.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#666"
            }}
          >
            {user.job}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: 30
        }}
      >
        {user.details.map((detail, index) => {
          return (
            <View
              key={index}
              style={{
                alignItems: "center",
                justifyContent: "center",
                gap: 4
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "800" }}>
                {detail.value}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: "#666"
                }}
              >
                {detail.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const photographyImages: {
  key: string;
  image: string;
  height: number;
}[] = [...Array(20).keys()].map((i) => {
  return {
    key: String(i),
    image: faker.image.urlLoremFlickr({ category: "animal" }),
    height: SCREEN_WIDTH * Math.max(0, Math.random()) + SCREEN_WIDTH / 5
  };
});

const PhotographyItemDetail = ({
  data,
  style,
  scrollX
}: {
  data: PhotoGraphy[];
  style: StyleProp<ViewStyle>;
  scrollX: Animated.Value;
}) => {
  return (
    <View style={style}>
      {data.map((item, index) => {
        const inputRange = [
          (index - 0.5) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 0.5) * SCREEN_WIDTH
        ];
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: "clamp"
        });
        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [10, 0, 10]
        });

        return (
          <Animated.View
            key={`detail.${item.key}`}
            style={[
              {
                position: "absolute",
                opacity,
                transform: [
                  {
                    translateY
                  }
                ]
              }
            ]}
          >
            <Text
              style={{
                color: "white",
                marginBottom: 12,
                fontSize: 22,
                fontWeight: "700"
              }}
            >
              {item.title}
            </Text>
            <Text style={{ color: "#fff", fontSize: 14, opacity: 0.7 }}>
              {item.description}
            </Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

export const Masonry = () => {
  return (
    <MasonryList
      data={photographyImages}
      keyExtractor={(item): string => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        width: SCREEN_WIDTH * 0.9 + 12,
        alignSelf: "center"
      }}
      contentContainerStyle={{
        paddingVertical: 12
      }}
      renderItem={({
        item
      }: {
        item: {
          key: string;
          image: string;
          height: number;
        };
        i: number;
      }) => (
        <View
          style={{
            margin: 6,
            backgroundColor: "#fff",
            overflow: "hidden"
          }}
        >
          <Image source={{ uri: item.image }} style={{ height: item.height }} />
        </View>
      )}
      onEndReachedThreshold={0.1}
    />
  );
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={photographys}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX }
              }
            }
          ],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => {
          return (
            <View
              style={{ flex: 1, width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
            >
              <SharedElement
                id={`item.${item.key}.image`}
                style={[StyleSheet.absoluteFillObject]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={[
                    StyleSheet.absoluteFillObject,
                    {
                      resizeMode: "cover"
                    }
                  ]}
                />
              </SharedElement>
              <View
                style={{
                  position: "absolute",
                  bottom: 120,
                  alignSelf: "center"
                }}
              >
                <TouchableScale
                  tension={20}
                  friction={7}
                  activeScale={0.9}
                  useNativeDriver
                  onPress={() => {
                    navigation.navigate("Detail", { item });
                  }}
                >
                  <SharedElement id={`item.${item.key}.userCard`}>
                    <UserCard user={item.user} />
                  </SharedElement>
                </TouchableScale>
              </View>
            </View>
          );
        }}
      />
      <PhotographyItemDetail
        data={photographys}
        style={{
          position: "absolute",
          top: 12 * 6,
          width: SCREEN_WIDTH * 0.84,
          alignSelf: "center"
        }}
        scrollX={scrollX}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  }
});
