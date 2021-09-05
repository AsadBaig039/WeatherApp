import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import GetLocation from 'react-native-get-location';

const MapScreen = ({navigation, route}) => {
  const coordinates = route.params.data;
  const [newCoordinates, setNewCordinates] = useState(coordinates);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        // onPress={() => navigation.navigate('MapScreen', {data: value})}
        style={styles.mapButton}>
        <Text style={styles.mapViewText}>Show My Location</Text>
      </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    // height: '70%',
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
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 10,
    marginVertical: 20,
  },
  mapViewText: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MapScreen;
