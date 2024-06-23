import { DayHome } from "@/components";

const desc = `
# Chasing Finger Bubbles Animation with Expo and React Native Skia

[youtube](https://youtu.be/-KbdX_Xa-Gc?si=d3BosjgSgLPohElp)

## 技术点
- skia
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day86/demo"
        }
      ]}
    />
  );
}
