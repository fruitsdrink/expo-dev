import { DayHome } from "@/components";

const desc = `
# Telegram Dynamic Island Scroll Animation - React Native Skia

[youtube](https://youtu.be/l_svfAfbmFQ?si=sxXkEbYFkaie8quT)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day131/demo"
        }
      ]}
    />
  );
}
