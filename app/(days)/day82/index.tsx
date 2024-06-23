import { DayHome } from "@/components";

const desc = `
# React Native: Facebook Style Custom Tab Bar Indicator 

[youtube](https://youtu.be/CHEcQdpcuqo?si=hchUePMQOxsr_4Qo)

## 技术点
- 使用RN导航自定义底部导航栏

## 安装包

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day82/demo"
        }
      ]}
    />
  );
}
