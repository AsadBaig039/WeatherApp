import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {Cities} from '../res/constants/cities';
import DropDownPicker from 'react-native-dropdown-picker';
import {WEATHER_API_KEY} from '../utils/weatherKey';

const API_KEY = WEATHER_API_KEY;
console.log(API_KEY);

const HomeScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({});
  const [items, setItems] = useState(Cities);

  // weather api call states
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${value.lat}&lon=${
        value.lng
      }&exclude=${'hourly,minutely'}&appid=${API_KEY}`,
    )
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [value]);

  console.log('value', value);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Select City</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={value => {
          setValue(value);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
