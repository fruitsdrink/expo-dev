import { DayHome } from "@/components";

const desc = `
# Building an Instagram Clone with React Native and Cloudinary

[youtube](https://www.youtube.com/live/CRIMOPhiWG8?si=BnZV3I_isSIV8KB7)

## 技术点

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day119/demo"
        }
      ]}
    />
  );
}
