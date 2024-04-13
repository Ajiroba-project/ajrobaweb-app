import {categoriesMenu} from '../static-data'

export const SideMenu= ()=>{

return (
    <>
    <section>
        <ul>
           {
            
            categoriesMenu.map((val, index)=>(
                <li key={index}>{val.name}</li>
            ))
        } 
        </ul>
    </section>
    </>

)
}