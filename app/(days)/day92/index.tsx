import { DayHome } from "@/components";

const desc = `
# Star Ratings Animation - React Native Animated
[youtube](https://youtu.be/iOF3C9UnsWg?si=Vc68DB50GhNR4HLg)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day92/demo"
        }
      ]}
    />
  );
}
