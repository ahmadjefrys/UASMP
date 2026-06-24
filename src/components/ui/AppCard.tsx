import { Card } from "react-native-paper";

export default function AppCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card style={{ marginVertical: 10 }}>
      <Card.Content>{children}</Card.Content>
    </Card>
  );
}