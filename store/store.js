import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import userSlice from '../Slices/userSlice';
import dataSlice from '../Slices/dataSlice';

const persistConfig = {
  key: 'root',
  storage: storage,

};


const rootReducer =  combineReducers({
    user: userSlice,
    data: dataSlice,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});
export const persistor = persistStore(store);