import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import { useState } from "react";
import CustomImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { getAddressFromLocation } from "../../utils/location";
import { useNavigation } from "@react-navigation/native";
import { insertPlace } from "../../utils/database";
const PlaceForm = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
  const savePlaceHandler = async () => {
    if (!title) {
      return Alert.alert("Missing param", "Title is required!");
    }

    if (!image) {
      return Alert.alert("Missing param", "Image is required!");
    }

    if (!location) {
      return Alert.alert("Missing param", "Location is required!");
    }

    const placeData = {
      title,
      // imageUrl: image,
      imageUrl:
        "https://media.istockphoto.com/id/1139555328/photo/night-view-of-basilique-notre-dame-de-fourviere-from-palce-saint-jean-in-the-historical.jpg?s=612x612&w=0&k=20&c=dKUc47ZEvUyy5ddYC7yGv2v4_Oo1XTOBo3LTNW_WF3M=",
      address: location.address,
      location: {
        lat: location.lan,
        lgn: location.lgn,
      },
      id: new Date().getTime().toString(),
    };

    await insertPlace(placeData);

    navigation.navigate("allPlaces");
  };

  const changeLocationHandler = async (location) => {
    const address = await getAddressFromLocation(location);

    setLocation({ ...location, address });
  };

  return (
    <ScrollView className="flex-1 p-4">
      <View className="mb-6">
        <Text className="text-primary50 font-bold mb-1 text-primary500">
          Title
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          className="py-2 px-1 border-b-2 border-primary500 text-white"
          style={{
            fontSize: 16,
          }}
        />
      </View>
      <CustomImagePicker image={image} onImageSet={setImage} />
      <LocationPicker
        location={location}
        onLocationSet={changeLocationHandler}
      />

      <Button text="Add Place" onPress={savePlaceHandler} />
    </ScrollView>
  );
};

export default PlaceForm;
