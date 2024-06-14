import { DayHome } from "@/components";

const desc = `
# Local-first application with Prisma ORM & Expo

[youtube](https://www.youtube.com/live/65Iqes0lxpQ?si=B5NoId0OXjkAUSlq)

## 技术点
- prisma orm

## package

## 文档资料
- [Bringing Prisma ORM to React Native and Expo](https://www.prisma.io/blog/bringing-prisma-orm-to-react-native-and-expo)
- [Early Access: Prisma ORM for React Native and Expo](https://github.com/prisma/react-native-prisma)
`;

export default function Day47Screen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day47/demo"
        }
      ]}
    />
  );
}
