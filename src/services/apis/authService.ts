import { RegisterModel, LoginModel, ServiceResponse, Token, ConfirmEmail } from '../../types/Auths/auth';
import { setCookie } from '../internals/Cookies/setCookie';
import { getCookie } from '../internals/Cookies/getCookie';
import axiosInstance from './axiosInstances/axiosInstance';

export const registerUser = async (model: RegisterModel): Promise<ServiceResponse> => {

  try {

    const response = await axiosInstance.post<ServiceResponse>('account/register', model);
    return response.data;

  } catch (error: any) {
    if (error.response)
      return error.response.data;
    else {
      return error;
    }
  }
};



export const loginUser = async (model: LoginModel): Promise<ServiceResponse> => {
  try {

    const response = await axiosInstance.post<ServiceResponse>('account/login', model);
    console.log(response)
    if (response?.data?.success) {

      const { accessToken, refreshToken, expiration } = response.data.resultObj as Token;
      const expires = new Date(expiration);
      setCookie('accessToken', accessToken, { expires });
      setCookie('refreshToken', refreshToken);
    }
    return response.data;

  } catch (error: any) {
    if (error.response)
      return error.response.data;
    else {
      return error;
    }
  }
};


export const confirmEmail = async (model: ConfirmEmail): Promise<ServiceResponse> => {
  try {


    const response = await axiosInstance.post<ServiceResponse>('account/ConfirmGmail', model);
    if (!(response?.data?.success))
      window.location.href = '/register';
    return response.data;

  } catch (error: any) {
    if (error.response)
      return error.response.data;
    else {
      return error;
    }
  }
};



export const refreshAccessToken = async (): Promise<ServiceResponse> => {
  const refreshToken = getCookie('refreshToken');
  if (!refreshToken)
    throw new Error('No refresh token available');

  try {
    const response = await axiosInstance.post('/account/refreshtoken', { refreshToken });



    if (response.data.success) {
      const { accessToken, expiration, refreshToken } = response.data.resultObj;
      const expires = new Date(expiration);

      setCookie('accessToken', accessToken, { expires });
      setCookie('refreshToken', refreshToken);
    }

    return response.data;

  } catch (error: any) {

    if (error.response)
      return error.response.data;
    else {
      console.error('Login error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};


