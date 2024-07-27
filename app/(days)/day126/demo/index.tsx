import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  FlatList
} from "react-native";
import { RootStackParamList } from "./_layout";
import { faker } from "@faker-js/faker";
import MasonryList from "@react-native-seoul/masonry-list";
import { useEffect, useRef } from "react";

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
const UserCard = ({ user }: UserProps) => {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#e6e6e6"
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

const PhotographyItemDetail = ({ data }: { data: any[] }) => {
  return (
    <View>
      {data.map((item, index) => {
        return (
          <View
            key={`detail.${item.key}`}
            style={{
              position: "absolute"
            }}
          >
            <Text style={{ color: "white" }}>{item.title}</Text>
            <Text style={{ color: "white" }}>{item.description}</Text>
          </View>
        );
      })}
    </View>
  );
};

const Masonry = () => {
  return (
    <MasonryList
      data={photographyImages}
      keyExtractor={(item): string => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1
        // width: SCREEN_WIDTH
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
  return (
    <View style={styles.container}>
      <FlatList
        data={photographys}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SCREEN_WIDTH}
        renderItem={({ item }) => {
          return (
            <View
              style={{ flex: 1, width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
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
              <View
                style={{
                  position: "absolute",
                  bottom: 120,
                  alignSelf: "center"
                }}
              >
                <UserCard user={item.user} />
              </View>
            </View>
          );
        }}
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
