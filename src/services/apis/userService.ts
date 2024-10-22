import { ServiceResponse } from '../../types/Auths/auth';
import { MessageDTO } from '../../types/Messages/Message';
import axiosInstance from './axiosInstances/axiosInstance';
import axiosFormInstance from './axiosInstances/axiosFormInstance';

export const getUser = async (userId: string) => {
  const response = await axiosInstance.get(`/users/${userId}`);
  return response.data;
};

export const getCurrentlyUser = async () => {
  const response = await axiosInstance.get(`/user/GetCurrentlyUser`);
  return response.data;
};
export const getAllUsers = async (): Promise<ServiceResponse> => {
  const response = await axiosInstance.get(`/user/GetUserWithMessages`);
  return response?.data;
};

export const sendMessage = async (Message: MessageDTO): Promise<ServiceResponse> => {
  const response = await axiosInstance.post(`/user/PostMessage`, Message);
  return response?.data;
};

export const sendFile = async (form: FormData): Promise<ServiceResponse> => {
  const response = await axiosFormInstance.post('/user/PostFile', form);
  return response.data;
};



export const sendStatus = async (form: FormData): Promise<ServiceResponse> => {
  const response = await axiosFormInstance.post('/user/PostStatus', form);
  return response.data;
};

export const changeMessageState = async (userId: number): Promise<ServiceResponse> => {
  console.log("change message state");
  const response = await axiosInstance.post(`/user/ChangedMessageState`, userId);
  console.log(response);
  return response.data;
};
export const createUser = async (userData: any) => {
  const response = await axiosInstance.post('/users', userData);
  return response.data;
};

export const updateUser = async (userId: string, userData: any) => {
  const response = await axiosInstance.put(`/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosInstance.delete(`/users/${userId}`);
  return response.data;
};

export const changeUserImage = async (formData: FormData) => {
  const response = await axiosFormInstance.post('/user/ChangeUserImage', formData);
  return response.data;
};

export const addContact = async (email: string) => {
  const response = await axiosInstance.post<ServiceResponse>('/user/AddContact', email);
  return response.data;
};

export const deleteContact = async (id: number) => {
  const response = await axiosInstance.post<ServiceResponse>('/user/DeleteContact', id);
  return response.data;
};


export const logout = async () => {
  const response = await axiosInstance.post<ServiceResponse>('/user/Logout');
  return response.data;
};

export const updateUserbiografyService = async (biografy: string) => {
  const response = await axiosInstance.post<ServiceResponse>('/user/UpdateUserBio', biografy);
  return response.data;
};

export const deleteStatusService = async (id: number) => {
  const response = await axiosInstance.post<ServiceResponse>('/user/DeleteStatus', id);
  return response.data;
};

export const deleteMessageService = async (msgId: number, userId: number) => {
  const response = await axiosInstance.post<ServiceResponse>('/user/DeleteMesssage', { msgId, userId });
  return response.data;
};

export const TellBeingFocusedToUser = async (id: number) => {
  const response = await axiosInstance.post<ServiceResponse>('/user/TellBeingFocusedToUser', id);
  return response.data;
};

export const addWathcerToStatusService = async (statusId: number,userId:number) => {
  const response = await axiosInstance.post<ServiceResponse>('/user/AddWathcerToStatus', {statusId,userId});
  return response.data;
};