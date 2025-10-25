"use client";
import { Header } from "../../component/Header";
import { Footer } from "../../component/Footer";
import { Fragment, Suspense, useEffect, useState } from "react";
import {
  userNavStore,
  useAuthStore,

  AirtimePurchase,

} from "@/store/store";
import { useRouter } from "next/navigation";
import { SideMenu } from "../components/SideMenu";
import { stepperList } from "@/app/static-data";
import { AirtimeDetails } from "../components/AirtimeDetails";
import { AirtimePayment } from "../components/AirtimePayment";
import { Receipt } from "../components/Receipt";
import Loading from "@/app/component/Loading";
import { LuMenu } from "react-icons/lu";

const Reroute = () => {
  const router = useRouter();
  router.push("/signin");

  return null;
};


const Airtime = () => {

  const {setAirtimeStepper } =
    AirtimePurchase(state => ({

      setAirtimeStepper: state.setAirtimeStepper,

    }))


  const [isClient, setIsClient] = useState(false);
  const { userNavMenu, sidebar, toggleSidebar } = userNavStore((state) => ({
    userNavMenu: state.userNav,
    sidebar: state.sidebar,
    toggleSidebar: state.toggleSidebar,
  }));

  const { isLoggedIn } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));

const AirtimeStepper = AirtimePurchase((state) => state.AirtimeStepper);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loading/>
  }




  const Step = ({ props }: any) => {
    return (

      <div className="w-full lg:w-64 lg:flex-none py-2 mt-2">
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pr-1">
          {stepperList.map((val, index) => (
            <div
              key={index}
              onClick={() => setAirtimeStepper(val.step)}
              className={`${index === props || index <= props ? "border-[#F25E26] bg-[#FCDFD4] text-[#E84526]" : "border-[#A09F9F] text-[#A09F9F]"} shrink-0 lg:shrink lg:w-full whitespace-nowrap flex items-center gap-2 rounded-md border-2 px-4 py-3 font-Poppins`}
            >
              <div>{val.icons}</div>
              <span className="text-sm">{val.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const DataContentNew = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <section className="flex flex-col lg:flex-row gap-6">

            <Step props={AirtimeStepper} />

          <div className="w-full 2xl:flex-1 xl:flex-1 lg:flex-1">
              {AirtimeStepper === 0 ? (
                <AirtimeDetails />
              ) : AirtimeStepper === 1 ? (
                <AirtimePayment />
              ) : (
                <Receipt />
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

      {/* Spacer to offset fixed header height on small/medium screens */}
      <div className="h-24 md:h-28 lg:h-32"></div>

      <main className="container my-4">
        {/* Mobile menu trigger */}
        <div className="mb-4 lg:hidden">
          <button
            className="inline-flex items-center gap-2 rounded-md border border-[#F25E26] text-[#F25E26] px-3 py-2"
            onClick={() => toggleSidebar(!sidebar)}
            aria-label="Open menu"
          >
            <LuMenu className="text-2xl" />
            <span className="font-Poppins text-sm">Menu</span>
          </button>
        </div>

        {/* Responsive layout: sidebar on desktop, content on right */}
        <section className="flex flex-col lg:flex-row gap-6">
          {/* Desktop static sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="bg-[#F6F6F6] p-6 shadow-none rounded-md">
              <SideMenu />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {!isLoggedIn ? <Reroute /> : <DataContentNew />}
          </div>
        </section>
      </main>

      {/* Mobile overlay sidebar */}
      {sidebar && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={() => toggleSidebar(false)}></div>
          <div className="absolute left-0 top-0 h-full w-80 max-w-[90vw] bg-[#F6F6F6] p-6 shadow-2xl overflow-y-auto">
            <SideMenu />
          </div>
        </div>
      )}

      <Footer />
    </Fragment>
  );
};

export default function Searchbar() {
  return (
    <Suspense>
      <Airtime />
    </Suspense>
  );
}
