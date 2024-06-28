import { DayHome } from "@/components";

const desc = `
# Advanced React Native FlatList animations at 60fps with Animated API 

[youtube](https://youtu.be/yV-2HRzNX9o?si=2XRo8c8FfRbi7IE-)

## 技术点
- flatlist分页动画

## package
- @react-native-masked-view/masked-view
- react-native-svg
- expo-linear-gradient

## other
- [Inspiration](https://dribbble.com/shots/8257559-Movie-2-0)
- [TMDB API](https://www.themoviedb.org/documentation/api)
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day94/demo"
        }
      ]}
    />
  );
}
