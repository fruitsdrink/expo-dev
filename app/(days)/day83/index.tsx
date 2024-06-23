import { DayHome } from "@/components";

const desc = `
# Building Animated Landing Screen in React Native

[youtube](https://youtu.be/MnqWZrXLZ8M?si=YcGI_Pjw5GO7qLva)

## packate
- react-native-swiper
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day83/demo"
        }
      ]}
    />
  );
}
