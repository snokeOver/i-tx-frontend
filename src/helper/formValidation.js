import * as Yup from "yup";
import axios from "axios";

const CASH_OUT_CHARGE = 1.015;
const baseURL = import.meta.env.VITE_BASE_URL;
const userDetails = JSON.parse(localStorage.getItem("user"));

// Form Validation for survery form creating a survey---------- Updated
export const cashOutSchema = Yup.object({
  Amount: Yup.number()
    .min(50, "Minimum Amount 50 Taka")
    .max(25000, "Minimum Amount 25000 Taka")
    .required("Please enter Cash Out amount")
    .test("balance-check", "Insufficient Balance!", async function (value) {
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
    }),
  AgentNumber: Yup.string()
    .matches(/^01\d{9}$/, "Must start with 01 and exactly 11 digits")
    .required("Please enter Agent number")
    .test("agent-check", "Invalid Agent Number!", async function (value) {
      try {
        const { data } = await axios.post(`${baseURL}/api/check-agent-status`, {
          agentNumber: value,
        });
        return !data;
      } catch (err) {
        console.log(err);
        return true;
      }
    }),
  Pin: Yup.string()
    .matches(/^\d{5}$/, "PIN must be exactly 5 digits")
    .required("Please enter your PIN number"),
});
