import React, { useState } from 'react'
import { useMutateData } from '@/hooks/useMutateData'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Airtimeschema } from './YupValidations'
import { DefaultButton } from '../../component/Button'
import { InputField, SelectField, CurrencyInputField } from './FormField'
import { AirtimePurchase } from '@/store/store'
import { Formtitle } from './Formtitle'
import { CustomModal, Modal } from '@/app/component/Modal'
import { Header } from '../airtime/receipt/component/Header'
import Image from 'next/image'
import Brand from '../../asset/ajirobalogo.png'
import { useRouter } from "next/navigation"
import { useGetDatanew } from '@/hooks/useGetData'
import Cookies from 'js-cookie'
import airtelicon from '../../asset/airtelicon.png'
import { StaticImageData } from 'next/image'
import mtnicon from '../../asset/mtnicon.svg'
import ninemobileicon from '../../asset/ninemobileicon.png'
import './style.css'
import gloicon from '../../asset/gloicon.png'
import { set } from 'date-fns'
import { Item } from '@radix-ui/react-select'
import { removeDuplicateBeneficiaries } from '@/utils/removeDuplicates'


type AirtimeProps = {
  network: string
  amount: string
  phone: string
}

interface TransformedDataItem {
  id: number;
  number: string;
  type: string;
  icon: string | null;
}


export const AirtimeDetails = () => {
  const setAirtimeDetails = AirtimePurchase(state => state.setAirtimeDetails)
  const setAirtimeStepper = AirtimePurchase(state => state.setAirtimeStepper)
  const [printreceipt, setprintreceipt] = useState<boolean>(false);

  const userToken = (Cookies.get("token") as string) || "";

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/beneficiaries/?type=Airtime`;

  const { data: bensdata, isLoading: bensLoading } = useGetDatanew(
    url,
    "get_beneficiaries",
    userToken || " ",
  );




  const iconMap: { [key: string]: StaticImageData | null } = {
    MTN: mtnicon,
    AIRTEL: airtelicon,
    Smile: airtelicon,
    Virgin: airtelicon,
    Etisalat: airtelicon,
    "9MOBILE": ninemobileicon,
    GLO: gloicon
  };

  // console.log(bensdata?.data, 'bensdata?.data');

  const transformedData = removeDuplicateBeneficiaries(bensdata?.data, iconMap);




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




  const network = ['MTN', 'AIRTEL', 'GLO', '9MOBILE']


  const sumbitForm = (data: AirtimeProps) => {
    //  console.log('data=>', data)
    setAirtimeDetails(data)
    setAirtimeStepper(1)
  }

  const router = useRouter()


  const handleUseClick = (number: string, type: string) => {
    setValue('phone', number)
    setValue('network', type)
    setprintreceipt(false)
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
            name="network"
            register={register}
            errors={errors}
            options={network}
            label="Network Provider"
            showlabel={false}
            value={watch("network")} // Ensure value updates
            onChange={(e) => setValue("network", e.target.value)} // Update manually
            className="text-sm w-full h-auto p-2.5 border rounded-lg font-Inter font-normal pr-12 border-[#A09F9F] selector"
          />


          <InputField
            name='phone'
            register={register}
            errors={errors}
            type='text'
            placeholder='Phone Number'
          />
          <CurrencyInputField
            name='amount'
            register={register}
            errors={errors}
            type='text'
            placeholder='Amount'
          />
          <p onClick={() => setprintreceipt(!printreceipt)} className='text-end text-[#f25e26] underline cursor-pointer text-sm font-Poppins'>Beneficiaries</p>

          <div className='mb-6'>
            <DefaultButton
              text='Proceed'
              type='submit'
              handleClick={() => { }}
              /*      className='my-10 w-full bg-[#FCDFD4] p-3 rounded-lg   ' */
              className="my-10 w-full text-sm font-normal font-Poppins rounded-lg bg-[#FCDFD4] px-4 py-2 transition delay-300 duration-300 ease-in-out hover:bg-[#E84526] hover:text-white hover:transition-all"
            />
          </div>

          <CustomModal isOpen={printreceipt}>

            <section className='flex flex-col'>
              <div className='flex items-center justify-between'>
                <Image src={Brand} alt='brand-logo' />
                <h2 className='font-Poppins text-[#2A2A2A] font-medium text-base md:text-xl leading-none'>Beneficiaries</h2>
              </div>
              <button className='text-left text-[#E84526] underline mt-3 font-Poppins text-sm' onClick={() => setprintreceipt(false)}>Back</button>
            </section>



            <div className="pt-2">
              <div className="space-y-5">

                {transformedData?.map((item: TransformedDataItem) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl bg-[#F8F8F8] px-6 py-5 border border-[#F0F0F0]"
                  >
                    <div className="flex items-center gap-4">
                      {item.icon && (
                        <Image src={item.icon} alt={item.type} width={44} height={44} className="w-11 h-11 rounded-full" />
                      )}
                      <div className="leading-tight">
                        <p className="text-[15px] md:text-base text-[#2A2A2A] font-medium tracking-[0.2px]">{item.number}</p>
                        <p className="text-xs text-[#8C8C8C] mt-1">{item.type}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUseClick(item.number, item.type)}
                      className="px-5 py-2 rounded-lg bg-[#FCDFD4] text-[#2A2A2A] text-sm font-medium hover:opacity-90"
                    >
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
