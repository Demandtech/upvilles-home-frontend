export interface LoginFormState {
  email: string;
  password: string;
}

export interface SignupFormState {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  company?: string;
  phone?: string;
  termCondition: boolean;
}
