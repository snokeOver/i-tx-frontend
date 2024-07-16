import { BsEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import useAuth from "../hooks/useAuth.jsx";
import useData from "../hooks/useData.jsx";

import PageHelmet from "../components/shared/PageHelmet.jsx";
import LogoWithTitle from "../components/shared/join_login/LogoWithTitle.jsx";
import ActionButton from "../components/shared/ActionButton.jsx";
import Container from "../components/shared/Container.jsx";
import { signUpSchema } from "../helper/signUpSchema.js";
import { FaPhoneAlt } from "react-icons/fa";
import useAxios from "../hooks/useAxios.jsx";

const Join = () => {
  const nsAxios = useAxios();
  const {
    register,
    updateUser,
    googleRegister,
    githubRegister,
    setRegiSuccess,
  } = useAuth();
  const {
    setToastMsg,
    setGBtnLoading,
    setGitBtnLoading,
    setActnBtnLoading,
    gitBtnLoading,
    gBtnLoading,
    actnBtnLoading,
  } = useData();
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [errMsg, setErrorMsg] = useState("");

  // Initial values for the form and formik
  const initialValues = {
    Category: "User",
    Name: "",
    Email: "",
    Phone: "",
    Pin: "",
    RepeatPin: "",
    AcceptTerms: false,
  };

  // handle Firebase error while registering
  const firebaseRegisterError = (err, email = "") => {
    if (err.code === "auth/email-already-in-use") {
      setErrorMsg(`"${email}" is already taken !`);
    } else if (err.code === "auth/invalid-email") {
      setErrorMsg(`"${email}" is invalid email !`);
    } else setErrorMsg(`err ${err.message}`);

    setActnBtnLoading(false);
    setGBtnLoading(false);
    setGitBtnLoading(false);
  };

  // Handle the sign up process(email-Pin based) using formik and validation schema design with yup
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,

    onSubmit: async (values, action) => {
      setActnBtnLoading(true);
      try {
        const { data } = await nsAxios.post("/api/create-user", values);
        if (data.savedUser) {
          setToastMsg("suc Joining Successful  !");
          navigate("/login");
        }
        setActnBtnLoading(false);
      } catch (err) {
        firebaseRegisterError(err, values.Email);
      } finally {
        action.resetForm();
      }
    },
  });

  return (
    <>
      <PageHelmet pageName="Join" />
      <Container nopad="true">
        <div className="hero  rounded-xl py-10">
          {/* form part */}
          <div className="hero-content  flex-1 w-full flex-col mt-16 md:mt-0">
            <LogoWithTitle title={"Join Here"} />

            <div className="card w-full max-w-lg shadow-2xl bg-base-100">
              {errMsg && (
                <p className="text-red-500 text-center dark:text-yellow-400 dark:font-light  my-3">
                  {errMsg}
                </p>
              )}

              <form className="card-body" onSubmit={formik.handleSubmit}>
                {/* Category part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Category <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    {...formik.getFieldProps("Category")}
                    onFocus={() => formik.setFieldTouched("Category", true)}
                    type="text"
                    className="select select-bordered w-full"
                  >
                    <option disabled value="">
                      Select a Category
                    </option>

                    <option value="User">User</option>
                    <option value="Agent">Agent</option>
                  </select>
                  {formik.errors.Category && formik.touched.Category && (
                    <div className="text-red-500 mt-2">
                      {formik.errors.Category}
                    </div>
                  )}
                </div>

                {/* Name part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Name <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      {...formik.getFieldProps("Name")}
                      onFocus={() => formik.setFieldTouched("Name", true)}
                      type="text"
                      id="name"
                      placeholder="name"
                      className="grow placeholder-gray-400 text-sm"
                    />
                  </label>
                  {formik.errors.Name && formik.touched.Name && (
                    <span className="text-red-500 mt-2">
                      {formik.errors.Name}
                    </span>
                  )}
                </div>

                {/* email part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Email <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      {...formik.getFieldProps("Email")}
                      onFocus={() => formik.setFieldTouched("Email", true)}
                      type="email"
                      id="email"
                      placeholder="name@domain.com"
                      className="grow placeholder-gray-400 text-sm"
                    />
                  </label>
                  {formik.errors.Email && formik.touched.Email && (
                    <span className="text-red-500 mt-2">
                      {formik.errors.Email}
                    </span>
                  )}
                </div>

                {/* Phone part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Phone Number <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <FaPhoneAlt />
                    <input
                      {...formik.getFieldProps("Phone")}
                      onFocus={() => formik.setFieldTouched("Phone", true)}
                      type="text"
                      placeholder="01723456789"
                      className="grow placeholder-gray-400 text-sm"
                    />
                  </label>
                  {formik.errors.Phone && formik.touched.Phone && (
                    <span className="text-red-500 mt-2">
                      {formik.errors.Phone}
                    </span>
                  )}
                </div>

                {/* Pin part */}
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text text-lg">
                      PIN Number <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      {...formik.getFieldProps("Pin")}
                      onFocus={() => formik.setFieldTouched("Pin", true)}
                      type={showPass ? "text" : "password"}
                      placeholder="* * * * * * * * * * * *"
                      className="grow placeholder-gray-400 text-sm"
                    />
                    <span
                      className="absolute right-5 top-[3.5rem]"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? (
                        <BsEyeSlashFill className="text-2xl cursor-pointer text-primary" />
                      ) : (
                        <BsFillEyeFill className="text-2xl cursor-pointer text-primary" />
                      )}
                    </span>
                  </label>
                  {formik.errors.Pin && formik.touched.Pin && (
                    <span className="text-red-500 mt-2">
                      {formik.errors.Pin}
                    </span>
                  )}
                </div>

                {/* Confirm Pin part */}
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text text-lg">
                      Confirm PIN
                      <span className="text-red-500"> *</span>
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      {...formik.getFieldProps("RepeatPin")}
                      onFocus={() => formik.setFieldTouched("RepeatPin", true)}
                      type={showPass ? "text" : "password"}
                      placeholder="* * * * * * * * * * * *"
                      className="grow placeholder-gray-400 text-sm"
                    />
                    <span
                      className="absolute right-5 top-[3.5rem]"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? (
                        <BsEyeSlashFill className="text-2xl cursor-pointer text-primary" />
                      ) : (
                        <BsFillEyeFill className="text-2xl cursor-pointer text-primary" />
                      )}
                    </span>
                  </label>
                  {formik.errors.RepeatPin && formik.touched.RepeatPin && (
                    <span className="text-red-500 mt-2">
                      {formik.errors.RepeatPin}
                    </span>
                  )}
                </div>

                {/* Checkbox for Accept Terms */}
                <div className="flex gap-2 mt-3">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    {...formik.getFieldProps("AcceptTerms")}
                    onChange={() => {
                      formik.setFieldValue(
                        "AcceptTerms",
                        !formik.values.AcceptTerms
                      );
                    }}
                    checked={formik.values.AcceptTerms}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="label-text-alt link link-hover"
                  >
                    Accept All Terms & Conditions
                  </label>
                </div>
                {formik.errors.AcceptTerms && formik.touched.AcceptTerms && (
                  <div className="text-red-500 mt-2">
                    {formik.errors.AcceptTerms}
                  </div>
                )}

                <div className="form-control mt-6">
                  <ActionButton buttonText="Join" disabledStat={false} />
                </div>
              </form>

              <label className="label  flex justify-center mb-5">
                <span className="text-sm mr-2">Already have an account?</span>
                <Link
                  className="label-text-alt link link-hover text-blue-700 dark:text-blue-600 font-semibold"
                  to="/login"
                >
                  Login Now
                </Link>
              </label>
            </div>
          </div>
        </div>

        {/* <GoToTopBtn /> */}
      </Container>
    </>
  );
};

export default Join;
