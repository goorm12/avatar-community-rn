import { Controller, useFormContext } from "react-hook-form";
import { TextInputProps } from "react-native";
import InputField from "./InputField";

interface PasswordInputProps {
  submitBehavior?: TextInputProps["submitBehavior"];
}

export default function PasswordInput({
  submitBehavior = "blurAndSubmit",
}: PasswordInputProps) {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="password"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length < 8) {
            return "비밀번호는 8자 이상 입력해주세요.";
          }
        },
      }}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <InputField
          ref={ref}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          secureTextEntry
          value={value}
          onChangeText={onChange}
          error={error?.message}
          textContentType="oneTimeCode"
          submitBehavior={submitBehavior}
          onSubmitEditing={() => setFocus("passwordConfirm")}
        />
      )}
    />
  );
}
