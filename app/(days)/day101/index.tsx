import { DayHome } from "@/components";

const desc = `
# Data Fetching in React Native with TanStack Query 

[youtube](https://www.youtube.com/live/bpHq_-bPkGo?si=rWLI1VWgnp_e2Isg)

## 技术点
- tanstack/query
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
