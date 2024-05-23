'use client'
import React from 'react'
import Image from 'next/image'
import photo from '../../asset/image/photo.png'
import { ProfileContent } from './ProfileContent'
import { IoIosCamera } from 'react-icons/io'
import { userProfile } from '@/store/store'


export const Profile = () => {
  const { activeMenu, setactiveMenu, setProfile, setEditProfile, editProfile } =
    userProfile(state => ({
      activeMenu: state.activeMenu,
      setactiveMenu: state.setactiveMenu,
      setProfile: state.setProfile,
      setEditProfile: state.setEditProfile, 
      editProfile:state.editProfile
    }))
  
  

  const menu = ['my profile', 'auction win', 'my order', 'wallet', 'community']
  return (
    <section className='flex gap-5'>
      <section className='flex  flex-col lg:w-[20dvw] max-w-fit'>
        <p className=''>Hello, Alex</p>
        <div className='flex flex-col justify-center '>
          <h3 className='my-5 text-xl font-semibold lg:text-3xl w-full'>
            {activeMenu === "my profile" ?  'Profile Details':activeMenu === 'auction win' ? 'Auction Wins':activeMenu ==='my order' ?'My Order':activeMenu === 'wallet' ? "My Wallet":"Community"}
          </h3>
          <div className='flex flex-col '>
            <div className='relative'>
              <Image
                src={photo}
                alt={'profile'}
                className='relative h-auto  w-2/3 bg-cover '
                draggable={false}
              />
              <span
                className='absolute bottom-[0.7rem] right-[5rem] cursor-pointer rounded-full bg-[#FCDFD4] p-1'
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

      <section className='flex w-full flex-col '>
        <div className='flex justify-end ' onClick={setEditProfile}>
          {activeMenu === 'my profile' ? (
            <p className='brand1 cursor-pointer text-left underline'>
              {!editProfile ? "Edit Profile": "Cancel"}
            </p>
          ) : null}
        </div>
        <div className='mx-12 mt-5 flex self-center'>
          <ProfileContent />
        </div>
      </section>
    </section>
  )
}
