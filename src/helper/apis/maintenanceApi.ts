import { AxiosResponse } from "axios";
import customAxios from "../../../configs/axios";
import { MaintenanceFormState } from "../../types/forms";

export const createMaintenance = async (
	newMaintenanceData: MaintenanceFormState
): Promise<AxiosResponse> => {
	let maintenanceFeeStr: string = newMaintenanceData.maintenance_fee;

	const maintenanceFeeNum = maintenanceFeeStr.replace(/,/g, "");

	newMaintenanceData.maintenance_fee = maintenanceFeeNum;

	const result = await customAxios(false).post(
		"/maintenances",
		newMaintenanceData
	);

	return result;
};

export const allMaintenances = async (
	page: number,
	sortBy: string,
	order: string,
	search: string,
	limit: number
) => {

	const params = new URLSearchParams();
    
	if (search) params.append("search", search);
	if (page !== undefined) params.append("page", page.toString());
	if (limit) params.append("limit", limit.toString());
	if (order) params.append("order", order.toString());
	if (sortBy) params.append("sortBy", sortBy);

	const maintenances = await customAxios(false).get(
		`/maintenances?${params.toString()}`
	);
	return maintenances;
};

export const singleMaintenance = async (maintenanceId: string) => {
	if (!maintenanceId) return;

	const maintenance = await customAxios(false).get(
		`/maintenances/${maintenanceId}`
	);

	return maintenance;
};

export const updateMaintenance = async (
	maintenanceId: string,
	updatedMaintenanceData: MaintenanceFormState
) => {
	if (!maintenanceId || !updatedMaintenanceData) return;

	let maintenanceFeeStr: string = updatedMaintenanceData.maintenance_fee;

	const maintenanceFeeNum = maintenanceFeeStr.replace(/,/g, "");

	updatedMaintenanceData.maintenance_fee = maintenanceFeeNum;

	const updatedMaintenance = await customAxios(false).put(
		`/maintenances/${maintenanceId}`,
		updatedMaintenanceData
	);

	return updatedMaintenance;
};

export const deleteMaintenance = async (maintenanceId: string) => {
	if (!maintenanceId) return;

	const deletedMaintenance = await customAxios(false).delete(
		`/maintenances/${maintenanceId}`
	);

	return deletedMaintenance;
};
