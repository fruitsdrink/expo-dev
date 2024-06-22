import { DayHome } from "@/components";

const desc = `
# Animated 3D Card in React Native (Reanimated and Skia) 

[youtube](https://youtu.be/pVesCl7TY8A?si=CBsHY1T9RqCk2lJS)

## 技术点
- skia

## packate
- skia
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day73/demo"
        }
      ]}
    />
  );
}
