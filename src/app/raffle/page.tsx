'use client'
import React, {Suspense} from 'react'
import { HeadingText } from '../component/Heading'
import { useRouter } from 'next/navigation'
import { raffle } from '@/app/static-data'
import {Pagination} from "@/app/component/Pagination"
import Image from 'next/image'
import raf from '../asset/image/raf.png'
import useAuthMiddleware from '@/hooks/useAuth'

const Page = () => {
  const router = useRouter()
  useAuthMiddleware(router)

  return (
    <>
      <Suspense>
        <section className=''>
          <div className='w-full bg-[#F6F6F6] pt-[15vh]'>
            <div className='container flex flex-col'>
              <p
                onClick={() => router.back()}
                className='text-[#F25E26] underline cursor-pointer'
              >
                Back
              </p>
              <div className='mb-3 text-center'>
                <HeadingText title='Raffle Draw Videos' />
              </div>
            </div>
          </div>

          {/*  */}
          <section className='container my-[3rem]'>
            <div className='flex flex-col gap-12'>
              {raffle.map((val, index) => (
                <div className={`flex flex-col gap-8 lg:flex-row `} key={index}>
                  <div className="">
                    <Image
                      src={raf}
                      alt={val.name}
                      className='h-auto cursor-pointer'
                      width={418}
                      onClick={() => router.push(`/raffle/${val.host}`)}
                    />
                  </div>
                  {/*  */}
                  <div className='flex  flex-col p-4 lg:w-[30rem] '>
                    <div className='mb-2 flex flex-col gap-3 capitalize '>
                      <p
                        className=' cursor-pointer font-medium md:text-xl lg:text-3xl'
                        onClick={() => router.push(`/raffle/watch${val.host}`)}>
                        {val.name} -
                        <span className='font-normal'>{val.host}</span>
                      </p>

                      <div className='text-md flex gap-8 font-medium text-[#6E6E6E]'>
                        <p>{val.title}</p>
                        <p>●</p>
                        <p className=''>Ticket Price ₦{val.price}</p>
                      </div>
                      {/* desc */}
                      <div className='text-sm font-normal text-[#A09F9F] mb-4'>
                        <p className='w-[30rem] truncate text-pretty'>
                          {val.description}
                        </p>
                      </div>
                      {/* date */}
                      <div className='text-md flex gap-8 font-medium text-[#6E6E6E]'>
                        <p>{val.host}</p>
                        <p>●</p>
                        <p>{val.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* paginate */}
              <div className="flex flex-col items-center ">
                <Pagination
                pageCount={3}
              onPageChange={()=>{}}
              className={"flex gap-2 items-center"}
              pageRangeDisplayed={3}
                
                />
              </div>

        </section>
      </Suspense>
    </>
  )
}

export default Page
