import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [mounte, setMounte] = useState(false)
  useEffect(() => {
    setMounte(prev => !prev)
  }, [])

  useEffect(() => {
    // Only navigate if currentUser exists
    if (mounte && currentUser) {
      router.push("home"); // Use replace to avoid going back to login
    }
  }, [currentUser, mounte,router]); 


  return (
    <>
      {!currentUser && (
        <Stack
        screenOptions={{
          headerShown: false
        }}
        >
          <Stack.Screen
            name="sign-in"
          ></Stack.Screen>

          <Stack.Screen
            name="sign-up"
          ></Stack.Screen>
        </Stack>
      )}

{currentUser && (
        
        router.push('home')
      )}
    </>
  );
};

export default AuthLayout;
