import { DayHome } from "@/components";

const desc = `
# Perspective Menu Animation in React Native with Reanimated 3 

[youtube]()

## 技术点
- react-native-reanimated
- react-native-gesture-handler

## 相关链接
https://github.com/th3rdwave/react-native-safe-area-context
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day63/demo"
        }
      ]}
    />
  );
}
