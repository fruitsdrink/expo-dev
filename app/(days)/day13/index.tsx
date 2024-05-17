import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DayHome } from "@/components";

const desc = `
# EAS Build, Submit, and Update 

[youtube](https://www.youtube.com/live/PdHbBZvPyxI?si=9CESHujCv3nKwdUk)

[eas](https://expo.dev/eas)

## 知识点
- eas build
- eas submit
- eas update

## 注意
- eas只能自动更新javascript代码，不能更新原生代码
- 如果更新了原生代码或权限等，需要重新提交到eas


## 相关文档

- [expo eas](https://docs.expo.dev/eas/)
`;

export default function index() {
  return (
    <DayHome
      title="EAS Build & Update"
      description={desc}
      buttons={[
        {
          link: "./day13/eas",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({});
