import { DayHome } from "@/components";

const desc = `
# Airbnb Header Animation | React Native | Reanimated 

[youtube](https://youtu.be/JPx8IlfYQ-c?si=Cex8ltCpsK7k2b-M)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day102/demo"
        }
      ]}
    />
  );
}
