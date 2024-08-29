import React, { useEffect } from "react";
import { Stack, router } from "expo-router";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const { currentUser } = useSelector((state) => state.user);


    
    currentUser &&  router.push("home");

    useEffect(() => {
      if (currentUser) {
        router.push("home");
      }
    }, [])

  return (
    <>
      {!currentUser && (
        
        <Stack>
          <Stack.Screen
            name="sign-in"
            options={{ headerShown: false }}
          ></Stack.Screen>

          <Stack.Screen
            name="sign-up"
            options={{ headerShown: false }}
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
