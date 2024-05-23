 import { Hero } from "../component/Hero";
 import { Heading } from "../component/Heading"
 import { SubHeading } from "../component/SubHeading"
 import { AuctionCard } from "../component/Card"
 import { HIW } from "../component/How-it-works"
 import { Products } from "../static-data"
 import { Suspense } from 'react'

function Page() {
  return (
    <>
 <Suspense>
      <main className=''>
        {/* hero section */}
        <section>
          <div className=''>
            <Hero />
          </div>
        </section>

        {/*  Auction section  */}
        <section className="flex flex-col container gap-4 my-24">
          <div>
            <SubHeading title="Today" />
          </div>
          <div>
            <Heading title="Auction Sales" />
          </div>
          <div>
            <AuctionCard cardInfo={Products} />
          </div>
        </section>

        {/*  How it works  */}
        <section className="flex flex-col container gap-4  my-28">
          <div>
            <SubHeading title="How it works" />
          </div>
          <HIW />
        </section>

        {/* {/* Categories  */}
        <section className="flex flex-col container gap-4  my-28">
          <div>
            <SubHeading title="Categories" />
          </div>
          <div>
            <Heading title="Shop by Categories" />
          </div>

        </section>

        {/* {/* Featured Product  */}
        <section className="flex flex-col container gap-4  my-28">
          <div>
            <SubHeading title="Featured" />
          </div>
          <div>
            <Heading title="Featured Products" />
          </div>
          <div>
            <AuctionCard cardInfo={Products} />
          </div>

        </section>

        {/* {/* Shop from top deals collection  */}
        <section className="flex flex-col container gap-4  my-28">
          <div>
            <SubHeading title="Deals" />
          </div>
          <div>
            <Heading title="Shop from Top Deals Collection" />
          </div>
          <div>
            <AuctionCard cardInfo={Products} />
          </div>

        </section>

        {/* {/* community  */}

        <section>
          Community
        </section>

        {/* {/* Top product  */}
        <section className="flex flex-col container gap-4  my-28">
          <div>
            <SubHeading title="Top Product" />
          </div>
          <div>
            <Heading title="This Week Top Product" />
          </div>
          <div>
            <AuctionCard cardInfo={Products} />
          </div>

        </section>

        {/* hero section */}




      </main>
      </Suspense>
    </>
  )
}

export default Page
