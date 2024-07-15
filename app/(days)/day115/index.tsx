import { DayHome } from "@/components";

const desc = `
# Animated Login Form in React Native

[youtube](https://youtu.be/dj0zN72phDo?si=xLNEb0dBWIfZf7jh)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day115/demo"
        }
      ]}
    />
  );
}
