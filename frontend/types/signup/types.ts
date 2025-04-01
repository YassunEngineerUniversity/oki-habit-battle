

export interface SignupState {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  errors?: {
    name: string[] | undefined;
    email: string[] | undefined;
    password: string[] | undefined;
  };
  message?: string;
  success?: boolean;
}