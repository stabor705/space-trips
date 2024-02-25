import {User} from "./user.model";

export enum ResponseType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export interface ResponseBase {
  type: ResponseType
}

export interface AuthResponse extends ResponseBase {
  message: string;
  accessToken?: string;
  refreshToken?: string;
  sessionId?: string;
  user?: User;
}
