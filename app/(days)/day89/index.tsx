import { DayHome } from "@/components";

const desc = `
# Twitter Style Loading Screen

[youtube](https://youtu.be/xrSOeCivwFk?si=2P8OzBLetsgYhxAO)

## 技术点
- MaskedView组件的使用
- rn动画

## packate
- npx expo install @react-native-masked-view/masked-view

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day89/demo"
        }
      ]}
    />
  );
}
