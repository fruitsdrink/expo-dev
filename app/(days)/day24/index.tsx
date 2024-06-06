import { DayHome } from "@/components";

const desc = `
# useSharedValue & useDerivedValue

[youtube](https://youtu.be/Hu6jjjHItv8?si=_6khAFxB1ht0-ZcR)

## 技术点
- useSharedValue
- useDerivedValue
`;
export default function Day24Screen() {
  return (
    <DayHome
      title="useSharedValue & useDerivedValue"
      description={desc}
      buttons={[
        {
          text: "共享值与派生值",
          link: "/day24/demo/demo1"
        },
        {
          text: "共享值与线程",
          link: "/day24/demo/demo2"
        }
      ]}
    />
  );
}
