import { TextInput } from "react-native-paper";

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function CustomInput({
  label,
  value,
  onChangeText,
}: Props) {
  return (
    <TextInput
      mode="outlined"
      label={label}
      value={value}
      onChangeText={onChangeText}
    />
  );
}