import { DayHome } from "@/components";

const desc = `
# React Native Fitness App Onboarding 

[youtube](https://youtu.be/EMYRP4PVu1A?si=qOpY1whQ4Xemq_4R)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day114/demo"
        }
      ]}
    />
  );
}
