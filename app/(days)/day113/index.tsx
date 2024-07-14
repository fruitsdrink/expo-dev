import { DayHome } from "@/components";

const desc = `
# The Best React Native Menus with Zeego

[youtube](https://youtu.be/U7rzrV4_p14?si=GvhUentfT11d_-a9)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day113/demo"
        }
      ]}
    />
  );
}
