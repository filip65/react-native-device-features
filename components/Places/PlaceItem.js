import { Image, Pressable, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PlaceItem = ({ id, title, address, imageUri, location }) => {
  const navigation = useNavigation();

  const pressHandler = () => {
    navigation.navigate("placeDetails", {
      place: {
        title,
        address,
        imageUri,
        location,
        id,
      },
    });
  };

  return (
    <Pressable
      onPress={pressHandler}
      className="flex-row items-start rounded overflow-hidden my-2 bg-primary500 shadow-lg active:opacity-75"
    >
      <Image
        source={{
          uri: imageUri,
        }}
        style={{
          height: 100,
          flex: 1,
        }}
      />
      <View
        style={{
          flex: 2,
          padding: 12,
        }}
      >
        <Text className="font-lg text-gray-700 font-bold">{title}</Text>
        <Text className="text-sm text-gray-600">{address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;
