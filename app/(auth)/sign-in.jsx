import { View, Text, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";

import CustomButton from "../../components/CustomButtom";
import { Link, router } from "expo-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../../Slices/userSlice";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const handlePress = async () => {
    try {
      const res = await axios.post(
        "https://expospendtracker.vercel.app/api/auth",
        form
      );

      dispatch(signInSuccess(res.data.user));
      console.log("current user     ", currentUser);

      Alert.alert("Login successful");
      router.push("home");
    } catch (error) {
      Alert.alert(error?.message);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text className="text-center text-2xl font-semibold">
            Sign In Page
          </Text>
          <FormField
            title={"Email"}
            placeholder={"Your Email"}
            handlePress={(e) => setForm({ ...form, email: e })}
          />
          <FormField
            title={"Password"}
            placeholder={"Your Password"}
            handlePress={(e) => setForm({ ...form, password: e })}
            style={"mt-4"}
          />
          <CustomButton
            title={"Sign In"}
            containerStyle={"h-12 mt-4"}
            handlePress={handlePress}
          />

          <View className="flex items-center">
            <Text>You don't have an account?</Text>
            <Link href={"sign-up"} className="text-yellow-500">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
