import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { Skeleton } from "moti/skeleton";
import { MotiSkeletonProps } from "moti/build/skeleton/types";
import { wait } from "@/utils/utils";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");

interface ContactInfo {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

// const skeletonCommponProps: Pick<
//   MotiSkeletonProps,
//   "colorMode" | "transition" | "backgroundColor"
// > = {
//   colorMode: "light",
//   transition: {
//     type: "timing",
//     duration: 2000
//   },
//   backgroundColor: "#d4d4d4"
// };
const skeletonCommponProps = {
  colorMode: "light",
  transition: {
    type: "timing",
    duration: 2000
  },
  backgroundColor: "#d4d4d4"
} as const;

interface ContactListItemProps {
  contact?: ContactInfo | null;
}
const ContactListItem: React.FC<ContactListItemProps> = ({ contact }) => {
  return (
    <View style={contactListItemStyles.container}>
      <Skeleton.Group show={!contact}>
        <Skeleton
          height={70}
          width={70}
          radius={"round"}
          {...skeletonCommponProps}
        >
          {contact && (
            <Animated.View
              layout={LinearTransition}
              entering={FadeIn.duration(1500)}
              style={contactListItemStyles.circleContainer}
            >
              <Text style={{ fontSize: 24, color: "white" }}>
                {contact.name[0]}
              </Text>
            </Animated.View>
          )}
        </Skeleton>
        <View style={{ flex: 1 }}>
          <Skeleton height={30} width={"80%"} {...skeletonCommponProps}>
            {contact && (
              <Animated.Text
                layout={LinearTransition}
                entering={FadeIn.duration(1500)}
                style={{ fontSize: 24 }}
              >
                {contact.name}
              </Animated.Text>
            )}
          </Skeleton>
          <View style={{ height: 5 }} />
          <Skeleton height={25} width={"70%"} {...skeletonCommponProps}>
            {contact && (
              <Animated.Text
                layout={LinearTransition}
                entering={FadeIn.duration(1500)}
                style={{ fontSize: 20 }}
              >
                {contact.email}
              </Animated.Text>
            )}
          </Skeleton>
        </View>
      </Skeleton.Group>
    </View>
  );
};

const contactListItemStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20
  },
  circleContainer: {
    height: 70,
    aspectRatio: 1,
    borderRadius: 35,
    backgroundColor: "#005cb7",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default function DemoScreen() {
  const [contacts, setContacts] = useState<ContactInfo[] | undefined>();

  const contactsPlaceholderList = useMemo(() => {
    return Array.from({ length: 15 }).map((_, index) => null);
  }, []);

  const fetchContacts = useCallback(async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    await wait(1000);
    setContacts(data);
  }, []);

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <StatusBar hidden />
        <FlatList
          data={contacts ?? contactsPlaceholderList}
          keyExtractor={(item, index) =>
            item ? item.id.toString() : index.toString()
          }
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#ced0ce"
              }}
            />
          )}
          renderItem={({ item }) => {
            return <ContactListItem contact={item} />;
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50
  }
});
