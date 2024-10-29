import { FC, useState, useEffect } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { Checkbox } from "@nextui-org/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../../../utils/schemas/auth";
import { useForm, yupResolver } from "../../../../configs/services";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../../svgs";
import { SignupFormState } from "../../../types/forms";
import { updateForm, resetForm } from "../../../redux/slices/forms/signup";
import { useSelector, useDispatch } from "react-redux";
import { persistor, RootState } from "../../../redux/store";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Cookies from "js-cookie";
import { setUser } from "../../../redux/slices/dashboard";

const SignupForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const formData = useSelector((state: RootState) => state.signup);
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: formData,
  });

  const watchedFields = watch();

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("Success", data);
      Cookies.set(
        "auth_token",
        JSON.stringify({
          access_token: data.data.access_token,
          refresh_token: data.data.refresh_token,
        })
      );
      persistor.purge();
      resetForm();
      reset();
      dispatch(setUser(data.data));
      navigate("/dashboard/properties");
    },
    onError: (error) => {
      console.log("Error: ", error);
    },
  });

  function submitForm(data: SignupFormState) {
    mutation.mutate(data);
  }

  useEffect(() => {
    Object.entries(watchedFields).forEach(([key, value]) => {
      dispatch(updateForm({ field: key as keyof typeof formData, value }));
    });
  }, [watchedFields, dispatch]);

  return (
    <form className="space-y-10 mt-10" onSubmit={handleSubmit(submitForm)}>
      <div>
        <div className="grid gap-y-5 gap-x-3 sm:grid-cols-2">
          <Input
            label="Full name"
            size="lg"
            placeholder="Enter your full name"
            name="name"
            required={true}
            register={register}
            error={errors.name?.message}
            type="text"
          />
          <Input
            label="Email Address"
            size="lg"
            placeholder="Enter your your email"
            name="email"
            required={true}
            register={register}
            error={errors.email?.message}
            type="text"
          />
          <Input
            label="Phone number"
            size="lg"
            placeholder="Enter your your phone number"
            name="phone"
            required={false}
            register={register}
            error={errors.phone?.message}
            type="text"
          />
          <Input
            label="Company name"
            size="lg"
            placeholder="Enter company name"
            name="company"
            required={false}
            register={register}
            error={errors.company?.message}
            type="text"
          />
          <Input
            name="password"
            label="Password"
            size="lg"
            placeholder="Create a password"
            required={true}
            register={register}
            error={errors.password?.message}
            type={showPassword.password ? "text" : "password"}
            endContent={
              <Button
                className="bg-transparent rounded-full"
                size="sm"
                type="button"
                isIconOnly
                onPress={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    password: !prev.password,
                  }))
                }
              >
                {showPassword.password ? (
                  <EyeSlashFilledIcon />
                ) : (
                  <EyeFilledIcon />
                )}
              </Button>
            }
          />
          <Input
            name="confirmPassword"
            label="Confirm password"
            size="lg"
            placeholder="Re-enter your password"
            required={true}
            register={register}
            error={errors.confirmPassword?.message}
            type={showPassword.confirmPassword ? "text" : "password"}
            endContent={
              <Button
                className="bg-transparent rounded-full"
                size="sm"
                type="button"
                isIconOnly
                onPress={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }
              >
                {showPassword.confirmPassword ? (
                  <EyeSlashFilledIcon />
                ) : (
                  <EyeFilledIcon />
                )}
              </Button>
            }
          />
        </div>
        <div className="mt-3">
          <Checkbox
            classNames={{
              base: "border-none",
              icon: "text-white",
              wrapper: "bg-white/80",
            }}
            className="border-none"
            color="primary"
            {...register("termCondition")}
            isInvalid={!!errors.termCondition?.message}
          >
            <div className="text-white/80">
              I agree to the Terms of
              <Link className="underline text-white" to="#">
                {" "}
                Service{" "}
              </Link>
              and
              <Link className="underline text-white" to="#">
                {" "}
                Privacy Policy
              </Link>
            </div>
          </Checkbox>
          {errors.termCondition && (
            <p className="text-xs text-danger">
              {errors.termCondition.message}
            </p>
          )}
        </div>
      </div>
      <Button
        isLoading={mutation.isPending}
        size="lg"
        className="w-full text-default bg-white"
        type="submit"
      >
        Sign up
      </Button>
    </form>
  );
};

export default SignupForm;
