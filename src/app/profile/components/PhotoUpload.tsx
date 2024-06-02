import React, { useState } from 'react'
import { DefaultButton } from '@/app/component/Button'
import { CustomModal } from '@/app/component/Modal'
import { userProfile } from '@/store/store'
import { IoClose } from 'react-icons/io5'
import { useDropzone } from 'react-dropzone'

interface FileProps {
  name: string
  type: string
  size: number
}

export const PhotoUpload = () => {
  const { setProfile, profile } = userProfile(state => ({
    setProfile: state.setProfile,
    profile: state.profile
  }))
  const [files, setFiles] = useState<FileProps[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((files) => ({
          name: files.name,
          type: files.type,
          size: files.size

        }))
      )
    }
  })

  return (
    <CustomModal isOpen={profile}>
      <label htmlFor='upload' {...getRootProps()}>
        <input {...getInputProps()} id='upload' />
        <div className=' flex justify-end '>
          <IoClose className='cursor-pointer text-xl' onClick={setProfile} />
        </div>
        <div className='flex w-full flex-col items-center justify-center align-middle'>
          <p>
            {' '}
            <span className='brand1'>click to upload </span> or drag and drop
          </p>
          <p className='text-gray-300 text-sm'>SVG,PNG, JPG, GIF (max 800 X 400px)</p>
        </div>
        <div className='my-4 flex w-full items-center justify-center gap-3'>
          <hr className='w-full ' />
          <p className='text-gray-300'>OR</p>
          <hr className='w-full ' />
        </div>

        <div className='my-2 flex w-full flex-col items-center justify-center '>
          <DefaultButton
            text='Browse files'
            className='rounded-md bg-[#f25e26] px-8 py-4 text-white'
            type='button'
          />
        </div>
      </label>
      {files.length === 0 ? (
        ''
      ) : (
        <>
          {files.map(val => (
            <div className='' key={val.name}>
              {val.name} ({val.size} byte)
            </div>
          ))}
        </>
      )}
    </CustomModal>
  )
}
