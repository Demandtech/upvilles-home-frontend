export interface MaintenanceType {
	_id: string;
	name: string;
	last_men_date: string;
	upcoming_date: string;
	assigned_techs: string;
	status: "completed" | "overdue" | "schedule";
}
