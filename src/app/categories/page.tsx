import { Title } from "../component/Title"
import { CategoryCard } from "../component/Card"
import { categories } from '../static-data'
import { Header } from "../component/Header"
import { Footer } from "../component/Footer"


const page = () => {

  return (
    <>
      <main>
        <Header />
        <Title title='Categories' />
        <div className='container'>
          <CategoryCard cardInfo={categories} currentPage={0} />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default page