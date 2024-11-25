import { Image, ScrollView, Text, View } from "react-native";
import React from "react";

import { images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router, useRouter } from "expo-router";
import CustomButtom from "../components/CustomButtom";
import { useSelector } from "react-redux";

const Index = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {!currentUser ? (
        <SafeAreaView>
          <ScrollView>
            <View className="mt-20">
              <View className="flex items-center justify-center w-full">
                <Image className="w-56  h-72" source={images.landing} />
              </View>
              <Text className="text-center text-xl font-bold">
                Welocme to Income & Expense Application
              </Text>

              <CustomButtom
                title={"Start with email"}
                handlePress={() => router.push("(auth)/sign-in")}
                containerStyle={"w-80 mx-auto h-12 mt-4"}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Redirect href={"home"} />
      )}
    </>
  );
};

export default Index;
