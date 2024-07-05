import { DayHome } from "@/components";

const desc = `
# Chanel Scroll Animation - “Can it be done in React Native?” 

[youtube](https://youtu.be/ucpoqa2-74s?si=6S9Eo0t_jkIobvKX)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          text: "demo1",
          link: "/day105/demo/demo1"
        },
        {
          text: "demo2",
          link: "/day105/demo/demo2"
        }
      ]}
    />
  );
}
