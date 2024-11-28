import { ImageUrl } from "./common";

export interface PropertyType {
	_id: string;
	street: string;
	description: string;
	attraction: string;
	images: string[];
	title: string;
	location: string;
	description: string;
	type: string;
	unit_number: string;
	available_units: number[];
	occupied_units: number[];
}

export type PropertyListType = PropertyType[] | [];

export interface AccountSliceProps {
	properties: PropertyListType;
	propertyDetails: PropertyType | null;
}
