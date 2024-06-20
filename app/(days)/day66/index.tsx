import { DayHome } from "@/components";

const desc = `
# Animated FlatList in React Native (Reanimated)

[youtube](https://youtu.be/3ox0R5jPb04?si=_zKIOFFU23yfVvhV)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day66/demo"
        }
      ]}
    />
  );
}
