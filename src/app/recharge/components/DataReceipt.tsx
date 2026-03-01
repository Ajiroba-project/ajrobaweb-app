import React, { useState } from 'react'
import verify from '../../asset/verify.svg'
import Image from 'next/image'
import { Formtitle } from './Formtitle'
import { DefaultButton } from '../../component/Button'
import { useRouter } from 'next/navigation'
 
import Cookies from 'js-cookie'
import { useSaveBeneficiary } from '@/hooks/useSaveBeneficiary'
import { DataPurchase } from '@/store/store'

interface DataReceiptProps {
  beneficiaryData?: {
    number: string
    biller: string
    type: 'airtime' | 'data' | 'electricity' | 'cable'
  }
}

export const DataReceipt = ({ beneficiaryData }: DataReceiptProps) => {
  const router = useRouter()
  const { saveBeneficiary, removeBeneficiary, isLoading, isSaved, error, isBeneficiarySaved } = useSaveBeneficiary()
  
  // Get data from store
  const dataDetails = DataPurchase((state) => state.dataDetails)
  
  // Construct beneficiary data from store if not provided as prop
  const beneficiaryDataFromStore = beneficiaryData || {
    number: dataDetails.dataphone,
    biller: dataDetails.datanetwork,
    type: 'data' as const
  }

  // Check if this specific beneficiary is already saved
  const isThisBeneficiarySaved = isBeneficiarySaved(beneficiaryDataFromStore)

  const usertoken = Cookies.get('atd')
  const parsedUserToken = usertoken ? JSON.parse(usertoken) : {};

  const handleToggleBeneficiary = async () => {
    if (!beneficiaryDataFromStore.number || !beneficiaryDataFromStore.biller) {
      return
    }
    if (isThisBeneficiarySaved) {
      await removeBeneficiary(beneficiaryDataFromStore)
    } else {
      await saveBeneficiary(beneficiaryDataFromStore)
    }
  }
  return (
    <section className='p-5 '>
      <div className='my-5 flex flex-col items-center justify-center gap-4 rounded-sm bg-[#F6F6F6] pt-[5em]'>
        <div>
          <Image src={verify} alt='successfully' />
        </div>
        <div className='w-content'>
          <Formtitle
            title='Successful'
            subtitle={`you have successfully made a payment`}
          />
          <DefaultButton
            text='View Receipt'
            type='button'
            className=' my-5 w-full rounded-lg bg-[#FCDFD4] py-2 hover:bg-[#F25E26] hover:text-white'
            handleClick={() => router.push(`/recharge/data/receipt?ref=${parsedUserToken?.data?.reference}`)}

          />
        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-2'>
        <div className='flex items-center justify-center gap-3'>
          <p className='text-[#F25E26]'>
            {isThisBeneficiarySaved ? 'Saved as beneficiary' : 'Save as beneficiary'}
          </p>
          <button
            aria-pressed={isThisBeneficiarySaved}
            onClick={handleToggleBeneficiary}
            disabled={isLoading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full border transition-colors duration-200 ${isThisBeneficiarySaved ? 'bg-[#F25E26] border-[#F25E26]' : 'bg-white border-[#E5E5E5]'}`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${isThisBeneficiarySaved ? 'translate-x-5' : 'translate-x-0.5'}`}
            />
          </button>
          {isLoading && <div className='w-4 h-4 border-2 border-[#F25E26] border-t-transparent rounded-full animate-spin' />}
        </div>
        {error && (
          <p className='text-red-500 text-sm text-center'>{error}</p>
        )}
      </div>
    </section>
  )
}
