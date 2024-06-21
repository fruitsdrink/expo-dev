import { DayHome } from "@/components";

const desc = `
# Skeleton Animation in React Native with Moti

[youtube](https://youtu.be/vunwBbFx_F8?si=e9b-B6wu0EopFmgU)

## package
- moti
- expo-liear-gradient

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day69/demo"
        }
      ]}
    />
  );
}
