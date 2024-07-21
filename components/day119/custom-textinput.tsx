import { TextInputProps, Text, TextInput, View } from "react-native";

interface Props extends TextInputProps {
  label: string;
}
export const CustomTextInput = ({ label, ...textInputProps }: Props) => {
  return (
    <View>
      <Text className="mb-2 font-semibold text-gray-500">{label}</Text>
      <TextInput
        autoCapitalize="none"
        autoComplete="off"
        {...textInputProps}
        className="p-3 rounded-md border border-gray-300"
      />
    </View>
  );
};
