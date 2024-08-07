'use client'
import React from 'react'
import { Header } from './component/Header'
import { Tables } from './component/Tables'
import { DefaultButton } from '../component/Button'
import {useRouter} from "next/navigation"
import Image from 'next/image'
import applestore from '../asset/image/apple.png'
import androidstore from '../asset/image/android.png'
import useAuthMiddleware from '@/hooks/useAuth'
import { useAuthOrders } from '@/hooks/useAuthOrders'
// import { useAuthOrders } from '@/hooks/useAuthOrders'
import { useSearchParams } from "next/navigation";
import { useAuthStore } from '@/store/store'
import { useGetProductData } from '@/hooks/useGetData'

const Page = () => {
  const router = useRouter();
  useAuthOrders(router);

   const searchParams = useSearchParams();
  const order_id = searchParams.get("transId");

//   console.log("order_id", order_id);


 /*  const profile = userProfile((state) => state.profile); */
  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));
  const userToken = token;


  const {
    data: productinfo,
    isLoading: productLoading,
    error: producterror,
  } = useGetProductData(
    "/api/productreceiptbyid",
    userToken,
    order_id,
    "get_product_receipt"
  );

  console.log("productinfo", productinfo?.data);

  return (
    <section  >
      <div className='bg-gray-100 py-8' >
       <div style={{
        margin: '0 auto',
        width: '90%'
       }} >
         <Header />
       </div>
      </div>
      <div className='flex flex-col items-center py-8'>
        <p className='brand3 text-[#A09F9F] font-Poppins text-[12px]'>Transaction Amount</p>
        <p className='text-2xl font-semibold font-Poppins'>₦{productinfo?.data?.amount}</p>
      </div>
      <section className=''>
        <div>
          <Tables Data={productinfo?.data}  />
        </div>
      </section>
      <div className="container" style={{
        margin: '0 auto',
        width: '90%',
       }}>
        <h3 className='text-left font-medium text-sm text-[#353131] mt-12 font-Poppins'>Download our mobile app on:</h3>
      </div>

      <section className='container my-8 flex  flex-col items-center gap-8 '>

        <div className='flex justify-center gap-3'>
          <div>
            <Image
              src={androidstore}
              alt='android'
              width={190}
              className='cursor-pointer'
            />
          </div>
          <div>
            <Image
              src={applestore}
              alt='apple'
              width={190}
              className='cursor-pointer'
            />
          </div>
        </div>

        <div>
          <p className='brand3 container text-center font-medium text-[12px] text-[#A09F9F] mt-12 font-Poppins'>
            This electronically generated receipt is provided for informational
            purposes only and is not a legally binding document.
          </p>
        </div>
        <DefaultButton
          text='Download Receipt'
          type='button'
          handleClick={() => {}}
          className='my-6 rounded-lg bg-[#FCDFD4] text-[#2A2A2A] p-4 px-10 hover:bg-[#F25E26] hover:text-white'
        />
      </section>
    </section>
  )
}

export default Page
