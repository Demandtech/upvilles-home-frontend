import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { resetPasswordSchema } from "../../../utils/schemas/auth";
import { useForm, yupResolver } from "../../../../configs/services";
import { useState } from "react";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  function submitForm(data: { email: string }) {
    console.log(data);
    setIsLoading(true);
    navigate("/auth/login");
  }
  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col my-8 space-y-8 items-center w-full"
    >
      <div className="w-full space-y-5">
        <Input
          label="Email Address"
          size="lg"
          placeholder="Enter your your email"
          name="email"
          required={true}
          register={register}
          error={errors?.email?.message}
          type="text"
        />
        <Button
          size="lg"
          className="w-full bg-white text-default"
          type="submit"
          isLoading={isLoading}
        >
          Reset Password
        </Button>
      </div>
      <div>
        <Link className="underline" to="/auth/login">
          Back to Login
        </Link>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
