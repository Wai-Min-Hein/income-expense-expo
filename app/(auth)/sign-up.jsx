import { View, Text, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButtom'
import { router } from 'expo-router'
import axios from 'axios'
import { useSelector } from 'react-redux'


const SignUp = () => {

  const {currentUser} = useSelector(state => state.user)
  const [form,setForm] = useState({
    userName: '',
    email: '',
    password: ''
  })

  const handlePress = async() => {

    try {
      const res = await axios.post("https://income-expense-utqh.onrender.com/api/auth/signup", form);
      Alert.alert("Sign up successful");
      router.push('sign-in')
      
    } catch (error) {

      Alert.alert(error?.message);
      console.log(error);
      
    }
  }

  useEffect(() => {
    if (currentUser) {
      router.push("home");
    }
  },[])


  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text className='text-center text-2xl font-semibold'>Sign Up Page</Text>
          <FormField   handlePress={(e) => setForm({...form, userName: e})} title={'Name'} placeholder={'Your Name'}/>

          <FormField  handlePress={(e) => setForm({...form, email: e})} title={'Email'} placeholder={'Your Email'}/>
          <FormField  handlePress={(e) => setForm({...form, password: e})} title={'Password'} placeholder={'Your Password'} style={'mt-4'}/>
          <CustomButton title={'Sign Up'} containerStyle={'h-12 mt-4'} handlePress={handlePress}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp