import {createAsyncThunk} from "@reduxjs/toolkit";
import {v1 as uuid} from "uuid"
import {PropertyInterface, RootPropertyStateInterface} from "./types";


export const addPropertyThunkCreator = createAsyncThunk<string,
  {
    name: string
    type: string
  },
  {
    state: RootPropertyStateInterface
    rejectWithValue: string
  }>(
  'property/addProperty',
  async (
    {
      name,
      type
    },
    {getState, rejectWithValue}
  ) => {
    return getState().property.items.every((el: PropertyInterface) => name.replace(/\s/g, '').toLowerCase() !== el.name.replace(/\s/g, '').toLowerCase())
      ? {name, type, label: name, value: name, id: uuid()}
      : rejectWithValue('Нельзя добавить существующее свойство')
  }
)