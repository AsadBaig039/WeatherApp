import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const WeatherCard = ({foreCast, city}) => {
  console.log(foreCast);
  const weeklyTemp =
    foreCast && foreCast.daily ? foreCast.daily.map(({temp}) => temp.day) : [];
  console.log(weeklyTemp);

  const fahrenheitToCelsius = fahrenheit => ((fahrenheit - 32) * 5) / 9;
  const KelvinToCelsius = Kelvin => (Kelvin - 273.15).toFixed(2);

  const getDate = dtVal => {
    const date = new Date(dtVal * 1000 - foreCast.timezone_offset * 1000);
    return date.toLocaleDateString('en-US');
  };

  return foreCast && foreCast.current ? (
    <View>
      <View style={styles.container}>
        <View style={{width: '50%'}}>
          <Text style={styles.cityText}>{city.city}</Text>
          <Text style={styles.detailsText}>
            {KelvinToCelsius(JSON.stringify(foreCast.current.temp)) + ' C'}
          </Text>
          <Text>
            {'Feels Like: ' +
              KelvinToCelsius(JSON.stringify(foreCast.current.feels_like)) +
              ' C'}
          </Text>
          <Text>{JSON.stringify(foreCast.current.weather[0].description)}</Text>
        </View>
        <View
          style={{
            width: '50%',
            alignItems: 'center',
          }}>
          <Image
            resizeMode="cover"
            style={{width: 120, height: 100}}
            source={{
              uri: `https://openweathermap.org/img/w/${foreCast.current.weather[0].icon}.png`,
            }}
          />
        </View>
      </View>
      {foreCast && foreCast.daily ? (
        <View style={styles.listContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={foreCast.daily}
            renderItem={({item}) => (
              <View style={styles.listCard}>
                <Image
                  style={{width: 50, height: 50}}
                  resizeMode="contain"
                  source={{
                    uri: `https://openweathermap.org/img/w/${item.weather[0].icon}.png`,
                  }}
                />
                <Text>{getDate(item.dt)}</Text>
                <Text>{KelvinToCelsius(item.temp.day) + ' C'}</Text>
                <Text>{KelvinToCelsius(item.feels_like.day) + ' C'}</Text>
                <Text>{item.weather[0].description}</Text>
              </View>
            )}
          />
        </View>
      ) : null}
      {foreCast && foreCast.daily ? (
        <View>
          <Text style={styles.tempGraphText}>Bezier Line Chart</Text>
          <LineChart
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun', 'Mon'],
              datasets: [
                {
                  data: weeklyTemp,
                },
              ],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={200}
            withHorizontalLabels={false}
            // yAxisLabel="Temperature"
            //yAxisSuffix="k"
            //yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: 'white',
              backgroundGradientFrom: 'grey',
              backgroundGradientTo: 'white',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: 'black',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
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
    flexDirection: 'row',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 5,
    marginHorizontal: 20,
    opacity: 0.7,
  },
  cityText: {
    fontSize: 26,
    color: 'black',
  },
  detailsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  listContainer: {
    marginVertical: 50,
    opacity: 0.7,
  },
  listCard: {
    width: 100,
    marginHorizontal: 10,
    backgroundColor: 'white',
    opacity: 0.9,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tempGraphText: {
    fontSize: 28,
    paddingVertical: 10,
    color: 'white',
  },
});

export default WeatherCard;
