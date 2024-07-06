import {
  Easing,
  SharedTransition,
  withSequence,
  withTiming
} from "react-native-reanimated";

export const transition = SharedTransition.custom((values) => {
  "worklet";
  return {
    width: withTiming(values.targetWidth, {
      easing: Easing.quad
    }),
    height: withTiming(values.targetHeight, {
      easing: Easing.quad
    }),
    originX: withTiming(values.targetOriginX, {
      easing: Easing.quad
    }),
    originY: withTiming(values.targetOriginY, {
      easing: Easing.quad
    })
  };
});

// export const transition = SharedTransition.custom((values) => {
//   "worklet";
//   console.log(values);
//   return {
//     height: withTiming(values.targetHeight, { duration: 100 }),
//     width: withTiming(values.targetWidth, { duration: 100 }),
//     originX: withTiming(values.targetOriginX, { duration: 300 }),
//     originY: withSequence(
//       withTiming(values.currentOriginY + 50, {
//         duration: 100,
//         easing: Easing.linear
//       }),
//       withTiming(values.targetOriginY, {
//         duration: 200,
//         easing: Easing.linear
//       })
//     )
//   };
// });
