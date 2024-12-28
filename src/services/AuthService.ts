import axios from "axios";

const API_URL = "http://localhost:8080/";

const register = (
  firstName: string,
  lastName: string,
  login: string,
  password: string
) => {
  return axios.post(API_URL + "register", {
    firstName,
    lastName,
    login,
    password,
  });
};

const login = (login: string, password: string) => {
  return axios
    .post(API_URL + "login", {
      login,
      password,
    })
    .then((response) => {
      if (response.data.login) {
        return {
            login: response.data.login,
            role: response.data.role,
            token: response.data.token
          };
      }
      throw new Error("Login failed");
    });
};


export const AuthService = {
  register,
  login
};
