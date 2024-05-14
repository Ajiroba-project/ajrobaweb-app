'use client'
import React, { Fragment, useState } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { HeadingText } from '../component/Heading'
import { ChatBox } from '../component/ChatBox'
import { DefaultBreadCrumb } from '../component/Breadcrumb'
import { usePathName } from '@/hooks/usePathname'
import Image from 'next/image'
import call from '../asset/image/call.png'
import message from '../asset/image/message.png'
import location from '../asset/image/location.png'
import Input from '../component/Input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { DefaultButton } from '../component/Button'
import { useForm } from 'react-hook-form'
import { useMutateData } from '@/hooks/useMutateData'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type dataProps = {
  name: string
  phone: string
  subject: string
  email: string
}

const Page = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()
  const decodedPaths = usePathName()

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    phone: yup.string().required('Phone Number is required'),
    subject: yup.string().required('Subject is required'),
    message: yup.string().required('Message is required'),
    email: yup
      .string()
      .matches(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
        'Valid email is required'
      )
      .required('Email is required')
  })

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
    } else {
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
    'contactForm',
    handleSuccess,
    handleError
  )

  const sumbitForm = async (data: dataProps) => {
    mutate({
      url: '/api/contact',
      payload: data
    })
  }

  return (
    <Fragment>
      <Header />
      <ToastContainer closeOnClick />
      <main className='container mt-[3rem] '>
        <DefaultBreadCrumb paths={decodedPaths} />
        <div className='flex flex-col items-center justify-center'>
          <HeadingText title='Contact us' />
          <p className='py-2 text-center text-[#6E6E6E] lg:w-3/4'>
            Our customer support team is available during regular business hours
            to provide assistance and ensure your experience with us is smooth
            and enjoyable. We look forward to hearing from you
          </p>
        </div>

        <div className='m-[4rem] flex flex-col justify-between gap-4 pb-4 lg:flex-row'>
          <div className='flex flex-col items-center gap-2'>
            <Image src={call} alt='call' />
            <p className='font-semibold'>Phone Number</p>
            <p>+2349169881005</p>
          </div>

          <div className='flex flex-col items-center gap-2'>
            <Image src={location} alt='location' />
            <p className='font-semibold'>Location</p>
            <p>Head Office: 1 praiseHill Estate, Arepo Ogun State.</p>
          </div>

          <div className='flex flex-col items-center gap-2'>
            <Image src={message} alt='message' />
            <p className='font-semibold'>Email Address</p>
            <p>support@goprus.com</p>
          </div>
        </div>

        <div className='my-[5rem] flex flex-col items-center justify-center'>
          <HeadingText title='Send Us a Message' />
          <p className='py-2 text-center text-[#6E6E6E] lg:w-3/4'>
            Have a question, suggestion, or just want to say hello? {`We'd`}{' '}
            love to hear from you! Use the form below to send us a message, and
            our dedicated team will get back to you as soon as possible.
          </p>
          <form
            className='my-[4rem] grid grid-cols-1 items-center justify-center gap-3 md:grid-cols-2 lg:grid-cols-2'
            onSubmit={handleSubmit(sumbitForm)}
          >
            <Input
              name='name'
              placeholder='Your Name'
              register={register}
              errors={errors.name}
              type='text'
              className='bg-[#F6F6F6] text-[#504D4D]'
            />
            <Input
              name='email'
              placeholder='Your Email'
              register={register}
              errors={errors.email}
              type='email'
              className='bg-[#F6F6F6] text-[#504D4D]'
            />
            <Input
              name='phone'
              placeholder='Phone number'
              register={register}
              errors={errors.phone}
              type='text'
              className='bg-[#F6F6F6] text-[#504D4D]'
            />
            <Input
              name='subject'
              placeholder='Subject'
              register={register}
              errors={errors.subject}
              type='text'
              className='bg-[#F6F6F6] text-[#504D4D]'
            />

            <div className='md:col-span-2 lg:col-span-2'>
              <textarea
                placeholder='Message'
                rows={3}
                className='w-full resize-none border bg-[#F6F6F6] px-8 py-4 text-[#504D4D] focus:text-[#504D4D]'
                {...register('message', { required: true })}
              ></textarea>
              <div className='text-xs text-red-700'>
                {errors?.['message']?.message}
              </div>
            </div>
            <div className='flex justify-center md:justify-start lg:justify-start'>
              <DefaultButton
                text={`${status === 'pending' ? 'Sending...' : 'Send Message'}`}
                type='submit'
                className='rounded-md bg-[#FCDFD4] p-4 px-8'
                handleClick={() => {}}
              />
            </div>
          </form>
        </div>
        <div className='fixed bottom-20'>
          <ChatBox isOpen={isOpen}  />
        </div>
      </main>
      <Footer />
    </Fragment>
  )
}

export default Page
