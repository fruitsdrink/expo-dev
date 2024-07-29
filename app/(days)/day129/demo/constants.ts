import { faker } from "@faker-js/faker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";
faker.seed(1);

export type RootStackParamList = {
  Home: undefined;
  Detail: { item: Item } | undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type DetailProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const { width, height } = Dimensions.get("window");

export const SPACING = 10;
export const OVERFLOW_HEIGHT = 70;
export const ITEM_WIDTH = width * 0.76;
export const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
export const VISIBLE_ITEMS = 3;

export type Item = {
  key: string;
  title: string;
  location: string;
  date: Date;
  poster: string;
};

// https://www.creative-flyers.com
// 爬虫代码
// [...document.querySelectorAll('.product')].map(item =>{
//   const img = item.querySelector('img')
//   const title = item.querySelector('.product_title > a')

//   return {
//       poster: img.src,
//       title: title.innerText
//   }
// })

const images = [
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/07/Summer-Beach-Party-Flyer-PSD--380x559.jpg",
    title: "Summer Beach Party Flyer PSD"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/07/We-Love-Thursday-Flyer-380x559.jpg",
    title: "We Love Thursday Flyer"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/07/Latin-Summer-Party-Flyer-380x559.jpg",
    title: "Latin Summer Party Flyer"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/07/Electro-Festival-Music-Poster-380x559.jpg",
    title: "Electro Festival Music Poster"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/06/Dead-Pool-Party-Flyer-Design-380x559.jpg",
    title: "Creative Pool Party Flyer Design"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/06/Summer-Vibes-Party-Flyer-380x559.jpg",
    title: "Summer Vibes Party Flyer"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2023/07/Pink-Party-Flyer-PSD-1-380x559.jpg",
    title: "Pink Party Flyer PSD"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/06/Summer-Madness-Party-Flyer-380x559.jpg",
    title: "Summer Madness Party Flyer"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2021/06/Classy-summer-party-flyer-380x559.jpg",
    title: "Photoshop Summer Flyer Template"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/05/Epic-Summer-Party-Flyer-380x559.jpg",
    title: "Epic Summer Party Flyer"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/05/Tropical-Party-Design-380x559.jpg",
    title: "Tropical Party Design"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/06/Pool-Party-Flyer-Design-PSD-380x559.jpg",
    title: "Pool Party Flyer Design PSD"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2021/06/Saturday-Night-Club-Flyer-380x559.jpg",
    title: "Saturday Night Club Flyer PSD"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/05/Sunday-Vibes-Party-Flyer-380x559.jpg",
    title: "Sunday Vibes Party Flyer"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/05/Summer-Party-Flyer--380x559.jpg",
    title: "Summer Flyer For Evening Party"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/05/Cocktails-Party-Flyer-380x559.jpg",
    title: "More Cocktails Party Flyer"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2023/05/Epic-Summer-Flyer-PSD-380x559.jpg",
    title: "Epic Summer Flyer PSD"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/05/Friday-Vibes-Party-Flyer--380x559.jpg",
    title: "Friday Vibes Party Flyer"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2019/03/Classy-Summer-Party-Flyer-1-380x559.jpg",
    title: "Classy Summer Party Flyer"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/05/Shatta-Party-Flyer-design-380x559.jpg",
    title: "Shatta Party Flyer Template"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2022/07/Summer-Party-Flyer-Design-1-380x559.jpg",
    title: "Summer Party Flyer Design PSD"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/04/Shatta-Party-Flyer--380x559.jpg",
    title: "Shatta Party Flyer Template"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/04/Summer-Flyer-for-Dj-Party-380x559.jpg",
    title: "Summer Flyer For Dj Party"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2022/06/Dj-Party-Poster-Template-1-380x559.jpg",
    title: "Dj Party Poster Template"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/04/Summer-Party-Flyer-380x559.jpg",
    title: "Customizable Summer Party Flyer"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/04/Fuego-Party-Flyer-Design-2-380x559.jpg",
    title: "Fuego Party Flyer Design"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/05/Tropical-Summer-Party-Poster-380x559.jpg",
    title: "Tropical Summer Party Poster Template"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/03/Summer-Party-Flyer-171-380x559.jpg",
    title: "Summer Party Flyer PSD"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/03/Summer-Club-Party-Flyer-25-380x559.jpg",
    title: "Summer Club Party Flyer Psd"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/03/Afro-Music-Flyer-Design-170-380x559.jpg",
    title: "Afro Music Flyer Design"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2021/05/Summer-Poster-Template-89-380x559.jpg",
    title: "Modern Summer Poster Template"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2022/05/White-Party-Flyer-220-380x559.jpg",
    title: "White Party Flyer Template"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/04/90s-Retro-Party-Flyer-380x559.jpg",
    title: "90’S Retro Party Flyer Template"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/06/Pride-Month-Event-Flyer-380x559.jpg",
    title: "Pride Month Event Flyer"
  },
  {
    poster:
      "https://c9n8c2u8.rocketcdn.me/wp-content/uploads/2024/06/Pride-Party-Flyer-Template-380x559.jpg",
    title: "Pride Party Flyer Template"
  }
];

export const DATA: Item[] = images.map((item, index) => {
  return {
    key: faker.string.uuid(),
    title: item.title,
    location: faker.location.country(),
    date: faker.date.recent(),
    poster: item.poster
  };
});
