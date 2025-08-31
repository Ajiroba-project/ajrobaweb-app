'use client'
import React, { Fragment, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useGetDatanew } from "@/hooks/useGetData";
import Loading from "@/app/component/Loading";
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const RecentTransaction = () => {
  const userToken = Cookies.get("token") || "";

  const router = useRouter()

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/recent_transactions/`;

  const { data: recenttransdata, isLoading: recenttransLoading } = useGetDatanew(
    url,
    "get_recent_transactions",
    userToken || " ",
  );


  // console.log(recenttransdata, "recenttransdata")

  interface Transaction {
    description: string;
    time: string;
    amount: number;
    reference?: string;
    date_created?: any
  }

  const [allTransaction, setAllTransaction] = useState<Transaction[]>([]);
  const [fullTransactionList, setFullTransactionList] = useState<Transaction[]>([]);
  const [viewAll, setViewAll] = useState(false);
  const [sortBy, setSortBy] = useState("Date");

  // ✅ Update state when data is received
  useEffect(() => {
    if (recenttransdata?.results?.data) {

      /*  console.log(recenttransdata.results.data, "recenttransdata") */

      setAllTransaction(recenttransdata.results.data.slice(0, 5));
      setFullTransactionList(recenttransdata.results.data);
    }
  }, [recenttransdata]);

  // Sorting function
  const getSortedTransactions = () => {
    let txs = [...fullTransactionList];
    switch (sortBy) {
      case "Date":
        txs.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
        break;
      case "Time":
        txs.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
        break;
      case "Brand":
        txs.sort((a, b) => (a.description || "").localeCompare(b.description || ""));
        break;
      case "Amount":
        txs.sort((a, b) => b.amount - a.amount);
        break;
    }
    return txs;
  };

  return (
    <section className="my-10 rounded bg-[#F6F6F6] p-7">
      <div className="rounded border-2 border-[#f25e26] p-4">
        {viewAll ? (
          <div className="flex justify-between items-center ">
            <button onClick={() => setViewAll(false)} className="text-[#F25E26]">Back</button>
            <div className="flex items-center gap-2 ">
              <span>Sort by:</span>
              <div style={{ zIndex: 10, position: "relative" }}>
                {/*  <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Date">Date</SelectItem>
                    <SelectItem value="Time">Time</SelectItem>
                    <SelectItem value="Brand">Brand</SelectItem>
                    <SelectItem value="Amount">Amount</SelectItem>
                  </SelectContent>
                </Select> */}

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2"
                >
                  <option value="Date">Date</option>
                  <option value="Time">Time</option>
                  <option value="Brand">Brand</option>
                  <option value="Amount">Amount</option>
                </select>


              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold"> Recent Transactions</h3>
            <p
              className={`text-[#F25E26] cursor-pointer ${allTransaction?.length === recenttransdata?.results?.data?.length
                ? "pointer-events-none opacity-50 hidden"
                : ""
                }`}
              onClick={() => setViewAll(true)}
            >
              View all
            </p>
          </div>
        )}

        <div className="my-4 flex flex-col gap-4">


          {recenttransLoading ? (
            <div className="flex justify-center items-center py-6">
              <Loading /> {/* Your existing loading component */}
            </div>
          ) : (
            <div className="my-4 flex flex-col gap-4">
              {allTransaction.length === 0 ? (
                <p className="text-gray-500 text-center">No transactions available.</p>
              ) : (

                (viewAll ? getSortedTransactions() : allTransaction.slice(0, 5)).map((val, index) => {
                  const transactionType = val.reference?.split("_")[0] || "unknown";

                  const url = `/recharge/${transactionType}/receipt?ref=${val.reference}`;

                  return (
                    <Fragment key={index}>
                      <div
                        onClick={() => router.push(url)}
                        className="mr-4 flex cursor-pointer items-center justify-between rounded bg-[#FCDFD480] p-4 hover:shadow-md"
                      >
                        <div className="flex">
                          <div>{/* logo */}</div>
                          <div className="flex flex-col">
                            <p className="font-semibold">{val?.description}</p>
                            <p>{val.date_created
                              ? new Date(val.date_created).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true,
                              })
                              : "NA"}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xl font-semibold">₦{Number(val?.amount ?? 0).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                      </div>
                    </Fragment>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
