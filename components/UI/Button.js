import { Pressable, Text } from "react-native";

const Button = ({ text, onPress }) => {
  return (
    <Pressable
      onPress={() => onPress?.()}
      className="py-2 px-4 rounded bg-primary500 active:opacity-75"
    >
      <Text className="text-center font-base">{text}</Text>
    </Pressable>
  );
};

export default Button;
