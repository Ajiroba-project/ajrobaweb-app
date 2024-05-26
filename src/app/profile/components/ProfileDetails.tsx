import React from 'react'
import { userProfile } from '@/store/store'
import {ProfileForm} from "./ProfileForm"

export const ProfileDetails = () => {
  const { userDetails, editProfile } = userProfile(state => ({
    userDetails: state.userDetails,
    editProfile: state.editProfile
  }))

  return (
    <section className='mb-6  lg:w-[50dvw] w-full md:full '>
      {!editProfile ? (
        <div className='mt-4 flex flex-col gap-8 p-8 shadow-lg'>
          <div>
            <h3 className='capitalize text-[#6E6E6E] '>first name</h3>
            <p className='text-semibold capitalize'>{userDetails.firstname}</p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>last name</h3>
            <p className='text-semibold capitalize'>{userDetails.lastname}</p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>email</h3>
            <p className='text-semibold '>{userDetails.email}</p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>address</h3>
            <p className='text-semibold capitalize'>{userDetails.address}</p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>state</h3>
            <p className='text-semibold capitalize'>{userDetails.state}</p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>
              local government area (LGA)
            </h3>
            <p className='text-semibold capitalize'>{userDetails.lga}</p>
          </div>
          <div>
            <h3 className='capitalize text-[#6E6E6E]'>
              Residential Agency Number
            </h3>
            <p className='text-semibold capitalize'>{userDetails.residency}</p>
          </div>
        </div>
      ) : (
        <ProfileForm />
      )}
      
    </section>
  )
}
