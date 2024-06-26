import { DayHome } from "@/components";

const desc = `
# Onboarding tutorial for React Native - Fluid Indicator 

- [youtube](https://youtu.be/Efy48Uoa4RM?si=OJoYyN8LJXXYtUQj)
- [Youtube](https://youtu.be/SLbay2efwso?si=v6rJkw8_PKh6RN1e)
## 技术点
- 分页动画
- svg动画
- 存储

## package
- @react-native-async-storage/async-storage
- react-native-svg
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day93/demo"
        }
      ]}
    />
  );
}
