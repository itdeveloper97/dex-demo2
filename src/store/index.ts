import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {propertySlice} from "./property";
import {useDispatch} from "react-redux";
import {authSlice} from "./auth";
import {productSlice} from "./product";


const reducer = {
  auth: authSlice.reducer,
  property: propertySlice.reducer,
  product: productSlice.reducer
}

const middleware = [
  ...getDefaultMiddleware()
]

export const store = configureStore({
  reducer,
  middleware
})


/*
  Hook useDispatch for this App
  AppDispatchType - type
  useAppDispatch - Hook
 */
export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()