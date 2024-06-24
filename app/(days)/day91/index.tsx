import { DayHome } from "@/components";

const desc = `
# Floating Hearts Animation - React Native Animated 

[youtube](https://youtu.be/_SC3BxI-1xA?si=6wQCIRiMK28-4ZTh)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day91/demo"
        }
      ]}
    />
  );
}
