import { DayHome } from "@/components";

const desc = `
# Local First App with WatermelonDB

[youtube](https://www.youtube.com/live/abq6zxurflI?si=tqfLJ_0Cr40bGW0U)

## 技术点

- [watermelonDB](https://watermelondb.dev/docs)

## package

- @nozbe/watermelondb
- @babel/plugin-proposal-decorators
- @morrowdigital/watermelondb-expo-plugin [watermelondb-expo-plugin](https://github.com/morrowdigital/watermelondb-expo-plugin)
- expo-build-properties

\`\`\`bash
yarn add @nozbe/watermelondb
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
      title="Local First App with WatermelonDB"
      description={desc}
      buttons={[
        {
          link: "/day19/watermelondb"
        }
      ]}
    />
  );
}
