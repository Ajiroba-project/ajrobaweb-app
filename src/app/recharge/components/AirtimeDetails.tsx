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

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/beneficiaries/?type=airtime`;

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
    <div className='flex flex-col items-center gap-4 bg-[#F6F6F6] px-4 py-12'>
      <Formtitle
        title='Buy Airtime'
        subtitle='Top up your airtime on our platform'
      />
      <div className='w-full max-w-[400px]'>
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
            className="text-sm w-full h-auto p-2.5 border rounded-lg font-Inter font-normal border-[#A09F9F]"
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
            <section className='flex items-center justify-between gap-4'>
              <div className='flex min-w-0 items-center gap-2 sm:gap-3'>
                <Image src={Brand} alt='brand-logo' className='h-5 w-auto flex-shrink-0 sm:h-8' />
                <h2 className='truncate font-Poppins text-sm font-semibold text-[#2A2A2A] sm:text-base'>Beneficiaries</h2>
              </div>
              <button
                className='flex-shrink-0 font-Poppins text-xs text-[#E84526] transition-colors hover:text-[#d94f1e] sm:text-sm'
                onClick={() => setprintreceipt(false)}
              >
                Close
              </button>
            </section>

            <div className='mt-4 space-y-3'>
              {transformedData && transformedData.length > 0 ? (
                transformedData.map((item: TransformedDataItem) => (
                  <div
                    key={item.id}
                    className='flex items-center justify-between rounded-xl border border-[#F0F0F0] bg-[#FAFAFA] px-3 py-3 transition-colors hover:bg-[#FFF8F5] sm:px-5 sm:py-4'
                  >
                    <div className='flex min-w-0 items-center gap-3'>
                      {item.icon && (
                        <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 sm:h-11 sm:w-11'>
                          <Image src={item.icon} alt={item.type} width={44} height={44} className='h-full w-full object-contain' />
                        </div>
                      )}
                      <div className='min-w-0'>
                        <p className='truncate font-Poppins text-sm font-medium text-[#2A2A2A] sm:text-base'>{item.number}</p>
                        <p className='font-Poppins text-xs text-[#8C8C8C]'>{item.type}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUseClick(item.number, item.type)}
                      className='ml-3 flex-shrink-0 rounded-lg bg-[#FCDFD4] px-4 py-2 font-Poppins text-xs font-medium text-[#2A2A2A] transition-colors hover:bg-[#F25E26] hover:text-white sm:px-5 sm:text-sm'
                    >
                      Use
                    </button>
                  </div>
                ))
              ) : (
                <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-[#E0E0E0] py-10'>
                  <p className='font-Poppins text-sm font-medium text-[#8C8C8C] sm:text-base'>No Beneficiaries Available</p>
                  <p className='mt-1 font-Poppins text-xs text-[#ABABAB] sm:text-sm'>You haven&apos;t saved any beneficiaries yet.</p>
                </div>
              )}
            </div>
          </CustomModal>
        </form>
      </div>
    </div>
  )
}
