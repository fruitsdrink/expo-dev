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
  },
  {
    day: 44,
    title: "Animated Tabs",
    link: "https://youtu.be/ZiSN9uik6OY?si=udwyTtFNayHb6_mk"
  },
  {
    day: 45,
    title: "Animate words",
    link: "https://youtu.be/mwZPCA6Du5A?si=dPltgDUGxuLH8GCJ"
  },
  {
    day: 46,
    title: "根据屏幕方向调整尺寸",
    link: "https://youtu.be/dxtT-wN6psg?si=5fA6NZ5gcJxlHxQn"
  },
  {
    day: 47,
    title: "Local-first application with Prisma",
    link: "https://www.youtube.com/live/65Iqes0lxpQ?si=xCgJfhPfrmM9RN7l"
  },
  {
    day: 48,
    title: "Lava lamp animation",
    link: "https://www.youtube.com/live/MSOVj6raMcc?si=0H7n11ZKv4qTCHbQ"
  },
  {
    day: 49,
    title: "Tarot wheel animation",
    link: "https://www.youtube.com/live/Y4WllzY7xj0?si=zVFDGXnonN773zYc"
  },
  {
    day: 50,
    title: "Hello Animations",
    link: "https://youtu.be/eCBv1S9tI8Q?si=YZDc6DpM4qtKqKMu"
  },
  {
    day: 51,
    title: "Shake Animation in React Native (Reanimated)",
    link: "https://youtu.be/1yVL4O7TIas?si=AujPd1DFK5ypMdKK"
  },
  {
    day: 52,
    title: "PanGestureHandler",
    link: "https://youtu.be/4HUreYYoE6U?si=0YIDLjdvwl72tGJC"
  },
  {
    day: 53,
    title: "Reanimated ScrollView",
    link: "https://youtu.be/SqwpRr7kbnQ?si=TulDQGZ9HIYP_cKf"
  },
  {
    day: 54,
    title: "Reanimated Interpolate Colors",
    link: "https://youtu.be/U_V9pHnTXjA?si=5k9juunWAwf9W74o"
  },
  {
    day: 55,
    title: "PinchGestureHandler",
    link: "https://youtu.be/R7vyLItMQJw?si=cSV3l5Dl4dTdvkC0"
  },
  {
    day: 56,
    title: "Animate on DoubleTap like Instagram",
    link: "https://youtu.be/nbEmo0zLJjw?si=w_Pq29r4CeuMujmM"
  },
  {
    day: 57,
    title: "ScrollView from scratch with PanGesture",
    link: "https://youtu.be/Fd5FWxx7c48?si=UwxXG0J2oRkLFlGQ"
  },
  {
    day: 58,
    title: "Color Picker Animation",
    link: "https://youtu.be/XH35ahDm3as?si=jg5IraXVPBAnfPXB"
  },
  {
    day: 59,
    title: "Circular Progress Bar Animation",
    link: "https://youtu.be/9n2mQJ7TO6Y?si=3Pa2G5Y7wGr6MTh4"
  },
  {
    day: 60,
    title: "Swipe to delete Animation",
    link: "https://youtu.be/AVS_2nzt8Do?si=sCFrgoFtpqObdAsa"
  },
  {
    day: 61,
    title: "Ripple Effect Animation",
    link: "https://youtu.be/QxGQwRqxbSA?si=WU2LVMVLXYBmDOR0"
  },
  {
    day: 62,
    title: "Sliding Counter Animation",
    link: "https://youtu.be/KlUi2BCUIic?si=kFwcm0hh1N79iQlfs"
  },
  {
    day: 63,
    title: "Perspective Menu Animation",
    link: "https://youtu.be/D-C7lLQ1oAk?si=okNHgSwaGGsW7lxo"
  },
  {
    day: 64,
    title: "Clock Loader Animation",
    link: "https://youtu.be/YbIXcA2fcLU?si=o-uwnSSRFhQMLlD7"
  },
  {
    day: 65,
    title: "The magic of Layout Animations",
    link: "https://youtu.be/p3BLiloo2UM?si=7_u7WtlEpzGjWqe7"
  },
  {
    day: 66,
    title: "Animated FlatList",
    link: "https://youtu.be/3ox0R5jPb04?si=_zKIOFFU23yfVvhV"
  },
  {
    day: 67,
    title: "Dropdown Menu Animation",
    link: "https://youtu.be/LtgHWjf7BA8?si=dZyYFa5E53vstNxG"
  },
  {
    day: 68,
    title: "Circular Carousel Animation",
    link: "https://youtu.be/-ZXedIjj4H8?si=E4KYCHs-7Spt7IGx"
  },
  {
    day: 69,
    title: "Skeleton Animation",
    link: "https://youtu.be/vunwBbFx_F8?si=e9b-B6wu0EopFmgU"
  },
  {
    day: 70,
    title: "Custom Segmented Control",
    link: "https://youtu.be/RTYNKDODSfw?si=Qriwx3MOji95T3iT"
  },
  {
    day: 71,
    title: "Introduction to Gesture Handler 2",
    link: "https://youtu.be/xpT2shjX790?si=ssjR1JlxF4H2j1Lw"
  },
  {
    day: 72,
    title: "BottomSheet from scratch",
    link: "https://youtu.be/KvRqsRwpwhY?si=dWaCLubBpz0m6zJ_"
  },
  {
    day: 73,
    title: "Animated 3D Card",
    link: "https://youtu.be/pVesCl7TY8A?si=CBsHY1T9RqCk2lJS"
  },
  {
    day: 74,
    title: "Improving Tap Gestures",
    link: "https://youtu.be/DWFS_dSnJOs?si=oFqMQRDPinZq32GE"
  },
  {
    day: 75,
    title: "Animated Gradien",
    link: "https://youtu.be/ZSPvvGU2LBg?si=PfyB7dRN6X8AGU_3"
  },
  {
    day: 76,
    title: "Metaball Animation",
    link: "https://youtu.be/HOxZegqnDC4?si=DuoEav7IzlJny4hF"
  },
  {
    day: 77,
    title: "Grid Magnification",
    link: "https://youtu.be/zV0SGIlrtug?si=RWVdusI4ZNKz7ysv"
  },
  {
    day: 78,
    title: "Introduction to Animated API (React Native)",
    link: "https://youtu.be/PfC5Phrueww?si=MZ5wZByKkF0dYCgY"
  },
  {
    day: 79,
    title: "React Native Advanced Onboarding",
    link: "https://youtu.be/OT-73hpwxXQ?si=T86Pen3tegZwG-5Y"
  },
  {
    day: 80,
    title: "The Power of Lottie",
    link: "https://youtu.be/fLbtTL0rOcU?si=F93xxUahfqV6EPR2"
  },
  {
    day: 81,
    title: "Create a Drag and Drop Puzzle/Sorting",
    link: "https://youtu.be/219Rv7qUEZw?si=FzyJ2KdFON0TyIn2"
  },
  {
    day: 82,
    title: "Expo Layout Tabs",
    link: ""
  },
  {
    day: 83,
    title: "Animated Landing Screen",
    link: "https://youtu.be/MnqWZrXLZ8M?si=YcGI_Pjw5GO7qLva"
  },
  {
    day: 84,
    title: "Expo Router Drawer",
    link: "https://youtu.be/3p9LtOUg5fw?si=jKZfuP-lkoynmgda"
  },
  {
    day: 85,
    title: "Gradient Clock Skia",
    link: "https://youtu.be/W6yvb-oAq48?si=T1BhCixSXUUNkjtW"
  },
  {
    day: 86,
    title: "Chasing Finger Bubbles Skia",
    link: "https://youtu.be/-KbdX_Xa-Gc?si=JFw5cf-bOjXLnaWJ"
  },
  {
    day: 87,
    title: "Blur Bottom Sheet",
    link: "https://youtu.be/kbA2rK9AxMk?si=_rfiMYQh3PQ3LG7k"
  },
  {
    day: 88,
    title: "Custom Tab Navigation",
    link: "https://youtu.be/K6OJP0s5VDQ?si=P50Zd3Ov96HFF3B3"
  },
  {
    day: 89,
    title: "Twitter Style Loading Screen",
    link: "https://youtu.be/xrSOeCivwFk?si=2P8OzBLetsgYhxAO"
  },
  {
    day: 90,
    title: "Floating Action Button",
    link: "https://youtu.be/IEyUouhcuNQ?si=16nqddFAUT5xtOFE"
  },
  {
    day: 91,
    title: "Floating Hearts Animation",
    link: "https://youtu.be/_SC3BxI-1xA?si=6wQCIRiMK28-4ZTh"
  },
  {
    day: 92,
    title: "Star Ratings Animation",
    link: "https://youtu.be/iOF3C9UnsWg?si=Vc68DB50GhNR4HLg"
  },
  {
    day: 93,
    title: "Onboarding tutorial",
    link: "https://youtu.be/Efy48Uoa4RM?si=OJoYyN8LJXXYtUQj"
  },
  {
    day: 94,
    title: "FlatList animations",
    link: "https://youtu.be/yV-2HRzNX9o?si=2XRo8c8FfRbi7IE-"
  },
  {
    day: 95,
    title: "Custom React Native Drawer animation",
    link: "https://youtu.be/fgUHYGeoG5U?si=qsan5VlYkzdbPeNu"
  },
  {
    day: 96,
    title: "Advanced FlatList animations",
    link: "https://youtu.be/cGTD4yYgEHc?si=pCXeL_FQuwNFKmu0"
  },
  {
    day: 97,
    title: "Double Tap to Heart Animation",
    link: "https://youtu.be/N6Y6NykOGWE?si=x80XZZrZ4X3n9L5E"
  },
  {
    day: 98,
    title: "Bottom Sheet React Native",
    link: "https://youtu.be/_lzRvCf4FKE?si=0oLCRS7N2ZKp_IPe"
  },
  {
    day: 99,
    title: "animated Carousel",
    link: "https://youtu.be/XFtx09yoX0M"
  },
  {
    day: 100,
    title: "How to add a Custom Font",
    link: "https://youtu.be/thON0Os6MJg"
  },
  {
    day: 101,
    title: "Data Fetching with TanStack Query",
    link: "https://www.youtube.com/live/bpHq_-bPkGo?si=rWLI1VWgnp_e2Isg"
  },
  {
    day: 102,
    title: "Airbnb Header Animation",
    link: "https://youtu.be/JPx8IlfYQ-c?si=Cex8ltCpsK7k2b-M"
  },
  {
    day: 103,
    title: "Momo Header Animation",
    link: "https://youtu.be/WIX9Tp76Tug?si=wBQ1HdVPU8tS2R8r"
  },
  {
    day: 104,
    title: "Hide Header on Scroll",
    link: "https://youtu.be/oaGBEzMIwfo?si=62jq0S74L4AqoHcq"
  },
  {
    day: 105,
    title: "Chanel Scroll Animation",
    link: "https://youtu.be/ucpoqa2-74s?si=6S9Eo0t_jkIobvKX"
  },
  {
    day: 106,
    title: "Snapchat Shared Transitions",
    link: "https://youtu.be/NJZfRXs7nZs?si=vlBmZEwbyT43uMQ-"
  },
  {
    day: 107,
    title: "Shared Element Transitions",
    link: "https://youtu.be/tsleLxbvxe0?si=jsdewHtjbjKEj5I2"
  },
  {
    day: 108,
    title: "Take a Picture using Camera",
    link: "https://youtu.be/4WPjWK0MYMI?si=CG2mW2cMeD0Hnc6I"
  },
  {
    day: 109,
    title: "Animated Split Button",
    link: "https://youtu.be/GxkzFYI6eqI?si=kN4moHuGVOmXMuck"
  },
  {
    day: 110,
    title: "Instagram Clone Login",
    link: "https://youtu.be/JTainThP4RQ?si=uRGg-g_oClClV2In"
  },
  {
    day: 111,
    title: "Drizzle ORM",
    link: "https://youtu.be/1inzzYvbgO8?si=Ns0qzf7z-JysH_c3"
  },
  {
    day: 112,
    title: "Login with JWT Auth Context",
    link: "https://youtu.be/9vydY9SDtAo?si=mH8enkE6ni-lc34w"
  },
  {
    day: 113,
    title: "Best React Native Menus",
    link: "https://youtu.be/U7rzrV4_p14?si=GvhUentfT11d_-a9"
  },
  {
    day: 114,
    title: "Fitness App Onboarding",
    link: "https://youtu.be/EMYRP4PVu1A?si=qOpY1whQ4Xemq_4R"
  },
  {
    day: 115,
    title: "Animated Login Form",
    link: "https://youtu.be/dj0zN72phDo?si=xLNEb0dBWIfZf7jh"
  },
  {
    day: 116,
    title: "Read PDF",
    link: "https://youtu.be/rlKAQZhenlQ?si=G0js9h4B5ONN8-o6"
  },
  {
    day: 117,
    title: "download PDF",
    link: "https://youtu.be/LpaSLwHteIk?si=9R_jx6u93i9-M9OQ"
  },
  {
    day: 118,
    title: "Health Step Counter App",
    link: "https://www.youtube.com/live/VVoXcr18mdo?si=pB1FQG2FswpuFvip"
  },
  {
    day: 119,
    title: "Instagram Clone with Cloudinary",
    link: "https://www.youtube.com/live/CRIMOPhiWG8?si=BnZV3I_isSIV8KB7"
  },
  {
    day: 120,
    title: "Animated Stacked Cards",
    link: "https://youtu.be/8_hvNoZJsc8?si=AZFTowqBwpBN5v6J"
  },
  {
    day: 121,
    title: "Simple Login Screen",
    link: "https://youtu.be/lA_73_-n-V4?si=5xt8CNaubYG7897Q"
  },
  {
    day: 122,
    title: "Shared Element Transition e8",
    link: "https://youtu.be/tC7egqnpYSY?si=UocDS-BoF3HOLy-V"
  },
  {
    day: 123,
    title: "Shared Element Transition e1",
    link: "https://youtu.be/C2Q_MPxqLMI?si=kIRguC8V-4f6MxvG"
  },
  {
    day: 124,
    title: "Shared Element Transition e2",
    link: "https://youtu.be/Zol6ivicuo8?si=FTjPEXWoQMjQHHZx"
  },
  {
    day: 125,
    title: "Shared Element Transition e3",
    link: "https://youtu.be/xVBTiR8gLJE?si=f6C2UVoX4QR40n9E"
  },
  {
    day: 126,
    title: "Shared Element Transition e4",
    link: "https://youtu.be/fiAdt9-wNJo?si=2ebNyuqMdyxNR-0C"
  },
  {
    day: 127,
    title: "Shared Element Transition e5",
    link: "https://youtu.be/nEntsYyCbLM?si=DEuZ1uFNn434v6CP"
  },
  {
    day: 128,
    title: "Shared Element Transition e7",
    link: "https://youtu.be/dFEHETyuXWY?si=7mvK3F4tORiycFa8"
  },
  {
    day: 129,
    title: "Shared Element Transition e9",
    link: "https://youtu.be/6XxpUhQqpjY?si=zcu6NdifP8hiGfHF"
  },
  {
    day: 130,
    title: "Scratch Card With Skia From Scratch",
    link: "https://youtu.be/RJ39xhgWSL4?si=2rM4SExOuHW8d10A"
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
