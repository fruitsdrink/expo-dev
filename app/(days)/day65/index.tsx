import { DayHome } from "@/components";

const desc = `
# The magic of Layout Animations in Reanimated (React Native) 

[youtube](https://youtu.be/p3BLiloo2UM?si=7_u7WtlEpzGjWqe7)

## 技术点

## 资料
- https://www.reactiive.io/
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day65/demo"
        }
      ]}
    />
  );
}
