const url = import.meta.env.VITE_API_URL;
import axiosInstance from "../lib/axiosInstance";

export async function login(userDetails) {
  const response = await axiosInstance.post(
    `${url}/auth/login`,
    userDetails,
    {
      withCredentials: true,
    }
  );
  return response.data;
}
export async function signUp(userDetails) {
  const response = await axiosInstance.post(
    `${url}/auth/signup`,
    userDetails
  );
  return response.data;
}
export async function validateViaToken(userToken) {
  const response = await axiosInstance.post(`${url}/auth/validate`, {
    token: userToken,
  });

  return response.data;
}
