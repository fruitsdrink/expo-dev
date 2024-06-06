import { DayHome } from "@/components";

const desc = `
# FlatList

[youtube](https://youtu.be/k5_GkQliWBg?si=YAG-IYSH1AovHrTT)
`;
export default function Day20Screen() {
  return (
    <>
      <DayHome
        title="Flatlist"
        description={desc}
        buttons={[
          {
            text: "竖向列表",
            link: "/day20/demo"
          },
          {
            text: "横向列表",
            link: "/day20/demo/horizontal-flatlist"
          },
          {
            text: "可点击列表",
            link: "/day20/demo/touchable-list"
          }
        ]}
      />
    </>
  );
}
