import {Title} from "../component/Title"
import {CategoryCard} from "../component/Card"
import {categories} from '../static-data'


const page =()=> {

    return (
        <>
            <main>
                <Title title="Categories"/>
                <div className="container">
                    <CategoryCard cardInfo={categories}/>
                </div>
            </main>
        </>
    )
}

export default page