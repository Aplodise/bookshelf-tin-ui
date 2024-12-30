import axios from "axios";

const API_URL = "http://localhost:8080/";

const register = (
  login: string,
  password: string,
  firstName: string,
  lastName: string,
  role: string
) => {
  return axios.post(API_URL + "register", {
    firstName,
    lastName,
    login,
    password,
    role
  })
  .then((response) => {
    if(response.data.login){
        return {
            login: response.data.login,
            role: response.data.role,
            token: response.data.token
        };
    }
    return Promise.reject(new Error("Registration failed: Invalid response"));
  })
  .catch((error) => {
    return Promise.reject(new Error(error.response?.data?.message || "Registration failed"));
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
      return Promise.reject(new Error("Login failed: Invalid response"));
    })
    .catch((error) => {
        return Promise.reject(new Error(error.response?.data?.message || "Login failed"));
    });
};


export const AuthService = {
  register,
  login
};
