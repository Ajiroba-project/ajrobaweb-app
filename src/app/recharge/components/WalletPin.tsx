import { DefaultButton } from '@/app/component/Button'
import { InputField } from './FormField'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutateData } from '@/hooks/useMutateData'
import { useForm } from 'react-hook-form'

import * as yup from 'yup'
import {
  userNavStore,
  DataPurchase,
  AirtimePurchase,
  ElectricityPurchase,
  CablePurchase
} from '@/store/store'

export const WalletPin = () => {
  const {
    setWalletModal,
    userNav,
    setStepper,
    setAirtimeStepper,
    setCableStepper,
    setElectricityStepper
  }
   = userNavStore(state => ({setWalletModal:state.setWalletModal, userNav:state.userNav, setStepper:state.setStepper, setAirtimeStepper:state.setAirtimeStepper, setElectricityStepper:state.setElectricityStepper, 
  setCableStepper:state.setCableStepper

    }))

  const pinSchema = yup.object().shape({
    pin: yup.string().required('pin is required')
  })

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(pinSchema)
  })

  const handleSuccess = () => {
    handlePay()
  }
  const handleError = () => {
    reset()
  }

  const {mutate, status } = useMutateData(
    'verify-pin',
    handleSuccess,
    handleError
  )

  const submitForm = (data: any) => {
    mutate(data)
  }

  const handlePay = () => {
    switch (userNav) {
      case 'Data':
        setStepper(2)
        setWalletModal()
        break
      case 'Airtime':
        setAirtimeStepper(2)
        setWalletModal()
        break
      case 'Electricity':
        setElectricityStepper(2)
        setWalletModal()
        break
      case 'Cable Subscription':
        setCableStepper(2)
        setWalletModal()
        break

      default:
        console.log('test failed', userNav)
        break
    }
  }

  return (
    <section className='fixed z-50 flex h-screen w-screen items-center justify-center bg-[#000000d1] '>
      <div className='xs:w-[15em] flex h-auto w-[20em] flex-col items-center justify-center gap-6 rounded-md bg-white p-8 text-center md:w-[25em] lg:w-[30em]'>
        <div className='flex-col gap-2'>
          <h1 className='text-2xl'>Wallet Pin</h1>
          <p className='w-auto text-center text-sm font-normal leading-6  text-[#353131]'>
            Kindly Enter your wallet pin
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submitForm)}
          className='flex w-2/3 flex-col justify-center gap-8'
        >
          <InputField
            label={'Enter Pin'}
            type='password'
            name='pin'
            register={register}
            errors={errors}
            classname='w-full p-3 border outline-[#FCDFD4] rounded focus:outline-[#f25e26]'
          />

          <DefaultButton
            text={`${status === 'pending' ? '...' : 'Pay'}`}
            type={`submit`}
            className={`w-full rounded-md bg-[#FCDFD4] p-3 hover:bg-[#f25e26] hover:text-white`}
            handleClick={handlePay}
          />
        </form>
      </div>
    </section>
  )
}
