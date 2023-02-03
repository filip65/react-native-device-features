import { Alert, Image, View, Text } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  PermissionStatus,
} from "expo-location";
import { useEffect, useState } from "react";
import { getLocationImageUrl } from "../../utils/location";
import * as Progress from "react-native-progress";
import { useNavigation, useRoute } from "@react-navigation/native";
const LocationPicker = ({ location, onLocationSet }) => {
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const mapPickedLocation = route.params?.selectedLocation;

  const verifyPermissions = async () => {
    const permissionResult = await requestForegroundPermissionsAsync();

    if (permissionResult.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Error",
        "Can't move further without camera permissions. Please change the camera permissions in settings."
      );

      return false;
    }

    return true;
  };
  const getLocationHandler = async () => {
    const hasPermissions = await verifyPermissions();

    if (hasPermissions) {
      setFetchingLocation(true);
      const location = await getCurrentPositionAsync();

      onLocationSet({
        lan: location.coords.latitude,
        lgn: location.coords.longitude,
      });
      setFetchingLocation(false);
    }
  };

  const pickOnMapHandler = async () => {
    navigation.navigate("map");
  };

  useEffect(() => {
    if (mapPickedLocation) {
      onLocationSet(mapPickedLocation);
    }
  }, [mapPickedLocation]);

  return (
    <View className="my-6">
      <View className="w-full h-[200px] bg-primary500 justify-center items-center rounded-lg overflow-hidden mb-2">
        {location ? (
          <Image
            source={{
              uri: getLocationImageUrl(location),
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
            indicator={Progress.Pie}
            indicatorProps={{
              size: 80,
              borderWidth: 0,
              color: "rgba(150, 150, 150, 1)",
              unfilledColor: "rgba(200, 200, 200, 0.2)",
            }}
          />
        ) : (
          <Text className="text-white text-base">
            {fetchingLocation
              ? "Fetching location..."
              : "No Location Selected."}
          </Text>
        )}
      </View>
      <View className="flex-row">
        <OutlineButton
          text="Locate User"
          icon="location"
          style="flex-1"
          onPress={getLocationHandler}
        />
        <View className="w-4"></View>
        <OutlineButton
          text="Pick on Map"
          icon="map"
          style="flex-1"
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
};

export default LocationPicker;
