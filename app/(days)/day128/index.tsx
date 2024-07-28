import { DayHome } from "@/components";

const desc = `
# React Native Shared Element Transition React Navigation V5 - Episode 7

[youtube](https://youtu.be/dFEHETyuXWY?si=7mvK3F4tORiycFa8)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day128/demo"
        }
      ]}
    />
  );
}
