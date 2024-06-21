import { DayHome } from "@/components";

const desc = `
# Introduction to Gesture Handler 2  

[youtube](https://youtu.be/xpT2shjX790?si=ssjR1JlxF4H2j1Lw)

## 技术点
- 手势
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day71/demo"
        }
      ]}
    />
  );
}
