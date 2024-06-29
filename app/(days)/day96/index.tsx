import { DayHome } from "@/components";

const desc = `
# Advanced React Native FlatList animations with Animated API 

[youtube](https://youtu.be/cGTD4yYgEHc?si=pCXeL_FQuwNFKmu0)

## inspiratin: 
- [dribbble](https://dribbble.com/shots/3894781-Urbanears-Headphones)

`;

export default function DayScreen() {
  return (
    <DayHome
      title=""
      description={desc}
      buttons={[
        {
          link: "/day96/demo"
        }
      ]}
    />
  );
}
