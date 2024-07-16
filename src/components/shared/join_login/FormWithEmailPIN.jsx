import { useFormik } from "formik";
import { signInSchemaWithEmail } from "../../../helper/signUpSchema";
import useData from "../../../hooks/useData";
import ActionButton from "../ActionButton";
import { BsEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const FormWithEmailPIN = ({ showPin, setShowPin }) => {
  const { setActnBtnLoading, setToastMsg } = useData();
  const { userLogin } = useAuth();
  const navigate = useNavigate();

  // Initial values for the form and formik
  const initialValues = {
    Email: "",
    Pin: "",
  };

  // Handle the sign in process(email-password based) using formik and validation schema design with yup
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signInSchemaWithEmail,

    onSubmit: async (values, action) => {
      setActnBtnLoading(true);
      try {
        const response = await userLogin(values);
        if (response.res === "Login Success") {
          setToastMsg("suc Login Successful  !");
          navigate("/");
          setActnBtnLoading(false);
        }
      } catch (err) {
        setToastMsg("err Wrong Credential  !");
        setActnBtnLoading(false);
      } finally {
        action.resetForm();
      }
    },
  });
  return (
    <form className="card-body" onSubmit={formik.handleSubmit}>
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
          <span className="text-red-500 mt-2">{formik.errors.Email}</span>
        )}
      </div>

      {/* PIN part */}
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
            type={showPin ? "number" : "password"}
            placeholder="* * * * * * * * * * * *"
            className="grow placeholder-gray-400 text-sm"
          />
          <span
            className="absolute right-5 top-[3.5rem]"
            onClick={() => setShowPin(!showPin)}
          >
            {showPin ? (
              <BsEyeSlashFill className="text-2xl cursor-pointer text-primary" />
            ) : (
              <BsFillEyeFill className="text-2xl cursor-pointer text-primary" />
            )}
          </span>
        </label>
        {formik.errors.Pin && formik.touched.Pin && (
          <span className="text-red-500 mt-2">{formik.errors.Pin}</span>
        )}
      </div>

      <div className="form-control mt-6">
        <ActionButton buttonText="Login" />
      </div>
    </form>
  );
};

export default FormWithEmailPIN;
