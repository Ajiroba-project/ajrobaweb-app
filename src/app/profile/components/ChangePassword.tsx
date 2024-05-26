'use Client'
import React, { useState } from 'react'
import { InputField } from '../../recharge/components/FormField'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChangePass } from './YupValidation'
// import { useMutateData } from '@/hooks/useMutateData'
import { useForm } from 'react-hook-form'
import { DefaultButton } from '@/app/component/Button'
import { userProfile } from '@/store/store'
import { Modal } from '@/app/component/Modal'
import verify from '../../asset/verify.svg'

export const ChangePassword = () => {
  const [success, setSuccess] = useState(false)

  const { editPassword, setEditPassword, setSuccessModal } = userProfile(
    state => ({
      editPassword: state.editProfile,
      setEditPassword: state.setEditPassword,
      setSuccessModal: state.setSuccessModal
    })
  )

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    mode: 'all',
    resolver: yupResolver(ChangePass)
  })

  const Closefunc = () => {
    setEditPassword()
    setSuccess(false)
    reset()
  }
  const submitForm = async (data: any) => {
    setEditPassword()
    setSuccessModal()
    setSuccess(false)
    reset()
  }
  return (
    <section className='fixed z-50 flex h-screen w-screen items-center justify-center bg-[#000000d1] '>
      {!success ? (
        <div className='flex h-auto flex-col items-center justify-center gap-6 rounded-md bg-white p-8  '>
          <form onSubmit={handleSubmit(submitForm)} className='flex flex-col'>
            <div>
              <InputField
                label='Old Password'
                type='password'
                placeholder='*****'
                name='oldpass'
                register={register}
                errors={errors}
              />
              <p className='text-xs italic'>minimum of 6 characters</p>
            </div>
            <div>
              <InputField
                label='New Password'
                type='password'
                placeholder='*****'
                name='newpass'
                register={register}
                errors={errors}
              />
              <p className='text-xs italic'>minimum of 6 characters</p>
            </div>
            <div>
              <InputField
                label='Confirm Password'
                type='password'
                placeholder='*****'
                name='confirmpass'
                register={register}
                errors={errors}
              />
              <p className='text-xs italic'>minimum of 6 characters</p>
            </div>
            <div className='mt-5 flex justify-between'>
              {/* buttons */}
              <DefaultButton
                text='Cancel'
                className='rounded-md border-2 border-[#F25E26] p-2 text-[#F25E26]'
                type='button'
                handleClick={Closefunc}
              />
              <DefaultButton
                text='Save'
                className=' rounded-md bg-[#F25E26] p-2 px-4 text-white'
                type='submit'
              />
            </div>
          </form>
        </div>
      ) : (
        <Modal
          title='Password Updated Successfully'
          buttoncount={1}
          icon={verify}
          buttontype='button'
          buttonclass='w-full rounded-md bg-[#FCDFD4] p-4 hover:bg-[#F25E26] hover:text-white'
          buttontext='Proceed to Profile'
          handleEvent={submitForm}
        />
      )}
    </section>
  )
}
