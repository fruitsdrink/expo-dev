import { DayHome } from "@/components";

const desc = `
# Momo Header Animation - React Native 

[youtube](https://youtu.be/WIX9Tp76Tug?si=wBQ1HdVPU8tS2R8r)

## 技术点
- SafeAreaView 的巧妙运用
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day103/demo"
        }
      ]}
    />
  );
}
