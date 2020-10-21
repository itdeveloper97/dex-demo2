export interface PropertyInterface {
  name: string;
  type: string;
  label: string;
  value: string;
  id: string;
}

export interface PropertiesInterface {
  property: PropertyInterface
  value: string | DropDown[]
}

export interface DropDown {
  name: string
  value: string
  label: string
}

export interface InitialStatePropertyInterface {
  items: PropertyInterface[]
  order: 'asc' | 'desc'
}


export interface RootPropertyStateInterface {
  property: InitialStatePropertyInterface
}