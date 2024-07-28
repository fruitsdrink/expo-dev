import { faker } from "@faker-js/faker";
import niceColors from "nice-color-palettes";
faker.seed(1);

export type RootStackParamList = {
  Home: undefined;
  Detail: { item: Item } | undefined;
};

export const ORANGE = "#fb9b06";
export const SPACING = 12;

export type Item = {
  key: string;
  image: string;
  type: string;
  color?: string;
  subType?: string;
  subcategories?: Item[];
  fullColor?: string;
  price?: string;
  description?: string;
};

// https://www.flaticon.com/packs/linear-color-housekeeping-elements
// [...document.querySelectorAll('.icon--holder')].map((item) => {
//   const img = item.querySelector('img')
//   return {
//       image: img.src,
//       type: img.alt.split(' ')[0]
//   }
// })
const icons: Item[] = [
  {
    key: "0",
    image: "https://cdn-icons-png.flaticon.com/128/123/123332.png",
    type: "Sofa"
  },
  {
    key: "1",
    image: "https://cdn-icons-png.flaticon.com/128/123/123334.png",
    type: "Sewing"
  },
  {
    key: "2",
    image: "https://cdn-icons-png.flaticon.com/128/123/123350.png",
    type: "Heating"
  },
  {
    key: "3",
    image: "https://cdn-icons-png.flaticon.com/128/123/123331.png",
    type: "Armchair"
  },
  {
    key: "4",
    image: "https://cdn-icons-png.flaticon.com/128/123/123318.png",
    type: "Washing"
  },
  {
    key: "5",
    image: "https://cdn-icons-png.flaticon.com/128/123/123319.png",
    type: "Coffee"
  },
  {
    key: "6",
    image: "https://cdn-icons-png.flaticon.com/128/123/123320.png",
    type: "Mixer"
  },
  {
    key: "7",
    image: "https://cdn-icons-png.flaticon.com/128/123/123321.png",
    type: "Maker"
  },
  {
    key: "8",
    image: "https://cdn-icons-png.flaticon.com/128/123/123322.png",
    type: "Iron"
  },
  {
    key: "9",
    image: "https://cdn-icons-png.flaticon.com/128/123/123323.png",
    type: "Humidifier"
  },
  {
    key: "10",
    image: "https://cdn-icons-png.flaticon.com/128/123/123324.png",
    type: "Meat"
  },
  {
    key: "11",
    image: "https://cdn-icons-png.flaticon.com/128/123/123325.png",
    type: "Monitor"
  },
  {
    key: "12",
    image: "https://cdn-icons-png.flaticon.com/128/123/123326.png",
    type: "Television"
  },
  {
    key: "13",
    image: "https://cdn-icons-png.flaticon.com/128/123/123327.png",
    type: "Speakers"
  },
  {
    key: "14",
    image: "https://cdn-icons-png.flaticon.com/128/123/123328.png",
    type: "Turntable"
  },
  {
    key: "15",
    image: "https://cdn-icons-png.flaticon.com/128/123/123329.png",
    type: "Dishwasher"
  },
  {
    key: "16",
    image: "https://cdn-icons-png.flaticon.com/128/123/123330.png",
    type: "Hood"
  },
  {
    key: "17",
    image: "https://cdn-icons-png.flaticon.com/128/123/123333.png",
    type: "Bed"
  },
  {
    key: "18",
    image: "https://cdn-icons-png.flaticon.com/128/123/123335.png",
    type: "Fan"
  },
  {
    key: "19",
    image: "https://cdn-icons-png.flaticon.com/128/123/123336.png",
    type: "Lamp"
  },
  {
    key: "20",
    image: "https://cdn-icons-png.flaticon.com/128/123/123337.png",
    type: "Hairdryer"
  },
  {
    key: "21",
    image: "https://cdn-icons-png.flaticon.com/128/123/123338.png",
    type: "Clock"
  },
  {
    key: "22",
    image: "https://cdn-icons-png.flaticon.com/128/123/123339.png",
    type: "Radio"
  },
  {
    key: "23",
    image: "https://cdn-icons-png.flaticon.com/128/123/123340.png",
    type: "Stove"
  },
  {
    key: "24",
    image: "https://cdn-icons-png.flaticon.com/128/123/123341.png",
    type: "Chandelier"
  },
  {
    key: "25",
    image: "https://cdn-icons-png.flaticon.com/128/123/123342.png",
    type: "Mirror"
  },
  {
    key: "26",
    image: "https://cdn-icons-png.flaticon.com/128/123/123343.png",
    type: "Plant"
  },
  {
    key: "27",
    image: "https://cdn-icons-png.flaticon.com/128/123/123344.png",
    type: "Picture"
  },
  {
    key: "28",
    image: "https://cdn-icons-png.flaticon.com/128/123/123345.png",
    type: "Chair"
  },
  {
    key: "29",
    image: "https://cdn-icons-png.flaticon.com/128/123/123346.png",
    type: "Table"
  },
  {
    key: "30",
    image: "https://cdn-icons-png.flaticon.com/128/123/123347.png",
    type: "Basket"
  },
  {
    key: "31",
    image: "https://cdn-icons-png.flaticon.com/128/123/123348.png",
    type: "Ironing"
  },
  {
    key: "32",
    image: "https://cdn-icons-png.flaticon.com/128/123/123349.png",
    type: "Lamp"
  },
  {
    key: "33",
    image: "https://cdn-icons-png.flaticon.com/128/123/123351.png",
    type: "Microwave"
  },
  {
    key: "34",
    image: "https://cdn-icons-png.flaticon.com/128/123/123352.png",
    type: "Stool"
  },
  {
    key: "35",
    image: "https://cdn-icons-png.flaticon.com/128/123/123353.png",
    type: "Bath"
  },
  {
    key: "36",
    image: "https://cdn-icons-png.flaticon.com/128/123/123354.png",
    type: "Hanger"
  },
  {
    key: "37",
    image: "https://cdn-icons-png.flaticon.com/128/123/123355.png",
    type: "Toilet"
  },
  {
    key: "38",
    image: "https://cdn-icons-png.flaticon.com/128/123/123356.png",
    type: "Remote"
  },
  {
    key: "39",
    image: "https://cdn-icons-png.flaticon.com/128/123/123357.png",
    type: "Closet"
  },
  {
    key: "40",
    image: "https://cdn-icons-png.flaticon.com/128/123/123358.png",
    type: "Sink"
  },
  {
    key: "41",
    image: "https://cdn-icons-png.flaticon.com/128/123/123359.png",
    type: "Shelf"
  },
  {
    key: "42",
    image: "https://cdn-icons-png.flaticon.com/128/123/123360.png",
    type: "Towel"
  },
  {
    key: "43",
    image: "https://cdn-icons-png.flaticon.com/128/123/123361.png",
    type: "Curtains"
  },
  {
    key: "44",
    image: "https://cdn-icons-png.flaticon.com/128/123/123362.png",
    type: "Fridge"
  },
  {
    key: "45",
    image: "https://cdn-icons-png.flaticon.com/128/123/123363.png",
    type: "Cupboard"
  },
  {
    key: "46",
    image: "https://cdn-icons-png.flaticon.com/128/123/123364.png",
    type: "Vacuum"
  },
  {
    key: "47",
    image: "https://cdn-icons-png.flaticon.com/128/123/123365.png",
    type: "Toaster"
  },
  {
    key: "48",
    image: "https://cdn-icons-png.flaticon.com/128/123/123366.png",
    type: "Scale"
  },
  {
    key: "49",
    image: "https://cdn-icons-png.flaticon.com/128/123/123367.png",
    type: "Mixer"
  }
];

const colors = niceColors[1];

export const tabs = [
  "Today",
  "Chips",
  "Fish",
  "Tea",
  "Burger",
  "Coffee",
  "Drinks",
  "Breakfast"
];

export const data = icons.map((item, index) => {
  return {
    ...item,
    key: faker.string.uuid(),
    subType: faker.commerce.productName(),
    color: `${colors[index % colors.length]}66`,
    fullColor: colors[index % colors.length],
    description: [...Array(2).keys()]
      .map(faker.commerce.productDescription)
      .join(". "),
    price: `$${faker.number.int({ min: 200, max: 250 }) / 100}`,
    subcategories: faker.helpers.shuffle(icons).slice(0, 3)
  };
});

export const popularFood = faker.helpers.shuffle(icons).map((item) => {
  return {
    ...item,
    key: faker.string.uuid(),
    rating: faker.number.int({ min: 30, max: 50 }) / 10,
    price: `$${faker.number.int({ min: 200, max: 250 }) / 100}`
  };
});
