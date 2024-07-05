import { DayHome } from "@/components";

const desc = `
# ASMR Programming - React Native Hide Header on Scroll Example - No Talking

[youtube](https://youtu.be/oaGBEzMIwfo?si=62jq0S74L4AqoHcq)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day104/demo"
        }
      ]}
    />
  );
}
