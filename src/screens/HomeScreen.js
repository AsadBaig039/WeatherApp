import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PakCities from '../res/constants/pk.json';
import DropDownPicker from 'react-native-dropdown-picker';
import {WEATHER_API_KEY} from '../utils/weatherKey';
import WeatherCard from '../components/screenComponents/HomeComponents/WeatherCard';

const API_KEY = WEATHER_API_KEY;
const img = require('../assets/weather.jpg');

const HomeScreen = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({});
  const [items, setItems] = useState(PakCities);
  const [selectedItem, setSelectedItem] = useState({});
  console.log(selectedItem);

  const newArrayOfObj = items.map(({city: label}) => ({
    label,
    value: label,
  }));

  const selectItem = value => {
    const selectedValue = items.filter(item => item.city === value);
    setSelectedItem(selectedValue[0]);
    console.log('Selected Value', selectedValue);
  };

  // weather api call states
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${
        selectedItem && selectedItem.lat
      }&lon=${
        selectedItem && selectedItem.lng
      }&exclude=${'hourly,minutely'}&appid=${API_KEY}`,
    )
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [selectedItem]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
        <View style={styles.dropDownContainer}>
          <Text style={styles.selectCityText}>Select City</Text>
          <DropDownPicker
            placeholder="Select City"
            open={open}
            value={value}
            items={newArrayOfObj}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={value => {
              setValue(value);
              selectItem(value);
            }}
          />
        </View>

        <View style={styles.activityIndicator}>
          <ActivityIndicator size="small" color="black" animating={isLoading} />
        </View>

        {selectedItem && selectedItem.city === undefined ? null : (
          <WeatherCard city={selectedItem} foreCast={data} />
        )}
        {selectedItem && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MapScreen', {data: selectedItem})
            }
            style={styles.mapButton}>
            <Text style={styles.mapViewText}>Map View</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  dropDownContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  selectCityText: {
    fontSize: 28,
    paddingVertical: 10,
    color: 'white',
  },
  activityIndicator: {
    marginVertical: 10,
  },
  weekList: {
    paddingVertical: 10,
    marginVertical: 10,
  },
  mapButton: {
    width: 100,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  mapViewText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
