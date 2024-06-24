import { DayHome } from "@/components";

const desc = `
# Floating Action Button - React Native Animated 

[youtube](https://youtu.be/IEyUouhcuNQ?si=16nqddFAUT5xtOFE)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day90/demo"
        }
      ]}
    />
  );
}
