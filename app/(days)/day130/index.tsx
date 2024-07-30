import { DayHome } from "@/components";

const desc = `
# React Native Custom Scratch Card With Skia From Scratch

[youtube](https://youtu.be/RJ39xhgWSL4?si=2rM4SExOuHW8d10A)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day130/demo"
        }
      ]}
    />
  );
}
