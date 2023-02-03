import { MAPS_API_KEY } from "@env";
import axios from "axios";

export const getLocationImageUrl = (location) => {
  return `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=400&zoom=15&height=200&center=lonlat:${location.lgn},${location.lan}&apiKey=${MAPS_API_KEY}`;
};

export const getAddressFromLocation = async (location) => {
  const response = await axios.get(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${location.lan}&lon=${location.lgn}&apiKey=${MAPS_API_KEY}`
  );

  return response.data.features[0]?.properties?.address_line1;
};
