import React from 'react'

function TitleText({ text }: { text: string }) {
  return (
    <div>
           <section>
        <div className="flex justify-center text-center">
          <h1 className='lg:text-3xl capitalize md:text-2xl text-base font-Poppins text-[#2A2A2A] font-bold '>{text}</h1>
        </div>
      </section>
    </div>
  )
}

export default TitleText