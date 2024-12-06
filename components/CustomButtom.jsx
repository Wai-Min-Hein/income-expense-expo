import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButtom = ({ title, containerStyle, textStyle, handlePress, btnLoading=false }) => {
  return (
    <TouchableOpacity disabled={btnLoading} className={`${btnLoading? 'bg-red-500 opacity-80': 'bg-yellow-500'}  rounded-lg  flex justify-center items-center mx-8 ${containerStyle}`} onPress={handlePress}>
        <Text  className={`text-black text-lg font-semibold ${textStyle}`}>{
          btnLoading?'Loading...... ': title
          }</Text>
        
    </TouchableOpacity>
  )
}

export default CustomButtom


