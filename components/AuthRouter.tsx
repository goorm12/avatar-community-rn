import useAuth from "@/hooks/queries/useAuth";
import { router, useFocusEffect } from "expo-router";
import { ReactNode } from "react";
import { View } from "react-native";

export default function AuthRouter({ children }: { children: ReactNode }) {
  const { auth } = useAuth();
  useFocusEffect(() => {
    !auth.id && router.replace("/auth");
  });
  return <View>{children}</View>;
}
