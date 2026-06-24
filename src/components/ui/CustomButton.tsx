import { Button } from "react-native-paper";

interface Props {
  title: string;
  onPress?: () => void;
  loading?: boolean;
}

export default function CustomButton({
  title,
  onPress,
  loading,
}: Props) {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={loading}
      style={{ borderRadius: 12 }}
    >
      {title}
    </Button>
  );
}