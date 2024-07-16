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
    userRequest: "",
  }); //Initially should be null

  // console.log(auth);
  // Register with email and password
  const register = (email, pass) => {
    return;
  };

  // Check if the token is present in the cookies

  // Login with email and Password
  const signIn = (email, pass) => {
    return;
  };

  // Register with Google
  const googleRegister = () => {
    return;
  };

  // Register with Github
  const githubRegister = () => {
    return;
  };

  // Update user Info
  const updateUser = (user, payLoad) => {
    return;
  };

  // Log out User
  const logOut = () => {
    return;
  };

  // Get Token and user details
  const getTokenAndUserDetils = async (currUser) => {
    const { data } = await nSAxios.post("/api/jwt", { uid: currUser.uid });
    if (data) {
      localStorage.setItem("access-token", data.token);

      setUserDetails(data.userDetails);
      setTokenSaved(true);
    }
  };
  // console.log(userDetails);

  //   Observe ther user change
  useEffect(() => {
    // const unSubscribe = onAuthStateChanged(auth, async (currUser) => {
    //   if (currUser?.uid) {
    //     setUser(currUser);
    //     getTokenAndUserDetils(currUser);
    //   } else {
    //     localStorage.removeItem("access-token");
    //     setTokenSaved(false);
    //     logOut();
    //   }

    //   setLoading(false);
    // });
    setLoading(false);
    // return () => unSubscribe();
  }, []);

  const authItems = {
    user,
    setUser,
    register,
    loading,
    setLoading,
    signIn,
    logOut,
    updateUser,
    googleRegister,
    githubRegister,
    regiSuccess,
    setRegiSuccess,
    tokenSaved,
    setTokenSaved,
    userDetails,
    setUserDetails,
    getTokenAndUserDetils,
  };
  return (
    <AuthContext.Provider value={authItems}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
