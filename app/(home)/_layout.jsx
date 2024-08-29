import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, router } from "expo-router";
import { useSelector } from "react-redux";

const HomeLayout = () => {
  // const {currentUser} = useSelector(state => state.user)

  // console.log(currentUser);

  // useEffect(() => {
  //   if (!currentUser) {
  //     router.push("sign-in");
  //   }
  // },[])


  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="new" options={{ headerShown: false }}></Stack.Screen>
    </Stack>
  );
};

export default HomeLayout;
