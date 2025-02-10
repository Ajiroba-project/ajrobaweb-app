import React, { useState } from 'react'
import { useMutateData } from '@/hooks/useMutateData'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Airtimeschema } from './YupValidations'
import { DefaultButton } from '../../component/Button'
import { InputField, SelectField } from './FormField'
import { AirtimePurchase } from '@/store/store'
import { Formtitle } from './Formtitle'
import { CustomModal, Modal } from '@/app/component/Modal'
import { Header } from '../airtime/receipt/component/Header'
import Image from 'next/image'
import Brand from '../../asset/ajirobalogo.png'
import {useRouter} from "next/navigation"
import mtnicon from '../../asset/mtnicon.svg'
import airtelicon from '../../asset/airtelicon.png'
import gloicon from '../../asset/gloicon.png'
import ninemobileicon from '../../asset/ninemobileicon.png'
import { useGetDatanew } from '@/hooks/useGetData'
import Cookies from 'js-cookie'


type AirtimeProps = {
  network: string
  amount: string
  phone: string
}

export const AirtimeDetails = () => {
  const setAirtimeDetails = AirtimePurchase(state => state.setAirtimeDetails)
  const setAirtimeStepper = AirtimePurchase(state => state.setAirtimeStepper)
   const [printreceipt, setprintreceipt] = useState<boolean>(false);

  const userToken = (Cookies.get("token") as string) || "";

     const url = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/recent_transactions/`;

  const { data: recenttransdata, isLoading: recenttransLoading } = useGetDatanew(
    url,
    "get_recent_transactions",
    userToken || " ",
  );


  console.log(recenttransdata, 'benedata')





   const mobiledata = [
  { id: 1, number: '08134538765', type: 'MTN', icon: mtnicon },
  { id: 2, number: '65747533534', type: 'Airtel', icon: airtelicon },
  { id: 3, number: '34324636267367', type: '9mobile', icon: ninemobileicon },
  { id: 4, number: '08134538765', type: 'Glo', icon: gloicon },
  // { id: 5, number: '08134538765', type: 'MTN', icon: '/path-to-mtn-icon.png' },
];

  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue
  } = useForm({
    mode: 'all',
    resolver: yupResolver(Airtimeschema)
  })




  const network = ['MTN', 'Airtel', 'Glo', '9mobile', 'Etisalat', 'Smile', 'Virgin' ,  ]


  const sumbitForm = (data: AirtimeProps) => {
    // console.log('data=>', data)
    setAirtimeDetails(data)
    setAirtimeStepper(1)
  }

  const router =useRouter()


    // Function to populate phone number when "Use" button is clicked
  const handleUseClick = (number: string) => {
    setValue('phone', number) // Set the 'phone' field value
    setprintreceipt(false) // Close the modal
  }

  return (
    <div className=' flex flex-col items-center justify-center gap-4 bg-[#F6F6F6] py-12'>
      <Formtitle
        title='Buy Airtime'
        subtitle='Top up your airtime on our platform'

      />
      <div className=''>
        <form
          className='flex flex-col gap-3'
          onSubmit={handleSubmit(sumbitForm)}
        >
          <SelectField
            name='network'
            register={register}
            errors='errors'
            options={network}
            label='Network Provider'
            showlabel={false}
             className="text-sm w-full h-auto p-2.5 border rounded-lg font-Inter font-normal pr-12 border-[#A09F9F]  "


          />

          <InputField
            name='phone'
            register={register}
            errors={errors}
            type='text'
            placeholder='Phone Number'
          />
          <InputField
            name='amount'
            register={register}
            errors={errors}
            type='text'
            placeholder='Amount'

          />
          <p  onClick={() => setprintreceipt(!printreceipt)} className='text-end text-[#f25e26] underline cursor-pointer text-sm font-Poppins'>Beneficiaries</p>

          <div className='mb-6'>
            <DefaultButton
              text='Proceed'
              type='submit'
              handleClick={() => { }}
              className='my-10 w-full bg-[#FCDFD4] p-3 rounded-lg '
            />
          </div>

             <CustomModal isOpen={printreceipt}>

            <section className='container flex flex-col '>
      <div className='flex justify-between items-center'>
        <Image src={Brand} alt='brand-logo' />
        <h2 className=' font-Poppins text-[#2A2A2A] font-normal   lg:text-xl md:text-xl leading-3 capitalize'>{'Airtime Recharge' }</h2>
      </div>
      <p className="brand1 py-4 cursor-pointer font-Poppins text-sm underline"  onClick={()=> setprintreceipt(false)}>Back</p>
    </section>




     <div className="p-6 bg-gray-100 min-h-screen">
      <div className="space-y-4">
        {mobiledata?.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Icon and details */}
            <div className="flex items-center">
              <Image
                src={item.icon}
                alt={item.type}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <p className="text-gray-900 font-semibold">{item.number}</p>
                <p className="text-gray-500 text-sm">{item.type}</p>
              </div>
            </div>

            {/* Action button */}
            <button onClick={() => handleUseClick(item.number)}  className="px-4 py-2 bg-[#FCDFD4] text-[#2A2A2A] font-medium rounded-lg hover:bg-[#FCDFD4]">
              Use
            </button>
          </div>
        ))}
      </div>
    </div>

      </CustomModal>
        </form>
      </div>
    </div>
  )
}
