import { DayHome } from "@/components";

const desc = `
# Metaball Animation in React Native (Skia) 

[youtube](https://youtu.be/HOxZegqnDC4?si=DuoEav7IzlJny4hF)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day76/demo"
        }
      ]}
    />
  );
}
