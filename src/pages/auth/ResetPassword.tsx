import ResetPasswordForm from "../../components/auth/reset-password/ResetPasswordForm";

const ResetPassword = () => {
	function submitForm() {}
	return (
		<div>
			<ResetPasswordForm submitForm={submitForm} />
		</div>
	);
};

export default ResetPassword;
