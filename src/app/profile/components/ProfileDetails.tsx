import React from 'react'
import { userProfile,useAuthStore } from '@/store/store'
import {ProfileForm} from "./ProfileForm"

export const ProfileDetails = () => {
  const { userDetails, editProfile } = userProfile(state => ({
    userDetails: state.userDetails,
    editProfile: state.editProfile
  }))
  const {isLoggedIn, user} = useAuthStore(state=>({
    isLoggedIn: state.isLoggedIn,
    user: state.user
  }))

  return (
    <section className='md:full  mb-6 w-full lg:w-[50dvw] '>
      {!editProfile ? (
        <div className='mt-4 flex flex-col gap-8 p-8 shadow-lg'>
          <div>
            <h3 className='capitalize text-[#6E6E6E] '>first name</h3>
            <p className='text-semibold capitalize'>
              {isLoggedIn
                ? `${user?.data.first_name}`
                : `${userDetails.firstname}`}
            </p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>last name</h3>
            <p className='text-semibold capitalize'>
              {isLoggedIn
                ? `${user?.data.last_name}`
                : `${userDetails.lastname}`}
            </p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>email</h3>
            <p className='text-semibold '>
              {isLoggedIn ? `${user?.data.email}` : `${userDetails.email}`}
            </p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>phone</h3>
            <p className='text-semibold capitalize'>
              {isLoggedIn ? `${user?.data.phone}` : `${userDetails.phone}`}
            </p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>address</h3>
            <p className='text-semibold capitalize'>
              {isLoggedIn ? `${user?.data.address}` : `${userDetails.address}`}
            </p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>state</h3>
            <p className='text-semibold capitalize'>
              {isLoggedIn ? `${user?.data.state}` : `${userDetails.state}`}
            </p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>
              local government area (LGA)
            </h3>
            <p className='text-semibold capitalize'>
              {isLoggedIn ? `${user?.data.lga}` : `${userDetails.lga}`}
            </p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>
              Residential Agency Number
            </h3>
            <p className='text-semibold capitalize'>
              {isLoggedIn ? `${user?.data.residential}` : `${userDetails.residency}`}
            </p>
          </div>
        </div>
      ) : (
        <ProfileForm />
      )}
    </section>
  )
}
