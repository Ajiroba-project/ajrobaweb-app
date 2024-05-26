import React from 'react'
import { InputField, SelectField } from '@/app/recharge/components/FormField'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProfileSchema } from './YupValidation'
// import { useMutateData } from '@/hooks/useMutateData'
import { useForm } from 'react-hook-form'
import { Modal } from '../../component/Modal'
import { DefaultButton } from '@/app/component/Button'
import { userProfile } from '@/store/store'
import {ChangePassword} from "./ChangePassword"
import verify from '../../asset/verify.svg'

export const ProfileForm = () => {
  const {
    successModal,
    setSuccessModal,
    setUserDetails,
    setEditProfile,
    editPassword,
    setEditPassword
  } = userProfile(state => ({
    successModal: state.successModal,
    setSuccessModal: state.setSuccessModal,
    setUserDetails: state.setUserDetails,
    setEditProfile: state.setEditProfile,
    editPassword: state.editPassword, 
    setEditPassword:state.setEditPassword
  }))
  

  const state = ['Lagos', 'Ogun']
  const lga = ['Oshodi', 'Ikeja', 'Ijumota']

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    mode: 'all',
    resolver: yupResolver(ProfileSchema)
  })

  // const handleSuccess = () => {
  //   setSuccessModal
    
  //   setEditProfile
  //   reset()
  // }

  // const handleError = () => {
  //   alert("An error Occured")
  //   reset()
  // }

  // const { data, mutate, status } = useMutateData(
  //   'profileUpload',
  //   handleSuccess,
  //   handleError
  // )

  const submitForm = async (data: any) => {
    setSuccessModal()
    setEditProfile()
    setUserDetails(data)
    reset()
  }

  return (
    <div className='flex flex-col'>
      <form onSubmit={handleSubmit(submitForm)} className='flex flex-col'>
        <div className='flex flex-col gap-4 lg:flex-row lg:gap-10'>
          <InputField
            label='First Name*'
            name='firstname'
            type='text'
            placeholder='Enter FirstName'
            register={register}
            errors={errors}
          />
          <InputField
            label='Last name*'
            name='lastname'
            type='text'
            placeholder='Enter LastName'
            register={register}
            errors={errors}
          />
        </div>
        <div className='flex flex-col gap-4 lg:flex-row lg:gap-10'>
          <InputField
            label='Email Address*'
            name='email'
            type='text'
            placeholder='Enter Email Address'
            register={register}
            errors={errors}
          />
          <InputField
            label='Phone No*'
            type='text'
            placeholder='Enter Phone No'
            name='phone'
            register={register}
            errors={errors}
          />
        </div>
        <div className='flex lg:items-center  lg:flex-row flex-col py-2 lg:py-0'>
          <InputField
            name='pass'
            type='text'
            placeholder='********'
            register={register}
            errors={errors}
            label='Password'
            isdisabled
            classname='lg:p-3  bg-transparent outline-none lg:w-1/2 w-full'
          />
          <div>
            <p className='brand1 cursor-pointer w-fit lg:text-md text-xs' onClick={setEditPassword}>
              Change password
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-4 lg:flex-row lg:gap-10'>
          <InputField
            label='Address*'
            name='address'
            type='text'
            placeholder='Enter Address'
            register={register}
            errors={errors}
          />
          <SelectField
            label='State*'
            name='state'
            register={register}
            errors={errors}
            options={state}
            showlabel
          />
        </div>
        <div className='flex flex-col gap-4 pt-2 lg:flex-row lg:gap-10'>
          <SelectField
            label='Local Government Area(LGA)*'
            name='lga'
            register={register}
            errors={errors}
            options={lga}
            showlabel
          />
          <div>
            <InputField
              type='text'
              placeholder='Enter R.A Number'
              name='ran'
              register={register}
              errors={errors}
              label='Residential Agency Number(optional)'
            />
            <p className='text-sm italic text-gray-300'>
              (such as LASRRA etc.)
            </p>
          </div>
        </div>
        <div className='mt-8 flex w-full justify-center'>
          <DefaultButton
            text={`${status === 'pending' ? 'Updating...' : 'Update Profile'}`}
            type='submit'
            className='w-[80%] rounded-md bg-[#FCDFD4] p-4 hover:bg-[#F25E26] hover:text-white '
          />
        </div>
      </form>

      <div className={`${successModal ? 'absolute left-0 top-0' : 'hidden'} `}>
        <Modal
          buttoncount={1}
          title='Profile Updated Successfully '
          icon={verify}
          buttontype='button'
          buttonclass='w-full rounded-md bg-[#FCDFD4] p-4 hover:bg-[#F25E26] hover:text-white'
          buttontext='Proceed to Profile'
          handleEvent={setSuccessModal}
        />
      </div>

      <div className={`${editPassword ? 'absolute left-0 top-0' : 'hidden'}`}>
        <ChangePassword />
      </div>
    </div>
  )
}
