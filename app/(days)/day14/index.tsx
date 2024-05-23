import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DayHome } from "@/components";

const desc = `
# Todo App

[youtube](https://www.youtube.com/live/kUGhYNn_o-Q?si=4ZL5PZPdpCJfdMti)

## 知识点
- FlatList底部组件的使用
- TextInput的使用, 注意焦点的处理
- 虚拟键盘的使用, 使用 KeyboardAvoidingView  组件，在虚拟键盘弹出时，缩小列表项的高度
- 列表项滑动效果
- 标题栏搜索框的使用
- 头部高度的获取
- 隐藏头部返回文字

`;
export default function Day14Screen() {
  return (
    <DayHome
      title="todo app"
      description={desc}
      buttons={[
        {
          link: "/day14/todo",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({});
