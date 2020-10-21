import {PropertiesInterface} from "../property/types";

export interface ProductInterface {
  name: string
  price: number
  image: string
  dateOfChange: string
  description: string
  properties: PropertiesInterface[]
  id: string
}

export interface InitialStateProductInterface {
  items: ProductInterface[]
  order: 'asc' | 'desc'
}

export interface RootProductStateInterface {
  product: InitialStateProductInterface
}