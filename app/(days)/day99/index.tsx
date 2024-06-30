import { DayHome } from "@/components";

const desc = `
# How to create an animated Carousel in React Native

[youtube](https://youtu.be/XFtx09yoX0M)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day99/demo"
        }
      ]}
    />
  );
}
