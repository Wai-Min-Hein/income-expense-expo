import React from "react";
import { Stack } from "expo-router";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/store";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  
  return (
    <Provider store={store}>
      <PersistGate  persistor={persistor}>
      <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 , paddingTop: 0}}>
            <StatusBar translucent backgroundColor="transparent" /> 
            <Stack>
              <Stack.Screen
                name="index"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(home)" options={{ headerShown: false }} />
            </Stack>
          </SafeAreaView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;
