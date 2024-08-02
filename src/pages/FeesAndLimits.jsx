import SingleTxRow from "../components/dashboard/agent/SingleTxRow";
import TableViewStructure from "../components/dashboard/shared/TableViewStructure";
import SingleLimitChargeRow from "../components/limitCharge/SingleLimitChargeRow";
import Container from "../components/shared/Container";

const FeesAndLimits = () => {
  const txLimit = [
    {
      id: 1,
      item: "Cash In",
      dailyLimit: 30000,
      monthlyLimit: 300000,
      charge: "Free",
    },
    {
      id: 2,
      item: "Cash Out",
      dailyLimit: 25000,
      monthlyLimit: 300000,
      charge: "1.5%",
    },
    {
      id: 3,
      item: "Send Money",
      dailyLimit: 30000,
      monthlyLimit: 300000,
      charge: "5 for >=100",
    },
  ];
  return (
    <Container>
      <div className=" flex flex-col gap-6 mt-14 w-full">
        {/* Table section */}
        <TableViewStructure
          data={txLimit}
          tabCols={["Transaction", "Daily Limit", "Monthly Limit", "Charge"]}
          actionBtnNumbers={0}
        >
          {txLimit.map((singleItem, index) => (
            <SingleLimitChargeRow
              index={index}
              key={singleItem.id}
              singleItem={singleItem}
            />
          ))}
        </TableViewStructure>
      </div>
    </Container>
  );
};

export default FeesAndLimits;
