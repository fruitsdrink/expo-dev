import { DayHome } from "@/components";

const desc = `
# Snapchat Shared Transitions - “Can it be done in React Native?”

[youtube](https://youtu.be/NJZfRXs7nZs?si=vlBmZEwbyT43uMQ-)

## 技术点

未完成，react-native-shared-element 与 expo router 有冲突，暂时无法使用。
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
