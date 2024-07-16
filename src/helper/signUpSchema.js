import * as Yup from "yup";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const lowerCase = /^(?=.*[a-z])/;
const upperCase = /^(?=.*[A-Z])/;
const specialChar = /^(?=.*[!@#$%^&*])/;
const number = /^(?=.*\d)/;

export const signUpSchema = Yup.object({
  Category: Yup.string().required("Please select a category"),
  Name: Yup.string().min(4).max(20).required("Please enter your name"),
  Email: Yup.string()
    .email("Email must be a valid email")
    .required("Please enter your email")
    .test("email-exists", "This email is taken!", async function (value) {
      try {
        const { data } = await axios.post(`${baseURL}/api/check-email`, {
          email: value,
        });
        return !data;
      } catch (err) {
        console.log(err);
        return true;
      }
    }),
  Phone: Yup.string()
    .matches(/^01\d{9}$/, "Must start with 01 and exactly 11 digits")
    .required("Please enter your mobile number")
    .test(
      "Phone-exists",
      "This Phone Number is taken!",
      async function (value) {
        try {
          const { data } = await axios.post(`${baseURL}/api/check-phone`, {
            Phone: value,
          });
          return !data;
        } catch (err) {
          console.log(err);
          return true;
        }
      }
    ),
  Pin: Yup.string()
    .matches(/^\d{5}$/, "PIN must be exactly 5 digits")
    .required("Please enter your PIN number"),
  RepeatPin: Yup.string()
    .oneOf([Yup.ref("Pin"), null], "Pin didn't match")
    .required("Please confirm your Pin again"),
  AcceptTerms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

export const signInSchemaWithEmail = Yup.object({
  Email: Yup.string()
    .email("Email must be a valid email")
    .required("Please enter your email"),
  Pin: Yup.string()
    .matches(/^\d{5}$/, "PIN must be exactly 5 digits")
    .required("Please enter your PIN number"),
});

export const signInSchemaWithPhone = Yup.object({
  Pin: Yup.string()
    .matches(/^\d{5}$/, "PIN must be exactly 5 digits")
    .required("Please enter your PIN number"),
  Phone: Yup.string()
    .matches(/^01\d{9}$/, "Must start with 01 and exactly 11 digits")
    .required("Please enter your mobile number"),
});
