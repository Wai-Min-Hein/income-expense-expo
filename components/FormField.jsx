import { View, Text, TextInput } from "react-native";
import React from "react";

const FormField = ({
  title,
  placeholder,
  style,
  handlePress,
  value,
  editable,
  onFocus
}) => {
  return (
    <View className={`${style}`}>
      <Text>{title}</Text>

      <View>
        {title == "Amount" ? (
          <TextInput
            keyboardType="numeric"
            placeholder={placeholder}
            onChangeText={handlePress}
            className={`w-[90%] h-12 border border-black mx-auto rounded-xl px-4 `}
          />
        ) : (
          <TextInput
            editable
            placeholder={placeholder}
            value={value && value.toString()}
            onChangeText={handlePress}
            onFocus={onFocus}
            className={`w-[90%] h-12 border border-black mx-auto rounded-xl px-4 `}
          />
        )}
      </View>
    </View>
  );
};

export default FormField;
