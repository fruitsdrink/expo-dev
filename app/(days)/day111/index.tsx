import { DayHome } from "@/components";
import { BaseHostObject } from "@shopify/react-native-skia/lib/typescript/src/skia/web/Host";

const desc = `
# Banco de dados com Drizzle ORM no React Native + Expo 

[youtube](https://youtu.be/1inzzYvbgO8?si=Ns0qzf7z-JysH_c3)

## 技术点
- drizzle orm

## package
\`\`\`BaseHostObject
npx expo install expo-sqlite
yarn add drizzle-orm
yarn add expo-drizzle-studio-plugin
yarn add -D drizzle-kit
yarn add babel-plugin-inline-import
\`\`\`

## 迁移
\`\`\`
npx drizzle-kit generate
npx drizzle-kit migrate  
\`\`\`

## document
- [drizzle sqlite](https://orm.drizzle.team/docs/get-started-sqlite#expo-sqlite)
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day111/demo"
        }
      ]}
    />
  );
}
