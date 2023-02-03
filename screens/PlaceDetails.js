import { View, Image, Text } from "react-native";
import OutlineButton from "../components/UI/OutlineButton";
import { useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { deletePlace } from "../utils/database";

const PlaceDetails = ({ route, navigation }) => {
  const place = route.params?.place;

  const showOnMapHandler = () => {
    if (place?.location) {
      navigation.navigate("map", {
        location: place.location,
      });
    }
  };

  const deletePlaceHandler = async () => {
    console.log("delete");
    try {
      if (place?.id) {
        await deletePlace(place.id);
        navigation.navigate("allPlaces");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: place?.title,
    });
  }, []);

  return (
    <View className="flex-1">
      <Image
        source={{
          uri: place?.imageUri,
        }}
        style={{
          height: 200,
          width: "100%",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      />
      <View className="flex-1 items-center">
        <View className="p-6">
          <Text className="text-primary500 text-center font-bold text-base">
            {place?.address}
          </Text>
        </View>
        <OutlineButton
          text="View on Map"
          onPress={showOnMapHandler}
          style="mb-4"
        />
      </View>
      <View className="mb-10 items-center">
        <IconButton
          text="Delete Place"
          onPress={deletePlaceHandler}
          icon="trash"
          color="red"
          size={40}
        />
      </View>
    </View>
  );
};

export default PlaceDetails;
