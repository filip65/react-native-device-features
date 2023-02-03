import MapView, { Marker } from "react-native-maps";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import IconButton from "../components/UI/IconButton";

const Map = ({ navigation, route }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const location = route.params?.location;

  const region = {
    latitute: location?.lat ?? 37.78,
    longitute: location?.lgn ?? -122.43,
    latituteDelta: 0.0922,
    longituteDelta: 0.0421,
  };
  const selectLocationHandler = (event) => {
    if (location) return;

    const lat = event.nativeEvent.coordinate.latitude;
    const lgn = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({
      latitude: lat,
      longitude: lgn,
    });
  };

  const savePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("You have to pick some location!");
      return;
    }

    navigation.navigate("addPlace", {
      selectedLocation: {
        lan: selectedLocation?.latitude,
        lgn: selectedLocation?.longitude,
      },
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (location) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => {
        return (
          <IconButton
            icon="save"
            size={22}
            color={tintColor}
            onPress={savePickedLocation}
          />
        );
      },
    });
  }, [navigation, savePickedLocation]);

  useEffect(() => {
    if (location) {
      setSelectedLocation({
        latitude: location.lat,
        longitude: location.lgn,
      });
    }
  }, []);

  return (
    <MapView
      initialRegion={region}
      className="flex-1"
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker coordinate={selectedLocation} title={"Picked location"} />
      )}
    </MapView>
  );
};

export default Map;
