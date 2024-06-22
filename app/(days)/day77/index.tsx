import { DayHome } from "@/components";

const desc = `
# Grid Magnification in React Native (Skia)

[youtube](https://youtu.be/zV0SGIlrtug?si=RWVdusI4ZNKz7ysv)

## 源码
- https://github.com/enzomanuelmangano/exploring-skia

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day77/demo"
        }
      ]}
    />
  );
}
