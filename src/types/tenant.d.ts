export interface TenantFormProps {
	name: string;
	assigned_unit: string;
	assigned_property: string;
	phone: string;
	start_date: Date | string;
	end_date: Date | string;
}

export interface Tenant {
	_id;
	name: string;
	assigned_unit: string;
	assigned_property: string;
	phone: string;
	start_date: Date | string;
	end_date: Date | string;
}
