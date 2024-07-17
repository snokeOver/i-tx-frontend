import * as Yup from "yup";
import axios from "axios";

const CASH_OUT_CHARGE = 1.015;
const SEND_MONEY_CHARGE = 5;
const baseURL = import.meta.env.VITE_BASE_URL;
const userDetails = JSON.parse(localStorage.getItem("user"));

const MIN_AMOUNT = 50;
const MAX_AMOUNT = 25000;
const MOBILE_REGEX = /^01\d{9}$/;
const PIN_REGEX = /^\d{5}$/;
const MIN_AMOUNT_MESSAGE = `Minimum Amount ${MIN_AMOUNT} Taka`;
const MAX_AMOUNT_MESSAGE = `Maximum Amount ${MAX_AMOUNT} Taka`;
const MOBILE_ERROR_MESSAGE = "Must start with 01 and exactly 11 digits";
const PIN_ERROR_MESSAGE = "PIN must be exactly 5 digits";

const validateAmountForCashOutIn = async (value) => {
  try {
    const { data } = await axios.post(`${baseURL}/api/check-user-balance`, {
      amount: (value * CASH_OUT_CHARGE).toFixed(2),
      mobile: userDetails.mobile,
    });
    return !data;
  } catch (err) {
    console.log(err);
    return true;
  }
};
const validateAmountForSendMoney = async (value) => {
  try {
    const initAmount = parseFloat(value);
    const finalAmount =
      initAmount > 100
        ? (initAmount + SEND_MONEY_CHARGE).toFixed(2)
        : initAmount.toFixed(2);

    const { data } = await axios.post(`${baseURL}/api/check-user-balance`, {
      amount: finalAmount,
      mobile: userDetails.mobile,
    });
    return !data;
  } catch (err) {
    console.log(err);
    return true;
  }
};

const validateAgentNumber = async (value) => {
  try {
    const { data } = await axios.post(`${baseURL}/api/check-agent-status`, {
      agentNumber: value,
    });
    return !data;
  } catch (err) {
    console.log(err);
    return true;
  }
};

const validateRecipientNumber = async (value) => {
  if (userDetails.mobile === value) return false;
  try {
    const { data } = await axios.post(`${baseURL}/api/check-recipient-status`, {
      userNumber: value,
    });
    return !data;
  } catch (err) {
    console.log(err);
    return true;
  }
};

const amountSchemaForCashOut = Yup.number()
  .min(MIN_AMOUNT, MIN_AMOUNT_MESSAGE)
  .max(MAX_AMOUNT, MAX_AMOUNT_MESSAGE)
  .required("Please enter amount")
  .test("balance-check", "Insufficient Balance!", validateAmountForCashOutIn);

const amountSchemaForCashIn = Yup.number()
  .min(MIN_AMOUNT, MIN_AMOUNT_MESSAGE)
  .max(MAX_AMOUNT, MAX_AMOUNT_MESSAGE)
  .required("Please enter amount");

const amountSchemaForSendMoney = Yup.number()
  .min(MIN_AMOUNT, MIN_AMOUNT_MESSAGE)
  .max(MAX_AMOUNT, MAX_AMOUNT_MESSAGE)
  .required("Please enter amount")
  .test("balance-check", "Insufficient Balance!", validateAmountForSendMoney);

const pinSchema = Yup.string()
  .matches(PIN_REGEX, PIN_ERROR_MESSAGE)
  .required("Please enter your PIN number");

// Form Validation for creating cash out transaction request
export const cashOutSchema = Yup.object({
  Amount: amountSchemaForCashOut,
  AgentNumber: Yup.string()
    .matches(MOBILE_REGEX, MOBILE_ERROR_MESSAGE)
    .required("Please enter Agent number")
    .test("agent-check", "Invalid Agent Number!", validateAgentNumber),
  Pin: pinSchema,
});

// Form Validation for creating cash in transaction request
export const cashInSchema = Yup.object({
  Amount: amountSchemaForCashIn,
  AgentNumber: Yup.string()
    .matches(MOBILE_REGEX, MOBILE_ERROR_MESSAGE)
    .required("Please enter Agent number")
    .test("agent-check", "Invalid Agent Number!", validateAgentNumber),
  Pin: pinSchema,
});

// Form Validation for creating send money transaction
export const sendMoneySchema = Yup.object({
  Amount: amountSchemaForSendMoney,
  Recipient: Yup.string()
    .matches(MOBILE_REGEX, MOBILE_ERROR_MESSAGE)
    .required("Please enter Recipient number")
    .test(
      "recipient-check",
      "Invalid Recipient Number!",
      validateRecipientNumber
    ),
  Pin: pinSchema,
});
