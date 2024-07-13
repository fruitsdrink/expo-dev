import { DayHome } from "@/components";

const desc = `
# React Native Login with JWT Auth Context 

[youtube](https://youtu.be/9vydY9SDtAo?si=mH8enkE6ni-lc34w

## 技术点
- expo-secure-store
- context
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day112/demo"
        }
      ]}
    />
  );
}
