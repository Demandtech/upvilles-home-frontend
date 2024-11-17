import { useNavigate } from "react-router-dom";
import { SuccessIcon } from "../../components/svgs";
import Button from "../../components/ui/Button";

function VerifyEmail() {
	const navigate = useNavigate();
	return (
		<div className="mt-12">
			<div className="flex flex-col items-center mb-10">
				<SuccessIcon />

				<h5 className="font-semibold font-lg py-4">Successful!</h5>
				<p>You email verification is successful, you can continue</p>
			</div>
			<div className="flex justify-center w-full">
				<Button
					onClick={() => navigate("/dashboard/properties")}
					size="lg"
					className="w-full max-w-sm text-default bg-white"
					type="submit"
				>
					Continue to Dashboard
				</Button>
			</div>
		</div>
	);
}

export default VerifyEmail;
