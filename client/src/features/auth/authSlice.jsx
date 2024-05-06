import {createSlice} from '@reduxjs/toolkit'
//create a slice
const authSlice=createSlice({
   name: 'auth',
    initialState: {
        username:null,
        accessToken:null, //intial state
        id:null,
        location:null
    },
    reducers: { //reducers keep the credentials after login
        setCredentials:(state,action)=>{
            const {username,accessToken,id,location}=action.payload
            state.username=username;
            state.accessToken=accessToken;
            state.id=id;
            state.location=location;
        },
        logout:(state,action)=>{ //logout state
            state.username=null;
            state.accessToken=null;
        }
    }
})

export const {setCredentials,logout}=authSlice.actions;
export default authSlice.reducer

export const selectCurrentUser = (state) =>state?.auth?.username //export the current user  information after login
export const selectCurrentToken = (state) =>state?.auth?.accessToken //export the current user access token after login
export const selectCurrentLocation = (state) =>state?.auth?.location