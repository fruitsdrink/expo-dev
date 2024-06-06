import { DayHome } from "@/components";

const desc = `
# Phone Ring Indicator Wave

[youtube](https://youtu.be/hTmkjdKO3_M?si=IM31kTjNITlpJbkn)

## 技术点
- Moti
- Animated

## package

- [moti](https://moti.fyi/installation)

## 文档资料
`;

export default function Day31Screen() {
  return (
    <DayHome
      title="PhoneRingIndicatorWave"
      description={desc}
      buttons={[
        {
          link: "/day31/demo"
        }
      ]}
    />
  );
}
