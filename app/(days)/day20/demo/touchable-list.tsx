import { Stack } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function TwoListScreen() {
  const [products, setProducts] = useState([
    { data: [1, 1, 1, 1, 1, 1], isSelected: false },
    { data: [1, 1, 1, 1, 1, 1], isSelected: false }
  ]);

  const select = (index) => {
    let tempData = products;
    tempData.map((item, idx) => {
      if (index === idx) {
        item.isSelected = !item.isSelected;
      } else {
        item.isSelected = false;
      }
    });

    let temp = [];
    tempData.map((item) => {
      temp.push(item);
    });

    setProducts(temp);
  };

  return (
    <>
      <Stack.Screen options={{ title: "可点击列表" }} />
      <View style={styles.container}>
        <View style={{ marginTop: 50 }}>
          <FlatList
            data={products}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.itemView}
                onPress={() => select(index)}
              >
                <Text style={{ fontSize: 20, fontWeight: "700", color: "red" }}>
                  item {index + 1}
                </Text>
                {item.isSelected && (
                  <FlatList
                    data={item.data}
                    renderItem={({ item, index }) => (
                      <View style={{ margin: 10 }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "700",
                            color: "blue"
                          }}
                        >
                          sub item{index + 1}
                        </Text>
                      </View>
                    )}
                  />
                )}
                {item.isSelected ? (
                  <Image
                    source={require("@/assets/images/up-arrow.png")}
                    style={{
                      width: 24,
                      height: 24,
                      position: "absolute",
                      top: 20,
                      right: 20
                    }}
                  />
                ) : (
                  <Image
                    source={require("@/assets/images/down-arrow.png")}
                    style={{
                      width: 24,
                      height: 24,
                      position: "absolute",
                      top: 20,
                      right: 20
                    }}
                  />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
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
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "center",
    padding: 20
  }
});
