import HeaderBox from "@/components/HeaderBox";
import { Pagination } from "@/components/Pagination";
import TransactionsTable from "@/components/TransactionsTable";
import { getAccounts, getAccount } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";
import React from "react";

const TransactionHistory = async (props: SearchParamProps) => {
  const searchParams = await props.searchParams;

  const {
    page,
    id
  } = searchParams;

  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn?.$id,
  });

  if (!accounts) return;

  const accountsData = accounts?.data;

  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });
  const rowsPerPage = 10;
  const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);
  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  const currentTransaction = account?.transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  return (
    <section className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Tansaction History"
          subtext="See your bank details and transactions"
        />
      </div>
      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account?.data.name}
            </h2>
            <p className="text-14 text-blue-25">{account?.data.officialName}</p>
            <p className="text-14 font-semibold text-white tracking-[1.1px]">
              ●●●● ●●●● ●●●●{" "}
              <span className="text-16">{account?.data.mask}</span>
            </p>
          </div>
          <div className="transactions-account-balance">
            <p className="text-14">Current Balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(account?.data.currentBalance)}
            </p>
          </div>
        </div>
        <section className="flex flex-col w-full gap-6">
          <TransactionsTable transactions={currentTransaction} page={currentPage} />
          {totalPages > 1 && (
            <div className="w-full my-4">
              {" "}
              <Pagination page={currentPage} totalPages={totalPages} />
            </div>
          )}
        </section>
      </div>
    </section>
  );
};

export default TransactionHistory;
