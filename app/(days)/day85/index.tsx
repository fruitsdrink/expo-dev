import { DayHome } from "@/components";

const desc = `
# Gradient Clock Tutorial with Expo (Reanimated 3 + React-Native Skia) 

[youtube](https://youtu.be/W6yvb-oAq48?si=T1BhCixSXUUNkjtW)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day85/demo"
        }
      ]}
    />
  );
}
