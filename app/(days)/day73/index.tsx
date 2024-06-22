import { DayHome } from "@/components";

const desc = `
# Animated 3D Card in React Native (Reanimated and Skia) 

[youtube](https://youtu.be/pVesCl7TY8A?si=CBsHY1T9RqCk2lJS)

## 技术点
- skia

## packate
- [react-native-skia](https://shopify.github.io/react-native-skia/)

## doc
- https://docs.expo.dev/versions/latest/sdk/skia/
- https://skia.org
- https://shopify.github.io/react-native-skia/
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
