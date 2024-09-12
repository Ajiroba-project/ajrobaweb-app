import React, { useState, useRef, useEffect } from 'react'
import { CustomModal } from '../../component/Modal'
import { DefaultButton } from '@/app/component/Button'
import { InputField } from '@/app/recharge/components/FormField'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutateData } from '@/hooks/useMutateData'
import { useForm } from 'react-hook-form'
import { CreateNewPin } from './YupValidation'
import { userProfile } from '@/store/store'

export const MakePayment = ({handleClick , createPin, setCreatePin,  amount, onConfirm, onCancel }: any) => {
  const { successModal, setSuccessModal } = userProfile(state => ({
    successModal: state.successModal,
    setSuccessModal: state.setSuccessModal
  }))

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setCreatePin(false)
      }
    }

    if (createPin) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [createPin])

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

  const submitForm = (data: any) => {
    mutate(data)
  }

  return (
    <div>
      <CustomModal isOpen={createPin}>
        {createPin && (
          <>
            <div ref={modalRef} className='flex flex-col items-center justify-center gap-2'>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full text-center">
        <p className="text-md text-gray-700">
          You are going to deposit the amount of <span className="font-bold">₦ {amount}</span>
        </p>
        <div className="mt-6">
          <button
            onClick={onConfirm}
            className="bg-[#E4572E] text-white py-2 px-4 rounded-md w-full mb-2"
          >
            Continue
          </button>
          <button
            onClick={onCancel}
            className="border border-[#E4572E] text-[#E4572E] py-2 px-4 rounded-md w-full"
          >
            Back
          </button>
        </div>
      </div>
    </div>
            </div>
          </>
        )}
      </CustomModal>
    </div>
  )
}