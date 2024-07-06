import { DayHome } from "@/components";

const desc = `
# React Native Shared Element Transitions with Reanimated 3 

[youtube](https://youtu.be/tsleLxbvxe0?si=jsdewHtjbjKEj5I2)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day107/demo"
        }
      ]}
    />
  );
}
