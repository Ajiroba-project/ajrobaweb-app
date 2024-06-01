"use client"
import React, { useState, useEffect } from 'react'

import {raffle} from "@/app/static-data"

import { useRouter } from 'next/navigation'
import { HeadingText } from '../../component/Heading'
import { DefaultButton } from '../../component/Button'
import Image from "next/image"

const Page = ({params}:any) => {
    const router = useRouter()
    const [data, setData] = useState<any>(
      raffle.filter(val => val.host === params.id)
    )
    const [playState, setPlayState]=useState<boolean>(false)
    const [minTimeout, setMinTimeOut]=useState<boolean>(false)

    const HandleTimer =()=>{
        setMinTimeOut(!minTimeout)

        // const timeout = setTimeout(() => {
        //   setMinTimeOut(!minTimeout)
        // }, 3000)
        // return clearTimeout(timeout)
    }

    useEffect(()=>{
        const filtered = raffle.filter(val => val.host === params.id)
        setData(filtered)

    }, [params.id])

    

  return (
    <section className='z-auto'>
      <div className='w-full bg-[#F6F6F6] pt-[13vh]'>
        <div className='container flex flex-col'>
          <p
            onClick={() => router.back()}
            className='cursor-pointer text-[#F25E26] underline'
          >
            Back
          </p>
          <div className='mb-3 text-center'>
            <HeadingText title='Live Raffle Draw' />
          </div>
        </div>
      </div>
      <section className='relative mb-[5rem] mt-7 flex flex-col items-center justify-center'>
        <div className='relative z-auto mb-4 w-full'>
          <Image
            src={data[0]?.video}
            alt='alt'
            width={1092}
            height={606}
            className='w-[100%] cursor-pointer'
            onClick={() => setPlayState(!playState)}
          />
          <div
            className={`${!playState ? 'absolute left-0 top-0 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-2xl bg-[#00000099] align-middle text-white' : ''}`}
            onClick={() => setPlayState(!playState)}
          >
            {playState && (<p className='text-2xl font-semibold'>
              The <br /> End
            </p>)}
          </div>
        </div>

        <DefaultButton
          text={`${!playState ? 'Stop Streaming' : 'Auction'}`}
          className='h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all '
          type='button'

          handleClick={ () => playState ? HandleTimer : router.push(`/raffle/${params.id}/winners`)}
        />
      </section>
    </section>
  )
}

export default Page