"use client";
import React, { useState } from "react";
import { useMutateData } from "@/hooks/useMutateData";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Airtimeschema, Dataschema, Rechargeschema } from "./YupValidations";
import { DefaultButton } from "../../component/Button";
import { InputField, SelectField, CurrencyInputField } from "./FormField";
import { AirtimePurchase, CablePurchase, DataPurchase } from "@/store/store";
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
import { removeDuplicateBeneficiaries } from '@/utils/removeDuplicates';

type DataProps = {
  datanetwork: string;
  dataamount: string;
  dataphone: string;
  datadata: string;
};

interface TransformedDataItem {
  id: number;
  number: string;
  type: string;
  icon: string | null;
}

export const DataDetails = () => {
  const setDataDetails = DataPurchase((state) => state.setDataDetails);

  const [printreceipt, setprintreceipt] = useState<boolean>(false);

  const { setDataStepper } = DataPurchase((state) => ({
    setDataStepper: state.setDataStepper, // ✅ This correctly references the function
  }));
  // const setDataStepper = DataPurchase((state) => state.setStepper);

  const userToken = (Cookies.get("token") as string) || "";

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/beneficiaries/?type=Data`;

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

  const transformedData = removeDuplicateBeneficiaries(bensdata?.data, iconMap);

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
    resolver: yupResolver(Dataschema),
  });




  const discourl = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/nomba/electric_discos/`;

  const { data: discosdata, isLoading: discosLoading } = useGetDatanew(
    discourl,
    "get_electric_discos",
    userToken || " ",
  );



  const providersList = discosdata?.data?.map((provider: { name: any; }) => provider.name);



  // Watch selected network
  const selectedNetwork = watch("datanetwork");



  const { data: data_plansdata, isLoading: data_plansLoading } = useGetDatanew(
    discourl,
    "get_data_plans",
    userToken || " ",
  );



  const dataplanurl = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/nomba/data_plans/${selectedNetwork}/`;

  const { data: dataPlansData, isLoading: dataPlansLoading } = useGetDatanew(dataplanurl, "get_data_plans", userToken);

  // Transform API response into data plan format

  // console.log(dataPlansData, 'dataPlansData')

  const dataPlan = dataPlansData?.data?.map((plan: { plan: string; code: number }) => `${plan.plan} -₦${plan.code}`) || [];


  // console.log(dataPlan, 'dataPlannew')
  // const network = providersList
  const network = ['MTN', 'AIRTEL', 'GLO', '9MOBILE']
  // const dataPlan = ["1day 100MB -₦100", "60dayS 1TB -₦20,000"];

  const sumbitForm = (data: DataProps) => {
   /*  console.log(errors, 'err')
    console.log("data=>", data); */
    setDataDetails(data);

    setDataStepper(1);
  };

  const router = useRouter();

  const handleUseClick = (number: string, type: string) => {
    setValue("dataphone", number);
    setValue("datanetwork", type);
    setprintreceipt(false);
  };

  return (
    <div className=" flex flex-col items-center justify-center gap-4 bg-[#F6F6F6] py-12">
      <Formtitle
        title="Buy Data"
        subtitle="We have different data plans that suite your needs"
      />
      <div className="">
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(sumbitForm)}
        >
          <div className="w-full max-w-[350px]">
            <SelectField
              name="datanetwork"
              register={register}
              errors={errors}
              options={network}
              label="Network Provider"
              showlabel={false}
              value={watch("datanetwork")} // Ensure value updates
              onChange={(e) => setValue("datanetwork", e.target.value)} // Update manually
              className="text-sm w-full h-auto p-2.5 border rounded-lg font-Inter font-normal pr-12 border-[#A09F9F]"
            />
          </div>


          <div className="w-full max-w-[350px]">
            <SelectField
              name="datadata"
              register={register}
              errors="errors"
              options={dataPlan}
              label="Data Bundle"
              showlabel={false}
              className="text-sm w-full max-w-full truncate  h-auto p-2.5 border rounded-lg font-Inter font-normal pr-12 border-[#A09F9F]"
            />
          </div>



          <div className="w-full max-w-[350px]">
            <InputField
              name="dataphone"
              register={register}
              errors={errors}
              type="text"
              placeholder="Phone Number"

            />
          </div>



          <div className="w-full max-w-[350px]">
            <CurrencyInputField
              name="dataamount"
              register={register}
              errors={errors}
              type="text"
              placeholder="Amount"
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
              handleClick={() => { }}
              className="my-10 w-full text-sm font-normal font-Poppins rounded-lg bg-[#FCDFD4] px-4 py-2 transition delay-300 duration-300 ease-in-out hover:bg-[#E84526] hover:text-white hover:transition-all"
            />
          </div>

          <CustomModal isOpen={printreceipt}>
            <section className="container flex flex-col ">
              <div className="flex justify-between items-center">
                <Image src={Brand} alt="brand-logo" />
                <h2 className=" font-Poppins text-[#2A2A2A] font-normal   lg:text-xl md:text-xl leading-3 capitalize">
                  {"Beneficiaries"}
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
