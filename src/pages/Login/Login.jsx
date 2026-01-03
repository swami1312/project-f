import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  CustomFormInput,
  CustomMultiSelect,
} from "../../components/Inputs/Inputs";
import { Button } from "../../components/Buttons/Buttons";
import useRouteInformation from "../../Hooks/useRouteInformation";

/* =========================
   Validation Schema
========================= */
const loginSchema = Yup.object({
  role: Yup.string().required("Please select role"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

/* =========================
   Static Dropdown Data
========================= */
const roleOptions = [
  { id: "ADMIN1", name: "Admin1" },
  { id: "ADMIN2", name: "Admin2" },
  { id: "USER", name: "User" },
];

const Login = () => {
  const { navigateToRoute } = useRouteInformation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      role: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    navigateToRoute("/");

    sessionStorage.setItem("loginCred", JSON.stringify(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F4EE] px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">ProfitPulse</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Role Dropdown */}
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <CustomMultiSelect
                label="Login As"
                items={roleOptions}
                keyValuePair={["id", "name"]}
                placeholder="Select role"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                errormsg={errors.role?.message}
                multiple={false}
                // direction={"column"}
                width="200px"
              />
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <CustomFormInput
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...field}
                errormsg={errors.email?.message}
                direction="col"
              />
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <CustomFormInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...field}
                errormsg={errors.password?.message}
                direction="col"
              />
            )}
          />

          {/* Forgot password */}
          {/* <div className="text-right">
            <button
              type="button"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Forgot password?
            </button>
          </div> */}

          {/* Submit */}
          <div className="flex justify-center">
            <Button text="Login" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
