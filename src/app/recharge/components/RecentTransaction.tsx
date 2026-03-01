'use client'
import React, { Fragment, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useGetDatanew } from '@/hooks/useGetData'
import Loading from '@/app/component/Loading'
import { useRouter } from 'next/navigation'
import { formatCurrency } from '@/utils/formatCurrency'
import { MdSearch } from 'react-icons/md'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Image from 'next/image'

import airtelicon from '../../asset/airtelicon.png'
import mtnicon from '../../asset/mtnicon.svg'
import ninemobileicon from '../../asset/ninemobileicon.png'
import gloicon from '../../asset/Globacom-logo.webp'
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

import Brand from '../../asset/logo.svg'

export const RecentTransaction = () => {
  const userToken = Cookies.get('token') || ''

  const router = useRouter()

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/recent_transactions/`

  const { data: recenttransdata, isLoading: recenttransLoading } =
    useGetDatanew(url, 'get_recent_transactions', userToken || ' ')

  // console.log(recenttransdata, "recenttransdata")

  interface Transaction {
    description: string
    time: string
    amount: number
    reference?: string
    date_created?: any
  }

  const [allTransaction, setAllTransaction] = useState<Transaction[]>([])
  const [fullTransactionList, setFullTransactionList] = useState<Transaction[]>(
    []
  )
  const [viewAll, setViewAll] = useState(false)
  const [sortBy, setSortBy] = useState('Date')
  const [searchQuery, setSearchQuery] = useState('')

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
    const desc = (description || '').toLowerCase()
    if (!desc) return Brand

    const keywordIconMap: { keywords: string[]; icon: any }[] = [
      { keywords: ['mtn'], icon: mtnicon },
      { keywords: ['airtel'], icon: airtelicon },
      { keywords: ['glo'], icon: gloicon },
      { keywords: ['showmax'], icon: showmaxicon },
      {
        keywords: ['startimes', 'star times', 'startime'],
        icon: startimesicon
      },
      { keywords: ['gotv'], icon: gotvicon },
      { keywords: ['consattv', 'consat'], icon: consattvicon },
      { keywords: ['dstv'], icon: dstvicon },
      { keywords: ['ibedc'], icon: ibedcicon },
      { keywords: ['ikeja'], icon: ikejaicon },
      { keywords: ['benin'], icon: beninicon },
      { keywords: ['enugu'], icon: enuguicon },
      { keywords: ['ekedc'], icon: ekedcicon },
      { keywords: ['kaduna'], icon: kadunaicon },
      { keywords: ['kano'], icon: kanoicon },
      { keywords: ['aedc'], icon: aedcicon },
      { keywords: ['jed'], icon: jedicon },
      { keywords: ['phedc'], icon: phedcicon },
      {
        keywords: ['9mobile', '9 mobile', 'etisalat', 'ninemobile'],
        icon: ninemobileicon
      }
    ]

    const match = keywordIconMap.find(({ keywords }) =>
      keywords.some(k => desc.includes(k))
    )

    return match ? match.icon : Brand
  }

  // ✅ Update state when data is received
  useEffect(() => {
    if (recenttransdata?.results?.data) {
      /*  console.log(recenttransdata.results.data, "recenttransdata") */

      setAllTransaction(recenttransdata.results.data.slice(0, 5))
      setFullTransactionList(recenttransdata.results.data)
    }
  }, [recenttransdata])

  // Filter + sort function (applies only in View All mode)
  const getSortedTransactions = () => {
    let txs = [...fullTransactionList]

    // Apply search filter first
    if (viewAll && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      txs = txs.filter(t => {
        const desc = (t.description || '').toLowerCase()
        const ref = (t.reference || '').toLowerCase()
        const amt = String(t.amount ?? '').toLowerCase()
        const date = t.date_created
          ? new Date(t.date_created).toLocaleString().toLowerCase()
          : ''
        return (
          desc.includes(q) ||
          ref.includes(q) ||
          amt.includes(q) ||
          date.includes(q)
        )
      })
    }
    switch (sortBy) {
      case 'Date':
        txs.sort(
          (a, b) =>
            new Date(b.date_created).getTime() -
            new Date(a.date_created).getTime()
        )
        break
      case 'Time':
        txs.sort(
          (a, b) =>
            new Date(b.date_created).getTime() -
            new Date(a.date_created).getTime()
        )
        break
      case 'Brand':
        txs.sort((a, b) =>
          (a.description || '').localeCompare(b.description || '')
        )
        break
      case 'Amount':
        txs.sort((a, b) => b.amount - a.amount)
        break
    }
    return txs
  }

  return (
    <section className='my-10 rounded bg-[#F6F6F6] p-4 sm:p-7'>
      {viewAll && (
        <div className='mb-3'>
          <button onClick={() => setViewAll(false)} className='text-[#F25E26]'>
            Back
          </button>
        </div>
      )}
      <div className='overflow-hidden rounded border-2 border-[#f25e26] p-3 sm:p-4'>
        {viewAll ? (
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center gap-3'>
              <div className='relative w-full sm:w-auto'>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder='Search...'
                  className='w-full rounded-md border border-gray-300 py-2 pl-3 pr-9 text-sm placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#F25E26] sm:w-[260px]'
                />
                <MdSearch className='pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400' />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-sm sm:text-base'>Sort by:</span>
              <div style={{ zIndex: 10, position: 'relative' }}>
                <Select value={sortBy} onValueChange={val => setSortBy(val)}>
                  <SelectTrigger className='selector h-9 w-[140px] rounded border px-3 sm:h-10 sm:w-[160px]'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    style={{ backgroundColor: '#ffffff', color: '#2A2A2A' }}
                  >
                    <SelectItem
                      value='Date'
                      className='data-[highlighted]:bg-[#FCDFD4] data-[state=checked]:bg-[#FCDFD4] data-[state=checked]:text-[#111827]'
                    >
                      Date
                    </SelectItem>
                    <SelectItem
                      value='Time'
                      className='data-[highlighted]:bg-[#FCDFD4] data-[state=checked]:bg-[#FCDFD4] data-[state=checked]:text-[#111827]'
                    >
                      Time
                    </SelectItem>
                    <SelectItem
                      value='Brand'
                      className='data-[highlighted]:bg-[#FCDFD4] data-[state=checked]:bg-[#FCDFD4] data-[state=checked]:text-[#111827]'
                    >
                      Brand
                    </SelectItem>
                    <SelectItem
                      value='Amount'
                      className='data-[highlighted]:bg-[#FCDFD4] data-[state=checked]:bg-[#FCDFD4] data-[state=checked]:text-[#111827]'
                    >
                      Amount
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-between gap-3'>
            <h3 className='text-lg font-semibold sm:text-xl'>
              {' '}
              Recent Transactions
            </h3>
            <p
              className={`cursor-pointer text-[#F25E26] ${
                allTransaction?.length ===
                recenttransdata?.results?.data?.length
                  ? 'pointer-events-none hidden opacity-50'
                  : ''
              }`}
              onClick={() => setViewAll(true)}
            >
              <span className='text-sm sm:text-base'>View all</span>
            </p>
          </div>
        )}

        <div className='my-4 flex flex-col gap-4'>
          {recenttransLoading ? (
            <div className='flex items-center justify-center py-6'>
              <Loading />
            </div>
          ) : (
            <div className='my-4 flex flex-col gap-3 sm:gap-4'>
              {allTransaction.length === 0 ? (
                <p className='text-center text-gray-500'>
                  No transactions available.
                </p>
              ) : (
                (viewAll
                  ? getSortedTransactions()
                  : allTransaction.slice(0, 5)
                ).map((val, index) => {
                  let transactionType = 'unknown'
                  if (val.reference?.startsWith('BILL')) {
                    if (val.description?.toLowerCase().includes('airtime')) {
                      transactionType = 'airtime'
                    } else if (
                      val.description?.toLowerCase().includes('data')
                    ) {
                      transactionType = 'data'
                    } else if (
                      val.description?.toLowerCase().includes('cable')
                    ) {
                      transactionType = 'cable'
                    } else {
                      transactionType = 'data'
                    }
                  } else {
                    transactionType = val.reference?.split('_')[0] || 'unknown'
                  }

                  const url = `/recharge/${transactionType}/receipt?ref=${val.reference}`
                  const icon = getIconForTransaction(
                    val?.description,
                    transactionType
                  )
                  const iconAlt = transactionType || 'transaction'

                  return (
                    <Fragment key={index}>
                      <div
                        onClick={() => router.push(url)}
                        className='mr-0 flex cursor-pointer flex-col items-start justify-between gap-2 rounded bg-[#FCDFD480] p-3 hover:shadow-md sm:mr-4 sm:flex-row sm:items-center sm:gap-0 sm:p-4'
                      >
                        <div className='flex w-full sm:w-auto'>
                          {/* <div className="shrink-0">

                          <Image
                            src={icon}
                            alt={iconAlt}
                            width={36}
                            height={36}
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full mr-3 sm:mr-4"
                          />

                          </div> */}

                          <div className='flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white mr-3 sm:mr-4'>
                            <Image
                              src={icon}
                              alt={iconAlt}
                              width={60}
                              height={60}
                              className='object-contain'
                            />
                          </div>
                          <div className='flex min-w-0 flex-col'>
                            <p className='whitespace-normal break-words text-sm font-semibold sm:truncate sm:whitespace-nowrap sm:text-base'>
                              {val?.description}
                            </p>
                            <p className='text-xs text-[#4B5563] sm:text-base'>
                              {val.date_created
                                ? new Date(val.date_created).toLocaleString(
                                    'en-US',
                                    {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      second: '2-digit',
                                      hour12: true
                                    }
                                  )
                                : 'NA'}
                            </p>
                          </div>
                        </div>
                        <div className='ml-0 hidden shrink-0 text-right sm:ml-6 sm:block'>
                          <p className='text-xl font-semibold'>
                            {formatCurrency(val?.amount)}
                          </p>
                        </div>

                        {/* Mobile amount block below content for clean layout */}
                        <div className='mt-1 w-full border-t border-[#F4C3AD] pt-2 sm:hidden'>
                          <p className='text-base font-semibold'>
                            {formatCurrency(val?.amount)}
                          </p>
                        </div>
                      </div>
                    </Fragment>
                  )
                })
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
