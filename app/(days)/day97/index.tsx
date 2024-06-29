import { DayHome } from "@/components";

const desc = `
# Double Tap to Heart Animation - React Native

[youtube](https://youtu.be/N6Y6NykOGWE?si=x80XZZrZ4X3n9L5E)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day97/demo"
        }
      ]}
    />
  );
}
