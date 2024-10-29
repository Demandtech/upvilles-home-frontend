import { useSelector } from "react-redux";
import Snackbar from "./Snackbar";
import { RootState } from "../../../redux/store";

const SnackbarContainer = () => {
	const { toast } = useSelector((state: RootState) => state.app);
	return (
		<div>
			<Snackbar message={toast.message} />
		</div>
	);
};

export default SnackbarContainer;
