import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import TransactionFormat from "../shared/TransactionFormat";

const CashOut = () => {
  const { userDetails } = useAuth();
  const [charge, setCharge] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);
  const [amount, setAmount] = useState(0);

  // Set the Summary
  useEffect(() => {
    if (amount >= 50) {
      setCharge(amount * 0.015);
      setFinalBalance(
        parseFloat(userDetails.balance) - parseFloat(amount) * 1.015
      );
    } else {
      setCharge(0);
      setFinalBalance(0);
    }
  }, [amount]);

  return (
    <TransactionFormat
      pageTitle="Cash Out"
      setAmount={setAmount}
      setFinalBalance={setFinalBalance}
      setCharge={setCharge}
      charge={charge}
      finalBalance={finalBalance}
    />
  );
};

export default CashOut;
