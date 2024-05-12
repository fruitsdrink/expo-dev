import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DayHome } from "@/components";

const desc = `
# Aws Amplify Gen1

[youtube](https://www.youtube.com/live/BGtVw_EEKZ8?si=ShOu-NahlX2ZZPtx)

未完成

## 知识点
- aws amplify Gen1

## 第三方服务
- [aws amplify](https://aws.amazon.com/cn/amplify/)
- [aws amplify doc](https://docs.amplify.aws/gen1/react-native/start/getting-started/installation/)
`;

export default function Day9Screen() {
  return (
    <DayHome
      title="AWS Amplify Gen1"
      description={desc}
      buttons={[
        {
          link: "/day9/protected",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({});
