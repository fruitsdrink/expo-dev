import { DayHome } from "@/components";

const desc = `
# React Native Advanced Onboarding (Reanimated 3) 

[youtube](https://youtu.be/OT-73hpwxXQ?si=T86Pen3tegZwG-5Y)

## Inspirations
- https://dribbble.com/shots/5350361-SkateBoard-Decks

# 相关资源
https://www.youtube.com/watch?v=yz9E10Dq8Bg&list=PLjHsmVtnAr9TWoMAh-3QMiP7bPUqPFuFZ&index=2
`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day79/demo"
        }
      ]}
    />
  );
}
