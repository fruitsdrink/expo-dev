import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View } from "react-native";

import { DayListItem } from "@/components";

type DayItem = {
  day: number;
  title: string;
  link?: string;
};

// const days = Array.from({ length: 6 }, (_, i) => i + 1);
// const days = [...Array(2)].map((_, i) => i + 1);
const days: DayItem[] = [
  {
    day: 1,
    title: "Introduction"
  },
  {
    day: 2,
    title: "onboarding"
  },
  {
    day: 3,
    title: "markdown",
    link: "https://www.youtube.com/live/XKKh9jZ8QD4?si=2sXnu-satwi0b2R5"
  },
  {
    day: 4,
    title: "animate splash lottie",
    link: "https://www.youtube.com/live/Y_IaioaI2w0?si=Uh5ucSY9Ycxk2bSu"
  },
  {
    day: 5,
    title: "airbnb map & bottom sheet",
    link: "https://www.youtube.com/live/ijBG81t0tAo?si=q3uA9oplDRB7yA9p"
  },
  {
    day: 6,
    title: "Tinder Swipe Animation",
    link: "https://www.youtube.com/live/H2Xr_id5JuE?si=d91_Hh3ybvFZwv5S"
  },
  {
    day: 7,
    title: "IOS Voice Memos",
    link: "https://www.youtube.com/live/1UmepETPGJI?si=0sB7I7ZYE__ZH1uT"
  },
  {
    day: 8,
    title: "Weather App",
    link: "https://www.youtube.com/live/Z0fTSK_UeNk?si=4oNKODqjq6d6Yg-z"
  },
  {
    day: 9,
    title: "AWS Amplify Gen1",
    link: "https://www.youtube.com/live/BGtVw_EEKZ8?si=FzIioTri7RbMewm2"
  },
  {
    day: 10,
    title: "Fingerprint and FaceID",
    link: "https://www.youtube.com/live/cDz9Wt8xM5c?si=--lzLsYiB7jZwIgV"
  },
  {
    day: 11,
    title: "vision camera",
    link: "https://www.youtube.com/live/XgPLshk9q9A?si=g2mTFR0OhToUELXw"
  },
  {
    day: 12,
    title: "TikTok Video Feed",
    link: "https://www.youtube.com/live/ss6M5xztvWY?si=aMUMDH4RaWd9BOML"
  },
  {
    day: 13,
    title: "EAS Build&Update",
    link: "https://www.youtube.com/live/PdHbBZvPyxI?si=2yo-VWnLoOYr-zGm"
  },
  {
    day: 14,
    title: "todo app",
    link: "https://www.youtube.com/live/kUGhYNn_o-Q?si=4ZL5PZPdpCJfdMti"
  },
  {
    day: 15,
    title: "todo with context",
    link: "https://www.youtube.com/live/gBslnnhsEq0?si=wD1MYnBsfgzNU_Fw"
  },
  {
    day: 16,
    title: "todo zustand",
    link: "https://www.youtube.com/live/fvtxgwa5NJA?si=LZBujOmNYFvmcZZ-"
  },
  {
    day: 17,
    title: "Ig Stories",
    link: "https://www.youtube.com/live/8ZgSt3VJ5Mc?si=dY0Qw77-4EudIQWh"
  },
  {
    day: 18,
    title: "Analytics",
    link: "https://www.youtube.com/live/Pv17halAbmo?si=kQ8iNVZvatWPKpjm"
  },
  {
    day: 19,
    title: "WatermelonDB && supabase",
    link: "https://www.youtube.com/live/x7KE4JD-Q9A?si=VfgHKMuVsYfEFP3F"
  },
  {
    day: 20,
    title: "Flatlist",
    link: "https://youtu.be/k5_GkQliWBg?si=uqCQsKA42NAeLDW-"
  },
  {
    day: 21,
    title: "Reanimated Tutorial: 1.Animation 4 steps",
    link: "https://youtu.be/NRHoyKgb42E?si=dIlOuAHnMPtPHaLV"
  },
  {
    day: 22,
    title: "Reanimated Tutorial: 2.Animated Component",
    link: "https://youtu.be/gxH_6PKLnxM?si=ymh6v1_M1FUiCJF8"
  },
  {
    day: 23,
    title: "Reanimated Tutorial: 3.UI Thread & Worklet",
    link: "https://youtu.be/0vUFdFVa1xc?si=K3H5YWfDqXjMBqqV"
  },
  {
    day: 24,
    title: "Reanimated Tutorial : 4.useSharedValue & useDerivedValue",
    link: "https://youtu.be/Hu6jjjHItv8?si=_6khAFxB1ht0-ZcR"
  },
  {
    day: 25,
    title: "Reanimated Tutorial : 5. 基本动画",
    link: "https://youtu.be/gioXiD8hFVA?si=Bnm5oCE2srfsgMZr"
  },
  {
    day: 26,
    title: "Login Screen",
    link: "https://youtu.be/lA_73_-n-V4?si=vOaPj4iE9Gfdbwnu"
  },
  {
    day: 27,
    title: "Simple Workout List with Circular Thumbnails",
    link: "https://youtu.be/rd25WOhp9Co?si=IY_po3SvWiy7d02I"
  },
  {
    day: 28,
    title: "Simple Profile Cards",
    link: "https://youtu.be/heZBofCfap4?si=u2VlLkPxAFYy76ye"
  },
  {
    day: 29,
    title: "Simple Settings Screen",
    link: "https://youtu.be/l0OdkphKW68?si=gvm2FHljzDU0QYnB"
  },
  {
    day: 30,
    title: "FlatList Scroll To Index",
    link: "https://youtu.be/pTtxhuThMew?si=s7466Jv2bwMkZbFW"
  },
  {
    day: 31,
    title: "Animation Phone Ring Indicator Wave",
    link: "https://youtu.be/hTmkjdKO3_M?si=IM31kTjNITlpJbkn"
  },
  {
    day: 32,
    title: "Loading Animation",
    link: "https://youtu.be/e5_auZoh85w?si=Jz4YldQoVrJ0LwNQ"
  },
  {
    day: 33,
    title: "Animated Switch",
    link: "https://youtu.be/LwKUjau3Ifw?si=dhKwc3y2lEnyRZ9x"
  },
  {
    day: 34,
    title: "画廊视图",
    link: "https://youtu.be/gjC2oUJhePE?si=oSNa4bOlaB1PtrTW"
  },
  {
    day: 35,
    title: "FlatList 滚动动画",
    link: "https://youtu.be/F8x-dyIsrJ8?si=m777R0c7_9a1IfXW"
  },
  {
    day: 36,
    title: "同步背景轮播动画",
    link: "https://youtu.be/gOj4BlzYF4A?si=VsI5EIBB1YN2tK2T"
  },
  {
    day: 37,
    title: "3D轮播动画",
    link: "https://youtu.be/k2ax0t4dYAY?si=AUodSn3CV4or5WeH"
  },
  {
    day: 38,
    title: "粘性底栏",
    link: "https://youtu.be/4Pw4du1IrDs?si=gLRrvzWohanP4p3W"
  },
  {
    day: 39,
    title: "自定义轮播和分页",
    link: "https://youtu.be/FIAPuq24b0g?si=NUTOqEIk3xGSU8GV"
  },
  {
    day: 40,
    title: "倒计时",
    link: "https://youtu.be/z9l5WXPKCpA?si=KZAwcOv9k2RjWAWw"
  },
  {
    day: 41,
    title: "视差轮播",
    link: "https://youtu.be/fSuYM86JXFo?si=2ODk8bfZ4H4rOINN"
  },
  {
    day: 42,
    title: "FlatList Carousel Animation",
    link: "https://youtu.be/YE7c6ch2msY?si=BCEiCB8vJN9Muq10"
  },
  {
    day: 43,
    title: "Progress Bar Indicator",
    link: "https://youtu.be/J95MC2Koymc?si=1dWNPYo4yRPmfIgx"
  }
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={days}
        keyExtractor={(item) => item.day.toString()}
        contentContainerStyle={styles.content}
        // columnWrapperStyle={styles.column}
        // numColumns={2}
        renderItem={({ item }) => <DayListItem day={item} />}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  content: {
    gap: 10,
    padding: 10
  },
  column: {
    gap: 10
  }
});
