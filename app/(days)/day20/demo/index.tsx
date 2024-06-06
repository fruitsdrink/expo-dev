import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface Rating {
  rate: number;
  count: number;
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  };
  return (
    <>
      <Stack.Screen
        options={{
          title: "Flatlist"
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.itemView}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                />
                <View style={styles.nameView}>
                  <Text>
                    {item.title.length > 30
                      ? item.title.substring(0, 30) + "..."
                      : item.title}
                  </Text>
                  <Text>
                    {item.description.length > 30
                      ? item.description.substring(0, 30) + "..."
                      : item.description}
                  </Text>
                  <Text style={styles.price}>${item.price}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemView: {
    width: "90%",
    height: 100,
    backgroundColor: "#fff",
    alignSelf: "center",
    marginTop: 10,
    flexDirection: "row"
  },
  productImage: {
    width: 100,
    height: 100
  },
  nameView: {
    paddingLeft: 20,
    paddingRight: 10
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "green",
    marginTop: 10
  }
});
