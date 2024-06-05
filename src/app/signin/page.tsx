'use client'
import Link from 'next/link'
import Brand from '../asset/logo.svg'
import Image from 'next/image'
import AuthHero from '../component/AuthHero'
import { DefaultButton } from '../component/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Input from '../component/Input'
import { useRouter } from 'next/navigation'
import { FaRegEyeSlash } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa6'
import { useMutateData } from '@/hooks/useMutateData'
import { ToastContainer, toast } from 'react-toastify'

import { useAuthStore } from '@/store/store'

import 'react-toastify/dist/ReactToastify.css'

function Page() {
  type dataProps = {
    // email: string;
    email_or_phone?: string

    password: string
  }

  const router = useRouter()

  const emailOrPhoneNumberSchema = yup.string().matches(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$|^(\+\d{1,3}[- ]?)?\d{10}$/, // Regular expression for a string containing either a valid email or a valid phone number
    'Valid email or phone number is required'
  )

  const schema = yup.object().shape({


    email_or_phone: emailOrPhoneNumberSchema.required(
      'Email or phone number is required'
    ),

    password: yup
      .string()
      .required('Password is required')
      .min(6, "Can't be lesser than 6 digits")
  })

  const { setUser, isLoggedIn, setAuthCookie } = useAuthStore(state => ({
    setUser: state.setUser,
    isLoggedIn: state.isLoggedIn,
    setAuthCookie: state.setAuthCookie
  }))

  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  })

  const handleSuccess = (data: any) => {
    console.log(data, 'datatta----1')
    console.log(data.data.status)

    if (data.status === 200) {
      toast.success(`${data?.data?.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        onClose: () => router.push('/')
      })
      setAuthCookie(data?.data?.token, 0)
      setUser(data?.data)

      reset()
    } else if (data.status === 403 || data.status === 404) {
      toast.error(`${data?.data?.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      reset()
    } else if (data.status === 401 || data.data.status === 'failed') {
      toast.error(`${'Incorrect login details'}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      reset()
    }


    else {
      toast.error(`${data?.data?.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      reset()
    }
  }

  const handleError = (error: any) => {

    toast.error(`${'An Error Occured'}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })
    reset()
  }

  const { data, error, isError, isSuccess, mutate, status } = useMutateData(
    'signin',
    handleSuccess,
    handleError
  )

  const sumbitForm = async (data: dataProps) => {
    // console.log(data, 'datatat')

    mutate({
      url: '/api/signin',
      payload: data
    })
  }

  // console.log(data, 'datat')
  // console.log(error, 'error')

  return (
    <>
      <div className='px-4 '>
        <ToastContainer closeOnClick />
        <nav className='Brand-logo  flex justify-center p-6 px-7 md:block lg:block lg:px-14   xl:block 2xl:block '>
          <Link href={'/'}>
            <Image src={Brand} alt='brand-logo' />
          </Link>
        </nav>

        <AuthHero title='Welcome Back' menu='Sign in to shop on Ajiroba' />

        <div className=' mb-20 flex justify-center '>
          <form onSubmit={handleSubmit(sumbitForm)}>
            <div className='mt-12 grid grid-cols-1 gap-8 px-3 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1'>
              <div className='flex flex-col'>
                <Input
                  label='Email Address/Phone Number*'
                  type='text'
                  name='email_or_phone'
                  placeholder='Enter your Email or Phone number'
                  register={register}
                  errors={errors?.email_or_phone}
                />
                <div className='text-xs text-red-700'>
                  {errors?.email_or_phone?.message}
                </div>
              </div>

              <div className='flex flex-col'>
                <Input
                  label=' Password'
                  type='password'
                  name='password'
                  placeholder='****'
                  register={register}
                  errors={errors.password}
                  HiEyeSlash={<FaRegEyeSlash />}
                  HiEye={<FaRegEye />}
                />
                <div className='text-xs text-red-700'>
                  {errors?.password?.message}
                </div>
              </div>
            </div>
            <div className='mt-4 flex items-center justify-center'>
              <DefaultButton
                type='submit'
                className=' h-10 w-full bg-[#FCDFD4] text-sm hover:bg-[#E84526] hover:text-white'
                text={status === 'pending' ? 'loading...' : 'Sign in'}
                handleClick={() => console.log('')}
              />
            </div>

            <div className='mt-4 flex flex-wrap items-center justify-between gap-2'>
              <div>
                <input
                  type='checkbox'
                  id='agreement'
                  value='true'
                  className='text-wdc-inactivebutton mr-2'
                />
                <span className='text-sm'>Remember me</span>
              </div>
              <div onClick={() => router.push('forgot-password')}>
                <span className='cursor-pointer'>Forgot password?</span>
              </div>
            </div>

            <div className='mt-4 flex items-center justify-center'>
              <small className='text-base'>
                Don`t have an account?
                <span
                  onClick={() => router.push('/signup')}
                  className='cursor-pointer text-sm  text-[#F25E26] '
                >
                  {' '}
                  Sign up
                </span>
              </small>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Page
