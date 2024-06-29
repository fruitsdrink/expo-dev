import { DayHome } from "@/components";

const desc = `
# 

[youtube]()

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/dayxx/demo"
        }
      ]}
    />
  );
}
