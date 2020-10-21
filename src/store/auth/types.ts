export interface InitialStateAuthInterface {
  isAuth: boolean
  token: string
}

export interface RootAuthStateInterface {
  auth: InitialStateAuthInterface
}