import { DayHome } from "@/components";

const desc = `
# React Native Instagram Clone in 2024 (Login)

[youtube](https://youtu.be/JTainThP4RQ?si=uRGg-g_oClClV2In)

## 技术点
- nativewind
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day110/demo"
        }
      ]}
    />
  );
}
