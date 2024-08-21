import InputForm from "@/components/InputForm";
import { icons } from "@/constants";
import { changePasswordSchema } from "@/validations";
import { Link, router, useLocalSearchParams } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";
import { changePasswordApi } from "@/service/api";
import ShowToast from "@/components/Toast";

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  oldPasswordVisible: boolean;
  newPasswordVisible: boolean;
  confirmNewPasswordVisible: boolean;
};

export default function ChangePasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const params = useLocalSearchParams<{ slug: string | any }>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      oldPasswordVisible: false,
      newPasswordVisible: false,
      confirmNewPasswordVisible: false,
    },
  });

  console.log(params.slug);

  const isOldPasswordVisible = watch("oldPasswordVisible", false);
  const isNewPasswordVisible = watch("newPasswordVisible", false);
  const isConfirmNewPasswordVisible = watch("confirmNewPasswordVisible", false);

  const togglePasswordVisibility = (fieldName: keyof FormValues) => {
    setValue(fieldName, !watch(fieldName));
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    // Handle password change logic here
    try {
      // Call API to change password
      const result = await changePasswordApi(
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          confirmNewPassword: data.confirmNewPassword,
        },
        params.slug
      );
      ShowToast(result.message);
      router.push("/profile");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FCFDFE]">
      <View className="py-[56px]">
        <View className="flex flex-row space-x-1">
          <Link href="/profile" asChild>
            <TouchableOpacity>
              <Image source={icons.chevronLeft2} className="w-8 h-8" />
            </TouchableOpacity>
          </Link>
          <Text className="text-primary-800 text-xl font-pbold">
            Ubah Kata Sandi
          </Text>
        </View>
        <View className="px-9">
          <View className="my-5">
            <Text className="mb-2">Kata sandi lama</Text>
            <Controller
              control={control}
              name="oldPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputForm
                  icon={isOldPasswordVisible ? icons.eyeOff : icons.eye}
                  type="password"
                  placeholder="Kata Sandi Lama"
                  secureTextEntry={!isOldPasswordVisible}
                  value={value}
                  onChangeText={onChange}
                  onPress={() => togglePasswordVisibility("oldPasswordVisible")}
                />
              )}
            />
            {errors.oldPassword && (
              <Text style={{ color: "red" }}>{errors.oldPassword.message}</Text>
            )}
          </View>
          <View className="mb-5">
            <Text className="mb-2">Kata sandi baru</Text>
            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputForm
                  icon={isNewPasswordVisible ? icons.eyeOff : icons.eye}
                  type="password"
                  placeholder="Kata Sandi Baru"
                  secureTextEntry={!isNewPasswordVisible}
                  value={value}
                  onChangeText={onChange}
                  onPress={() => togglePasswordVisibility("newPasswordVisible")}
                />
              )}
            />
            {errors.newPassword && (
              <Text style={{ color: "red" }}>{errors.newPassword.message}</Text>
            )}
          </View>
          <View className="mb-5">
            <Text className="mb-2">Ulangi kata sandi baru</Text>
            <Controller
              control={control}
              name="confirmNewPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <InputForm
                  icon={isConfirmNewPasswordVisible ? icons.eyeOff : icons.eye}
                  type="password"
                  placeholder="Ulangi Kata Sandi Baru"
                  secureTextEntry={!isConfirmNewPasswordVisible}
                  value={value}
                  onChangeText={onChange}
                  onPress={() =>
                    togglePasswordVisibility("confirmNewPasswordVisible")
                  }
                />
              )}
            />
            {errors.confirmNewPassword && (
              <Text style={{ color: "red" }}>
                {errors.confirmNewPassword.message}
              </Text>
            )}
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#3568C0" />
          ) : (
            <CustomButton
              clx2="text-sm text-neutral-50 font-white"
              clx="bg-primary-700 w-full h-[5vh]"
              title="Simpan"
              type="button"
              onPress={handleSubmit(onSubmit)}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
