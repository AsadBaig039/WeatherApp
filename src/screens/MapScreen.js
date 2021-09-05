import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import GetLocation from 'react-native-get-location';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MapScreen = ({navigation, route}) => {
  const coordinates = route.params.data;
  console.log('coordinates', coordinates);
  const [newCoordinates, setNewCordinates] = useState(coordinates);
  const [myLocation, setMylocation] = useState(null);
  console.log('My Location', myLocation);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        // console.log(location);
        const {latitude, longitude} = location;
        setMylocation({
          lat: latitude,
          lng: longitude,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  const changeLocation = () => {
    setNewCordinates(myLocation);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={26} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={changeLocation} style={styles.mapButton}>
          <Text style={styles.mapViewText}>Show My Location</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        {newCoordinates && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: parseInt(newCoordinates.lat),
              longitude: parseInt(newCoordinates.lng),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: parseInt(newCoordinates.lat),
                longitude: parseInt(newCoordinates.lng),
              }}
              title={newCoordinates.city}
              description={''}
            />
          </MapView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.4,
    paddingVertical: 10,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapButton: {
    width: 200,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 10,
  },
  mapViewText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MapScreen;
