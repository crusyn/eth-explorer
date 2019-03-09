import React from "react";
import { SearchContainer, FilterContainer } from "../containers";
import TransactionTable from "./TransactionDataGrid";
import { TransactionSummary } from "./";

const AllTransactions = ({ account, transactions, match }) => {
  return (
    <div>
      <SearchContainer />
      <TransactionSummary account={account} />
      <FilterContainer />
      <TransactionTable
        tranData={transactions}
        tableName="Transaction Data"
        ethAddress={match.params.address}
      />
    </div>
  );
};

export default AllTransactions;
