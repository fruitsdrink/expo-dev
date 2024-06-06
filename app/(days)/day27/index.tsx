import { DayHome } from "@/components";

const desc = `
# Login Screen 

[youtube](https://youtu.be/rd25WOhp9Co?si=pSRbqhMRndL-TCVQ)
`;

export default function Day27Screen() {
  return (
    <DayHome
      title="Simple Workout List"
      description={desc}
      buttons={[
        {
          link: "/day27/demo"
        }
      ]}
    />
  );
}
