import { DayHome } from "@/components";

const desc = `
# AWESOME React Native carousel animation 60fps - FlatList and Animated API

[youtube](https://youtu.be/gOj4BlzYF4A?si=5wx1YyDZlsYJynhc)

## 技术点
- FlatList
- Animated

## 文档资料
[Inspiration](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbVRHY3FDZUpLbnprQkljNGI1VXBWdGZlMUhnQXxBQ3Jtc0trT2FudmxMTktFLUd4VG1tb0ZpVnlGRHBsYjhNYUZjeVdld1FqNkRRSV9uSXVkQlIyY1JRa0dab3RmSmlOWGJ0OVZBUlJYY0NOa2xXUGFRNXpTX3pySlVubmV4ckswMGtEbk9WZVJTQ3VHTXV6elBRdw&q=https%3A%2F%2Fdribbble.com%2Fshots%2F14139308-Simple-Scroll-Animation&v=gOj4BlzYF4A)
`;

export default function Day36Screen() {
  return (
    <DayHome
      title="FlatList and Animated"
      description={desc}
      buttons={[
        {
          link: "/day36/demo"
        }
      ]}
    />
  );
}
