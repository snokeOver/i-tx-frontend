const TableViewStructure = ({ data, tabCols, actionBtnNumbers, children }) => {
  return (
    <div className="  mx-auto px-3">
      {data.length > 0 && (
        <div className="card w-full  shadow-2xl bg-base-100">
          {/* Table for cart */}
          <div className="overflow-x-auto py-7  bg-base-300">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-left text-lg">
                  <th></th>
                  {tabCols.map((col) => (
                    <th key={col}>{col}</th>
                  ))}

                  {actionBtnNumbers > 0 && (
                    <th colSpan={actionBtnNumbers} className="text-center">
                      Actions
                    </th>
                  )}
                </tr>
                <tr>
                  <th colSpan={tabCols.length + actionBtnNumbers + 1}>
                    <div className="divider -my-3"></div>
                  </th>
                </tr>
              </thead>

              <tbody>{children}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableViewStructure;
