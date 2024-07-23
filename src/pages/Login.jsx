import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth.jsx";
import useData from "../hooks/useData.jsx";
import PageHelmet from "../components/shared/PageHelmet.jsx";
import LogoWithTitle from "../components/shared/join_login/LogoWithTitle.jsx";
import Container from "../components/shared/Container.jsx";

import { FaLongArrowAltLeft } from "react-icons/fa";
import WithEmailButton from "../components/shared/join_login/WithEmailButton.jsx";
import WithPhoneButton from "../components/shared/join_login/WithPhoneButton.jsx";

import FormWithEmailPIN from "../components/shared/join_login/FormWithEmailPIN.jsx";
import FormWithPhonePin from "../components/shared/join_login/FormWithPhonePin.jsx";

const Login = () => {
  const [choosePhone, setChoosePhone] = useState(false);
  const [chooseEmail, setChooseEmail] = useState(false);

  const { logOutSuccess, setLogOutSuccess } = useAuth();
  const { setToastMsg } = useData();

  const [showPin, setShowPin] = useState(false);

  // Log Out success Toast
  useEffect(() => {
    if (logOutSuccess) {
      setToastMsg("Log out successfull  !");
      setLogOutSuccess(false);
    }
  }, [logOutSuccess]);

  // Handle choose Phone
  const handleChoosePhone = () => {
    setChooseEmail(false);
    setChoosePhone(true);
  };

  // Handle choose Email
  const handleChooseEmail = () => {
    setChooseEmail(true);
    setChoosePhone(false);
  };

  // Handle Back Button
  const handleBackButton = () => {
    setChooseEmail(false);
    setChoosePhone(false);
  };

  return (
    <>
      <PageHelmet pageName="Login" />

      <Container nopad="true">
        <div className="hero  rounded-xl">
          <div className="hero-content  w-full flex-col flex-1 my-10 relative">
            {(choosePhone || chooseEmail) && (
              <button
                onClick={handleBackButton}
                className="btn dark:bg-gray-700 dark:hover:bg-gray-500 absolute flex items-center gap-2 left-4 text-prime top-0 md:top-10"
              >
                <FaLongArrowAltLeft className="text-2xl" /> <span>Back</span>
              </button>
            )}

            <LogoWithTitle title="Login Here" />
            <div className="card w-full max-w-lg shadow-2xl bg-base-100">
              {/* Buttons part */}
              {!chooseEmail && !choosePhone && (
                <div className="card-body">
                  <div className=" flex gap-7 flex-col justify-center">
                    {/* Login with google */}
                    <div onClick={handleChoosePhone} className="inline-block ">
                      <WithPhoneButton title="With Phone" />
                    </div>

                    {/* Login with GitHub */}
                    <div onClick={handleChooseEmail} className="inline-block ">
                      <WithEmailButton title="With Email" />
                    </div>
                  </div>
                </div>
              )}

              {/* form section with email and pin*/}
              {chooseEmail && (
                <FormWithEmailPIN showPin={showPin} setShowPin={setShowPin} />
              )}

              {/* form section with Phone and pin*/}
              {choosePhone && (
                <FormWithPhonePin showPin={showPin} setShowPin={setShowPin} />
              )}

              <div className="flex flex-col sm:flex-row justify-around mb-6">
                <label className="label  flex justify-center">
                  <span className="text-sm">Don't have an account?</span>
                  <Link
                    className="label-text-alt link link-hover text-blue-700 dark:text-blue-600 font-semibold ml-2"
                    to="/join"
                  >
                    Join Now
                  </Link>
                </label>
                <label className="label  flex justify-center">
                  <span className="text-sm">Forget PIN?</span>
                  <Link
                    className="label-text-alt link link-hover text-blue-700 dark:text-blue-600 font-semibold ml-2"
                    to="/reset-pin"
                  >
                    Reset Now
                  </Link>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* <GoToTopBtn /> */}
      </Container>
    </>
  );
};

export default Login;
