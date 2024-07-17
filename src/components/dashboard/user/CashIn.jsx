import { useEffect, useState } from "react";
import TransactionFormat from "../shared/TransactionFormat";
import useAuth from "../../../hooks/useAuth";

const CashIn = () => {
  const { userDetails } = useAuth();
  const [charge, setCharge] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);
  const [amount, setAmount] = useState(0);

  // Set the Summary
  useEffect(() => {
    if (amount >= 50) {
      setFinalBalance(parseFloat(userDetails.balance) + parseFloat(amount));
    } else {
      setFinalBalance(0);
    }
  }, [amount]);

  return (
    <TransactionFormat
      pageTitle="Cash In"
      setAmount={setAmount}
      setFinalBalance={setFinalBalance}
      setCharge={setCharge}
      charge={charge}
      finalBalance={finalBalance}
    />
  );
};

export default CashIn;
