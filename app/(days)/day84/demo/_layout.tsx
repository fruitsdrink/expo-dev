import "react-native-gesture-handler";
import { Stack, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from "@react-navigation/drawer";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerNavigationState, ParamListBase } from "@react-navigation/native";
import { DrawerDescriptorMap } from "@react-navigation/drawer/lib/typescript/src/types";

type CustomDrawerContentProps = DrawerContentComponentProps;
const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({
  ...rest
}) => {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...rest}
        scrollEnabled={false}
        contentContainerStyle={{
          backgroundColor: "#dde3fe"
        }}
      >
        <View style={{ padding: 20 }}>
          <Image
            source={{ uri: "https://galaxies.dev/img/authors/simong.webp" }}
            style={{
              width: 100,
              aspectRatio: 1,
              alignSelf: "center"
            }}
          />
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "500",
              fontSize: 18,
              paddingTop: 10,
              color: "#5363df"
            }}
          >
            Simon Grimm
          </Text>
        </View>
        <View style={{ backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...rest} />
          <DrawerItem
            label={"Logout"}
            onPress={() => {
              router.replace("/");
            }}
          />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          borderTopColor: "#dde3fe",
          borderTopWidth: 1,
          padding: 20,
          paddingBottom: 20 + bottom
        }}
      >
        <Text
          style={{
            textAlign: "center"
          }}
        >
          Footer
        </Text>
      </View>
    </View>
  );
};

/** 完全手动绘制侧边栏 */
type CustomFancyDrawerContentProps = {
  state: DrawerNavigationState<ParamListBase>;
  descriptors: DrawerDescriptorMap;
};
const CustomFancyDrawerContent: React.FC<CustomFancyDrawerContentProps> = ({
  state,
  descriptors
}) => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  return (
    <ScrollView style={{ marginTop: top }}>
      {state.routes.map((route, i) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              if (route.name === "index") {
                router.push(`/day84/demo`);
              } else {
                router.push(`/day84/demo/${route.name}`);
              }
            }}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10
            }}
          >
            <Text
              style={{
                fontSize: 16,
                textTransform: "capitalize",
                color: i === state.index ? "blue" : "#000"
              }}
            >
              {route.name} -{" "}
              {descriptors[route.key].options.drawerLabel as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default function DemoLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          drawerContent={CustomDrawerContent}
          // drawerContent={CustomFancyDrawerContent}
          screenOptions={{
            drawerHideStatusBarOnOpen: true,
            drawerActiveBackgroundColor: "#5363df",
            drawerActiveTintColor: "#fff",
            drawerLabelStyle: { marginLeft: -20 }
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Home",
              headerTitle: "My Home",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="home-outline" color={color} size={size} />
              )
            }}
          />
          <Drawer.Screen
            name="news"
            options={{
              drawerLabel: "News",
              headerTitle: "Newsfeed",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="newspaper-outline" color={color} size={size} />
              )
            }}
          />
          <Drawer.Screen
            name="profile"
            options={{
              drawerLabel: "Profile",
              headerTitle: "My Profile",
              drawerIcon: ({ color, size }) => (
                <Ionicons name="person-outline" color={color} size={size} />
              )
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </>
  );
}
