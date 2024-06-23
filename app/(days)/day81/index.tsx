import { DayHome } from "@/components";

const desc = `
# Create a Drag and Drop Puzzle/Sorting in React Native 

[youtube](https://youtu.be/219Rv7qUEZw?si=FzyJ2KdFON0TyIn2)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day81/demo"
        }
      ]}
    />
  );
}
