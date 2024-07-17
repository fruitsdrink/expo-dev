import { DayHome } from "@/components";

const desc = `
# Building a Health Application with React Native: Step Counter

[youtube](https://www.youtube.com/live/VVoXcr18mdo?si=pB1FQG2FswpuFvip)

## package
- react-native-svg
- [react-native-health](https://github.com/agencyenterprise/react-native-health)


\`\`\`bash
npx expo install react-native-health
\`\`\`

修改app.json
\`\`\`
{
  "expo": {
    "plugins": ["react-native-health"]
  }
}
\`\`\`
or
\`\`\`
{
  "expo": {
    "plugins": [
      [
        "react-native-health",
        {
          "isClinicalDataEnabled": true,
          "healthSharePermission": "Custom health share permission",
          "healthUpdatePermission": "Custom health update permission",
          "healthClinicalDescription": "Custom health share permission for clinical data"
        }
      ]
    ]
  }
}
\`\`\`

## 技术点
- svg
- react-native-health
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day118/demo"
        }
      ]}
    />
  );
}
