import { DayHome } from "@/components";

const desc = `
# Simple Settings Screen

[youtube](https://youtu.be/l0OdkphKW68?si=FKDQW8Df5XBpFRKF)
`;

export default function Day27Screen() {
  return (
    <DayHome
      title="Simple Workout List"
      description={desc}
      buttons={[
        {
          link: "/day29/demo"
        }
      ]}
    />
  );
}
