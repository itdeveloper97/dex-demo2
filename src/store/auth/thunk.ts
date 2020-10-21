import {createAsyncThunk} from "@reduxjs/toolkit";
import {userAPI} from "../../api/User/User";


export const authThunkCreator = createAsyncThunk<string, {email: string, password: string}>
(
  'auth/setAuth',
  ({email, password}) => {
    return userAPI.login({email, password})
  }
)