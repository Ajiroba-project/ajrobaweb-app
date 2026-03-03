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

             <div className="flex 2xl:flex-col xl:flex-col md:flex-row lg:flex-col flex-row py-4 mt-14 gap-4 2xl:w-3/12 xl:w-3/12 md:w-full lg:w-3/12 w-full">
        {stepperList.map((val, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 rounded-md border p-4 px-6 text-[#A09F9F] font-Poppins ${index === props || index <= props ? "cursor-pointer border-2 border-[#F25E26] bg-[#FCDFD4] text-[#E84526]" : "border-2 opacity-50"} border-[#A09F9F] `}
          >
            <div>{val.icons}</div>
            <p className="w-max text-sm font-Poppins" onClick={() => setElectricityStepper(val.step)}>{val.name}</p>
          </div>
        ))}
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
      <header className="fixed z-50 w-full">
        <Header />
      </header>

      <main className="relative flex pt-[20vh] content-container">


      <section
          className={`${sidebar ? 'absolute h-full bg-[#F6F6F6]' : 'absolute'} z-20 -mt-8  lg:relative`}
        >
          <div
            className={`${sidebar ? 'absolute  h-full bg-[#F6F6F6] p-6 shadow-md lg:block lg:w-max lg:shadow-none' : 'shrink-0 self-stretch h-full bg-[#F6F6F6] p-6 shadow-md lg:block lg:w-max lg:shadow-none'} `}
          >
            <SideMenu />
          </div>
          <div
            className=" absolute left-4 top-5 cursor-pointer text-[#f25e26] lg:hidden"
            onClick={() => toggleSidebar(!sidebar)}
          >
            <LuMenu className="text-3xl" />
          </div>
        </section>

        <section className="container -mt-8 h-full content-container">
          {!isLoggedIn ? <Reroute /> : <DataContentNew />}

        </section>
      </main>

      <div className=''>
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
