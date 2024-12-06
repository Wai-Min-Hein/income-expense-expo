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
import React, { useEffect, useMemo, useState } from "react";
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
  const [syncBtnLoading, setSyncBtnLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { offLineDatas } = useSelector((state) => state.data);

  

  const [type, setType] = useState('all')

  const handleFilterType = (type) => {
    setType(type)

  }

  const filteredData = useMemo(() => {
    if (type === "all") return offLineDatas; // No filtering
    return offLineDatas.filter((data) => data.type === type); // Replace 'type' with the actual property in your data
  }, [type, offLineDatas]);


  const dispatch = useDispatch();

  const [datas, setDatas] = useState([]);


  const incomeDatas = filteredData?.filter((data) => data.type == "Income");
  const expenseDatas = filteredData?.filter((data) => data.type == "Expense");

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
        "https://expospendtracker.vercel.app/api/data"
      );

      const allData = res.data.data;
      const currentUserData = allData.filter(
        (data) => data.userId == currentUser._id
      );
      setDatas(currentUserData);

      offLineDatas.length==0 && dispatch(copyOffLineDatas(currentUserData))
    } catch (error) {
      console.log(error);
    }
  };

  

// change server datas to offlinedata after login for the first time -- start

  useEffect(() => {
    fetchAllData();
    // offLineDatas.length==0 && dispatch(copyOffLineDatas(datas)) ;
  }, []);
// change server datas to offlinedata after login for the first time -- end 


  

  const addOfflineToDBDatas = offLineDatas.filter(
    (data) => !data._id
  );


  // Extract the _id values from offlinedata array
  const offlineIds = offLineDatas.map((item) => item._id);

  // Filter datas array to include only items whose _id is not present in offlineIds
  const toDeleteDatasFromDb = datas.filter(
    (item) => !offlineIds.includes(item._id)
  );


  const handleSyncData = async () => {


    setSyncBtnLoading(true);
  
    
  
    // No data to sync
    if (addOfflineToDBDatas.length === 0 && toDeleteDatasFromDb.length === 0) {
      dispatch(copyOffLineDatas(datas));
      setSyncBtnLoading(false);
      Alert.alert("Up to Date.");
      return;
    }
  
    // Upload data to the server
    const syncOfflineData = async () => {
      for (let i = 0; i < addOfflineToDBDatas.length; i++) {
        try {
          await axios.post("https://expospendtracker.vercel.app/api/data", addOfflineToDBDatas[i]);
          console.log("Data uploaded successfully:", addOfflineToDBDatas[i]);
  
          if (i === addOfflineToDBDatas.length - 1) {
            Alert.alert("Data sync to server success.");
          }
        } catch (error) {
          console.error("Failed to upload data:", error);
          Alert.alert("Failed to sync offline data!");
          break;
        }
      }
    };
  
    // Delete data from the server
    const syncDeletedData = async () => {
      for (let i = 0; i < toDeleteDatasFromDb.length; i++) {
        try {

          console.log("toDeleteDatasFromDb[i]._id: ",toDeleteDatasFromDb[i]._id);
          await axios.post(`https://expospendtracker.vercel.app/api/data/delete/${toDeleteDatasFromDb[i]._id}`);
  
          if (i === toDeleteDatasFromDb.length - 1) {
            Alert.alert("Data delete success.");
          }
        } catch (error) {
          console.error("Failed to delete data:", error);
          Alert.alert("Failed to sync deleted data!");
          break;
        }
      }
    };
  
    // Perform syncing operations
    try {
      if (addOfflineToDBDatas.length > 0) {
        await syncOfflineData();
      }
      if (toDeleteDatasFromDb.length > 0) {
        await syncDeletedData();
      }
    } finally {
      // Fetch latest data after sync finish
      fetchAllData();
      setSyncBtnLoading(false);
    }
  };
  

  const handleDelete = async (item) => {
    try {
      console.log('deleted items: ', item);
      dispatch(deleteOffLineData(item));

      Alert.alert("Delete Success!");

    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    dispatch(logOutStart());

    try {
      const res = await axios.post(
        "https://expospendtracker.vercel.app/api/auth/logout"
      );
      Alert.alert("Logout Success!");
      dispatch(clearOfflineData())
      dispatch(logOutSuccess());
      router.push("sign-in");
    } catch (error) {
      console.log(error);
      dispatch(logOutFailure());
    }
  };

  const handleAddNew = () => {
    router.push("new");
  };



  return (
    <ScrollView>
      <View className="pb-8 pt-4 relative h-screen">
        <View className="flex flex-row justify-end items-center">
          <Image
            source={images.profile}
            className="w-10 h-8"
            resizeMode="contain"
          />

          <Text className="text-xl font-semibold text-center">
            {currentUser?.userName}
          </Text>

          <CustomButtom
            title={"Logout"}
            handlePress={handleLogout}
            containerStyle={"w-16 h-8 !rounded-sm"}
            textStyle={"!text-sm !font-normal"}
          />
        </View>

        <Text className="text-xl font-semibold text-center">
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
          <TouchableOpacity onPress={() => handleFilterType('all')}>
            <Text className={`text-lg font-semibold px-3 py-[2px] rounded-md ${type=='all'? 'bg-green-400': ''}`}>All</Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={() => handleFilterType('Income')}>
            <Text className={`text-lg font-semibold px-3 py-[2px] rounded-md ${type=='Income'? 'bg-green-400': ''}`}>Income</Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={() => handleFilterType('Expense')}>
            <Text className={`text-lg font-semibold px-3 py-[2px] rounded-md ${type=='Expense'? 'bg-green-400': ''}`}>Expense</Text>
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
              data={filteredData}
              keyExtractor={(item) =>
                item._id ? item._id.toString() : item.offlineId.toString()
              }
              renderItem={({ item }) => (
                <View className="flex flex-row   justify-start   my-2  ">
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
                <View className="py-2">
                  <Text className='text-lg'>No Data. Create new.</Text>
                </View>
              )}
            />

            <CustomButtom
              className="flex-1  py-2 w-24 fixed bottom-0"
              title={"Sync datas"}
              handlePress={() => handleSyncData()}
              containerStyle={"w-32 h-8 !rounded-sm  !mx-0"}
              textStyle={"!text-sm !font-normal !text-white"}
              btnLoading={syncBtnLoading}
            />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default home;
