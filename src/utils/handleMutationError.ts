import { AxiosError } from "axios";
import { toast } from "../../configs/services";

const handleError = (error: AxiosError) => {
	toast.error(
		error.response?.data
			? (error.response.data as { message: string }).message
			: "An error occurred, please try again"
	);
};

export default handleError;
