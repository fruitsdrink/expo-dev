import { DayHome } from "@/components";

const desc = `
# Infinite Scroll in React Native: Pagination with FlatList

[youtube](https://www.youtube.com/live/i4jKoTlSqvI?si=4xSwEarlsaN9E3Kj)

## 相关文档
- https://reactnative.dev/docs/optimizing-flatlist-configuration

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day132/demo"
        }
      ]}
    />
  );
}
