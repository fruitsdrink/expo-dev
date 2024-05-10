import {
  TouchableOpacity,
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { Link, Stack, router } from "expo-router";

export default function Day2Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Day 2: Onboarding",
        }}
      />
      <View style={styles.container}>
        <View>
          <Text>知识点</Text>
          <Text>1. 顶部状态栏设置为亮色</Text>
          <Text>
            2. 左右滑动手势的应用。注意调用外部方法必须设置runOnJS(true)
          </Text>
          <Text>3. 页面切换动画</Text>
        </View>
        <View>
          <Text>第三包</Text>
          <Text>1. react-native-gesture-handler</Text>
          <Text>2. react-native-reanimated</Text>
        </View>
        <View>
          <Text>相关文档</Text>
          <Link
            href={"https://docs.swmansion.com/react-native-gesture-handler/"}
            asChild
          >
            <Pressable>
              <Text>1. react-native-gesture-handler</Text>
            </Pressable>
          </Link>
          <Link
            href={"https://docs.swmansion.com/react-native-reanimated/"}
            asChild
          >
            <Pressable>
              <Text>2. react-native-reanimated</Text>
            </Pressable>
          </Link>
        </View>
        <Button
          title="Go to Onboarding"
          onPress={() => {
            router.push("/day2/onboarding");
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    paddingHorizontal: 20,
  },
});
