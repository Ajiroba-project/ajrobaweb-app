import { FaRegEye } from 'react-icons/fa6'
import { FaRegEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { Modal } from '../../component/Modal'
import { DefaultButton, IconButton } from '@/app/component/Button'
import { FaPlus } from 'react-icons/fa6'
import { Deposite } from './Deposite'
import { ChangePin } from './ChangePin'
import { CreatePin } from './CreatePin'
import { userProfile } from '@/store/store'
import success from '../../asset/verify.svg'

export const WalletBalance = () => {
  const [showBalance, setShowBalance] = useState<boolean>(false)
  const [showPin, setShowPin] = useState<boolean>(false)
  const [createPin, setCreatePin] = useState<boolean>(false)
  const [changePin, setChangePin] = useState<boolean>(false)
  const [deposite, setDeposite] = useState<boolean>(false)
  const { successModal, setSuccessModal } = userProfile(state => ({
    successModal: state.successModal,
    setSuccessModal: state.setSuccessModal
  }))

  const handleSuccess = () => {
    setSuccessModal()
    setChangePin(false)
    setCreatePin(false)
  }

  return (
    <div className='flex flex-col px-2'>
      {/* balance */}
      <div className='flex items-center justify-between'>
        <p className='capitalize'>available balance</p>
        <div onClick={() => setShowBalance(!showBalance)}>
          {showBalance ? <FaRegEyeSlash /> : <FaRegEye />}
        </div>
      </div>
      <div className='balance pt-1'>
        <p className='text-2xl font-semibold  slashed-zero  leading-normal'>
          {showBalance ? '₦ 20,000.00' : '*****'}
        </p>
      </div>
      {/* pin */}
      <div className='wallet-pin flex items-center justify-between'>
        <div className='flex items-center gap-8  '>
          <p>{showPin ? '1234' : '*****'}</p>
          <div
            onClick={() => setShowPin(!showPin)}
            className='justify-center text-sm'
          >
            {showPin ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
        </div>
        <p
          className='cursor-pointer justify-end text-end text-sm capitalize'
          onClick={() => setCreatePin(!createPin)}
        >
          create pin
        </p>
      </div>
      {/* points */}
      <div className='flex justify-between py-4'>
        <div className='flex flex-col'>
          <p className='text-sm capitalize leading-snug'>ajiroba point</p>
          <p className='text-sm font-semibold slashed-zero'>₦ 150</p>
        </div>
        <p className='cursor-pointer text-sm capitalize'>view</p>
      </div>
      {/* buttons */}
      <div className='mt-10 flex  w-full flex-col justify-between gap-4 md:flex-row lg:flex-row '>
        <IconButton
          text='add money'
          type='button'
          className='flex items-center justify-center gap-1 justify-self-center rounded-lg bg-[#f25e26] p-2 text-xs capitalize text-white lg:w-max'
          icon={<FaPlus />}
          handleClick={() => setDeposite(!deposite)}
        />
        <DefaultButton
          text='change pin'
          type='button'
          className='rounded-lg border-2 border-[#f25e26] p-2 text-xs capitalize text-[#f25e26] lg:w-max'
          handleClick={() => setChangePin(!changePin)}
        />
      </div>
      {/* custom modals */}
      {deposite && <Deposite handleClick={() => setDeposite(!deposite)} />}

      {createPin && (
        <CreatePin setCreatePin={setCreatePin} createPin={createPin} />
      )}
      {changePin && (
        <ChangePin changePin={changePin} setChangePin={setChangePin} />
      )}
      {successModal && (
        <div
          className={`${successModal ? 'fixed left-0 top-0 z-50 h-screen w-screen' : 'hidden'}`}
        >
          <Modal
            buttoncount={1}
            icon={success}
            handleEvent={handleSuccess}
            title='Successful'
            subtitle={
               'You have successfully created your wallet pin'
            }
            buttontext='Proceed'
            buttonclass='w-full rounded-md bg-[#FCDFD4] p-3 hover:bg-[#f25e26] hover:text-white'
          />
        </div>
      )}
    </div>
  )
}
