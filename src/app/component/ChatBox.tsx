'use client'
import { BsChatFill } from 'react-icons/bs'
import { socialIcon } from '@/app/static-data'
import { DefaultButton } from './Button'
import Image from 'next/image'
import { useState } from 'react'

type ChatboxProps = {
  isOpen: boolean
}

export const ChatBox = (isOpen: ChatboxProps) => {
  const [active, setActive] = useState<boolean>()

  const handleClick = () => {
    setActive(!isOpen)
  }

  return (
    <div className={'aboslute w-1/2'}>
      <div
        className='my-4 w-fit cursor-pointer rounded-full bg-[#F25E26] p-4'
        onClick={handleClick}
      >
        <BsChatFill className='text-2xl font-extrabold text-white' />
      </div>
      {active && (
        <div className='m-4 flex flex-col gap-4 rounded bg-[#F6F6F6] p-4 pt-4 text-center'>
          <div className='mx-4 flex justify-end' onClick={handleClick}>
            <p className='w-fit cursor-pointer rounded-full border-black p-1'>
              X
            </p>
          </div>
          <h1 className='text-xl font-bold'>Hello</h1>
          <p className=''>
            I{`'`}m, John, Your Dedicated Ajiroba Onliine assistant, how may i
            assist you today
          </p>
          {/* button */}
          <DefaultButton
            text='Start Conversation'
            type='button'
            className='rounded bg-[#F25E26] p-3 text-white'
            handleClick={() => {}}
          />
          {/* social icon */}
          <div className='flex items-center gap-3'>
            {socialIcon.map(val => (
              <div className='mx-4 flex items-center ' key={val.name}>
                <Image src={val.icon} alt={'socials'} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
