export interface User {
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

export interface Stats {
	total_properties: number;
	total_tenants: number;
	empty_units: number;
	occupied_units: number;
}
