import React from 'react'

type FormtitleProps ={
    title:string
    subtitle:string
    className?:string
}


export const Formtitle = ({title, subtitle, className}:FormtitleProps) => {
  return (
    <div className={className ? className : 'flex flex-col items-center justify-center gap-2 text-center   py-5'}  >
      <h3 className='leading-5  text-[#504D4D] font-Poppins text-base font-extrabold '>{title}</h3>
      <small className=' font-Poppins text-[#504D4D] text-sm font-extrabold' >{subtitle}</small>
    </div>
  )
}
