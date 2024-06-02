import React from 'react'
import { useMutateData } from '@/hooks/useMutateData'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Rechargeschema } from './YupValidations'
import { DefaultButton } from '../../component/Button'
import { InputField, SelectField } from './FormField'
import { DataPurchase } from '@/store/store'
import { Formtitle } from './Formtitle'

type DataProps = {
  network: string
  data: string
  phone: string
}

export const DataDetails = () => {
  const setDataDetails = DataPurchase(state => state.setDataDetails)
  const setStepper = DataPurchase(state => state.setStepper)

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
    resolver: yupResolver(Rechargeschema)
  })
  const network = ['MTN', 'Airtel', 'Glo']
  const dataPlan = ['1day 100MB -₦100', '60dayS 1TB -₦20,000']

  const sumbitForm = (data: DataProps) => {
    // console.log('data=>', data)
    setDataDetails(data)
    setStepper(1)
  }

  return (
    <div className='container mt-[2rem] flex flex-col items-center justify-center gap-4 bg-[#F6F6F6]'>
      <Formtitle title='Payment' subtitle='We have Different Data plan that suit your needs' />
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
          <SelectField
            name='data'
            register={register}
            errors='errors'
            options={dataPlan}
            label='Data Bundle'
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
            isdisabled={true}
          />
          <p className='text-end text-[#f25e26] underline cursor-pointer'>Beneficiaries</p>

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
