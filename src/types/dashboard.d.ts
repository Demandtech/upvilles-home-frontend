export interface UserType {
  _id: number;
  name: string;
  email: string;
  company: string;
  image_url: string | null;
  phone: string | null;
  role: "USER" | "ADMIN";
  updatedAt: string;
  createdAt: string;
  verifiedAt: string | null;
}

export interface StatsType {
  total_properties: number;
  empty_units: number;
  occupied_units: number;
}

export interface PropertyType {
  name: string;
  address: string;
  description: string;
  id: number;
}

export type PropertyListType = PropertyType[] | [];

export interface AccountSliceProps {
  user: UserType | null;
  properties: PropertyListType;
  propertyDetails: PropertyType | null;
  stats: Stats | null;
}
