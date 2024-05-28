import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DayHome } from "@/components";

const desc = `
# Todo With Context

[youtube](components/day14)

## 知识点
- FlatList底部组件的使用
- TextInput的使用, 注意焦点的处理
- 虚拟键盘的使用, 使用 KeyboardAvoidingView  组件，在虚拟键盘弹出时，缩小列表项的高度
- 列表项滑动效果
- 标题栏搜索框的使用
- 头部高度的获取
- 隐藏头部返回文字
- react context
- [同步存储(https://docs.expo.dev/versions/latest/sdk/async-storage/)]
- [安全存储](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [mmkv](https://github.com/mrousavy/react-native-mmkv)

## 相关链接

- [expo AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/docs/usage/)
- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [mmkv](https://github.com/mrousavy/react-native-mmkv)
`;
export default function Day15Screen() {
  return (
    <DayHome
      title="todo with context"
      description={desc}
      buttons={[
        {
          link: "/day15/todo",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({});
