import PlacesList from "../components/Places/PlacesList";
import { useEffect, useState } from "react";
import { fetchPlaces } from "../utils/database";
import { useIsFocused } from "@react-navigation/native";

const AllPlaces = () => {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      try {
        if (isFocused) {
          const data = await fetchPlaces();

          setPlaces(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isFocused]);

  return <PlacesList places={places} />;
};

export default AllPlaces;
