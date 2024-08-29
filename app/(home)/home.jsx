import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import RNPickerSelect from "react-native-picker-select";

import CustomButtom from "../../components/CustomButtom";

import { images } from "../../constants";

import FormField from "../../components/FormField";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// import DateTimePicker from '@react-native-community/datetimepicker';
import {
  logOutFailure,
  logOutStart,
  logOutSuccess,
} from "../../Slices/userSlice";
import { router } from "expo-router";
import {
  addOffLineData,
  clearOfflineData,
  copyOffLineDatas,
  deleteOffLineData,
} from "../../Slices/dataSlice";

const home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { offLineDatas } = useSelector((state) => state.data);


  const dispatch = useDispatch();

  const [datas, setDatas] = useState([]);
  const [date, setDate] = useState("");


  const [form, setForm] = useState({
    title: "",
    type: "",
    amount: "",
    time: "",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const incomeDatas = offLineDatas?.filter((data) => data.type == "Income");
  const expenseDatas = offLineDatas?.filter((data) => data.type == "Expense");

  const totalIncomeAmount = incomeDatas.reduce(
    (pv, cv) => Number(pv) + Number(cv.amount),
    0
  );
  const totalExpenseAmount = expenseDatas.reduce(
    (pv, cv) => Number(pv) + Number(cv.amount),
    0
  );

  const totalAmount = totalIncomeAmount - totalExpenseAmount;


  const fetchAllData = async () => {
    try {
      const res = await axios.get(
        "https://income-expense-utqh.onrender.com/api/data"
      );

      const allData = res.data.data;
      const currentUserData = allData.filter(
        (data) => data.userId == currentUser._id
      );
      setDatas(currentUserData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNew = () => {
    router.push("new");
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://income-expense-utqh.onrender.com/api/data",
        { userId: currentUser._id, ...form }
      );
      setModalVisible(false);

      fetchAllData();
    } catch (error) {
      Alert.alert(error);
      console.log(error);
    }
  };

  

  useEffect(() => {
    fetchAllData();
    offLineDatas.length==0&& dispatch(copyOffLineDatas(datas)) ; 


  }, [datas]);

  



  const addOfflineToDBDatas = offLineDatas.filter(
    (data) => data._id == undefined && data._id == null
  );

  // console.log("addOffLineData : ", addOfflineToDBDatas);

  // Extract the _id values from offlinedata array
  const offlineIds = offLineDatas.map((item) => item._id);

  // Filter datas array to include only items whose _id is not present in offlineIds
  const toDeleteDatasFromDb = datas.filter(
    (item) => !offlineIds.includes(item._id)
  );

  // console.log("toDeleteDatasFromDb : ", toDeleteDatasFromDb);

  const handleSyncData = () => {
    if (addOfflineToDBDatas.length == 0 && toDeleteDatasFromDb.length == 0)
      dispatch(copyOffLineDatas(datas));
    else if (addOfflineToDBDatas.length > 0) {
      addOfflineToDBDatas.forEach((data, index) => {
        const uploadData = async () => {
          try {
            const res = await axios.post(
              "https://income-expense-utqh.onrender.com/api/data",
              data
            );
            {
              if (index == addOfflineToDBDatas.length - 1) {
                Alert.alert("Data sync to server success.")
              }
            }


            console.log(
              "addOfflineToDBDatas add offline data to server successfully"
            );
          } catch (error) {
            Alert.alert("Sync data fail!");

            console.log(error);
            return;
          }
        };
        uploadData();
      });
    } else if (toDeleteDatasFromDb.length > 0) {
      console.log('has to delete');
      toDeleteDatasFromDb.forEach((data, index) => {
        const handleDelete = async (data) => {
          try {
            const res = await axios.post(
              "https://income-expense-utqh.onrender.com/api/data/delete",
              data._id
            );

            if(index == toDeleteDatasFromDb.length-1){

              Alert.alert("Data sync to server success.")
            }

            console.log("toDeleteDatasFromDb delete successful");
          } catch (error) {
            console.log(error);
          }
        };

        handleDelete(data)
      });
    } else {
      console.log("No data to upload");
    }
  };

  const handleDelete = async (item) => {
    try {
      // const res = await axios.post(
      //   "https://income-expense-utqh.onrender.com/api/data/delete",
      //   { id }
      // );

      dispatch(deleteOffLineData(item));

      Alert.alert("Delete Success!");

      fetchAllData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    dispatch(logOutStart());
    

    try {
      const res = await axios.post(
        "https://income-expense-utqh.onrender.com/api/auth/logout"
      );
      Alert.alert("Logout Success!");
      dispatch(logOutSuccess());
      router.push("sign-in");
    } catch (error) {
      console.log(error);
      dispatch(logOutFailure());
    }
  };

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

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="pb-8">
          <View className="flex flex-row justify-end items-end">
            <Image
              source={images.profile}
              className="w-12 h-8"
              resizeMode="contain"
            />

            <Text className="text-2xl font-semibold text-center">
              {currentUser?.userName}
            </Text>
            <CustomButtom
              title={"Logout"}
              handlePress={handleLogout}
              containerStyle={"w-16 h-8 !rounded-sm"}
              textStyle={"!text-sm !font-normal"}
            />
          </View>

          <Text className="text-3xl font-semibold text-center">
            Income & Expense
          </Text>

          <Text className="text-xl font-semibold text-center">
            Total amount -{" "}
            <Text className={`${totalAmount <= 0 ? "text-red-500" : ""}`}>
              {totalAmount}
            </Text>{" "}
            ks
          </Text>

          <View className="flex items-end justify-end my-4">
            <CustomButtom
              title={"Add New"}
              handlePress={handleAddNew}
              containerStyle={"w-24 h-12"}
              textStyle={"!font-normal"}
            />
          </View>

          <View className="flex items-center justify-center gap-4 flex-row mb-4">
            <TouchableOpacity>
              <Text className="text-lg font-semibold">Income</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text className="text-lg font-semibold">Expense</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal>
            <View className="mx-4">
              <View className="flex flex-row gap-x-6  justify-start items-center">
                <Text className="flex-1   py-2 w-28">Type</Text>
                <Text className="flex-1   py-2 w-36">Title</Text>
                <Text className="flex-1   py-2 w-20">Amount</Text>
                <Text className="flex-1   py-2 w-56">Date</Text>
                <Text className="flex-1   py-2 w-24">Buttons</Text>
              </View>

              <FlatList
                data={offLineDatas}
                keyExtractor={(item) => item._id? item._id.toString():item.offlineId.toString()  }
                renderItem={({ item }) => (
                  <View className="flex flex-row   justify-start   mt-2  ">
                    <View className="flex flex-row gap-x-6  justify-start items-center">
                      <Text
                        className={`${
                          item.type == "Expense" ? "text-red-600" : ""
                        } flex-1 w-28   py-2`}
                      >
                        {item.type}
                      </Text>

                      <Text className="flex-1   py-2 w-36">{item.title}</Text>

                      <Text
                        className={`${
                          item.type == "Expense" ? "text-red-600" : ""
                        } flex-1   py-2 w-20`}
                      >
                        {" "}
                        {item.amount}
                      </Text>

                      <Text className="flex-1   py-2 w-56">
                        {new Date(item.time).toLocaleString("en-GB")}
                      </Text>

                      <CustomButtom
                        className="flex-1   py-2 w-24"
                        title={"Delete"}
                        handlePress={() => handleDelete(item)}
                        containerStyle={"w-24 h-8 !rounded-sm  !mx-0 !ml-6"}
                        textStyle={"!text-sm !font-normal"}
                      />
                    </View>
                  </View>
                )}
                ListEmptyComponent={() => (
                  <View>
                    <Text>Empty</Text>
                  </View>
                )}
              />

              <CustomButtom
                className="flex-1   py-2 w-24"
                title={"Sync datas to server"}
                handlePress={() => handleSyncData()}
                containerStyle={"w-48 h-8 !rounded-sm  !mx-0 !ml-6"}
                textStyle={"!text-sm !font-normal"}
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
