export interface LoginFormState {
  email: string;
  password: string;
}

export interface SignupFormState {
  email: string;
  password: string;
  name: string;
  confirmPassword?: string;
  company?: string;
  phone?: string;
  termCondition?: boolean;
}

export interface ManagePropertyFormState {
  street: string;
  description: string;
  attraction?: string[];
  images?: File[] | undefined;
  title: string;
  location: string;
  description: string;
  property_type: string;
  unit_number: number;
}
