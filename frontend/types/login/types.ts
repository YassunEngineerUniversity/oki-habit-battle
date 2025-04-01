export interface LoginState {
  email: string | undefined;
  password: string | undefined;
  errors?: {
    email: string[] | undefined;
    password: string[] | undefined;
  };
  message?: string;
  success?: boolean;
}