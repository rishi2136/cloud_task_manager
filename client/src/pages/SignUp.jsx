import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { setCredentials } from "../redux/slices/authSlice";
import Loader from "../components/Loader";

const SignUp = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const location = useLocation();

  const navigate = useNavigate();
  //login method and isLoading function to identify the process
  const dispatch = useDispatch();

  const submitHandler = async (data) => {
    try {
      await addNewUser(data).unwrap();
      //   dispatch(setCredentials(result));
      toast.success("You need to login now!");
      //   <Navigate to="/log-in" state={{ from: location }} replace />;
      navigate("/log-in");
    } catch (error) {
      console.log(error.message);
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        {/* left side */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base bordergray-300 text-gray-600">
              Manage all your task in one place!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span>Cloud-Based</span>
              <span>Task Manager</span>
            </p>

            <div className="cell">
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
          >
            <div className="">
              <p className="text-blue-600 text-3xl font-bold text-center">
                Admin SignUp Window
              </p>
              <p className="text-center text-base text-gray-700 ">
                Keep all your credential safe.
              </p>
            </div>

            <div className="flex flex-col gap-y-5">
              <Textbox
                placeholder="Full name"
                type="text"
                name="name"
                label="Full Name"
                className="w-full rounded-full"
                register={register("name", {
                  required: "Full name is required!",
                })}
                error={errors.name ? errors.name.message : ""}
              />
              <Textbox
                placeholder="Title"
                type="text"
                name="title"
                label="Title"
                className="w-full rounded-full"
                register={register("title", {
                  required: "Title is required!",
                })}
                error={errors.title ? errors.title.message : ""}
              />
              <Textbox
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded-full"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder="your password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />

              <Textbox
                placeholder="Role"
                type="text"
                name="role"
                label="Role"
                className="w-full rounded-full"
                register={register("role", {
                  required: "User role is required!",
                })}
                error={errors.role ? errors.role.message : ""}
              />

              <div className="mt-2">
                <label className="block font-semibold">Admin Access</label>
                <div>
                  <label htmlFor="admin-yes" className="mr-4">
                    <input
                      {...register("isAdmin")}
                      type="radio"
                      value="true"
                      id="admin-yes"
                      className="mr-1"
                    />
                    Yes (Admin)
                  </label>

                  <label htmlFor="admin-no">
                    <input
                      {...register("isAdmin")}
                      type="radio"
                      value="false"
                      id="admin-no"
                      className="mr-1"
                    />
                    No (Normal User)
                  </label>
                </div>
              </div>

              {isLoading ? (
                <Loader />
              ) : (
                <Button
                  type="submit"
                  label="Submit"
                  className="w-full h-10 bg-blue-700 text-white rounded-full"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
