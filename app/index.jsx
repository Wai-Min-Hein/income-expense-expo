import { Image, ScrollView, Text, View } from "react-native";
import React, { useEffect } from "react";

import { images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButtom from "../components/CustomButtom";
import { useSelector } from "react-redux";

const Index = () => {

  


  return (
    <SafeAreaView>
      <ScrollView>
        <View className='mt-20'>
          <View className="flex items-center justify-center w-full">
            <Image className="w-56  h-72" source={images.landing} />
          </View>
          <Text className="text-center text-xl font-bold">
            Welocme to Income & Expense Application
          </Text>

          <CustomButtom title={'Start with email'} handlePress={() => router.push('sign-in')} containerStyle={'w-80 mx-auto h-12 mt-4'} />
          

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
