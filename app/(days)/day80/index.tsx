import { DayHome } from "@/components";

const desc = `
# The Power of Lottie in React Native 

[youtube](https://youtu.be/fLbtTL0rOcU?si=F93xxUahfqV6EPR2)

## 技术点
- lottie
- AnimatedWrapper组件的使用

## 相关资源
- https://lottiefiles.com
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day80/demo"
        }
      ]}
    />
  );
}
