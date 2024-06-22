import { DayHome } from "@/components";

const desc = `
# Introduction to Animated API (React Native) 

[youtube](https://youtu.be/PfC5Phrueww?si=MZ5wZByKkF0dYCgY)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day78/demo"
        }
      ]}
    />
  );
}
