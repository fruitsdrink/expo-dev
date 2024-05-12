import { StyleSheet, Text, View } from "react-native";
import React, { useMemo, useRef } from "react";
import { Stack } from "expo-router";
import MapView from "react-native-maps";
import appartments from "@/assets/data/day5/appartments.json";
import { AppartmentlistItem, CustomMarker } from "@/components";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { fonts } from "@/constants";

export default function AirbnbScreen() {
  const [selectedApartment, setSelectedApartment] = React.useState(null);
  const [mapRegion, setMapRegion] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => [80, "50%", "90%"], []);

  return (
    <>
      <Stack.Screen
        options={{
          // headerShown: false,
          title: "Airbnb Map",
        }}
      />
      <View style={styles.container}>
        <MapView
          style={styles.map}
          // provider={PROVIDER_GOOGLE}
          // initialRegion={mapRegion}
          region={mapRegion}
        >
          {appartments.map((appartment) => (
            <CustomMarker
              key={appartment.id}
              data={appartment}
              onPress={(e) => {
                setSelectedApartment(e as any);
              }}
            />
          ))}
        </MapView>

        {/* 显示选择的公寓 */}
        {selectedApartment && (
          <AppartmentlistItem
            data={selectedApartment}
            containerStyle={{
              position: "absolute",
              bottom: 100,
              padding: 10,
              left: 10,
              right: 10,
              borderRadius: 10,
            }}
          />
        )}

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={0}
          // enablePanDownToClose
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.listTitle}>
              Over {appartments.length} places 🎉
            </Text>
            <BottomSheetFlatList
              data={appartments}
              contentContainerStyle={{
                gap: 10,
                padding: 10,
              }}
              renderItem={({ item }) => <AppartmentlistItem data={item} />}
            />
          </View>
        </BottomSheet>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  listTitle: {
    textAlign: "center",
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 16,
    marginVertical: 5,
    marginBottom: 20,
  },
});
