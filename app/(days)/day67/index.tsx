import { DayHome } from "@/components";

const desc = `
# Dropdown Menu Animation in React Native (Reanimated 3) 

[youtube](https://youtu.be/LtgHWjf7BA8?si=dZyYFa5E53vstNxG)

## packate
- [color](https://www.npmjs.com/package/color)
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day67/demo"
        }
      ]}
    />
  );
}
