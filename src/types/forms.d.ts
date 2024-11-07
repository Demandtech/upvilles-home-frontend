export interface LoginFormState {
	email: string;
	password: string;
}

export interface SignupFormState {
	email: string;
	password: string;
	name: string;
	confirmPassword?: string;
	company?: string;
	phone?: string;
	termCondition?: boolean;
}

export interface AddPropertyFormState {
	street: string;
	description: string;
	attraction?: string;
	images?: File[] | undefined;
	title: string;
	location: string;
	description: string;
	property_type: string;
	unit_number: number;
}

export interface EditPropertyFormState {
	description: string;
	street: string;
	attraction?: string;
	images?: File[] | undefined;
	title: string;
	location: string;
	description: string;
	unit_number: number;
	images_url?: string[];
	property_type: string;
}

export interface TenantFormState {
	name: string;
	assigned_unit: string;
	assigned_property: string;
	phone: string;
	start_date: Date | string;
	end_date: Date | string;
}

export interface MaintenanceFormState {
	facility: string;
	maintenance_fee: number;
	technician: string;
	schedule_date: Date;
	status: "completed" | "overdue" | "schedule";
}
