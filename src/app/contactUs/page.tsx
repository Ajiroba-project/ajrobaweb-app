import React,{Fragment} from 'react'
import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import {HeadingText} from "../component/Heading"
const Page = () => {
  return (
    <Fragment>
        <Header/>
        <main className="container my-10">
            <div className="justify-center flex items-center">
                <HeadingText title="Contact us"/>
            </div>

        </main>
        <Footer/>
    </Fragment>
  )
}

export default Page