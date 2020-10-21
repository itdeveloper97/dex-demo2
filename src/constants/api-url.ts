import * as axios from "axios";

export const loginInstance = axios.create({
  baseURL: 'https://reqres.in/api/'
})