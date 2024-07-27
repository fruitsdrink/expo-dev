import { DayHome } from "@/components";

const desc = `
# https://youtu.be/nEntsYyCbLM?si=DEuZ1uFNn434v6CP

[youtube](https://youtu.be/nEntsYyCbLM?si=DEuZ1uFNn434v6CP)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day127/demo"
        }
      ]}
    />
  );
}
