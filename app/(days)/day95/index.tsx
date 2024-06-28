import { DayHome } from "@/components";

const desc = `
# Custom React Native Drawer animation with SVG and Masked View 

[youtube](https://youtu.be/fgUHYGeoG5U?si=qsan5VlYkzdbPeNu)

## 技术点
- svg
- MaskedView
- Animated
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day95/demo"
        }
      ]}
    />
  );
}
