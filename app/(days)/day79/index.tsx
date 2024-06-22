import { DayHome } from "@/components";

const desc = `
# React Native Advanced Onboarding (Reanimated 3) 

[youtube](https://youtu.be/OT-73hpwxXQ?si=T86Pen3tegZwG-5Y)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day79/demo"
        }
      ]}
    />
  );
}
