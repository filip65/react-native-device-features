import { FlatList, View, Text } from "react-native";
import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }) => {
  if (!places || places?.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-primary500">No Places Added Yet...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      renderItem={({ item }) => <PlaceItem {...item} />}
      keyExtractor={(item) => item.id}
      className="px-4 py-3"
    />
  );
};

export default PlacesList;
