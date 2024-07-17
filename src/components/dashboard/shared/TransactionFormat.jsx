import InitialTxStructure from "../shared/InitialTxStructure";
import { useFormik } from "formik";
import {
  cashInSchema,
  cashOutSchema,
  sendMoneySchema,
} from "../../../helper/formValidation";
import useData from "../../../hooks/useData";
import useAuth from "../../../hooks/useAuth";
import ActionButton from "../../shared/ActionButton";
import { useEffect, useState } from "react";
import { BsEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import usePostData from "../../../hooks/usePostData";
import { FaCheck } from "react-icons/fa6";
import { formatDateTime } from "../../../helper/helperFunction";

const TransactionFormat = ({
  pageTitle,
  setAmount,
  setCharge,
  setFinalBalance,
  charge,
  finalBalance,
}) => {
  const { setActnBtnLoading } = useData();
  const { refetchUserDetails, userDetails } = useAuth();
  const [showPin, setShowPin] = useState(false);
  const makeCashOutIn = usePostData();

  const [openModal, setOpenModal] = useState(false);
  const [createdTx, setCreatedTx] = useState({});

  // console.log(amount);

  // Initial values for the form and formik
  const initialValues = {
    Amount: "",
    Pin: "",
  };

  useEffect(() => {
    if (pageTitle === "Send Money") initialValues.Recipient = "";
    else initialValues.AgentNumber = "";
  }, [pageTitle]);

  // Handle the Creating of a survey process using formik and validation schema design with yup
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema:
      pageTitle === "Send Money"
        ? sendMoneySchema
        : pageTitle === "Cash Out"
        ? cashOutSchema
        : cashInSchema,

    onSubmit: async (values, action) => {
      setActnBtnLoading(true);

      const payload = {
        ...values,
        ...userDetails,
        txType: pageTitle,
      };

      const title =
        pageTitle === "Send Money"
          ? "SendMoney"
          : pageTitle === "Cash Out"
          ? "CashOut"
          : "CashIn";

      const path =
        pageTitle === "Send Money"
          ? "create-send-money"
          : "create-cashout-cashin";

      const { savedTransaction } = await makeCashOutIn(
        title,
        path,
        payload,
        "noSkip",
        [path]
      );
      console.log(savedTransaction);
      setCreatedTx(savedTransaction);
      setOpenModal(true);
      action.resetForm();
    },
  });

  // Handle OkayButton
  const handleOkay = async () => {
    await refetchUserDetails(userDetails);
    setOpenModal(false);
    setCharge(0);
    setFinalBalance(0);
    setCreatedTx({});
  };

  return (
    <InitialTxStructure pageName={pageTitle} dashboard={true}>
      {/* Form section */}

      <div className="text-center flex-col max-w-sm mx-auto py-10 h-auto w-full border border-gray-300 dark:border-gray-700 rounded-xl p-7">
        <h3 className="text-xl text-prime mb-2">{pageTitle}</h3>
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

          {/* Agent number/ Recipient part */}
          {pageTitle === "Send Money" ? (
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">Recipient</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FaPhoneAlt />
                <input
                  onFocus={() => formik.setFieldTouched("Recipient", true)}
                  {...formik.getFieldProps("Recipient")}
                  type="text"
                  placeholder="01712345678"
                  className="grow placeholder-gray-400 text-sm"
                />
              </label>
              {formik.errors.Recipient && formik.touched.Recipient && (
                <div className="text-red-500 mt-2">
                  {formik.errors.Recipient}
                </div>
              )}
            </div>
          ) : (
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">
                  {pageTitle === "Send Money" ? "Recipient" : "Agent"}
                </span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <FaPhoneAlt />
                <input
                  onFocus={() => formik.setFieldTouched("AgentNumber", true)}
                  {...formik.getFieldProps("AgentNumber")}
                  type="text"
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
          )}

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
            <ActionButton buttonText={pageTitle} />
          </div>
        </form>
      </div>

      {/* Summary Part */}
      <div>
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
            <h4 className="text-right">After {pageTitle}:</h4>
            <h5 className="text-right">{finalBalance?.toFixed(2)}</h5>
          </div>
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

          <div className="w-[90%]  mx-auto mt-10">
            {/* Summary Part */}
            <div className="border min-w-2xl border-gray-300 dark:border-gray-700 rounded-xl p-7 flex flex-col gap-3 mx-auto">
              <h2 className="text-center text-prime text-xl flex items-center gap-2 justify-center">
                <FaCheck className="text-3xl text-green-500" />
                <span>{pageTitle} Created !</span>
              </h2>
              <div className="grid grid-cols-3 gap-5">
                <h4 className="text-right">Agent :</h4>
                <h5 className="col-span-2 items-center flex justify-end">
                  {createdTx?.agentNumber}
                </h5>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <h4 className="text-right">Tx Id :</h4>
                <h5 className="col-span-2 items-center flex justify-end">
                  {createdTx?._id}
                </h5>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <h4 className="text-right">Time :</h4>
                <h5 className="col-span-2 items-center flex justify-end">
                  {formatDateTime(createdTx?.createdAt)}
                </h5>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <h4 className="text-right">Status :</h4>
                <h5 className="text-right col-span-2">{createdTx?.status}</h5>
              </div>
              <div className="grid grid-cols-3 gap-5 mt-5">
                <h4 className="text-right">Amount :</h4>
                <h5 className="col-span-2 items-center flex justify-end">
                  <TbCurrencyTaka className="text-xl" />
                  <span>{createdTx?.amount?.toFixed(2)}</span>
                </h5>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <h4 className="text-right">Charge :</h4>
                <h5 className="col-span-2 items-center flex justify-end">
                  <TbCurrencyTaka className="text-xl" />
                  <span>{charge?.toFixed(2)}</span>
                </h5>
              </div>
              <div className="grid grid-cols-3 gap-5 border-t border-gray-300 dark:border-gray-700 pt-1">
                <h4 className="text-right">Balance :</h4>
                <h5 className="col-span-2 items-center flex justify-end">
                  <TbCurrencyTaka className="text-xl" />
                  <span>
                    {pageTitle === "Cash Out"
                      ? (
                          userDetails?.balance -
                          createdTx?.amount -
                          createdTx?.charge
                        ).toFixed(2)
                      : (
                          userDetails?.balance -
                          createdTx.amount -
                          createdTx.charge
                        ).toFixed(2)}
                  </span>
                </h5>
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

export default TransactionFormat;
