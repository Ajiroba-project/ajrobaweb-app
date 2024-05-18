'use client'
import { Fragment } from 'react'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'
import { HeadingText } from '../component/Heading'
import { useRouter } from 'next/navigation'
const Page = () => {
  const router = useRouter()
  return (
    <Fragment>
      <Header />
      <main className=''>
        <div className='-mt-[2rem] bg-[#F6F6F6] py-4'>
          <div className='container'>
            <p onClick={() => router.back()} className='text-[#F25E26] underline'>
              Back
            </p>
            <div className='text-center'>
              <HeadingText title='Privacy Policy' />
            </div>
          </div>
        </div>
        <section className='container my-6 '>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio
            suscipit modi quae voluptatibus odit, expedita maiores sit alias
            iste consequuntur provident nobis. Ipsa quos libero eius. Suscipit
            quasi minima voluptates?
          </p>

          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Perspiciatis ab dignissimos ad, eligendi quidem saepe qui beatae
            suscipit dolore odit maiores accusamus amet culpa, nisi, reiciendis
            quaerat iusto iure inventore. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Perspiciatis ab dignissimos ad,
            eligendi quidem saepe qui beatae suscipit dolore odit maiores
            accusamus amet culpa, nisi, reiciendis quaerat iusto iure
            inventore.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Perspiciatis ab dignissimos ad, eligendi quidem saepe qui beatae
            suscipit dolore odit maiores accusamus amet culpa, nisi, reiciendis
            quaerat iusto iure inventore.
          </p>
        </section>
      </main>
      <Footer />
    </Fragment>
  )
}

export default Page
