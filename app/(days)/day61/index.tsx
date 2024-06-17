import { DayHome } from "@/components";

const desc = `
# Ripple Effect Animation in React Native with Reanimated 3

[youtube](https://youtu.be/QxGQwRqxbSA?si=WU2LVMVLXYBmDOR0)

## 技术点
- 水波纹动画

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day61/demo"
        }
      ]}
    />
  );
}
