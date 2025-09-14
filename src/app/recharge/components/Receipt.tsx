import React, { useState, useEffect } from 'react'
import verify from '../../asset/verify.svg'
import Image from 'next/image'
import { Formtitle } from './Formtitle'
import { DefaultButton } from '../../component/Button'
import { useRouter } from 'next/navigation'
import { FaToggleOn, FaToggleOff } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa'
import Cookies from 'js-cookie'
import { useSaveBeneficiary } from '@/hooks/useSaveBeneficiary'
import { AirtimePurchase } from '@/store/store'

interface ReceiptProps {
  beneficiaryData?: {
    number: string
    biller: string
    type: 'airtime' | 'data' | 'electricity' | 'cable'
  }
}

export const Receipt = ({ beneficiaryData }: ReceiptProps) => {
  const router = useRouter()
  const { saveBeneficiary, isLoading, isSaved, error, isBeneficiarySaved } = useSaveBeneficiary()
  
  // Get data from store
  const airtimeDetails = AirtimePurchase((state) => state.AirtimeDetails)
  
  // Construct beneficiary data from store if not provided as prop
  const beneficiaryDataFromStore = beneficiaryData || {
    number: airtimeDetails.phone,
    biller: airtimeDetails.network,
    type: 'airtime' as const
  }

  // Check if this specific beneficiary is already saved
  const isThisBeneficiarySaved = isBeneficiarySaved(beneficiaryDataFromStore)

  const usertoken = Cookies.get('atd')
  const parsedUserToken = usertoken ? JSON.parse(usertoken) : {};

  // Debug isSaved state changes


  const handleSaveBeneficiary = async () => {
  

    if (!beneficiaryDataFromStore.number || !beneficiaryDataFromStore.biller) {

      return
    }

    const result = await saveBeneficiary(beneficiaryDataFromStore)
  
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
            subtitle={`You have successfully made a payment`}
          />
          <DefaultButton
            text='View Reciept'
            type='button'
            className=' my-5 w-full rounded-lg bg-[#FCDFD4] py-2 hover:bg-[#F25E26] hover:text-white'
            handleClick={() => router.push(`/recharge/airtime/receipt?ref=${parsedUserToken?.data?.reference}`)}
          />
        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-2'>
        <div className='flex items-center justify-center gap-2'>
          <p className='text-gray-700'>
            {isThisBeneficiarySaved ? 'Saved as beneficiary' : 'Save as beneficiary'}
          </p>
          {isThisBeneficiarySaved ? (
            <FaCheck 
              className='text-green-600 text-2xl cursor-pointer hover:text-green-700' 
              onClick={handleSaveBeneficiary}
            />
          ) : isLoading ? (
            <div className='w-6 h-6 border-2 border-[#F25E26] border-t-transparent rounded-full animate-spin'></div>
          ) : (
            <FaToggleOff 
              className='text-3xl text-gray-300 cursor-pointer hover:text-gray-400' 
              onClick={handleSaveBeneficiary}
            />
          )}
        </div>
        {error && (
          <p className='text-red-500 text-sm text-center'>{error}</p>
        )}
      </div>
    </section>
  )
}