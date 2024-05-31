import { DayHome } from "@/components";

const desc = `
# Instagram Stories

[youtube](https://www.youtube.com/live/8ZgSt3VJ5Mc?si=yrAbLDNFDeK4Dc56)

## 知识点

- [reanimated](https://docs.expo.dev/versions/latest/sdk/reanimated/)
- [expo-linear-gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)
`;
export default function Day17Screen() {
  return (
    <DayHome
      title="Ig Stories"
      description={desc}
      buttons={[
        {
          text: "slider",
          link: "/day17/ig-stories"
        },
        {
          text: "3d-slider",
          link: "/day17/ig-stories/3d-slider"
        }
      ]}
    />
  );
}
