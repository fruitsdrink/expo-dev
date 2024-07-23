import { DayHome } from "@/components";

const desc = `
# React Native Shared Element Transition React Navigation V5 - Episode 1

[youtube](https://youtu.be/C2Q_MPxqLMI?si=kIRguC8V-4f6MxvG)

## 资料
- [图标](https://www.flaticon.com/search?word=tropical-destination)

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day123/demo"
        }
      ]}
    />
  );
}
