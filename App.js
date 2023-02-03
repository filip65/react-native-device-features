import AddPlace from "./screens/AddPlace";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AllPlaces from "./screens/AllPlaces";
import { StatusBar, View } from "react-native";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { useEffect } from "react";
import { initDatabase } from "./utils/database";
import PlaceDetails from "./screens/PlaceDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    (async () => {
      await initDatabase();
    })();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}
        >
          <Stack.Screen
            name="allPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              headerRight: ({ tintColor }) => {
                return (
                  <IconButton
                    icon="add"
                    size={24}
                    color={tintColor}
                    onPress={() => navigation.navigate("addPlace")}
                  />
                );
              },
              title: "All Places",
            })}
          />
          <Stack.Screen
            name="addPlace"
            component={AddPlace}
            options={{
              title: "Add Place",
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="map"
            component={Map}
            options={{
              title: "Map",
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name="placeDetails"
            component={PlaceDetails}
            options={{
              headerBackTitleVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
