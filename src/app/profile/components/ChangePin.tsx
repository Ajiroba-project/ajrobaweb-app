import React, { useRef, useEffect, useState } from 'react'
import verify from '@/app/asset/verify.svg'
import { CustomModal, Modal } from '../../component/Modal'
import { DefaultButton } from '@/app/component/Button'
import { InputField } from '@/app/recharge/components/FormField'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutateData } from '@/hooks/useMutateNewData'
import { useForm } from 'react-hook-form'
import { CreateNewPin } from './YupValidation'
import { useAuthStore, userProfile } from '@/store/store'
import { toast } from 'react-toastify'

export const ChangePin = ({ changePin, setChangePin }: any) => {
  const { successModal, setSuccessModal } = userProfile(state => ({
    successModal: state.successModal,
    setSuccessModal: state.setSuccessModal
  }))

    const [success, setSuccess] = useState(false)

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(CreateNewPin)
  })

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setChangePin(false) // Close modal if clicked outside
      }
    }

    if (changePin) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [changePin])





  const handleSuccess = (data: any) => {
    // console.log(data, 'datttataaa', error)




    if (data.status === 201 || data.status === 200) {
     setSuccess(true)
         setSuccessModal(!successModal)
    setChangePin(false)

      reset();
    } else if (data.status === 400 || data.status === 409) {
      toast.error(`${data?.data?.message || 'Password doesnt match' } `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    } else if (data.status === 401) {
      toast.error(`${data?.data?.message || 'Authentication error'} `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    }
    else if (data.status === 500) {
      toast.error(`${data?.data?.message || 'old_password'} `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    }
    else {
      toast.error(`${'An Error Occured' || 'Error'}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
    }
  };



  const handleError = (error: any) => {

    console.log(error, 'errrr')
    toast.error(`${'An Error Occured'}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    reset();
  };


    const { isLoggedIn, user, token } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token
  }))


  const userToken = token;

  const { data, error, isError, isSuccess, mutate, status } = useMutateData(
    'changewalletpin',
    handleSuccess,
    handleError
  )

  const submitForm = (data: any) => {



// console.log(data)
 const payload = {
      old_pin: data?.oldpass,
      new_pin: data?.newpass
    }

    console.log(payload, 'payload')

      mutate({
      url: "/api/changewalletpin",
      payload: { payload: payload, token: userToken },
      token: userToken
    });
  }



  return (
    <div>
      <CustomModal isOpen={changePin}>
        {changePin && (
          <>
            <div className="flex flex-col items-center justify-center gap-2">
              <h1 className="text-2xl">Change Pin</h1>
              <p className="w-auto text-center text-sm font-normal leading-6 text-[#353131]">
                Kindly Enter your new wallet pin
              </p>
            </div>

            {/* Wrap the modal content and form inside modalRef */}
            <div ref={modalRef}>
              <form
                onSubmit={handleSubmit(submitForm)}
                className="mb-5 flex w-full flex-col justify-center gap-3"
              >
                <InputField
                  label={'Old Pin'}
                  type="password"
                  name="oldpass"
                  register={register}
                  errors={errors}
                  classname="w-full p-3 border outline-[#FCDFD4] rounded-lg focus:outline-[#f25e26]"
                />
                <InputField
                  label={'New Pin'}
                  type="password"
                  name="newpass"
                  register={register}
                  errors={errors}
                  classname="w-full p-3 border outline-[#FCDFD4] rounded-lg focus:outline-[#f25e26]"
                />
                <InputField
                  label={'Confirm Pin'}
                  type="password"
                  name="confirmpass"
                  register={register}
                  errors={errors}
                  classname="w-full p-3 border outline-[#FCDFD4] rounded-lg focus:outline-[#f25e26]"
                />

                <DefaultButton
                  text={`${status === 'pending' ? '...' : 'Confirm'}`}
                  type={`submit`} // Changed this to submit to work with form
                  className="w-full rounded-md bg-[#FCDFD4] p-3 hover:bg-[#f25e26] hover:text-white"
                />
              </form>
            </div>
          </>
        )}
      </CustomModal>


   {
  success && (
    <Modal
      title="Password Updated Successfully"
      buttoncount={1}
      icon={verify}
      buttontype="button"
      buttonclass="w-full rounded-md bg-[#FCDFD4] p-4 hover:bg-[#F25E26] hover:text-white"
      buttontext="Proceed to Profile"
      handleEvent={() => setSuccess(false)}  // Fix: Use a function to set success
    />
  )
}

    </div>
  )
}
