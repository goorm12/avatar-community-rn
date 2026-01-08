import { Controller, useFormContext } from "react-hook-form";
import InputField from "./InputField";

export default function EmailInput() {
  const { control, setFocus } = useFormContext();
  return (
    <Controller
      name="email"
      control={control}
      rules={{
        validate: (data: string) => {
          if (data.length === 0) {
            return "이메일을 입력해주세요.";
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data)) {
            return "올바른 이메일 형식이 아닙니다.";
          }
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <InputField
          autoFocus
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={value}
          onChangeText={onChange}
          error={error?.message}
          inputMode="email"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => setFocus("password")}
        />
      )}
    />
  );
}
