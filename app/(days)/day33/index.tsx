import { DayHome } from "@/components";

const desc = `
# Custom Animated Switch component in React Native - Moti & Reanimated

[youtube](https://youtu.be/LwKUjau3Ifw?si=UOC5dxnQCd_Uaa0-)

## 技术点
- Moti

## package

- [moti](https://moti.fyi/installation)

## 文档资料
`;

export default function Day33Screen() {
  return (
    <DayHome
      title="Animated Switch"
      description={desc}
      buttons={[
        {
          link: "/day33/demo"
        }
      ]}
    />
  );
}
