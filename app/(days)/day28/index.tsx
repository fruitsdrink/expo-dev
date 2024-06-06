import { DayHome } from "@/components";

const desc = `
# Simple Profile Cards 

[youtube](https://youtu.be/heZBofCfap4?si=cXSMHY68G_YE45ZN)
`;

export default function Day27Screen() {
  return (
    <DayHome
      title="Simple Workout List"
      description={desc}
      buttons={[
        {
          link: "/day28/demo"
        }
      ]}
    />
  );
}
