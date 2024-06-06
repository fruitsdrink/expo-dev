import { DayHome } from "@/components";

const desc = `
# Login Screen 

[youtube](https://youtu.be/lA_73_-n-V4?si=l2YQNqxduLKLnsCi)
`;

export default function Day26Screen() {
  return (
    <DayHome
      title="Login Screen"
      description={desc}
      buttons={[
        {
          text: "Login Screen",
          link: "/day26/demo"
        }
      ]}
    />
  );
}
