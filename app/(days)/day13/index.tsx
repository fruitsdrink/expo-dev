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
