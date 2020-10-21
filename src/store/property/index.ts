import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1 as uuid} from 'uuid';
import {addPropertyThunkCreator} from "./thunk";
import Swal from "sweetalert2";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {InitialStatePropertyInterface, PropertyInterface, RootPropertyStateInterface} from "./types";


const initialState: InitialStatePropertyInterface = {
  items: [
    {
      name: 'Цвет',
      type: 'Dropdown',
      label: 'Цвет',
      value: 'Цвет',
      id: uuid()
    },
    {
      name: 'Год',
      type: 'Number',
      label: 'Год',
      value: 'Год',
      id: uuid()
    },
    {
      name: 'Мотор',
      type: 'String',
      label: 'Мотор',
      value: 'Мотор',
      id: uuid()
    }
  ],
  order: 'desc'
}


export const propertySlice = createSlice({
  name: 'property',
  initialState: initialState,
  reducers: {
    changeOrder: (state) => {
      state.order = state.order === 'asc' ? 'desc' : 'asc'
      state.items = state.items.sort((
        prev: PropertyInterface,
        next: PropertyInterface
      ): number => {
        if(state.order === 'asc' && prev.name < next.name) return -1
        if(state.order === 'desc' && prev.name > next.name) return -1
        return 0;
      })
    },
    remove: (state, {payload}: PayloadAction<{id: string}>) => {
      const index = state.items.findIndex((item: PropertyInterface) => item.id === payload.id);
      if (index !== -1) {
        state.items.splice(index, 1)
      }
    }
  },
  extraReducers: {
    [addPropertyThunkCreator.fulfilled.type]: (state, {payload}: PayloadAction<PropertyInterface>) => {
      state.items.push(payload);
    },
    [addPropertyThunkCreator.rejected.type]: (state, {payload}: PayloadAction<string>) => {
      Swal.fire({
        icon: "error",
        title: payload,
      })
    }
  }
})

export const {
  changeOrder: changeOrderPropertyActionCreator,
  remove: removePropertyActionCreator
} = propertySlice.actions


/*
  Hook useSelector for reducer property
 */
export const usePropertySelector: TypedUseSelectorHook<RootPropertyStateInterface> = useSelector


