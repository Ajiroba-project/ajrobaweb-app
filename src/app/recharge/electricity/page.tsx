"use client";
import { Header } from "../../component/Header";
import { Footer } from "../../component/Footer";
import { Fragment, Suspense, useEffect, useState } from "react";
import {
  userNavStore,
  useAuthStore,
  ElectricityPurchase,
  AirtimePurchase,
} from "@/store/store";
import { useRouter } from "next/navigation";
import { SideMenu } from "../components/SideMenu";
import { LuMenu } from "react-icons/lu";
import { stepperList } from "@/app/static-data";
// import { AirtimeDetails } from "../components/AirtimeDetails";
// import { AirtimePayment } from "../components/AirtimePayment";
// import { Receipt } from "../components/Receipt";
import Loading from "@/app/component/Loading";
// import { DataDetails } from "../components/DataDetails";
// import { CablePayment } from "../components/CablePayment";
// import { DataPayment } from "../components/DataPayment";
// import { DataReceipt } from "../components/DataReceipt";
// import { CableDetails } from "../components/CableDetails";
// import { CableReceipt } from "../components/CableReceipt";
import { ElectricityReceipt } from "../components/ElectricityReceipt"
import { ElectricityDetails } from "../components/ElectricityDetails";
import { ElectricityPayment } from "../components/ElectricityPayment";

const Reroute = () => {
  const router = useRouter();
  router.push("/signin");

  return null;
};


const DataPage = () => {

//   const {setElectricityStepper } =
//     ElectricityPurchase(state => ({

//       setElectricityStepper: state.ElectricityStepper,

//     }))


const { setElectricityStepper } =
    ElectricityPurchase(state => ({
      setElectricityStepper: state.setElectricityStepper,  // ✅ This correctly references the function
    }));


  const [isClient, setIsClient] = useState(false);
  const { userNavMenu, sidebar, toggleSidebar } = userNavStore((state) => ({
    userNavMenu: state.userNav,
    sidebar: state.sidebar,
    toggleSidebar: state.toggleSidebar,
  }));

  const { isLoggedIn } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));


const ElectricityStepper = ElectricityPurchase((state) => state.ElectricityStepper);


  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loading/>
  }




  const Step = ({ props }: any) => {
    return (

      <div className=' w-full py-2 lg:w-64 lg:flex-none'>
      <div className='flex gap-3 overflow-x-auto pr-1 lg:flex-col lg:overflow-visible'>
        {stepperList.map((val, index) => (
          <div
            key={index}
            onClick={() => setElectricityStepper(val.step)}
            className={`${index === props || index <= props ? 'border-[#F25E26] bg-[#FCDFD4] text-[#E84526]' : 'border-[#A09F9F] text-[#A09F9F]'} flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md border-2 px-4 py-3 font-Poppins lg:w-full lg:shrink`}
          >
            <div>{val.icons}</div>
            <span className='text-sm'>{val.name}</span>
          </div>
        ))}
      </div>
    </div>
    );
  };



  const DataContentNew = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <section className="flex flex-col gap-4 2xl:flex-row xl:flex-row md:flex-col lg:flex-row">

            <Step props={ElectricityStepper} />

          <div className="w-full 2xl:flex-1 xl:flex-1 lg:flex-1">
              {ElectricityStepper === 0 ? (
                <ElectricityDetails />
              ) : ElectricityStepper === 1 ? (
                <ElectricityPayment />
              ) : (
                <ElectricityReceipt />
              )}
            </div>
        </section>
      </Suspense>
    );
  };

  return (
    <Fragment>
    <Header />

    {/* Spacer to offset fixed header height on small/medium screens */}
    <div className='h-24 md:h-28 lg:h-32'></div>

    <main className='content-container container my-4'>
      {/* Mobile menu trigger */}
      <div className='mb-4 lg:hidden'>
        <button
          className='inline-flex items-center gap-2 rounded-md border border-[#F25E26] px-3 py-2 text-[#F25E26]'
          onClick={() => toggleSidebar(!sidebar)}
          aria-label='Open menu'
        >
          <LuMenu className='text-2xl' />
          <span className='font-Poppins text-sm'>Menu</span>
        </button>
      </div>

      {/* Responsive layout: sidebar on desktop, content on right */}
      <section className='flex flex-col gap-6 lg:flex-row'>
        {/* Desktop static sidebar */}
        <aside className='hidden w-72 shrink-0 self-stretch lg:block'>
          <div className='h-full rounded-md bg-[#F6F6F6] p-6 shadow-none'>
            <SideMenu />
          </div>
        </aside>

        {/* Main content */}
        <div className='min-w-0 flex-1'>
          {!isLoggedIn ? <Reroute /> : <DataContentNew />}
        </div>
      </section>
    </main>

    {/* Mobile overlay sidebar */}
    {sidebar && (
      <div
        className='fixed inset-0 z-50 lg:hidden'
        role='dialog'
        aria-modal='true'
      >
        <div
          className='absolute inset-0 bg-black/40'
          onClick={() => toggleSidebar(false)}
        ></div>
        <div className='absolute left-0 top-0 h-full w-65 max-w-[90vw] overflow-y-auto bg-[#F6F6F6] px-6 pb-6 pt-16 shadow-2xl'>
          <SideMenu />
        </div>
      </div>
    )}

    <div className='content-container'>
      <Footer />
    </div>
  </Fragment>
  );
};

export default function Searchbar() {
  return (
    <Suspense>
      <DataPage />
    </Suspense>
  );
}
