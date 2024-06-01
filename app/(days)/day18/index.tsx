import { DayHome } from "@/components";

const desc = `
# Analytics
[youtube](https://www.youtube.com/live/Pv17halAbmo?si=kQ8iNVZvatWPKpjm)

## 技术点

- expo-analytics
- 自定义事件

## package
- vexo-analytics

\`\`\`bash
yarn add vexo-analytics
npx pod-install
\`\`\`

## 第三方服务

- [Vexo Analytics](https://www.vexo.co)
`;

export default function () {
  return (
    <DayHome
      title="Analytics"
      description={desc}
      buttons={[
        {
          text: "Analytics",
          link: "/day18/analytics"
        }
      ]}
    />
  );
}
