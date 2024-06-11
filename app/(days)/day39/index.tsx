import { DayHome } from "@/components";

const desc = `
# Zara Mobile app - Advanced React Native carousel - FlatList and Animated API

[youtube](https://youtu.be/FIAPuq24b0g?si=wcwzdPKsZ4hvaQns)

## 技术点
- How to create and animated a FlatList carousel pagination
- How to create a custom pagination for the carousel
- How to animate the dot indicator circle for the pagination
- How to use BottomSheet in order to have a "modalized" bottom sheet with a scrollview inside it
- flatlist-snapToInterval
- flatlist-decelerationRate
- flatlist-bounces

## package
- [Bottom Sheet](https://github.com/gorhom/react-native-bottom-sheet)

`;

export default function Day39Screen() {
  return (
    <DayHome
      title="Custom carousel and pagination"
      description={desc}
      buttons={[
        {
          link: "/day39/demo"
        }
      ]}
    />
  );
}
