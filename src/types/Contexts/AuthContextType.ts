import { LoginModel } from "../Auths/auth";

export interface AuthContextType {
    isAuthenticated: boolean;
    isCompleted: boolean;
    login: (model: LoginModel) => Promise<void | string>;
    logout: () => void;
  }