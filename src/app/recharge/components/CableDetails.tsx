// import React from 'react'
// import { useMutateData } from '@/hooks/useMutateData'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { useForm } from 'react-hook-form'
// import { Cableschema } from './YupValidations'
// import { DefaultButton } from '../../component/Button'
// import { InputField, SelectField } from './FormField'
// import { CablePurchase } from '@/store/store'
// import { Formtitle } from './Formtitle'
// import Image from "next/image"
// import startime from "../../asset/image/startimes.png"
// import gotv from "../../asset/image/gotv.png"
// import dstv from "../../asset/image/dstv.png"

// type CableProps = {
//   network: string
//   smartcard: string
//   netpackage: string
// }

// export const CableDetails = () => {
//   const setCableDetails = CablePurchase(state => state.setCableDetails)
//   const setCableStepper = CablePurchase(state => state.setCableStepper)

//   const {
//     reset,
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//     trigger,
//     watch,
//     setValue
//   } = useForm({
//     mode: 'all',
//     resolver: yupResolver(Cableschema)
//   })
//   const network = ['Gotv', 'Dstv', 'StarTimes']
//   const netpackage = ['jinja', 'family', 'business']

//   const sumbitForm = (data: CableProps) => {
//     // console.log('data=>', data)
//     setCableDetails(data)
//     setCableStepper(1)
//   }

//   return (
//     <div className='container mt-[2rem] flex flex-col items-center justify-center gap-4 bg-[#F6F6F6]'>
//       <div className='flex gap-4 pt-5 '>
//         <Image src={gotv} alt='' />
//         <Image src={dstv} alt='' />
//         <Image src={startime} alt='' />
//       </div>
//       <Formtitle
//         title='Buy Cable Subscription'
//         subtitle='Enjoy your best TV program by purchasing your subscription on our platform'
//       />
//       <div>
//         <form
//           className='flex flex-col gap-3'
//           onSubmit={handleSubmit(sumbitForm)}
//         >
//           <SelectField
//             name='network'
//             register={register}
//             errors='errors'
//             options={network}
//             label='operators'
//             showlabel={false}
//           />

//           <InputField
//             name='smartcard'
//             register={register}
//             errors={errors}
//             type='text'
//             placeholder='Input IUC/Smart Card Number'
//           />
//           <SelectField
//             name='netpackage'
//             register={register}
//             errors='errors'
//             options={netpackage}
//             label='Package Bundle'
//             showlabel={false}
//           />
//           <p className='underline cursor-pointer text-end text-[#f25e26]'>Beneficiaries</p>

//           <div className='mb-6'>
//             <DefaultButton
//               text='Proceed'
//               type='submit'
//               handleClick={() => { }}
//               className='my-10 w-full bg-[#FCDFD4] p-3'
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }



"use client";
import React, { useState } from "react";
import { useMutateData } from "@/hooks/useMutateData";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Airtimeschema, Cableschema, Rechargeschema } from "./YupValidations";
import { DefaultButton } from "../../component/Button";
import { InputField, SelectField } from "./FormField";
import { AirtimePurchase, CablePurchase } from "@/store/store";
import { Formtitle } from "./Formtitle";
import { CustomModal, Modal } from "@/app/component/Modal";
import { Header } from "../airtime/receipt/component/Header";
import Image from "next/image";
import Brand from "../../asset/ajirobalogo.png";
import { useRouter } from "next/navigation";
import { useGetDatanew } from "@/hooks/useGetData";
import Cookies from "js-cookie";
import airtelicon from "../../asset/airtelicon.png";
import { StaticImageData } from "next/image";
import mtnicon from "../../asset/mtnicon.svg";
import ninemobileicon from "../../asset/ninemobileicon.png";
import gloicon from "../../asset/gloicon.png";
import { set } from "date-fns";
import { Item } from "@radix-ui/react-select";

type DataProps = {
  decoder: string;
  bundle: string;
  iucnumber: string;
};

interface TransformedDataItem {
  id: number;
  number: string;
  type: string;
  icon: string | null;
}

export const CableDetails = () => {
  const setCableDetails = CablePurchase((state) => state.setCableDetails);

  const [printreceipt, setprintreceipt] = useState<boolean>(false);

  const { setCableStepper } = CablePurchase((state) => ({
    setCableStepper: state.setCableStepper, // ✅ This correctly references the function
  }));
  // const setCableStepper = CablePurchase((state) => state.setStepper);

  const userToken = (Cookies.get("token") as string) || "";

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/beneficiaries/?type=Airtime`;

  const { data: bensdata, isLoading: bensLoading } = useGetDatanew(
    url,
    "get_beneficiaries",
    userToken || " ",
  );

  const iconMap: { [key: string]: StaticImageData | null } = {
    MTN: mtnicon,
    AIRTEL: airtelicon,
    Smile: airtelicon,
    Virgin: airtelicon,
    Etisalat: airtelicon,
    ninemobile: ninemobileicon,
    GLO: gloicon,
  };

  const transformedData = bensdata?.data?.map(
    (item: { biller: string; number: any }, index: number) => {
      const billerUpper = item.biller.trim().toUpperCase(); // Trim whitespace & ensure uppercase
      return {
        id: index + 1,
        number: item.number,
        type: billerUpper,
        icon: iconMap[billerUpper] || null, // Default to null if not found
      };
    },
  );

  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm({
    mode: "all",
    resolver: yupResolver(Cableschema),
  });




  const discourl = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/nomba/electric_discos/`;

  const { data: discosdata, isLoading: discosLoading } = useGetDatanew(
    discourl,
    "get_electric_discos",
    userToken || " ",
  );



  const providersList = discosdata?.data?.map((provider: { name: any; }) => provider.name);



  // Watch selected network
  const selectedNetwork = watch("decoder");



  const { data: data_plansdata, isLoading: data_plansLoading } = useGetDatanew(
    discourl,
    "get_data_plans",
    userToken || " ",
  );



  const dataplanurl = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/nomba/cable_tv_packages?cableTvType=${selectedNetwork}/`;


  const { data: dataPlansData, isLoading: dataPlansLoading } = useGetDatanew(dataplanurl, "get_data_plans", userToken);

  // Transform API response into data plan format

// console.log(dataPlansData, 'dataPlansData')

  const dataPlan = dataPlansData?.data?.map((plan: { plan: string; code: number }) => `${plan.plan} -₦${plan.code}`) || [];


  // console.log(dataPlan, 'dataPlannew')
  // const network = providersList
   const network = ['GOTV', 'DSTV', 'STARTIME', 'CONSAT TV'  ]
  // const dataPlan = ["1day 100MB -₦100", "60dayS 1TB -₦20,000"];

  const sumbitForm = (data: DataProps) => {
    console.log("data=>", data);
    setCableDetails(data);

    setCableStepper(1);
  };

  const router = useRouter();

  const handleUseClick = (number: string, type: string) => {
    setValue("iucnumber", number);
    setValue("decoder", type);
    setprintreceipt(false);
  };

  return (
    <div className=" flex flex-col items-center justify-center gap-4 bg-[#F6F6F6] py-12">
      <Formtitle className="text-center w-1/2  leading-5 font-semibold text-[#2A2A2A] font-Poppins text-base"
        title="Buy Cable Subscription"
        subtitle="Enjoy your best  TV programs by purchasing your subscription on our platform"
      />
      <div className="">
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(sumbitForm)}
        >
          <div className="w-full max-w-[350px]">
      <SelectField
            name="decoder"
            register={register}
            errors={errors}
            options={network}
            label="Select Operator"
            showlabel={false}
            value={watch("decoder")} // Ensure value updates
            onChange={(e) => setValue("decoder", e.target.value)} // Update manually
            className="text-sm w-full h-auto p-2.5 border rounded-lg font-Inter font-normal pr-12 border-[#A09F9F]"
          />
          </div>


             <div className="w-full max-w-[350px]">
 <InputField
            name="iucnumber"
            register={register}
            errors={errors}
            type="text"
            placeholder="input smart card/iuc number"

          />
   </div>


<div className="w-full max-w-[350px]">
<SelectField
           name="bundle"
            register={register}
            errors="errors"
            options={dataPlan}
            label="Select Package/Bundle"
            showlabel={false}
            className="text-sm w-full max-w-full truncate  h-auto p-2.5 border rounded-lg font-Inter font-normal pr-12 border-[#A09F9F]"
          />
</div>










          <p
            onClick={() => setprintreceipt(!printreceipt)}
            className="text-end text-[#f25e26] underline cursor-pointer text-sm font-Poppins"
          >
            Beneficiaries
          </p>

          <div className="mb-6">
            <DefaultButton
              text="Proceed"
              type="submit"
              handleClick={() => {}}
              className="my-10 w-full bg-[#FCDFD4] p-3 rounded-lg "
            />
          </div>

          <CustomModal isOpen={printreceipt}>
            <section className="container flex flex-col ">
              <div className="flex justify-between items-center">
                <Image src={Brand} alt="brand-logo" />
                <h2 className=" font-Poppins text-[#2A2A2A] font-normal   lg:text-xl md:text-xl leading-3 capitalize">
                  {"Airtime Recharge"}
                </h2>
              </div>
              <p
                className="brand1 py-4 cursor-pointer font-Poppins text-sm underline"
                onClick={() => setprintreceipt(false)}
              >
                Back
              </p>
            </section>

            <div className="p-6 bg-gray-100 min-h-screen">
              <div className="space-y-4">
                {transformedData?.map((item: TransformedDataItem) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Icon and details */}
                    <div className="flex items-center">
                      {item.icon && (
                        <Image
                          src={item.icon}
                          alt={item.type}
                          width={40}
                          className="w-10 h-10 rounded-full mr-4"
                          height={40}
                        />
                      )}

                      <div>
                        <p className="text-gray-900 font-semibold">
                          {item.number}
                        </p>
                        <p className="text-gray-500 text-sm">{item.type}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleUseClick(item.number, item.type)}
                      className="px-4 py-2 bg-[#FCDFD4] text-[#2A2A2A] font-medium rounded-lg hover:bg-[#FCDFD4]"
                    >
                      Use
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </CustomModal>
        </form>
      </div>
    </div>
  );
};
