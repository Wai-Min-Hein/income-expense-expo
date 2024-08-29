import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offLineDatas: [],
  
};


export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        copyOffLineDatas:(state, action) => {
            state.offLineDatas=action.payload
        },
        addOffLineData: (state, action) => {
            state.offLineDatas.push(action.payload)
        },
        deleteOffLineData: (state, action) => {
            state.offLineDatas = state.offLineDatas.filter(data => data._id!== action.payload._id)
        },
        clearOfflineData: (state, action) => {
            state.offLineDatas = []
        }
       
    }
})

export const {addOffLineData, deleteOffLineData,copyOffLineDatas,clearOfflineData} = dataSlice.actions;


export default dataSlice.reducer