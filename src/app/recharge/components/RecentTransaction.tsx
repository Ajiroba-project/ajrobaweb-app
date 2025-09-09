'use client'
import React, { Fragment, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useGetDatanew } from "@/hooks/useGetData";
import Loading from "@/app/component/Loading";
import { useRouter } from 'next/navigation'
import { formatCurrency } from "@/utils/formatCurrency";
import { MdSearch } from "react-icons/md";


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
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Update state when data is received
  useEffect(() => {
    if (recenttransdata?.results?.data) {

      /*  console.log(recenttransdata.results.data, "recenttransdata") */

      setAllTransaction(recenttransdata.results.data.slice(0, 5));
      setFullTransactionList(recenttransdata.results.data);
    }
  }, [recenttransdata]);

  // Filter + sort function (applies only in View All mode)
  const getSortedTransactions = () => {
    let txs = [...fullTransactionList];

    // Apply search filter first
    if (viewAll && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      txs = txs.filter((t) => {
        const desc = (t.description || "").toLowerCase();
        const ref = (t.reference || "").toLowerCase();
        const amt = String(t.amount ?? "").toLowerCase();
        const date = t.date_created ? new Date(t.date_created).toLocaleString().toLowerCase() : "";
        return desc.includes(q) || ref.includes(q) || amt.includes(q) || date.includes(q);
      });
    }
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
      {viewAll && (
        <div className="mb-3">
          <button onClick={() => setViewAll(false)} className="text-[#F25E26]">Back</button>
        </div>
      )}
      <div className="rounded border-2 border-[#f25e26] p-4">
        {viewAll ? (
          <div className="flex justify-between items-center ">
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-[200px] sm:w-[260px] rounded-md border border-gray-300 pl-3 pr-9 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F25E26] focus:border-transparent"
                />
                <MdSearch className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center gap-2 ">
              <span>Sort by:</span>
              <div style={{ zIndex: 10, position: "relative" }}>
                

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
              <Loading /> 
            </div>
          ) : (
            <div className="my-4 flex flex-col gap-4">
              {allTransaction.length === 0 ? (
                <p className="text-gray-500 text-center">No transactions available.</p>
              ) : (

                (viewAll ? getSortedTransactions() : allTransaction.slice(0, 5)).map((val, index) => {

                  let transactionType = "unknown";
                  if (val.reference?.startsWith("BILL")) {
                    if (val.description?.toLowerCase().includes("airtime")) {
                      transactionType = "airtime";
                    } else if (val.description?.toLowerCase().includes("data")) {
                      transactionType = "data";
                    }
                    else if (val.description?.toLowerCase().includes("cable")) {
                      transactionType = "cable";
                    }
                    else {
                      transactionType = "data";
                    }
                  } else {
                    transactionType = val.reference?.split("_")[0] || "unknown";
                  }

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
                          <p className="text-xl font-semibold">{formatCurrency(val?.amount)}</p>
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
