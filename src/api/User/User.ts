import {loginInstance} from "../../constants/api-url";

export const userAPI = {
  login: ({email, password}: {email: string, password: string}) => {
    return loginInstance.post('login', {
      email,
      password
    }).then((response: any) => {
      return response.data;
    })
  }
}

