import React from 'react'
import { DefaultButton } from '@/app/component/Button'
import { userProfile } from '@/store/store'
export const PhotoUpload = () => {
  const setProfile= userProfile(state=>state.setProfile)
  return (
    <section className="z-50 fixed w-screen h-screen bg-[#000000d1] flex justify-center items-center ">
      <div className="text-center  flex flex-col bg-white rounded-md gap-6 justify-center items-center w-[20em] xs:w-[15em] lg:w-[25em] md:w-[25em] h-auto">
        {/* content */}
        <div className=' p-2 flex flex-col '>
          <div className="text-end flex justify-end cursor-pointer" onClick={setProfile}>X</div>
          <div>
            <div>
              {/* icon */}
            </div>
            <div>
              <span className="brand1 text-semibold ">Click to upload</span> or Drag and drop
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
