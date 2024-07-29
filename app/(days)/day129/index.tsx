import { DayHome } from "@/components";

const desc = `
# React Native Shared Element Transition React Navigation V5 - Episode 9

[youtube](https://youtu.be/6XxpUhQqpjY?si=zcu6NdifP8hiGfHF)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day129/demo"
        }
      ]}
    />
  );
}
