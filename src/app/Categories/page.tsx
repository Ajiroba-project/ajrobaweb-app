import {Title} from "../component/Title"
import {CategoryCard} from "../component/Card"
import {categories} from '../static-data'


const page =()=> {

    return (
      <>
        <main>
          <Title title='Categories' />
          <div className='container'>
            <CategoryCard cardInfo={categories} currentPage={0} />
          </div>
        </main>
      </>
    )
}

export default page