'use client'
import React from 'react'
import { userProfile, useAuthStore } from '@/store/store'
import { ProfileForm } from "./ProfileForm"
import { useQueryData } from '@/hooks/useQueryData'
import { useGetDatanew } from '@/hooks/useGetData'


interface CardInfoItem {
  id?: number;
  title?: string;
  description?: string;
  imageUrl?: string;
  name?: string;
  image?: any;
  price?: string;
  images?: { id: string; product: string; image: string }[];
  discount?: string;
  reviews?: string;
  message?: string;

}

interface AuctionResponse {
  message?: any;
  data: CardInfoItem[];
  // add other fields as necessary
}

export const ProfileDetails = () => {

  const { userDetails, editProfile } = userProfile(state => ({
    userDetails: state.userDetails,
    editProfile: state.editProfile
  }))

  const { isLoggedIn, user, token } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token
  }))

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/view_profile/`;
    const userToken = token;

   const { data: userInfo, isLoading: userLoading } = useGetDatanew(url, "get_user_details", userToken);

  if (userLoading) {
    return <div>Loading...</div>;
  }

  const userData = isLoggedIn ? userInfo?.data : userDetails;

  // console.log(userData, 'userData')

  return (
  <section className='md:full mb-6 w-full lg:w-[50dvw]'>
      {!editProfile ? (
        <div className='mt-4 flex flex-col gap-8 p-8 shadow-lg'>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>first name</h3>
            <p className='text-semibold capitalize'>{userData?.first_name || userData?.firstname}</p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>last name</h3>
            <p className='text-semibold capitalize'>{userData?.last_name || userData?.lastname}</p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>email</h3>
            <p className='text-semibold'>{userData?.email}</p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>phone</h3>
            <p className='text-semibold capitalize'>{userData?.phone}</p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>address</h3>
            <p className='text-semibold capitalize'>{userData?.address}</p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>state</h3>
            <p className='text-semibold capitalize'>{userData?.state}</p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>local government area (LGA)</h3>
            <p className='text-semibold capitalize'>{userData?.lga}</p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>Residential Agency Number</h3>
            <p className='text-semibold capitalize'>{userData?.residential || userData?.residency}</p>
          </div>
        </div>
      ) : (
        <ProfileForm />
      )}
    </section>
  )
}
