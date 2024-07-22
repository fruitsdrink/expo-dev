import { DayHome } from "@/components";

const desc = `
# Shared Element Transition
[youtube](https://youtu.be/tC7egqnpYSY?si=_sObVi2qwx4fBG4w)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day122/demo"
        }
      ]}
    />
  );
}
