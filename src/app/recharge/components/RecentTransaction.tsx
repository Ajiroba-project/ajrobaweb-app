'use client'
import React, { Fragment, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useGetDatanew } from "@/hooks/useGetData";
import Loading from "@/app/component/Loading";
import { useRouter } from 'next/navigation'
import { formatCurrency } from "@/utils/formatCurrency";
import { MdSearch } from "react-icons/md";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from 'next/image';

import airtelicon from "../../asset/airtelicon.png";
import mtnicon from "../../asset/mtnicon.svg";
import ninemobileicon from "../../asset/ninemobileicon.png";
import gloicon from "../../asset/gloicon.png";
import dstvicon from '../../asset/dstvicon.jpeg'
import gotvicon from '../../asset/gotvicon.jpeg'
import startimesicon from '../../asset/startimesicon.jpeg'
import consattvicon from '../../asset/consattvicon.png'
import showmaxicon from '../../asset/showmaxicon.png'
import ibedcicon from '../../asset/ibedcicon.png'
import ikejaicon from '../../asset/ikejaicon.png'
import beninicon from '../../asset/beninicon.png'
import enuguicon from '../../asset/enuguicon.jpeg'
import ekedcicon from '../../asset/ekedcicon.jpeg'
import kadunaicon from '../../asset/kadunaicon.jpeg'
import kanoicon from '../../asset/kedcoicon.png'
import aedcicon from '../../asset/aedc.png'
import jedicon from '../../asset/jedicon.jpeg'
import phedcicon from '../../asset/phedicon.jpeg'


import Brand from "../../asset/logo.svg";


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


  // const iconMap =  {
  //   MTN: mtnicon,
  //   AIRTEL: airtelicon,
  //   Smile: airtelicon,
  //   Virgin: airtelicon,
  //   Etisalat: airtelicon,
  //   ninemobile: ninemobileicon,
  //   GLO: gloicon,
  // };

  const getIconForTransaction = (description: string, type: string) => {
    const desc = (description || '').toLowerCase();
    if (type === 'airtime' || type === 'data') {
      if (desc.includes('mtn')) return mtnicon;
      if (desc.includes('airtel')) return airtelicon;
      if (desc.includes('glo')) return gloicon;
      if (desc.includes('showmax')) return showmaxicon;
      if (desc.includes('startimes')) return startimesicon;
      if (desc.includes('gotv')) return gotvicon;
      if (desc.includes('consattv') || desc.includes('consat')) return consattvicon;
      if (desc.includes('dstv')) return dstvicon;
      if (desc.includes('ibedc')) return ibedcicon;
      if (desc.includes('ikeja')) return ikejaicon;
      if (desc.includes('benin')) return beninicon;
      if (desc.includes('enugu')) return enuguicon;
      if (desc.includes('ekedc')) return ekedcicon;
      if (desc.includes('kaduna')) return kadunaicon;
       if (desc.includes('kano')) return kanoicon;
      if (desc.includes('aedc')) return aedcicon;
      if (desc.includes('jed')) return jedicon;
      if (desc.includes('phedc')) return phedcicon;
      if (desc.includes('9mobile') || desc.includes('9 mobile') || desc.includes('etisalat') || desc.includes('ninemobile')) return ninemobileicon;
    }
    return Brand;
  };

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
                <Select value={sortBy} onValueChange={(val) => setSortBy(val)}>
                  <SelectTrigger className="h-10 w-[160px] rounded border px-3 selector">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent style={{ backgroundColor: '#ffffff', color: '#2A2A2A' }}>
                    <SelectItem value="Date" className='data-[highlighted]:bg-[#FCDFD4] data-[state=checked]:bg-[#FCDFD4] data-[state=checked]:text-[#111827]'>Date</SelectItem>
                    <SelectItem value="Time" className='data-[highlighted]:bg-[#FCDFD4] data-[state=checked]:bg-[#FCDFD4] data-[state=checked]:text-[#111827]'>Time</SelectItem>
                    <SelectItem value="Brand" className='data-[highlighted]:bg-[#FCDFD4] data-[state=checked]:bg-[#FCDFD4] data-[state=checked]:text-[#111827]'>Brand</SelectItem>
                    <SelectItem value="Amount" className='data-[highlighted]:bg-[#FCDFD4] data-[state=checked]:bg-[#FCDFD4] data-[state=checked]:text-[#111827]'>Amount</SelectItem>
                  </SelectContent>
                </Select>
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
                  const icon = getIconForTransaction(val?.description, transactionType);
                  const iconAlt = transactionType || 'transaction';

                  return (
                    <Fragment key={index}>
                      <div
                        onClick={() => router.push(url)}
                        className="mr-4 flex cursor-pointer items-center justify-between rounded bg-[#FCDFD480] p-4 hover:shadow-md"
                      >
                        <div className="flex">
                          <div>

                          <Image
                            src={icon}
                            alt={iconAlt}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full mr-4"
                          />

                          </div>
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
              )
              
              }
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
