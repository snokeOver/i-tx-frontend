import { createContext, useEffect, useState } from "react";

import useAxios from "../hooks/useAxios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const nSAxios = useAxios();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [regiSuccess, setRegiSuccess] = useState(false);
  const [tokenSaved, setTokenSaved] = useState(false);

  const [userDetails, setUserDetails] = useState({
    userRole: "",
    status: "",
  }); //Initially should be null

  // Log out User
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access-token");
    setUserDetails({
      userRole: "",
      status: "",
    });
  };

  // Get Token and user details
  const userLogin = async (payload) => {
    const { data } = await nSAxios.post("/api/login", payload);
    if (data) {
      setUserDetails(data.user);
      localStorage.setItem("access-token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setTokenSaved(true);
      return { res: "Login Success", user: data.user };
    } else {
      setTokenSaved(false);
      logOut();
      return { res: "Login Failed" };
    }
  };
  // console.log(userDetails);

  // Refetch user Data
  const refetchUserDetails = async (payload) => {
    const { data } = await nSAxios.post("/api/refetch-user", payload);
    if (data) {
      setUserDetails(data.user);
      localStorage.setItem("access-token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setTokenSaved(true);
      setLoading(false);
    }
  };

  //   Observe the user change
  useEffect(() => {
    setLoading(true);

    const user = localStorage.getItem("user");

    if (user) refetchUserDetails(JSON.parse(user));
    else {
      logOut();
      setLoading(false);
    }
  }, []);

  const authItems = {
    user,
    setUser,
    loading,
    setLoading,
    logOut,
    regiSuccess,
    setRegiSuccess,
    tokenSaved,
    setTokenSaved,
    userDetails,
    setUserDetails,
    userLogin,
    refetchUserDetails,
  };
  return (
    <AuthContext.Provider value={authItems}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
