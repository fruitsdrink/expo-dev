import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DayHome } from "@/components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const desc = `
# Todo With zustand

[youtube](https://www.youtube.com/live/fvtxgwa5NJA?si=rRRuLCAX0g66o4ab)

## 知识点
- zustand
- react-native-async-storage(https://github.com/react-native-async-storage/async-storage)
- 删除存储 \`AsyncStorage.removeItem("tasks-store")\`


## 相关链接
- [zustand](https://zustand-demo.pmnd.rs)
`;
export default function Day16Screen() {
  // AsyncStorage.removeItem("tasks-store");
  return (
    <DayHome
      title="todo zustand"
      description={desc}
      buttons={[
        {
          link: "/day16/todo"
        }
      ]}
    />
  );
}

const styles = StyleSheet.create({});
