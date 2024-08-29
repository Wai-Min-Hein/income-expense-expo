import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import CustomButtom from "./CustomButtom";

const FlatListComponents = ({ data }) => {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View className="flex flex-row gap-6 w-full justify-start items-center my-4 ">
            <Text>{item.type}</Text>
            <Text>{item.title}</Text>
            <Text>{item.amount}</Text>
            <Text>{item.date}</Text>
            <CustomButtom
              title={"Delete"}
              containerStyle={"w-12 h-6 !rounded-sm"}
              textStyle={"!text-sm !font-normal"}
            />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="flex flex-row gap-6 w-full justify-start items-center">
            <Text>Type</Text>
            <Text>Title</Text>
            <Text>Amount</Text>
            <Text>Date</Text>
            <Text></Text>
          </View>
        )}
        
        ListEmptyComponent={() => (
          <View>
            <Text>Empty</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FlatListComponents;
