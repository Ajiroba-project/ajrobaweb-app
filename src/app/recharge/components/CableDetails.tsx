import React from 'react'
import { useMutateData } from '@/hooks/useMutateData'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Cableschema } from './YupValidations'
import { DefaultButton } from '../../component/Button'
import { InputField, SelectField } from './FormField'
import { CablePurchase } from '@/store/store'
import { Formtitle } from './Formtitle'
import Image from "next/image"
import startime from "../../asset/image/startimes.png"
import gotv from "../../asset/image/gotv.png"
import dstv from "../../asset/image/dstv.png"

type CableProps = {
  network: string
  smartcard: string
  netpackage: string
}

export const CableDetails = () => {
  const setCableDetails = CablePurchase(state => state.setCableDetails)
  const setCableStepper = CablePurchase(state => state.setCableStepper)

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
    resolver: yupResolver(Cableschema)
  })
  const network = ['Gotv', 'Dstv', 'StarTimes']
  const netpackage = ['jinja', 'family', 'business']

  const sumbitForm = (data: CableProps) => {
    // console.log('data=>', data)
    setCableDetails(data)
    setCableStepper(1)
  }

  return (
    <div className='container mt-[2rem] flex flex-col items-center justify-center gap-4 bg-[#F6F6F6]'>
      <div className='flex gap-4 pt-5 '>
        <Image src={gotv} alt='' />
        <Image src={dstv} alt='' />
        <Image src={startime} alt='' />
      </div>
      <Formtitle
        title='Buy Cable Subscription'
        subtitle='Enjoy your best TV program by purchasing your subscription on our platform'
      />
      <div>
        <form
          className='flex flex-col gap-3'
          onSubmit={handleSubmit(sumbitForm)}
        >
          <SelectField
            name='network'
            register={register}
            errors='errors'
            options={network}
            label='operators'
            showlabel={false}
          />

          <InputField
            name='smartcard'
            register={register}
            errors={errors}
            type='text'
            placeholder='Input IUC/Smart Card Number'
          />
          <SelectField
            name='netpackage'
            register={register}
            errors='errors'
            options={netpackage}
            label='Package Bundle'
            showlabel={false}
          />
          <p className='underline cursor-pointer text-end text-[#f25e26]'>Beneficiaries</p>

          <div className='mb-6'>
            <DefaultButton
              text='Proceed'
              type='submit'
              handleClick={() => { }}
              className='my-10 w-full bg-[#FCDFD4] p-3'
            />
          </div>
        </form>
      </div>
    </div>
  )
}
