import { PropertyType } from "./property";

export interface Tenant {
	_id;
	name: string;
	assigned_unit: string;
	assigned_property: PropertyType;
	phone: string;
	start_date: Date | string;
	end_date: Date | string;
}
