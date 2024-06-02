import React from 'react'
import { useMutateData } from '@/hooks/useMutateData'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Electricitychema } from './YupValidations'
import { DefaultButton } from '../../component/Button'
import { InputField, SelectField } from './FormField'
import { ElectricityPurchase } from '@/store/store'
import { Formtitle } from './Formtitle'

type ElectricityProps = {
  disco: string
  meter: string
  amount: string
  meter_no: string
  phone: string
}

export const ElectricityDetails = () => {
  const setElectricityDetails = ElectricityPurchase(
    state => state.setElectricityDetails
  )
  const setElectricityStepper = ElectricityPurchase(
    state => state.setElectricityStepper
  )

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
    resolver: yupResolver(Electricitychema)
  })
  const disco = [
    'Ikeja Electricity payment -IKEDC',
    'Eko Electricity Payment -EKEDC',
    'Abuja Distribution Company'
  ]
  const plan = ['prepaid', 'postpaid']

  const sumbitForm = (data: ElectricityProps) => {
    // console.log('data=>', data)
    setElectricityDetails(data)
    setElectricityStepper(1)
  }

  return (
    <div className='container mt-[2rem] flex flex-col items-center justify-center gap-4 bg-[#F6F6F6] pb-16'>
      <Formtitle
        title='Buy Electricity Bills'
        subtitle='Enjoy your best TV programs by purchasing your subscription on our platform'
      />
      <div>
        <form
          className='flex flex-col gap-3'
          onSubmit={handleSubmit(sumbitForm)}
        >
          <SelectField
            name='disco'
            register={register}
            errors='errors'
            options={disco}
            label='Disco'
            showlabel={false}
          />
          <SelectField
            name='meter'
            register={register}
            errors='errors'
            options={plan}
            label='Meter type'
            showlabel={false}
          />
          <InputField
            name='meter_no'
            register={register}
            errors={errors}
            type='text'
            placeholder='Meter no'
          />
          <InputField
            name='amount'
            register={register}
            errors={errors}
            type='text'
            placeholder='Amount'
          />

          <InputField
            name='phone'
            register={register}
            errors={errors}
            type='text'
            placeholder='Phone Number'
          />

          <p className='underline text-end text-[#f25e26] cursor-pointer'>Beneficiaries</p>

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
