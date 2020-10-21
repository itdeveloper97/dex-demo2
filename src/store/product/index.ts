import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1 as uuid} from 'uuid';
import {InitialStateProductInterface, ProductInterface, RootProductStateInterface} from "./types";
import {PropertiesInterface} from "../property/types";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const initialState: InitialStateProductInterface  = {
  items: [
    {
      name: 'CASHES VALLEY LANE',
      price: 500000,
      image: 'https://www.nastol.com.ua/download.php?img=201705/2560x1600/nastol.com.ua-225408.jpg',
      dateOfChange: '01.11.18',
      description: '',
      properties: [],
      id: uuid()
    },
    {
      name: 'DURUN DURUN HOUSE',
      price: 1216000,
      image: 'https://im0-tub-ru.yandex.net/i?id=62b749f07493402e841e8f66bb4570ff&ref=rim&n=33&w=313&h=150',
      dateOfChange: '01.11.18',
      description: '',
      properties: [],
      id: uuid()
    },
    {
      name: 'Mercedes S550 4matic',
      price: 118000,
      image: 'https://img2.goodfon.ru/wallpaper/nbig/3/c3/2015-mercedes-benz-s-63-amg.jpg',
      dateOfChange: '31.10.18',
      description: 'Не следует, однако забывать, что начало повседневной работы по формированию позиции требуют определения и уточнения существенных финансовых и административных условий. Разнообразный и богатый опыт консультация с широким активом способствует подготовки и реализации существенных финансовых и административных условий. ',
      properties: [
        {
          property: {
            name: 'Цвет',
            label: 'Цвет',
            value: 'Цвет',
            type: 'Dropdown',
            id: uuid()
          },
          value: [
            {
              name: 'Белый',
              label: 'Белый',
              value: 'Белый',
            },
            {
              name: 'Черный',
              label: 'Черный',
              value: 'Черный'
            },
          ]
        }
      ],
      id: uuid()
    }
  ],
  order: 'asc'
}


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    add: {
      reducer: (state, {payload}: PayloadAction<ProductInterface>) => {
        state.items.push(payload)
      },
      prepare: ({name, price, image, description, properties}: { name: string, price: number, image: string, description: string, properties: any }) => {
        properties && properties.map((prop: PropertiesInterface): void => {
          if (Array.isArray(prop.value)) {
            prop.value = prop.value
              .map((
                val: string | {
                  label: string
                  name: string
                  value: string
                }): {
                label: string
                name: string
                value: string
              } => ({name: String(val), label: String(val), value: String(val)}))
          }
        });

        return {
          payload: {
            name,
            price,
            image,
            dateOfChange: new Date().toLocaleDateString(),
            description,
            properties,
            id: uuid()
          }
        }
      }
    },
    edit: {
      reducer: (state, {payload}: PayloadAction<ProductInterface>) => {
        const itemToEdit = state.items.find(item => item.id === payload.id);
        if (itemToEdit) {
          itemToEdit.name = payload.name
          itemToEdit.price = payload.price
          itemToEdit.image = payload.image
          itemToEdit.dateOfChange = payload.dateOfChange
          itemToEdit.description = payload.description
          itemToEdit.properties = payload.properties
          itemToEdit.id = payload.id
        }
      },
      prepare: ({name, price, image, description, properties, id}: ProductInterface) => {
        properties && properties.map((prop: PropertiesInterface): void => {
          if (Array.isArray(prop.value)) {
            prop.value
              .map((
                val: string | { label: string, name: string, value: string }
              ): { label: string, name: string, value: string } => {
                return typeof val === 'string'
                  ? {name: String(val), label: String(val), value: String(val)}
                  : val
              })
          }
        });

        return {
          payload: {
            name,
            price,
            image,
            dateOfChange: new Date().toLocaleDateString(),
            description,
            properties,
            id
          }
        }
      }
    },
    changeOrder: (state) => {
      state.order = state.order === 'asc' ? 'desc' : 'asc'
      state.items = state.items.sort((
        prev,
        next
      ) => {
        if (state.order === 'asc' && prev.name < next.name) return -1
        if (state.order === 'desc' && prev.name > next.name) return -1
        return 0;
      })
    },
    remove: (state, {payload}) => {
      const index = state.items.findIndex(item => item.id === payload.id);
      if (index !== -1) {
        state.items.splice(index, 1)
      }
    }
  },
  extraReducers: {}
})

export const {
  changeOrder: changeOrderProductActionCreator,
  remove: deleteProductActionCreator,
  add: addProductActionCreator,
  edit: editProductActionCreator
} = productSlice.actions

/*
  Hook useSelector for reducer product
 */
export const useProductSelector: TypedUseSelectorHook<RootProductStateInterface> = useSelector