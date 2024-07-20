import { DayHome } from "@/components";

const desc = `
# Building an Instagram Clone with React Native and Cloudinary

[youtube](https://www.youtube.com/live/CRIMOPhiWG8?si=BnZV3I_isSIV8KB7)

## 技术点
- Cloudinary

## package

\`\`\`
yarn add cloudinary-react-native
\`\`\`

## 第三方服务
- [cloudinary](https://cloudinary.com)
- [supabase](https://supabase.com)


## 相关文档
- [Cloudinary React Native SDK](https://cloudinary.com/documentation/react_native_integration)

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
