import {createSlice} from '@reduxjs/toolkit'

const initialState =  {
    loginStatus: localStorage.getItem('userId') != null,
    userId : localStorage.getItem('userId') || null,
    userName: localStorage.getItem('userName') || null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action) => {
            state.loginStatus = true;
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            localStorage.setItem('userId', action.payload.userId);
            localStorage.setItem('userName', action.payload.userName);
        },

        logout:(state) => {
            state.loginStatus = false;
            state.userId = null;
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
        }

    }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;