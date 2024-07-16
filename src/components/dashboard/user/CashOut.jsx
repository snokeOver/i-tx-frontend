import InitialTxStructure from "../shared/InitialTxStructure";
import { useFormik } from "formik";
import { cashOutSchema } from "../../../helper/formValidation";
import useData from "../../../hooks/useData";
import useAuth from "../../../hooks/useAuth";
import ActionButton from "../../shared/ActionButton";
import { useEffect, useState } from "react";
import { BsEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import usePostData from "../../../hooks/usePostData";
import { useNavigate } from "react-router-dom";

const CashOut = () => {
  const { setActnBtnLoading } = useData();
  const { refetchUserDetails, userDetails } = useAuth();
  const [showPin, setShowPin] = useState(false);
  const makeCashOut = usePostData();
  const [charge, setCharge] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  // console.log(amount);

  // Initial values for the form and formik
  const initialValues = {
    AgentNumber: "",
    Amount: "",
    Pin: "",
  };

  // Handle the Creating of a survey process using formik and validation schema design with yup
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: cashOutSchema,

    onSubmit: async (values, action) => {
      setActnBtnLoading(true);

      const payload = {
        ...values,
        ...userDetails,
      };

      await makeCashOut("CashOut", "create-cashout", payload, "noSkip", [
        "create-cashout",
      ]);
      setOpenModal(true);

      action.resetForm();
    },
  });

  // Set the Summary
  useEffect(() => {
    if (amount >= 50) {
      setCharge(amount * 0.015);
      setFinalBalance(userDetails.balance - amount * 1.015);
    } else {
      setCharge(0);
      setFinalBalance(0);
    }
  }, [amount]);

  // Handle OkayButton
  const handleOkay = async () => {
    await refetchUserDetails(userDetails);
    setOpenModal(false);
    navigate("/dashboard/cash-out");
  };

  return (
    <InitialTxStructure pageName="Cash Out" dashboard={true}>
      {/* Form section */}

      <div className="text-center flex-col max-w-sm mx-auto py-10 h-auto w-full border border-gray-300 dark:border-gray-700 rounded-xl p-7">
        <h3 className="text-xl text-prime mb-2">Cash Out</h3>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Amount part */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg">Amount</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <TbCurrencyTaka className="text-2xl" />
              <input
                {...formik.getFieldProps("Amount")}
                onChange={(e) => {
                  setAmount(e.target.value);
                  formik.setFieldValue("Amount", e.target.value);
                }}
                onFocus={() => formik.setFieldTouched("Amount", true)}
                type="text"
                placeholder="50 - 25000"
                className="grow placeholder-gray-400 text-sm"
              />
            </label>
            {formik.errors.Amount && formik.touched.Amount && (
              <div className="text-red-500 mt-2">{formik.errors.Amount}</div>
            )}
          </div>

          {/* Agent number part */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg">Agent Number</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FaPhoneAlt />
              <input
                {...formik.getFieldProps("AgentNumber")}
                onFocus={() => formik.setFieldTouched("AgentNumber", true)}
                type="text"
                // onChange={(e) => handleChange("agentNumber", e.target.value)}
                placeholder="01712345678"
                className="grow placeholder-gray-400 text-sm"
              />
            </label>
            {formik.errors.AgentNumber && formik.touched.AgentNumber && (
              <div className="text-red-500 mt-2">
                {formik.errors.AgentNumber}
              </div>
            )}
          </div>

          {/* PIN part */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text text-lg">PIN Number</span>
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

          <div className="form-control pt-4 md:w-[90%] mx-auto">
            <ActionButton buttonText="Cash Out" />
          </div>
        </form>
      </div>

      {/* Summary Part */}
      <div className="border min-w-2xl border-gray-300 dark:border-gray-700 rounded-xl p-7 flex flex-col gap-3 mx-auto">
        <h2 className="text-center text-prime text-xl">Summary</h2>
        <div className="grid grid-cols-2 gap-5">
          <h4 className="text-right">Current Balance:</h4>
          <h5 className="text-right">{userDetails?.balance?.toFixed(2)}</h5>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <h4 className="text-right">Charge:</h4>{" "}
          <h5 className="text-right">{charge?.toFixed(2)}</h5>
        </div>
        <div className="grid grid-cols-2 gap-5 border-t border-gray-300 dark:border-gray-700 pt-1">
          <h4 className="text-right">After Cash Out:</h4>
          <h5 className="text-right">{finalBalance?.toFixed(2)}</h5>
        </div>
      </div>

      {/* modal to Show Cash Out Summary */}
      <dialog className={`modal ${openModal ? "modal-open" : ""} `}>
        <div className="modal-box  bg-base-200 p-0 py-3">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => setOpenModal(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>

          <div className="w-[80%] xl:w-[70%] mx-auto mt-10">
            {/* Summary Part */}
            <div className="border min-w-2xl border-gray-300 dark:border-gray-700 rounded-xl p-7 flex flex-col gap-3 mx-auto">
              <h2 className="text-center text-prime text-xl">
                Cash Out Summary
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <h4 className="text-right">Agent Number:</h4>
                <h5 className="text-right">
                  {userDetails?.balance?.toFixed(2)}
                </h5>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <h4 className="text-right">Transaction Id:</h4>
                <h5 className="text-right">
                  {userDetails?.balance?.toFixed(2)}
                </h5>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <h4 className="text-right">Time & Date:</h4>
                <h5 className="text-right">
                  {userDetails?.balance?.toFixed(2)}
                </h5>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <h4 className="text-right">Current Status:</h4>
                <h5 className="text-right">
                  {userDetails?.balance?.toFixed(2)}
                </h5>
              </div>
              <div className="grid grid-cols-2 gap-5 mt-5">
                <h4 className="text-right">Cash Out Amount:</h4>
                <h5 className="text-right">
                  {userDetails?.balance?.toFixed(2)}
                </h5>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <h4 className="text-right">Charge:</h4>{" "}
                <h5 className="text-right">{charge?.toFixed(2)}</h5>
              </div>
              <div className="grid grid-cols-2 gap-5 border-t border-gray-300 dark:border-gray-700 pt-1">
                <h4 className="text-right">Balance:</h4>
                <h5 className="text-right">{finalBalance?.toFixed(2)}</h5>
              </div>
            </div>

            <div
              onClick={handleOkay}
              className="form-control mt-16 mb-5  mx-auto"
            >
              <ActionButton buttonText="Okay" />
            </div>
          </div>
        </div>
      </dialog>
    </InitialTxStructure>
  );
};

export default CashOut;
