import React, { useState } from 'react'
import { Modal, CustomModal } from '../../component/Modal'
import { DefaultButton, IconButton } from '@/app/component/Button'
import { InputField } from '@/app/recharge/components/FormField'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutateData } from '@/hooks/useMutateData'
import { useForm } from 'react-hook-form'
import { CreateNewPin } from './YupValidation'
import { userProfile } from '@/store/store'

export const CreatePin = ({ createPin, setCreatePin }: any) => {
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
    setCreatePin(false)
    setSuccessModal(!successModal)
  }
  const handleError = () => {}

  const { mutate, status } = useMutateData(
    'create-pin',
    handleSuccess,
    handleError
  )

  const submitForm = () => {
    setCreatePin(false)
    setSuccessModal(!successModal)
  }
  return (
    <div>
      <CustomModal isOpen={createPin}>
        {createPin && (
          <>
            <div className='flex flex-col items-center justify-center gap-2'>
              <h1 className='text-2xl'>Create Wallet Pin</h1>
              <p className='w-auto text-center text-sm font-normal leading-6  text-[#353131]'>
                Kindly Enter your wallet pin
              </p>
            </div>

            <form
              onSubmit={handleSubmit(submitForm)}
              className='flex w-full flex-col justify-center gap-3'
            >
              <InputField
                label={'Enter Pin'}
                type='password'
                name='newpass'
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
     
      {/* {successModal && (
        <div
        className={`${successModal ? 'absolute left-0 top-0 z-50 -mt-[9rem] h-screen w-full' : 'hidden'}`}
      >
       
          <Modal
            buttoncount={1}
            icon={success}
            handleEvent={handleSuccess}
            title='Successful'
            subtitle='You have successfully created your wallet pin'
            buttontext='Proceed'
            buttonclass='w-full rounded-md bg-[#FCDFD4] p-3 hover:bg-[#f25e26] hover:text-white'
          />
          </div>
      
        )} */}
    </div>
  )
}
