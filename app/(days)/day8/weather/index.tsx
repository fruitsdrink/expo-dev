import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { fonts } from "@/constants";
import * as Location from "expo-location";
import { CurrentWeathr, ForecastWeather } from "@/types";
import { ForecastItem } from "@/components";
import LottieView from "lottie-react-native";

const OPEN_WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const OPEN_WEATHER_API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY;
const bgImg =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-images/1.jpg";

export default function WeatherScreen() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState("");
  const [weather, setWeather] = useState<CurrentWeathr>();
  const [forecastWeather, setForecastWeather] = useState<ForecastWeather>();

  const fetchWeather = async () => {
    const lat = location?.coords.latitude;
    const lon = location?.coords.longitude;

    const url = `${OPEN_WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}&lang=zh_cn&units=metric`;
    const res = await fetch(url);
    const data = (await res.json()) as CurrentWeathr;
    setWeather(data);
  };

  const fetchForecast = async () => {
    const lat = location?.coords.latitude;
    const lon = location?.coords.longitude;
    const days = 16;

    // api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
    const url = `${OPEN_WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&cnt=${days}&appid=${OPEN_WEATHER_API_KEY}&lang=zh_cn&units=metric`;
    const res = await fetch(url);
    const data = (await res.json()) as ForecastWeather;

    setForecastWeather(data);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (!location) return;

    fetchWeather();
    fetchForecast();
  }, [location]);

  if (errorMsg) {
    return (
      <View>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!weather) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <ImageBackground
        source={{
          uri: bgImg,
        }}
        style={{ flex: 1 }}
      >
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: "rgba(0,0,0,0.1)" },
          ]}
        />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <LottieView
            source={
              weather.weather[0].main === "Rain"
                ? require("@/assets/lottie/rain.json")
                : require("@/assets/lottie/sunny.json")
            }
            loop
            autoPlay
            style={{
              width: 200,
              aspectRatio: 1,
            }}
          />
          <Text style={styles.location}>{weather.name}</Text>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}℃</Text>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0, height: 150, marginBottom: 40 }}
          contentContainerStyle={{ gap: 12, paddingHorizontal: 12 }}
          data={forecastWeather?.list}
          renderItem={({ item }) => <ForecastItem data={item} />}
        />
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  location: {
    fontSize: 30,
    fontFamily: fonts.Poppins,
    color: "lightgray",
  },
  temp: {
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 150,
    color: "#fefefe",
  },
});
