import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';

const WeatherCard = ({foreCast, city}) => {
  console.log(foreCast);
  const weeklyTemp =
    foreCast && foreCast.daily ? foreCast.daily.map(({temp}) => temp.day) : [];
  console.log(weeklyTemp);
  //   const [weather, setWeather] = useState();
  //   const [icon, setIcon] = useState();
  //   console.log(weather);

  //   useEffect(() => {
  //     const getWeather = foreCast.weather;
  //     setWeather(...getWeather);
  //     setIcon(weather.icon);
  //   }, [foreCast]);

  return foreCast && foreCast.current ? (
    <View>
      <View style={styles.container}>
        <Text style={styles.cityText}>{city.city}</Text>
        <Text>{JSON.stringify(foreCast.current.humidity)}</Text>
      </View>
      {foreCast && foreCast.daily ? (
        <View
          style={{
            height: 200,
            backgroundColor: 'white',
            marginVertical: 10,
          }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={foreCast.daily}
            renderItem={
              ({item}) => (
                <View>
                  <Text>{item.weather[0].main}</Text>
                  <Image
                    style={{width: 100, height: 100}}
                    resizeMode="contain"
                    source={{
                      uri: `https://openweathermap.org/img/w/${item.weather[0].icon}.png`,
                    }}
                  />
                </View>
              )
              //   return (

              //   );
            }
          />
        </View>
      ) : null}
    </View>
  ) : (
    <ActivityIndicator />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 5,
    //  elevation: 3,
  },
  cityText: {
    fontSize: 18,
  },
});

export default WeatherCard;
