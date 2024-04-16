import {Hero} from "./component/Hero";
import {Heading} from "./component/Heading"
import {SubHeading} from "./component/SubHeading"
import {Card} from "./component/Card"
import {cardInfo} from "./static-data"



function page() {
  return (
    <>
    <main className=''>
       {/* hero section */}
      <section>
        <div className=''>
          <Hero/>
        </div>
      </section>

    {/* Auction section */}
      <section className="flex flex-col container gap-4 my-8">
          <div>
            <SubHeading title="Today"/>
          </div>
          <div>
            <Heading title="Auction Sales"/>
          </div>
          <div>
            <Card cardInfo={cardInfo}/>
          </div>
      </section>

      {/* How it works */}
      <section className="flex flex-col container gap-4 my-12">
        <div>
           <SubHeading title="How it works"/>
        </div>
        <div className="flex">
          <div>1</div>
          <div>2</div>
        </div>
      </section>

      {/* Categories */}

      {/* Featured Product */}

      {/* Shop from top deals collection */}

      {/* community */}
      
      {/* Top product */}

      


    </main>
    </>
  )
}

export default page
