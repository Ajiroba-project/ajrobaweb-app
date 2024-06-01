import React from 'react';

interface AuthHeroProps {
    title: string;
    menu?: string;
}

function AuthHero({ title, menu }: AuthHeroProps) {
    return (
        <section className='flex justify-center items-center flex-col' >
            <h1 className='xl:text-2xl 2xl:text-2xl md:text-2xl text-base font-Poppins text-[#111111] leading-tight tracking-tight text-left '  >{title}</h1>
            <p className=' mt-4 text-sm font-normal leading-6 text-center xl:w-1/3 w-auto  text-[#353131]' >{menu}</p>
        </section>
    );
}

export default AuthHero;
