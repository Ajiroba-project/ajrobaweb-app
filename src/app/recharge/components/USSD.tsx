import { DefaultButton } from '@/app/component/Button'
import call from "../../asset/image/call-icon.png";
import Image from "next/image"
import { CablePurchase } from '@/store/store'

export const USSD = ({close}:any) => {
    const setCableStepper = CablePurchase(state => state.setCableStepper)
  
  const handlePay = () => {
    setCableStepper(2)
    close()
  }

  return (
    <section className='fixed z-50 flex h-screen w-screen items-center justify-center bg-[#000000d1] '>
      <div className='xs:w-[15em] flex h-auto w-[20em] flex-col items-center justify-center gap-6 rounded-md bg-white p-8 text-center md:w-[25em] lg:w-[30em]'>
        <div className='flex-col gap-3 items-center flex justify-center '>
          <Image src={call} alt="icon"/>
          <p className='w-auto text-center text-xl font-medium leading-6  text-[#353131]'>
            To use USSD, Dial *333*IUC number* Amount# from your registered
            Phone number
          </p>
        </div>

        <DefaultButton
          text={`Close`}
          type={`submit`}
          className={`w-full rounded-md bg-[#FCDFD4] p-3 hover:bg-[#f25e26] hover:text-white`}
          handleClick={handlePay}
        />
      </div>
    </section>
  )
}
