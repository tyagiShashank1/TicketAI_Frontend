import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null
    },
    reducers:{
        addUser:function(state,action){
            state.user=action.payload;
        },
        removeUser:function(state){
            state.user=null;
        }
    }
})


export const {addUser, removeUser} = userSlice.actions;

export default userSlice.reducer;