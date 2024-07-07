import { DayHome } from "@/components";

const desc = `
# Take a Picture using Camera for Expo React Native Apps and Save to Media Library or Share File

[youtube](https://youtu.be/4WPjWK0MYMI?si=CG2mW2cMeD0Hnc6I)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day108/demo"
        }
      ]}
    />
  );
}
