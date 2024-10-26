export interface UserType {
	first_name: string;
	last_name: string;
	email: string;
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
}
