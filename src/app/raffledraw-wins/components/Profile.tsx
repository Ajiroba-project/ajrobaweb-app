'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import photo from '../../asset/image/photo.png';
import { IoIosCamera } from 'react-icons/io';
import { userProfile, useAuthStore, profilePhoto } from '@/store/store';
import { LuMenu } from 'react-icons/lu';
import { useGetDatanew } from '@/hooks/useGetData';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';
import { AuctionDetails } from './AuctionDetails';

const menu = [
  { name: 'my profile', path: '/profile' },
  { name: 'raffle draw wins', path: '/raffledraw-wins' },
  { name: 'wallet', path: '/wallet' },
  { name: 'community', path: '/community' }
];

export const Profile = () => {
  const [sideNav, setSideNav] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const {
    activeMenu,
    setactiveMenu,
    setProfile,
    userDetails,
  } = userProfile((state) => ({
    activeMenu: state.activeMenu,
    setactiveMenu: state.setactiveMenu,
    setProfile: state.setProfile,
    userDetails: state.userDetails,
  }));

  const { profileurl, setProfileurl } = profilePhoto((state) => ({
    profileurl: state.profileurl,
    setProfileurl: state.setProfileurl,
  }));

  const { isLoggedIn } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));

  useEffect(() => {
    setactiveMenu('auction wins');
  }, [setactiveMenu]);

  const userToken = Cookies.get('token') as string;

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/view_profile/`;

  const { data: userInfo } = useGetDatanew(url, 'get_user_details', userToken || " ");

  useEffect(() => {
    if (isLoggedIn && userInfo?.profile_image_url) {
      setProfileurl(userInfo.profile_image_url);
    }
  }, [isLoggedIn, userInfo, setProfileurl]);

  const userData = isLoggedIn ? userInfo?.data : userDetails;

  const userphoto = profileurl || userDetails?.profile_image_url || '';

  const headingMap: Record<string, string> = {
    'my profile': 'Profile Details',
    'raffle draw wins': 'Auction Wins',
    'my order': 'My Order',
    'wallet': 'My Wallet',
  };

  return (
    <section className="relative flex gap-5">
      

      {sideNav && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[1001] lg:hidden"
          onClick={() => setSideNav(false)}
        />
      )}

      <section
        className={`${
          sideNav
            ? 'fixed left-0 top-0 h-full w-80 max-w-[85vw] flex-col bg-white pt-[7rem] px-4 z-[1002] transform translate-x-0'
            : 'fixed left-0 top-0 h-full w-80 max-w-[85vw] flex-col bg-white pt-[7rem] px-4 z-[1002] transform -translate-x-full'
        } lg:relative lg:z-auto lg:flex lg:h-fit lg:w-[20dvw] lg:bg-transparent lg:pt-0 lg:transform-none lg:translate-x-0 transition-transform duration-300 ease-in-out lg:transition-none`}
      >
        <button
          className="lg:hidden absolute top-[7.5rem] right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          onClick={() => setSideNav(false)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col justify-center lg:w-full">
          <p className="w-max">Hello, {userData?.first_name || userData?.firstname} </p>
          <h3 className="my-5 w-full text-xl font-semibold lg:text-2xl font-Poppins text-[#111111]">
            {headingMap[activeMenu] || 'Community'}
          </h3>
          <div className="border rounded flex flex-col px-2">
            <div className="relative justify-center flex items-center mt-2">
              <Image
                src={userphoto || photo}
                width={50}
                height={50}
                alt={'profile'}
                className="w-24 h-24 rounded-full object-cover"
                draggable={false}
              />

              <span
                className="absolute bottom-[0.3rem] lg:bottom-[0.3rem] right-[3.3rem] lg:right-[3.3rem] cursor-pointer rounded-full bg-[#FCDFD4] p-1"
                onClick={setProfile}
              >
                <IoIosCamera className="text-xl text-[#F25E26]" />
              </span>
            </div>
            <div className="py-3 shadow-sm">
              <ul>
                {menu.map((val, index) => (
                  <li
                    key={index}
                    className={`w-full cursor-pointer rounded-lg px-3 py-2 capitalize hover:bg-[#F25E26] hover:text-white ${pathname.includes(val.path) ? 'bg-[#FCDFD4]' : ''}`}
                    onClick={() => {
                      router.push(val.path);
                      setSideNav(false);
                    }}
                  >
                    {val.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="span-2 flex w-full flex-col lg:items-center pt-2 lg:pt-0">
        {!sideNav && (
          <div className="static top-24 self-start lg:hidden z-10 py-2">
            <span
              className="cursor-pointer text-[#f25e26] rounded-full bg-white shadow-md p-2.5 inline-flex"
              onClick={() => setSideNav(true)}
            >
              <LuMenu className="text-2xl" />
            </span>
          </div>
        )}
        <div className="mt-2 flex lg:mx-12 w-full">
           <AuctionDetails /> 
        </div>
      </section>
    </section>
  );
};
