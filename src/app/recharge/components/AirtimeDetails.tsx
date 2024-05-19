import React from 'react'
import { useMutateData } from '@/hooks/useMutateData'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Airtimeschema } from './YupValidations'
import { DefaultButton } from '../../component/Button'
import { InputField, SelectField } from './FormField'
import { AirtimePurchase } from '@/store/store'
import { Formtitle } from './Formtitle'

type AirtimeProps = {
  network: string
  amount: string
  phone: string
}

export const AirtimeDetails = () => {
  const setAirtimeDetails = AirtimePurchase(state => state.setAirtimeDetails)
  const setAirtimeStepper = AirtimePurchase(state => state.setAirtimeStepper)

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
  const network = ['MTN', 'Airtel', 'Glo']


  const sumbitForm = (data: AirtimeProps) => {
    console.log('data=>', data)
    setAirtimeDetails(data)
    setAirtimeStepper(1)
  }

  return (
    <div className='container mt-[2rem] flex flex-col items-center justify-center gap-4 bg-[#F6F6F6]'>
      <Formtitle
        title='Buy Airtime'
        subtitle='Top up your airtime on our platform'
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
            label='Network Provider'
            showlabel={false}
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
          <p className='text-end text-[#f25e26] underline cursor-pointer'>Beneficiaries</p>

          <div className='mb-6'>
            <DefaultButton
              text='Proceed'
              type='submit'
              handleClick={() => {}}
              className='my-10 w-full bg-[#FCDFD4] p-3'
            />
          </div>
        </form>
      </div>
    </div>
  )
}
