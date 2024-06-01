import { Title } from '../component/Title'
import { CategoryCard } from '../component/Card'
import { categories } from '../static-data'
import { Header } from '../component/Header'
import { Footer } from '../component/Footer'

const page = () => {
  return (
    <>
      <header className='fixed w-full'>
        <Header />
      </header>
      <main className='pt-[20vh]'>
        <Title title='Categories' />
        <div className='container justify-center items-center flex flex-col mb-5'>
          <CategoryCard cardInfo={categories} currentPage={0} />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default page
