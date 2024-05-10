import walletImg from '../asset/image/wallet.png'
import Image from 'next/image'

type title = {
  text: string
}
export const HIW = () => {
  const Title = ({ text }: title) => (
    <h3 className='py-2 text-xl font-bold text-[#F25E26]'>{text}</h3>
  )

  return (
    <>
      <div className='flex flex-col items-center gap-3 lg:flex-row'>
        <div className='flex gap-2'>
          {/* indicator */}
          <div className='h-auto w-3  rounded-full border bg-[#D2C1C1]'>
            <div className='h-[35%] w-2.5 rounded-full  border bg-[#E84526]'></div>
          </div>

          <div className='my-3 flex flex-col gap-3 '>
            <div className='lg:w-[50%]'>
              <Title text={'Ticket'} />
              <p>
                Credit your wallet to buy your ticket. your ticket allows you to
                bid for any product on auction.
              </p>
            </div>
            <div className='lg:w-[50%]'>
              <Title text={'Raffle Draw'} />
              <p>
                After allotted time frame, our live raffle draw begins where you
                can win the product you have put in for.
              </p>
            </div>
            <div className='lg:w-[50%]'>
              <Title text={'Win'} />
              <p>
                During the live raffle draw, the winner gets announced and the
                item will be delivered to your door step.
              </p>
            </div>


          </div>
        </div>

        <div>
          <Image src={walletImg} alt='img' />
        </div>
      </div>
    </>
  )
}
