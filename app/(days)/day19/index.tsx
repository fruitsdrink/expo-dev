import { DayHome } from "@/components";

const desc = `
# WatermelonDB

[youtube](https://www.youtube.com/live/x7KE4JD-Q9A?si=VfgHKMuVsYfEFP3F)


## 技术点

- [watermelonDB](https://watermelondb.dev/docs)
- [supabase](https://supabase.com)
  - 登录、注册
  - 数据同步

## package

- @nozbe/watermelondb
- @babel/plugin-proposal-decorators
- @morrowdigital/watermelondb-expo-plugin [watermelondb-expo-plugin](https://github.com/morrowdigital/watermelondb-expo-plugin)
- expo-build-properties

\`\`\`bash
npx expo install @nozbe/watermelondb
yarn add --dev @babel/plugin-proposal-decorators
yarn add --dev @morrowdigital/watermelondb-expo-plugin
npx expo install expo-build-properties

\`\`\`

配置 babel.config.js
\`\`\`js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
  };
};
\`\`\`

配置 app.json
\`\`\`json
{
  "expo": {
    "plugins": [
      ["@morrowdigital/watermelondb-expo-plugin"],
      [
        "expo-build-properties",
        {
          "android": {
            "kotlinVersion": "1.6.10",
            "packagingOptions": {
              "pickFirst": ["**/libc++_shared.so"]
            }
          }
        }
      ]
    ]
  }
}
\`\`\`

## supabase 安装使用

安装依赖
\`\`\`bash
npx expo install @supabase/supabase-js
\`\`\`
项目根目录创建文件 \`lib\\supabase.ts\`
\`\`\`
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = YOUR_REACT_NATIVE_SUPABASE_URL
const supabaseAnonKey = YOUR_REACT_NATIVE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
\`\`\`

## 相关资料
- [watermelonDB](https://watermelondb.dev/docs)
- [supabase](https://supabase.com)
- [Using WatermelonDB with React Native Expo SDK 50](https://www.themorrow.digital/blog/how-to-use-watermelondb-with-react-native-expo)
- [Offline-first React Native Apps with Expo, WatermelonDB, and Supabase](https://supabase.com/blog/react-native-offline-first-watermelon-db)
- [Database Functions](https://supabase.com/docs/guides/database/functions)
- [plpgsql create profile](https://github.com/bndkt/sharemystack/blob/main/supabase/migrations/20230801064404_create_create_profile_function.sql)
`;
export default function Day19Screen() {
  return (
    <DayHome
      title="WatermelonDB"
      description={desc}
      buttons={[
        {
          text: "watermelonDB",
          link: "/day19/watermelondb"
        }
      ]}
    />
  );
}
