import { DayHome } from "@/components";

const desc = `
# Clock Loader Animation in React Native (Reanimated 3) 

[youtube](https://youtu.be/YbIXcA2fcLU?si=o-uwnSSRFhQMLlD7)

## 参考
- https://dribbble.com/shots/14420202-Processing-Animation

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day64/demo"
        }
      ]}
    />
  );
}
