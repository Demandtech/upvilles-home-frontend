import { PropertyType } from "./property";

export interface Tenant {
  _id;
  name: string;
  assigned_unit: string;
  assigned_property: PropertyType;
  phone: string;
  start_date: string | Date;
  end_date: string | Date;
  rent_paid: number;
  balance: number;
}
