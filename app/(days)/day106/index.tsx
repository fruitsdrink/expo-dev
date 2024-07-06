import { DayHome } from "@/components";

const desc = `
# Snapchat Shared Transitions - “Can it be done in React Native?”

[youtube](https://youtu.be/NJZfRXs7nZs?si=vlBmZEwbyT43uMQ-)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day106/demo"
        }
      ]}
    />
  );
}
