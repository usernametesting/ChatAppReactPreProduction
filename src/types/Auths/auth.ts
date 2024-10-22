
export interface Token {
    accessToken: string;
    expiration: Date;
    refreshToken: string;
  }
  
  export interface RegisterModel {
    email: string;
    password: string;
  }

  export interface LoginModel {
    email: string;
    password: string;
  }


  export interface ServiceResponse {
    message: string;
    resultObj: {};
    statusCode: number;
    success: boolean;
  }
 
  export interface ConfirmEmail {
    id?: string;
    token?:string;
  }