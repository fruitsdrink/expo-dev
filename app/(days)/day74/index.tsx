import { DayHome } from "@/components";

const desc = `
# Improving Tap Gestures in React Native 

[youtube](https://youtu.be/DWFS_dSnJOs?si=oFqMQRDPinZq32GE)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day74/demo"
        }
      ]}
    />
  );
}
