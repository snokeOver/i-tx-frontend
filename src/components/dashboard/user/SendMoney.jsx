import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import TransactionFormat from "../shared/TransactionFormat";

const CashOut = () => {
  const { userDetails } = useAuth();
  const [charge, setCharge] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const sendMoneyCharge = 5;

  // Set the Summary
  useEffect(() => {
    if (amount >= 50) {
      if (amount > 100) {
        setCharge(sendMoneyCharge);
        setFinalBalance(
          parseFloat(userDetails.balance) - sendMoneyCharge - amount
        );
      } else {
        setCharge(0);
        setFinalBalance(parseFloat(userDetails.balance) - amount);
      }
    } else {
      setCharge(0);
      setFinalBalance(0);
    }
  }, [amount]);

  return (
    <TransactionFormat
      pageTitle="Send Money"
      setAmount={setAmount}
      setFinalBalance={setFinalBalance}
      setCharge={setCharge}
      charge={charge}
      finalBalance={finalBalance}
    />
  );
};

export default CashOut;
