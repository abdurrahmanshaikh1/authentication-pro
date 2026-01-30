import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../features/AuthSlice";
import { useNavigate } from "react-router";
import { axiosInstance } from "../config/axiosInstance";

const Login = ({ setToggle }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log("Submitting login data:", data);
        try {
            let res = await axiosInstance.post("auth/login", data, {
                withCredentials: true
            });
            if (res) {
                console.log(res.data.user)
                dispatch(setUser(res.data.user))

                localStorage.setItem("user", JSON.stringify(res.data.user))
                
            }
            reset()
            alert('Login successfully')
            navigate('/home')
        } catch (error) {
            console.log("error in login api", error)
        }
    };

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center bg-slate-950">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-slate-900/80 text-white rounded-xl p-10 w-[400px] flex flex-col gap-6 shadow-2xl border border-slate-700"
                >
                    <h1 className="text-3xl font-semibold text-center mb-2">
                        Welcome Back
                    </h1>

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

                    {/* Password */}
                    <div className="flex flex-col gap-1">
                        <label
                            className="text-sm font-medium text-slate-200"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="border border-slate-600/70 bg-slate-800/80 rounded-md p-2 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                            placeholder="Enter your password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <button className="text-xl mt-2 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 transition-colors text-white py-2 rounded-md cursor-pointer w-full shadow-md">
                        Login
                    </button>

                    {/* Bottom text */}
                    <div className="text-center">
                        <p className="text-sm text-slate-300">
                            Don’t have an account?{" "}
                            <span
                                onClick={() => setToggle((prev) => !prev)}
                                className="text-yellow-300 underline cursor-pointer hover:text-yellow-200"
                            >
                                Register here
                            </span>
                        </p>
                    </div>
                </form>
            </div>

        </>
    );
};

export default Login;
