import { createContext, useState } from "react";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const siteName = "i-Tx";
  const siteLogo = "/logo.svg";
  const [pageLoading, setPageLoading] = useState(false);
  const [gBtnLoading, setGBtnLoading] = useState(false);
  const [gitBtnLoading, setGitBtnLoading] = useState(false);
  const [actnBtnLoading, setActnBtnLoading] = useState(false);
  const [currAmount, setCurrAmount] = useState(0);
  const [currPlan, setCurrPlan] = useState("");
  const [toggle, setToggle] = useState(false);

  const defaultTheme = "dark";

  const [currTheme, setCurrTheme] = useState(defaultTheme);
  const [toastMsg, setToastMsg] = useState("");

  const surveyCategories = [
    "Customer Satisfaction",
    "Employee Engagement",
    "Market Research",
    "Product Feedback",
    "Event Feedback",
    "Brand Awareness",
    "User Experience",
    "Service Quality",
  ];

  const dataItems = {
    currTheme,
    setCurrTheme,
    pageLoading,
    setPageLoading,
    siteName,
    siteLogo,
    toastMsg,
    setToastMsg,

    gitBtnLoading,
    gBtnLoading,
    actnBtnLoading,
    setGBtnLoading,
    setGitBtnLoading,
    setActnBtnLoading,
    surveyCategories,
    currAmount,
    setCurrAmount,
    currPlan,
    setCurrPlan,
    toggle,
    setToggle,
  };

  return (
    <DataContext.Provider value={dataItems}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
