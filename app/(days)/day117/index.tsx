import { DayHome } from "@/components";

const desc = `
# download pdf

[youtube](https://youtu.be/LpaSLwHteIk?si=9R_jx6u93i9-M9OQ)

## 技术点
- expo-file-system
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day117/demo"
        }
      ]}
    />
  );
}
