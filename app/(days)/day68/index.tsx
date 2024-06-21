import { DayHome } from "@/components";

const desc = `
# Circular Carousel Animation in React Native (Reanimated) 

[youtube](https://youtu.be/-ZXedIjj4H8?si=E4KYCHs-7Spt7IGx)

## package
- expo-image

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day68/demo"
        }
      ]}
    />
  );
}
