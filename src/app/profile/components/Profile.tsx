'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import photo from '../../asset/image/photo.png'
import { ProfileContent } from './ProfileContent'
import { IoIosCamera } from 'react-icons/io'
import { userProfile } from '@/store/store'
import { LuMenuSquare } from 'react-icons/lu'

export const Profile = () => {
  const [sideNav, setSideNav] = useState<boolean>(false)
  const { activeMenu, setactiveMenu, setProfile, setEditProfile, editProfile } =
    userProfile(state => ({
      activeMenu: state.activeMenu,
      setactiveMenu: state.setactiveMenu,
      setProfile: state.setProfile,
      setEditProfile: state.setEditProfile,
      editProfile: state.editProfile
    }))

  const menu = ['my profile', 'auction win', 'my order', 'wallet', 'community']
  return (
    <section className='relative flex gap-5 '>
      <span
        className={`absolute left-0 top-0 cursor-pointer text-[#f25e26] lg:hidden `}
        onClick={() => setSideNav(!sideNav)}
      >
        <LuMenuSquare className='text-2xl' />
      </span>
      <section
        className={`  ${sideNav ? 'fixed right-0 top-0 h-full w-fit flex-col bg-white  px-4 pt-[4rem] lg:h-fit lg:w-[20dvw] lg:pt-0 ' : 'hidden lg:relative lg:flex lg:h-fit'} z-40   lg:flex lg:h-fit  lg:w-[20dvw] lg:bg-transparent lg:pt-0 lg:relative `}
      >
        <div className='flex flex-col justify-center lg:w-full'>
          <p className='w-max'>Hello, Alex </p>
          <h3 className='my-5 w-full text-xl font-semibold lg:text-3xl'>
            {activeMenu === 'my profile'
              ? 'Profile Details'
              : activeMenu === 'auction win'
                ? 'Auction Wins'
                : activeMenu === 'my order'
                  ? 'My Order'
                  : activeMenu === 'wallet'
                    ? 'My Wallet'
                    : 'Community'}
          </h3>
          <div className='flex flex-col lg:border lg:border-gray-500 rounded-md px-2'>
            <div className='relative justify-center flex items-center mt-2 '>
              <Image
                src={photo}
                alt={'profile'}
                className='relative h-auto  w-2/3 bg-cover '
                draggable={false}
              />
              <span
                className='absolute bottom-[0.3rem] lg:bottom-[0.3rem] right-[3.3rem] lg:right-[3.3rem] cursor-pointer rounded-full bg-[#FCDFD4] p-1'
                onClick={setProfile}
              >
                <IoIosCamera className='text-xl text-[#F25E26]' />
              </span>
            </div>
            <div className='py-3'>
              <ul className=''>
                {menu.map((val, index) => (
                  <li
                    key={index}
                    className={`w-full cursor-pointer rounded-lg px-3 py-2 capitalize hover:bg-[#F25E26] hover:text-white ${activeMenu === val ? 'bg-[#FCDFD4] ' : null}`}
                    onClick={() => setactiveMenu(val)}
                  >
                    {val}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className='span-2 flex w-full flex-col lg:items-center'>
        <div className='z-auto  flex justify-end items-end w-full'>
          {activeMenu === 'my profile' ? (
            <p className='brand1 w-fit cursor-pointer  lg:text-left  justify-end underline' onClick={setEditProfile}>
              {!editProfile ? 'Edit Profile' : 'Cancel'}
            </p>
          ) : null}
        </div>
        <div className='mt-5 flex lg:mx-12  '>
          <ProfileContent />
        </div>
      </section>
    </section>
  )
}
