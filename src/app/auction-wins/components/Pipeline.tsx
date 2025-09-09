'use client'
import React, {useState, useEffect} from 'react'

type PipelineProps ={
    props:string[],
    setProps:any
    start:string;

}
export const Pipeline = ({props, setProps, start}:PipelineProps) => {
    const [pipeline, setPipeline]=useState<string>(start)
    useEffect(()=>{
      setProps(pipeline);

    }, [pipeline, setProps])

  return (
    <div className='flex lg:items-center lg:gap-8 lg:flex-row md:flex-row flex-row mt-2 flex-wrap gap-2 '>
      {props.map((val: string, index: number) => (
        <label
          key={index}
          htmlFor={val}
          className='flex cursor-pointer capitalize'
          onClick={() => setPipeline(val)}
        >
          <input
            className='mx-2 accent-[#F25E26]'
            type='radio'
            name='switch'
            id={val}
            defaultChecked={val === pipeline ? true : false}
          />
          {val}
        </label>
      ))}
    </div>
  )
}
