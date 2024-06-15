import { DayHome } from "@/components";

const desc = `
# Shake Animation in React Native (Reanimated)

[youtube](https://youtu.be/1yVL4O7TIas?si=B-H7FFWnSf9DhqJU)

## 技术点

`;

export default function Day42Screen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day51/demo"
        }
      ]}
    />
  );
}
