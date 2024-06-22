import { DayHome } from "@/components";

const desc = `
# Building a BottomSheet from scratch in React Native

[youtube](https://youtu.be/KvRqsRwpwhY?si=dWaCLubBpz0m6zJ_)

## 技术点
- 手势处理
- ref  -> forwardRef
- 导出组件的方法 -> useImperativeHandle
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day72/demo"
        }
      ]}
    />
  );
}
