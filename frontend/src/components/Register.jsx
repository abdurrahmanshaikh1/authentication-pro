import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../config/axiosInstance";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../features/AuthSlice";

const Register = ({setToggle}) => {
  const { register, handleSubmit, formState: { errors } , reset } = useForm();
  const navigate = useNavigate()
  const dispatch = useDispatch();


  const onSubmit = async (data) => {
  try {
    const res = await axiosInstance.post("auth/register", data, {
      withCredentials: true
    });

    console.log("Register response:", res);

    if (res.status === 201) {
      alert("Registration successful! Please check your email to verify your account.");
      console.log("✅ 201 received — navigating now");
      navigate('/register-success');
    }

  } catch (error) {
    console.log("error in register api", error);
    alert(error.response?.data?.message || "Something went wrong");
  }
};


  return (
    <>
     <div className="w-full h-screen flex justify-center items-center bg-slate-950">
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-slate-900/80 text-white rounded-xl p-10 w-[400px] flex flex-col gap-6 shadow-2xl border border-slate-700"
  >
    <h1 className="text-3xl font-semibold text-center mb-2">Register</h1>

    {/* Username */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-200" htmlFor="name">
        name
      </label>
      <input
        className="border border-slate-600/70 bg-slate-800/80 rounded-md p-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
        placeholder="Enter your name"
        type="text"
        id="name"
        autoComplete="name"
        {...register("name", { required: "name is required" })}
      />
      {errors.name && (
        <p className="text-red-400 text-xs mt-1">
          {errors.name.message}
        </p>
      )}
    </div>

    {/* Email */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-200" htmlFor="email">
        Email
      </label>
      <input
        className="border border-slate-600/70 bg-slate-800/80 rounded-md p-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
        placeholder="Enter your email"
        type="email"
        id="email"
        autoComplete="username"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Enter a valid email",
          },
        })}
      />
      {errors.email && (
        <p className="text-red-400 text-xs mt-1">
          {errors.email.message}
        </p>
      )}
    </div>

    {/* Mobile */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-200" htmlFor="mobile">
        Mobile
      </label>
      <input
        className="border border-slate-600/70 bg-slate-800/80 rounded-md p-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
        placeholder="Enter your mobile number"
        type="text"
        id="mobile"
        {...register("mobile", {
          required: "Mobile number is required",
          minLength: { value: 10, message: "Minimum 10 digits" },
        })}
      />
      {errors.mobile && (
        <p className="text-red-400 text-xs mt-1">
          {errors.mobile.message}
        </p>
      )}
    </div>

    {/* Password */}
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-200" htmlFor="password">
        Password
      </label>
      <input
        className="border border-slate-600/70 bg-slate-800/80 rounded-md p-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
        placeholder="Enter your password"
        type="password"
        id="password"
        autoComplete="new-password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Minimum 6 characters" },
        })}
      />
      {errors.password && (
        <p className="text-red-400 text-xs mt-1">
          {errors.password.message}
        </p>
      )}
    </div>

    {/* Button */}
    <button
      type="submit"
      className="text-lg mt-3 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 transition-colors text-white py-2 rounded-md cursor-pointer w-full shadow-md"
    >
      Register
    </button>

    <div className="text-sm text-slate-300 text-center mt-1">
      <p>
        Already have an account{" "}
        <span
          onClick={() => setToggle((prev) => !prev)}
          className="text-cyan-400 hover:text-cyan-300 cursor-pointer font-medium"
        >
          Login here
        </span>
      </p>
    </div>
  </form>
</div>

    </>
  );
};

export default Register;
