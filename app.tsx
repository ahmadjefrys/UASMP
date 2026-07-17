import { PaperProvider } from "react-native-paper";
import HomeScreen from "./src/screens/home";

export default function App() {
  return (
    <PaperProvider>
      <HomeScreen />
    </PaperProvider>
  );
}