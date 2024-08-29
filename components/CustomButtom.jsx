import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButtom = ({ title, containerStyle, textStyle, handlePress }) => {
  return (
    <TouchableOpacity className={`bg-yellow-500  rounded-lg  flex justify-center items-center mx-8 ${containerStyle}`} onPress={handlePress}>
        <Text  className={`text-black text-lg font-semibold  ${textStyle}`}>{title}</Text>
        
    </TouchableOpacity>
  )
}

export default CustomButtom


