// import React, { useState } from 'react'
// import { Modal, CustomModal } from '../../component/Modal'
// import { DefaultButton, IconButton } from '@/app/component/Button'
// import { InputField } from '@/app/recharge/components/FormField'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { useMutateData } from '@/hooks/useMutateData'
// import { useForm } from 'react-hook-form'
// import { CreateNewPin } from './YupValidation'
// import { userProfile } from '@/store/store'

// export const CreatePin = ({ createPin, setCreatePin }: any) => {
//    const { successModal, setSuccessModal } = userProfile(state => ({
//      successModal: state.successModal,
//      setSuccessModal: state.setSuccessModal
//    }))



//   const {
//     reset,
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     mode: 'all',
//     resolver: yupResolver(CreateNewPin)
//   })
//   const handleSuccess = () => {
//     setCreatePin(false)
//     setSuccessModal(!successModal)
//   }
//   const handleError = () => {}

//   const { mutate, status } = useMutateData(
//     'create-pin',
//     handleSuccess,
//     handleError
//   )

//   const submitForm = () => {
//     setCreatePin(false)
//     setSuccessModal(!successModal)
//   }
//   return (
//     <div>
//       <CustomModal isOpen={createPin}>
//         {createPin && (
//           <>
//             <div className='flex flex-col items-center justify-center gap-2'>
//               <h1 className='text-2xl'>Create Wallet Pin</h1>
//               <p className='w-auto text-center text-sm font-normal leading-6  text-[#353131]'>
//                 Kindly Enter your wallet pin
//               </p>
//             </div>

//             <form
//               onSubmit={handleSubmit(submitForm)}
//               className='flex w-full flex-col justify-center gap-3'
//             >
//               <InputField
//                 label={'Enter Pin'}
//                 type='password'
//                 name='newpass'
//                 register={register}
//                 errors={errors}
//                 classname='w-full p-3 border outline-[#FCDFD4] rounded-lg focus:outline-[#f25e26]'
//               />
//               <InputField
//                 label={'Confirm Pin'}
//                 type='password'
//                 name='confirmpass'
//                 register={register}
//                 errors={errors}
//                 classname='w-full p-3 border outline-[#FCDFD4] rounded-lg focus:outline-[#f25e26]'
//               />

//               <DefaultButton
//                 text={`${status === 'pending' ? '...' : 'Comfirm'}`}
//                 type={`button`}
//                 className={`w-full rounded-md bg-[#FCDFD4] p-3 hover:bg-[#f25e26] hover:text-white`}
//                 handleClick={submitForm}
//               />
//             </form>
//           </>
//         )}
//       </CustomModal>

//       {/* {successModal && (
//         <div
//         className={`${successModal ? 'absolute left-0 top-0 z-50 -mt-[9rem] h-screen w-full' : 'hidden'}`}
//       >

//           <Modal
//             buttoncount={1}
//             icon={success}
//             handleEvent={handleSuccess}
//             title='Successful'
//             subtitle='You have successfully created your wallet pin'
//             buttontext='Proceed'
//             buttonclass='w-full rounded-md bg-[#FCDFD4] p-3 hover:bg-[#f25e26] hover:text-white'
//           />
//           </div>

//         )} */}
//     </div>
//   )
// }


import React, { useState, useRef, useEffect } from 'react'
import { CustomModal } from '../../component/Modal'
import { DefaultButton } from '@/app/component/Button'
import { InputField } from '@/app/recharge/components/FormField'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutateData } from '@/hooks/useMutateData'
import { useForm } from 'react-hook-form'
import { CreateNewPin } from './YupValidation'
import { useAuthStore, userProfile } from '@/store/store'
import { toast } from 'react-toastify'

export const CreatePin = ({ createPin, setCreatePin }: any) => {
  const { successModal, setSuccessModal } = userProfile(state => ({
    successModal: state.successModal,
    setSuccessModal: state.setSuccessModal
  }))

  // Create a ref to detect clicks outside the modal
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setCreatePin(false) // Close modal if clicked outside
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

  // const handleSuccess = () => {
  //   setCreatePin(false)
  //   setSuccessModal(!successModal)
  // }

  // const handleError = () => {}

  // const { mutate, status } = useMutateData(
  //   'create-pin',
  //   handleSuccess,
  //   handleError
  // )

  // const submitForm = (data: any) => {
  //   mutate(data) // Call the mutate function with form data to handle API submission
  // }




  const handleSuccess = (data: any) => {
    // console.log(data, 'datttataaa', error)




    if (data.status === 201 || data.status === 200) {
   /*   setSuccess(true) */
         setSuccessModal(!successModal)
  setCreatePin(false)

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



console.log(data)
 const payload = {
      old_pin: data?.oldpass,
      new_pin: data?.newpass
    }

    console.log(payload, 'payload')

      mutate({
      url: "/api/createwalletpin",
      payload: { payload: payload, token: userToken },
      token: userToken
    });
  }



  return (
    <div>
      <CustomModal isOpen={createPin}>
        {createPin && (
          <>
            {/* Wrap the entire modal content in modalRef */}
            <div ref={modalRef} className='flex flex-col items-center justify-center gap-2'>
              <h1 className='text-2xl'>Create Wallet Pin</h1>
              <p className='w-auto text-center text-sm font-normal leading-6 text-[#353131]'>
                Kindly Enter your wallet pin
              </p>

              {/* Form section */}
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
                  text={`${status === 'pending' ? '...' : 'Confirm'}`}
                  type='submit' // Changed this to 'submit' for form submission
                  className='w-full rounded-md bg-[#FCDFD4] p-3 hover:bg-[#f25e26] hover:text-white'
                />
              </form>
            </div>
          </>
        )}
      </CustomModal>
    </div>
  )
}


