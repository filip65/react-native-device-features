import React from "react";
import { Image, View, Text, Alert } from "react-native";
import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
  PermissionStatus,
} from "expo-image-picker";
import OutlineButton from "../UI/OutlineButton";

export default function CustomImagePicker({ onImageSet, image }) {
  const verifyPermissions = async () => {
    const permissionResult = await requestCameraPermissionsAsync();

    if (permissionResult.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Error",
        "Can't move further without camera permissions. Please change the camera permissions in settings."
      );

      return false;
    }

    return true;
  };

  const pickImage = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    let result = await launchCameraAsync({
      aspect: [16, 9],
      quality: 0.5,
      allowsEditing: true,
    });

    if (!result.canceled) {
      onImageSet(result.assets[0].uri);
    }
  };

  return (
    <View>
      <View className="w-full h-[200px] bg-primary500 justify-center items-center rounded-lg overflow-hidden mb-2">
        {!!image ? (
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Text className="text-white text-base">No Image Selected...</Text>
        )}
      </View>
      <OutlineButton text="Take Image" icon="camera" onPress={pickImage} />
    </View>
  );
}
