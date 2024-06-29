import { DayHome } from "@/components";

const desc = `
# Bottom Sheet React Native | Expo 

[youtube](https://youtu.be/_lzRvCf4FKE?si=0oLCRS7N2ZKp_IPe)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day98/demo"
        }
      ]}
    />
  );
}
