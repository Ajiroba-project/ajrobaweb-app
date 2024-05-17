import React from 'react'
import verify from '../../asset/verify.svg'
import Image from 'next/image'
import { Formtitle } from './Formtitle'
import { DefaultButton } from '../../component/Button'
import {useRouter} from 'next/navigation'
export const Receipt = () => {
    const router = useRouter()
  return (
    <div className='my-5 mt-[4rem] flex  flex-col items-center justify-center gap-4 rounded '>
      <div>
        <Image src={verify} alt='successfully' />
      </div>
      <div className="w-content">
        <Formtitle
          title='Successfully'
          subtitle={`you have successfully make a payment`}
        />
      <DefaultButton
        text='View Reciept'
        type='button'
        className=' rounded-lg bg-[#FCDFD4] py-2 hover:bg-[#F25E26] hover:text-white my-5 w-full'
        handleClick={() => router.push('transaction-receipt')}
      />
      </div>
    </div>
  )
}
