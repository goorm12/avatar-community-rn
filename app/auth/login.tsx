import EmailInput from "@/components/EmailInput";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import PasswordInput from "@/components/PasswordInput";
import useAuth from "@/hooks/queries/useAuth";
import usePushNotification from "@/hooks/usePushNotification";

import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { loginMutation } = useAuth();
  const loginForm = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
  });
  const { expoPushToken } = usePushNotification();
  console.log("expoPushToken", expoPushToken);

  const onsubmit = (formValues: FormValues) => {
    const { email, password } = formValues;
    loginMutation.mutate({ ...formValues, expoPushToken });
  };

  return (
    <FormProvider {...loginForm}>
      <View style={styles.container}>
        <EmailInput />
        <PasswordInput />
      </View>

      <FixedBottomCTA
        label={"로그인 하기"}
        onPress={loginForm.handleSubmit(onsubmit)}
      />
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
});
