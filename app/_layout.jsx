import React from "react";
import { Stack } from "expo-router";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/store";

const RootLayout = () => {
  
  return (
    <Provider store={store}>
      <PersistGate  persistor={persistor}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack>
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;
