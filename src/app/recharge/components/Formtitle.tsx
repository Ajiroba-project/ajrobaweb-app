import React from 'react'

type FormtitleProps ={
    title:string
    subtitle:string
}


export const Formtitle = ({title, subtitle}:FormtitleProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 text-center'>
      <h3 className='text-2xl leading-5'>{title}</h3>
      <p>{subtitle}</p>
    </div>
  )
}
