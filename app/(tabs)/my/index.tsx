import AuthRouter from "@/components/AuthRouter";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyScreen() {
  return (
    <AuthRouter>
      <SafeAreaView>
        <Text>내 프로필 스크린</Text>
      </SafeAreaView>
    </AuthRouter>
  );
}
