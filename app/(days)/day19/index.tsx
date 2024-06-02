import { DayHome } from "@/components";

const desc = `
# WatermelonDB

[youtube](https://www.youtube.com/live/x7KE4JD-Q9A?si=VfgHKMuVsYfEFP3F)


## 技术点

- [watermelonDB](https://watermelondb.dev/docs)

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
