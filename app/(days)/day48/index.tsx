import { DayHome } from "@/components";

const desc = `
# Let's build a Lava lamp animation in React Native 

[youtube](https://www.youtube.com/live/MSOVj6raMcc?si=0liKQ_zwO9a50Pyk)

## 技术点
- animation

## package
- [randomcolor](https://www.npmjs.com/package/randomcolor)
- expo-blur
- @react-native-community/blur
`;

export default function Day48Screen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day48/demo"
        }
      ]}
    />
  );
}
