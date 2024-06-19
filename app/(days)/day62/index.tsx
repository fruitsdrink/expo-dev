import { DayHome } from "@/components";

const desc = `
# Sliding Counter Animation in React Native (Reanimated 3) 

[youtube](https://youtu.be/KlUi2BCUIic?si=kFwcm0hh1N79iQlf)

## 技术点
- react-native-reanimated
- react-native-gesture-handler
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day62/demo"
        }
      ]}
    />
  );
}
