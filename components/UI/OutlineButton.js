import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

const OutlineButton = ({ text, icon, onPress, style }) => {
  return (
    <Pressable
      onPress={() => onPress?.()}
      className={`flex-row py-2 px-4 justify-center items-center border-primary500 border rounded active:opacity-75 ${style}`}
    >
      <Ionicons name={icon} size={18} color={Colors.primary500} />
      <Text className="text-primary500 ml-2">{text}</Text>
    </Pressable>
  );
};

export default OutlineButton;
