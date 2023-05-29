import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../app/features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../app/features/auth/authSlice";

type FormValues = {
  fullname: string;
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerAuth, { isLoading, isError, error }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { email: "", password: "" } });

  useEffect(() => {
    if (isError) {
      setErrorMessage((error as any)?.data?.message);
    }
  }, [isError]);

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage("");
    }
  }, [watch("email"), watch("fullname"), watch("username"), watch("password")]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const registerResult = await registerAuth(data);
    console.log({ registerResult });
    if ("data" in registerResult) {
      dispatch(setCredentials({ ...registerResult.data }));
      navigate("/");
    }
  };

  return (
    <div className=" bg-[#fafafa] w-screen h-screen flex justify-center items-center">
      <div className="w-full flex flex-col gap-y-3 items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="contentContainer w-[20rem] flex flex-col text-center p-6 px-10 items-center justify-center gap-y-3"
        >
          <h1 className="text-3xl mb-6">Instagramr</h1>
          <input
            placeholder="Email"
            className={`input ${errors.email ? "inputError" : ""}`}
            type="email"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && <p className="error">email is required.</p>}

          <input
            placeholder="Fullname"
            className={`input ${errors.fullname ? "inputError" : ""}`}
            type="text"
            {...register("fullname", {
              required: true,
            })}
          />
          {errors.fullname && <p className="error">Fullname is required.</p>}
          <input
            placeholder="Username"
            className={`input ${errors.username ? "inputError" : ""}`}
            type="text"
            {...register("username", {
              required: true,
            })}
          />
          {errors.username && <p className="error">username is required.</p>}

          <input
            type="password"
            placeholder="Password"
            className={`input ${errors.password ? "inputError" : ""}`}
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password?.type === "required" && (
            <p className="error">password is required.</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="error">password minimum is 6.</p>
          )}
          <button className="w-full text-white font-semibold bg-blue-500 rounded-md p-1 mt-3 overflow-hidden flex justify-center items-center">
            {isLoading && (
              <div className="w-4 h-4 m-1 border-2 border-r-transparent rounded-full animate-spin" />
            )}
            {!isLoading && "Sign Up"}
          </button>

          {isError && <p className="error">{errorMessage}</p>}
        </form>

        <div className="contentContainer w-[20rem] p-4 px-10 ">
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-blue-500 font-semibold">Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
