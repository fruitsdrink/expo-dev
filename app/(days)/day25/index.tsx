import { DayHome } from "@/components";

const desc = `
# Reanimated Tutorial : 5.withTiming

- [youtube withTiming](https://youtu.be/gioXiD8hFVA?si=Bnm5oCE2srfsgMZr)
- [youtube withDelay](https://youtu.be/-J46Kde4Jn8?si=KcStLicwgOiWN7Ta)
- [youtube withRepeat](https://youtu.be/QcmC3r456Pg?si=lmxtQL_HXpyVRT2y)
- [youtube withSpring](https://youtu.be/Z1XcKsXxYPs?si=1MEB2iCM5WgaDCQW)
- [youtube Stop Pause Resume Animateion](https://youtu.be/Oh0zo75sUK8?si=1tMYAC_15jGiXCxH)
- [youtube useAnimatedReaction](https://youtu.be/Wr0mY6S8ssA?si=dWtTB7DCxkOcdMfY)

## 技术点
- withTiming
- withDelay

## package

- [react-native-redash](https://github.com/wcandillon/react-native-redash)

\`\`\`
npx expo install react-native-redash
\`\`\`

## 文档资料
- [withTiming](https://docs.swmansion.com/react-native-reanimated/docs/animations/withTiming)
- [withDelay](https://docs.swmansion.com/react-native-reanimated/docs/animations/withDelay)
- [withSpring](https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring)
- [withSequence](https://docs.swmansion.com/react-native-reanimated/docs/animations/withSequence)
- [redash](https://wcandillon.gitbook.io/redash)
- [useAnimatedReaction](https://docs.swmansion.com/react-native-reanimated/docs/advanced/useAnimatedReaction/)
`;
export default function Day25Screen() {
  return (
    <DayHome
      title="WithTiming"
      description={desc}
      buttons={[
        {
          text: "withTiming",
          link: "/day25/demo/with-timing"
        },
        {
          text: "withDelay",
          link: "/day25/demo/with-delay"
        },
        {
          text: "withRepeat",
          link: "/day25/demo/with-repeat"
        },
        {
          text: "withSpreing",
          link: "/day25/demo/with-spring"
        },
        {
          text: "withSequence",
          link: "/day25/demo/with-sequence"
        },
        {
          text: "stop-pause-resume",
          link: "/day25/demo/stop-pause-resume"
        },
        {
          text: "useAnimatedReaction",
          link: "/day25/demo/use-animated-reaction"
        }
      ]}
    />
  );
}
