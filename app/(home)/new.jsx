import { View, Text, Button, Alert } from "react-native";
import React, { useState } from "react";
import CustomButtom from "../../components/CustomButtom";
import FormField from "../../components/FormField";

import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector } from "react-redux";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { router } from "expo-router";
import axios from "axios";
import { addOffLineData } from "../../Slices/dataSlice";
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';

const New = () => {
    
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [datas, setDatas] = useState([]);

  const [form, setForm] = useState({
    title: "",
    type: "",
    amount: "",
    time: "",
  });
const id = uuidv4();
  console.log(id);

  

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setDate(date);
    setForm({ ...form, time: date });

    hideDatePicker();
  };

  const handleSubmit = async () => {
    try {
      // const res = await axios.post(
      //   "https://income-expense-utqh.onrender.com/api/data",
      //   { userId: currentUser._id, ...form }
      // );

      dispatch(addOffLineData({ userId: currentUser._id, ...form, offlineId: id}))



      Alert.alert("Add new Success!")

      router.push("home");


    } catch (error) {
      router.push("home");
      Alert.alert("Add new fail!")


      console.log(error);
    }
  };
  return (
    <View className="relative">
      <Text >New Income or Expense</Text>

      <CustomButtom
      title={"Back"}
      handlePress={() => router.push('home')}
      containerStyle={"w-12 h-6 absolute top-0 right-0"}
      textStyle={"!font-normal !text-sm"}
    />

      <View >
        <FormField
          handlePress={(e) => setForm({ ...form, title: e })}
          title={"Title"}
          placeholder={"Add Title"}
        />

        <Text>Type</Text>
        <RNPickerSelect
          onValueChange={(value) => setForm({ ...form, type: value })}
          items={[
            { label: "Income", value: "Income" },
            { label: "Expense", value: "Expense" },
          ]}
        />

        <FormField
          handlePress={(e) => setForm({ ...form, amount: e })}
          title={"Amount"}
          placeholder={"Add Amount"}
        />

        <FormField
          // handlePress={(e) =>  console.log(e, 'tttt') }
          title={"Date"}
          value={date}
          editable={false}
          placeholder={"Choose Date"}
          onFocus={showDatePicker}
        />

        {/* <Button title="Choose  Date here" onPress={showDatePicker} /> */}

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          locale="en_GB"
          mode="datetime"
          date={new Date()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <CustomButtom
          title={"Submit"}
          handlePress={handleSubmit}
          containerStyle={"w-full h-12 mt-4 mx-auto"}
          textStyle={""}
        />
      </View>
    </View>
  );
};

export default New;
