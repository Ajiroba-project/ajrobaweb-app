import React, {useState} from 'react'
import { CustomModal } from '../../component/Modal'
import { DefaultButton } from '@/app/component/Button'
import { InputField } from '@/app/recharge/components/FormField'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutateData } from '@/hooks/useMutateData'
import { useForm } from 'react-hook-form'
import { CreateNewPin } from './YupValidation'
import { userProfile } from '@/store/store'



export const ChangePin = ({changePin, setChangePin}:any) => {
      const { successModal, setSuccessModal } = userProfile(state => ({
        successModal: state.successModal,
        setSuccessModal: state.setSuccessModal
      }))
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(CreateNewPin)
  })
  const handleSuccess = () => {
    setSuccessModal(!successModal)
    setChangePin(false)
  }
  const handleError = () => {}

  const { mutate, status } = useMutateData(
    'create-pin',
    handleSuccess,
    handleError
  )

  const submitForm = () => {
    setSuccessModal(!successModal)
    setChangePin(false)
  }
  return (
    <div>
      <CustomModal isOpen={changePin}>
        {changePin && (
          <>
            <div className='flex flex-col items-center justify-center gap-2'>
              <h1 className='text-2xl'> Change Pin</h1>
              <p className='w-auto text-center text-sm font-normal leading-6  text-[#353131]'>
                Kindly Enter your new wallet pin
              </p>
            </div>

            <form
              onSubmit={handleSubmit(submitForm)}
              className='mb-5 flex w-full flex-col justify-center gap-3'
            >
              <InputField
                label={'Old Pin'}
                type='password'
                name='newpass'
                register={register}
                errors={errors}
                classname='w-full p-3 border outline-[#FCDFD4] rounded-lg focus:outline-[#f25e26]'
              />
              <InputField
                label={'New Pin'}
                type='password'
                name='oldpass'
                register={register}
                errors={errors}
                classname='w-full p-3 border outline-[#FCDFD4] rounded-lg focus:outline-[#f25e26]'
              />
              <InputField
                label={'Confirm Pin'}
                type='password'
                name='confirmpass'
                register={register}
                errors={errors}
                classname='w-full p-3 border outline-[#FCDFD4] rounded-lg focus:outline-[#f25e26]'
              />

              <DefaultButton
                text={`${status === 'pending' ? '...' : 'Comfirm'}`}
                type={`button`}
                className={`w-full rounded-md bg-[#FCDFD4] p-3 hover:bg-[#f25e26] hover:text-white`}
                handleClick={submitForm}
              />
            </form>
          </>
        )}
      </CustomModal>

    </div>
  )
}
