import { DayHome } from "@/components";

const desc = `
# Create a Simple Login Screen in React Native

[youtube](https://youtu.be/lA_73_-n-V4?si=5xt8CNaubYG7897Q)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day121/demo"
        }
      ]}
    />
  );
}
