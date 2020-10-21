import {createSlice} from "@reduxjs/toolkit";
import {authThunkCreator} from "./thunk";
import {InitialStateAuthInterface, RootAuthStateInterface} from "./types";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const initialState: InitialStateAuthInterface = {
  isAuth: localStorage.isAuth || false,
  token: localStorage.token || ''
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [authThunkCreator.fulfilled.type]: (state, {payload}) => {
      state.isAuth = true;
      state.token = payload.token;

      localStorage.isAuth = true;
      localStorage.token = payload.token;
    },
    [authThunkCreator.rejected.type]: (state, action) => {
      return action;
    }
  }
})

export const useAuthSelector: TypedUseSelectorHook<RootAuthStateInterface> = useSelector