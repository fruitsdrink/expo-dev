import {
  TouchableOpacity,
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { Link, Stack, router } from "expo-router";
import { DayHome } from "@/components";

export default function Day2Screen() {
  const desc = `
  ## 知识点
- 顶部状态栏设置为亮色
- 左右滑动手势的应用。注意调用外部方法必须设置runOnJS(true)

## 第三包

- react-native-gesture-handler
- react-native-reanimated

## 相关文档

- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated)
`;
  return (
    <DayHome
      title="Day 2: Onboarding"
      description={desc}
      link="/day2/onboarding"
    />
  );
}
