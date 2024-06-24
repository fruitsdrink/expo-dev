import { Tabs } from "expo-router";
import { View } from "react-native";

interface TabBarProps extends BottomTabBarProps {}
const TabBar = () => {};

export default function DemoLayout() {
  return (
    <>
      <Tabs tabBar={(props) => <View></View>}>
        <Tabs.Screen name="(tabs)/index" options={{ title: "首页" }} />
        <Tabs.Screen name="(tabs)/explore" options={{ title: "发现" }} />
        <Tabs.Screen name="(tabs)/create" options={{ title: "发布" }} />
        <Tabs.Screen name="(tabs)/profile" options={{ title: "我的" }} />
      </Tabs>
    </>
  );
}
