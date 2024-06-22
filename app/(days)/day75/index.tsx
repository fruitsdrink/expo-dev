import { DayHome } from "@/components";

const desc = `
# Animated Gradient in React Native (Skia) 

[youtube](https://youtu.be/ZSPvvGU2LBg?si=PfyB7dRN6X8AGU_3)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day75/demo"
        }
      ]}
    />
  );
}
