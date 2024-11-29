import { ImageUrl } from "./common";

export interface User {
	_id: string;
	name: string;
	email: string;
	company: string;
	image: ImageUrl;
	phone: string | null;
	role: "USER" | "ADMIN";
	updatedAt: string;
	createdAt: string;
	verifiedAt: string | null;
	unread_notifications: boolean;
	settings: Settings;
	current_support_session: {
		_id: string;
		active: boolean;
		admin: User;
		user: User;
	};
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

export interface Settings {
	notification: boolean;
	security_options: boolean;
	data_management: boolean;
	property_management: boolean;
	product_update: boolean;
}
