import Cookies from "js-cookie";
import apiRoutes from "./apiRoutes";
import axiosInstance from "./axiosInstance";

interface ISignUpCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

interface ILoginCredentials {
  usernameOrEmail: string;
  password: string;
}

export const signUpUser = async (signUpCredentials: ISignUpCredentials) => {
  const response = await axiosInstance.post(
    apiRoutes.register,
    signUpCredentials,
  );
  return response;
};

export const loginUser = async (loginCredentials: ILoginCredentials) => {
  const response = await axiosInstance.post(apiRoutes.login, loginCredentials);
  return response;
};

export const logoutUser = async () => {
  const token = Cookies.get("token");
  const response = await axiosInstance.post(
    apiRoutes.logout,
    {},
    {
      headers: {
        Authorization: `sessionToken ${token}`,
      },
    },
  );

  return response;
};

