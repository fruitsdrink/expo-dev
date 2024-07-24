import { Dimensions } from "react-native";

export const locations = [
  {
    key: "1",
    location: "Krabi, Thailand",
    numberOfDays: 9,
    image:
      "https://images.unsplash.com/photo-1633544318468-82f9a2fdbdc2?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "#0c212d"
  },
  {
    key: "2",
    location: "Bucharest, Romania",
    numberOfDays: 6,
    image:
      "https://images.unsplash.com/photo-1654529046084-a38c42b6920f?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "#f8eace"
  },
  {
    key: "3",
    location: "Iceland",
    numberOfDays: 5,
    image:
      "https://plus.unsplash.com/premium_photo-1674313072675-4edb813d12e6?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "#e4e5ea"
  },
  {
    key: "4",
    location: "Valley of Fire State Park",
    numberOfDays: 7,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "#B1DBD6"
  },
  {
    key: "5",
    location: "Mediterranean",
    numberOfDays: 6,
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "#2DCCCC"
  },
  {
    key: "6",
    location: "Veligandu Island",
    numberOfDays: 8,
    image:
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=2507&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "#75CC2D"
  }
];

export const { width, height } = Dimensions.get("window");
export const SIZE = 64;
export const ICON_SIZE = SIZE * 0.6;
export const SPACING = 12;

const s = width * 0.68;

export const tutorial12Spec = {
  ITEM_WIDTH: s,
  ITEM_HEIGHT: s * 1.5,
  RADIUS: 18,
  SPACING,
  FULL_SIZE: s + SPACING * 2
};
