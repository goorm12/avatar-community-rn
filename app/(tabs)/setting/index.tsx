import AuthRouter from "@/components/AuthRouter";
import useAuth from "@/hooks/queries/useAuth";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settingcreen() {
  const { logout } = useAuth();
  return (
    <AuthRouter>
      <SafeAreaView>
        <Text onPress={logout}>로그아웃</Text>
      </SafeAreaView>
    </AuthRouter>
  );
}
