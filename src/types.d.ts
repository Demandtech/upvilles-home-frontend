export interface UserType {
	first_name: string;
	last_name: string;
	email: string;
}

export interface PropertyType {
	name: string;
}

export type PropertyListType = PropertyType[] | [];

export interface AccountSliceProps {
	user: UserType | null;
	properties: PropertyType[] | [];
	propertyDetails: PropertyType | null;
}
