import Container from "../components/shared/Container";
import { formatDateTime } from "../helper/helperFunction";
import useAuth from "../hooks/useAuth";
import { FaLock } from "react-icons/fa";

const Profile = () => {
  const { userDetails } = useAuth();

  return (
    <Container>
      <div className=" flex flex-col gap-6 mt-14">
        <div className="card  w-full lg:w-1/2 mx-auto bg-base-100 shadow-xl rounded-md">
          <div className="card-body flex items-center ">
            <h2 className="card-title text-2xl md:text-3xl">Profile Details</h2>
          </div>
        </div>
        <form>
          <div className="card bg-base-200 card-compact my-8  lg:w-1/2 mx-auto shadow-xl rounded-md p-5">
            {/* Email section */}
            <div className=" card-body grid grid-cols-3 px-5 items-center gap-4 ">
              <h3>Your Email:</h3>
              <div className="relative col-span-2">
                <input
                  name="email"
                  readOnly
                  type="text"
                  placeholder={userDetails.email}
                  className="input input-md w-full max-w-xs  "
                />
                <FaLock className="text-lg absolute left-44 md:left-64 top-3" />
              </div>
            </div>

            {/* Mobile section */}
            <div className=" card-body grid grid-cols-3 px-5 items-center gap-4 ">
              <h3>Your Mobile Number:</h3>
              <div className="relative col-span-2">
                <input
                  name="mobile"
                  readOnly
                  type="text"
                  placeholder={userDetails.mobile}
                  className="input input-md w-full max-w-xs  "
                />
                <FaLock className="text-lg absolute left-44 md:left-64 top-3" />
              </div>
            </div>

            {/* Registered Date section */}
            <div className=" card-body grid grid-cols-3 px-5 items-center gap-4 ">
              <h3>Registerd At:</h3>
              <div className="relative col-span-2">
                <input
                  name="email"
                  readOnly
                  type="text"
                  placeholder={formatDateTime(userDetails.createTime)}
                  className="input input-md w-full max-w-xs  "
                />
                <FaLock className="text-lg absolute left-44 md:left-64 top-3" />
              </div>
            </div>

            {/* Name section */}
            <div className=" card-body grid grid-cols-3 px-5 items-center gap-4 ">
              <h3>Name:</h3>
              <div className="relative col-span-2">
                <input
                  name="name"
                  readOnly
                  type="text"
                  placeholder={userDetails.name}
                  className="input input-md w-full max-w-xs  "
                />
                <FaLock className="text-lg absolute left-44 md:left-64 top-3" />
              </div>
            </div>

            {/* Balance section */}
            <div className=" card-body grid grid-cols-3 px-5 items-center gap-4 ">
              <h3>Balance:</h3>
              <div className="relative col-span-2">
                <input
                  name="balance"
                  readOnly
                  type="text"
                  placeholder={userDetails.balance}
                  className="input input-md w-full max-w-xs  "
                />
                <FaLock className="text-lg absolute left-44 md:left-64 top-3" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Profile;
