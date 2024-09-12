'use client'
import { FaRegEye } from 'react-icons/fa6'
import { FaRegEyeSlash } from 'react-icons/fa'
import { SetStateAction, useEffect, useState } from 'react'
import { Modal } from '../../component/Modal'
import { DefaultButton, IconButton } from '@/app/component/Button'
import { FaPlus } from 'react-icons/fa6'
import { Deposite } from './Deposite'
import { ChangePin } from './ChangePin'
import { CreatePin } from './CreatePin'
import { useAuthStore, userProfile } from '@/store/store'
import success from '../../asset/verify.svg'
import { useGetDatanew } from '@/hooks/useGetData'
import Loading from '@/app/component/Loading'
import { ReferralPointsModal } from './ViewPoint'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutateData } from '@/hooks/useMutateData'

type ConfirmationModalProps = {
  amount: string;
  onClose: () => void;
};

const ConfirmationModal = ({ amount, onClose }: ConfirmationModalProps) => {


  const handleContinue = async () => {
    console.log(amount)
    onClose()

  }

    const [success, setSuccess] = useState(false)



      const router = useRouter();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    // resolver: yupResolver(ChangePass)
  })

  const Closefunc = () => {
    // setEditPassword()
    setSuccess(false)
    reset()
  }




  const handleSuccess = (data: any) => {
    // console.log(data, 'datttataaa', error)

    if (data.status === 201 || data.status === 200) {
     setSuccess(true)
    /*   toast.success(`${data?.data?.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => router.push('/profile')
      }); */
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
    console.log(data, 'datttataaa', error)
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
    "makepayment",
    handleSuccess,
    handleError,
  );



  const submitForm = async (data: any) => {
    // Simulate a successful form submission

    // Add your form submission logic here
    // console.log(data, 'datatat')
    const payload = {
      old_password: data?.oldpass,
      new_password: data?.newpass
    }

     mutate({
      url: "/api/makepayment",
      payload: { payload: payload, token: userToken },
      token: userToken
    });
  }

  return (
    <section className="fixed left-0 top-0 z-50 flex h-full w-screen items-center justify-center bg-[#000000d1] p-4">
      <div className="xs:w-[15em] flex h-auto w-[20em] flex-col gap-6 rounded-md bg-white p-6 md:w-[25em] lg:w-[30em]">
        <p className="text-center">You are going to deposit the amount of N {amount}</p>
        <div className="flex w-full gap-5 flex-col">
          <DefaultButton
            text="Continue"
            type="button"
            className="w-full rounded-md bg-[#E84526] p-3 text-white"
            handleClick={handleContinue}
          />
          <DefaultButton
            text="Back"
            type="button"
            className="w-full rounded-md border-2 border-[#E84526] p-3 text-[#E84526]"
            handleClick={onClose}
          />
        </div>
      </div>
    </section>
  );
};

export const WalletBalance = () => {
  const [showBalance, setShowBalance] = useState<boolean>(false);
  const [showPin, setShowPin] = useState<boolean>(false);
  const [createPin, setCreatePin] = useState<boolean>(false);
  const [viewPoint, setViewPoint] = useState<boolean>(false);
  const [changePin, setChangePin] = useState<boolean>(false);
  const [deposite, setDeposite] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

    const [depositAmount, setDepositAmount] = useState<string>('');

  const { successModal, setSuccessModal } = userProfile((state) => ({
    successModal: state.successModal,
    setSuccessModal: state.setSuccessModal,
  }));

  const handleSuccess = () => {
    setSuccessModal();
    setChangePin(false);
    setCreatePin(false);
  };

  const { userDetails, editProfile } = userProfile((state) => ({
    userDetails: state.userDetails,
    editProfile: state.editProfile,
  }));

  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));

  const [userData, setUserData] = useState<any>(null);
  const [isTokenReady, setIsTokenReady] = useState(false);
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/view_profile/`;

  const { data: userInfo, isLoading: userLoading } = useGetDatanew(url, 'get_user_details', token, {
    cacheTime: 0,
    staleTime: 0,
  });

  useEffect(() => {
    if (token) {
      setIsTokenReady(true);
    }
  }, [token]);

  useEffect(() => {
    if (isTokenReady) {
      if (isLoggedIn && userInfo) {
        setUserData(userInfo?.data || {});
      } else if (!isLoggedIn) {
        setUserData(userDetails);
      }
    }
  }, [isTokenReady, userInfo, isLoggedIn, userDetails]);

  if (userLoading || !userData) {
    return <Loading />;
  }


  const sampleReferralData = [
    { name: 'Alex Jones', points: 50, date: '12 Feb, 2024' },
    { name: 'Rachel Jade', points: 50, date: '12 Feb, 2024' },
    { name: 'Malik Berry', points: 50, date: '12 Feb, 2024' },
    { name: 'Alex Jones', points: 50, date: '12 Feb, 2024' },
  ];

  return (
    <div className="flex flex-col px-2">
      <div className="flex items-center justify-between">
        <p className="capitalize">available balance</p>
        <div onClick={() => setShowBalance(!showBalance)}>
          {showBalance ? <FaRegEyeSlash /> : <FaRegEye />}
        </div>
      </div>
      <div className="balance pt-1">
        <p className="text-2xl font-semibold slashed-zero leading-normal">
          {showBalance ? userInfo?.data?.my_wallet[0]?.balance : '*****'}
        </p>
      </div>

      <div className="wallet-pin flex items-center justify-between">
        <div className="flex items-center gap-8">
          <p>{showPin ? '1234' : '*****'}</p>
          <div onClick={() => setShowPin(!showPin)} className="justify-center text-sm">
            {showPin ? <FaRegEyeSlash /> : <FaRegEye />}
          </div>
        </div>
        <p className="cursor-pointer justify-end text-end text-sm capitalize" onClick={() => setCreatePin(!createPin)}>
          create pin
        </p>
      </div>

      <div className="flex justify-between py-4">
        <div className="flex flex-col">
          <p className="text-sm capitalize leading-snug">ajiroba point</p>
          <p className="text-sm font-semibold slashed-zero">{userInfo?.data?.my_wallet[0]?.point}</p>
        </div>
        <p className="cursor-pointer text-sm capitalize" onClick={() => setViewPoint(!viewPoint)}>
          view
        </p>
      </div>

      <div className="mt-10 flex w-full flex-col justify-between gap-4 md:flex-row lg:flex-row">
        <IconButton
          text="add money"
          type="button"
          className="flex items-center justify-center gap-1 justify-self-center rounded-lg bg-[#f25e26] p-2 text-xs capitalize text-white lg:w-max"
          icon={<FaPlus />}
          handleClick={() => setDeposite(true)}
        />
        <DefaultButton
          text="change pin"
          type="button"
          className="rounded-lg border-2 border-[#f25e26] p-2 text-xs capitalize text-[#f25e26] lg:w-max"
          handleClick={() => setChangePin(!changePin)}
        />
      </div>

      {deposite && (
       <Deposite
          handleClick={() => setDeposite(false)}
          handleNext={(amount: SetStateAction<string>) => {
            setDeposite(false)
            setDepositAmount(amount)
            setShowConfirmation(true)
          } } handleCancel={function (): void {
            throw new Error('Function not implemented.')
          } }        />
      )}

      {showConfirmation && (
        <ConfirmationModal
             amount={depositAmount}
          onClose={() => {
            setShowConfirmation(false);
          }}
        />
      )}

      {createPin && <CreatePin setCreatePin={setCreatePin} createPin={createPin} />}
      {changePin && <ChangePin changePin={changePin} setChangePin={setChangePin} />}
      {viewPoint && (
        <ReferralPointsModal isOpen={viewPoint} setIsOpen={setViewPoint} referralData={sampleReferralData} />
      )}

      {successModal && (
        <div className={`${successModal ? 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50' : 'hidden'}`}>
          <Modal
            buttoncount={1}
            icon={success}
            handleEvent={handleSuccess}
            title="Successful"
            subtitle={'You have successfully created your wallet pin'}
            buttontext="Proceed"
            buttonclass="w-full rounded-md bg-[#FCDFD4] p-3 hover:bg-[#f25e26] hover:text-white"
          />
        </div>
      )}
    </div>
  );
};
