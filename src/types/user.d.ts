export interface User {
	_id: string;
	name: string;
	email: string;
	company: string;
	image_url: string | null;
	phone: string | null;
	role: "USER" | "ADMIN";
	updatedAt: string;
	createdAt: string;
	verifiedAt: string | null;
	unread_notifications: boolean;
	settings: Settings;
}

export interface Settings {
	notification: boolean | undefined;
	security_options: boolean | undefined;
	data_management: boolean | undefined;
	property_management: boolean | undefined;
	product_update: boolean | undefined;
}

export interface Stats {
	total_properties: number;
	total_tenants: number;
	empty_units: number;
	occupied_units: number;
	completed_maintenance: number;
	overdue_maintenance: number;
	schedule_maintenance: number;
	total_maintenance: number;
	total_maintenance_cost: number;
	occupancy_rate: string;
}
