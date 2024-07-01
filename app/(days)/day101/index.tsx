import { DayHome } from "@/components";

const desc = `
# Data Fetching in React Native with TanStack Query 

[youtube](https://www.youtube.com/live/bpHq_-bPkGo?si=rWLI1VWgnp_e2Isg)

## 技术点
- tanstack/query

## packate
\`\`\`
npx expo install @dev-plugins/react-query
\`\`\`

## 文档
- [Optimizing Performance with React Query v5: Best Practices and Tips](https://www.dhiwise.com/post/optimizing-performance-with-react-query-v5-best-practices)
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day101/demo"
        }
      ]}
    />
  );
}
