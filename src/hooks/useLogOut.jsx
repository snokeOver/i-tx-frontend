import useAuth from "./useAuth";
import useData from "./useData";

const useLogOut = () => {
  const { setToastMsg, setPageLoading } = useData();
  const { logOut, setUser, setUserDetails } = useAuth();

  const userLogOut = async () => {
    setPageLoading(true);
    try {
      const result = await logOut();
      setToastMsg("suc Log Out Success");
      setUser(null);
      setUserDetails({});
    } catch (err) {
      console.error("Log out error:", err.message);
      setToastMsg("err Log Out Failed");
    } finally {
      setPageLoading(false);
    }
  };

  return userLogOut;
};

export default useLogOut;
