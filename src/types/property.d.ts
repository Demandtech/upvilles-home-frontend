export interface PropertyType {
	_id: string;
	street: string;
	description: string;
	attraction: string;
	images_url: string[];
	title: string;
	location: string;
	description: string;
	type: string;
	unit_number: string;
}

export type PropertyListType = PropertyType[] | [];

export interface AccountSliceProps {
	properties: PropertyListType;
	propertyDetails: PropertyType | null;
}
