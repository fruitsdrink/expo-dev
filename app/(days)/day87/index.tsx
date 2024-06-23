import { DayHome } from "@/components";

const desc = `
# Blur Bottom Sheet using React Navigation | React Native Expo Tutorial

[youtube](https://youtu.be/kbA2rK9AxMk?si=_rfiMYQh3PQ3LG7k)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day87/demo"
        }
      ]}
    />
  );
}
