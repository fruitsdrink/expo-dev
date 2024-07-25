import { DayHome } from "@/components";

const desc = `
# React Native Shared Element Transition React Navigation V5 - Episode 3

[youtube](https://youtu.be/xVBTiR8gLJE?si=f6C2UVoX4QR40n9E)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day125/demo"
        }
      ]}
    />
  );
}
