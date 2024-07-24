import { DayHome } from "@/components";

const desc = `
# React Native Shared Element Transition React Navigation V5 - Episode 2 

[youtube](https://youtu.be/Zol6ivicuo8?si=FTjPEXWoQMjQHHZx)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day124/demo"
        }
      ]}
    />
  );
}
