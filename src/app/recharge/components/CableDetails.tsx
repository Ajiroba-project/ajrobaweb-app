"use client";
import React, { useEffect, useState } from "react";
import { useMutateData } from "@/hooks/useMutateData";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Airtimeschema, Cableschema, Rechargeschema } from "./YupValidations";
import { DefaultButton } from "../../component/Button";
import { InputField, SelectField, CurrencyInputField } from "./FormField";
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
import gotvicon from '../../asset/gotvicon.jpeg'
import dstvicon from '../../asset/dstvicon.jpeg'
import showmaxicon from '../../asset/showmaxicon.png'
import startimesicon from '../../asset/startimesicon.jpeg'
import consattvicon from '../../asset/consattvicon.png'

import { set } from "date-fns";
import { Item } from "@radix-ui/react-select";
import { fetchCableTVPackages } from "@/app/utils/fetchCableTVPackages";
import { removeDuplicateBeneficiaries } from '@/utils/removeDuplicates';
import { useDebounce } from "@/hooks/useDebounce";
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
  const setCableCustomerDetails = CablePurchase((state) => state.setCableCustomerDetails,
  );




  const [printreceipt, setprintreceipt] = useState<boolean>(false);

  const { setCableStepper } = CablePurchase((state) => ({
    setCableStepper: state.setCableStepper,
  }));

  const userToken = (Cookies.get("token") as string) || "";

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/beneficiaries/?type=cable`;

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
    GOTV: gotvicon,
    DSTV: dstvicon,
    SHOWMAX: showmaxicon,
    STARTIME: startimesicon,
    "CONSAT TV": consattvicon,
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
    resolver: yupResolver(Cableschema),
  });

  const discourl = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/nomba/electric_discos/`;

  const { data: discosdata, isLoading: discosLoading } = useGetDatanew(
    discourl,
    "get_electric_discos",
    userToken || " ",
  );

  const customerId = watch("iucnumber");
  const selectedNetwork = watch("decoder");

  const dataplanurl = selectedNetwork
    ? `/api/fetchcable?cableTvType=${selectedNetwork}`
    : "";

  const { data: dataPlansData, isLoading: dataPlansLoading } = useGetDatanew(
    dataplanurl,
    "get_data_plans",
    userToken,
  );

  const submitForm = (data: DataProps) => {
    console.log("Submitted Data:", data);
  };

  const dataPlan =
    dataPlansData?.data?.data?.map(
      (subScriptionType: { subScriptionType: string; amount: number }) =>
        `${subScriptionType.subScriptionType} -₦${subScriptionType.amount}`,
    ).filter((plan: string) => plan && plan.trim() !== '') || [];

  const network = ["GOTV", "DSTV", "SHOWMAX", "STARTIME", "CONSAT TV"];


  // Debounce the customerId to delay API call
  const debouncedCustomerId = useDebounce(customerId, 1000); // 800ms delay


  const customerdetailsurl =
    debouncedCustomerId && selectedNetwork
      ? `/api/cabletvdetails?customerId=${debouncedCustomerId}&cableTvType=${selectedNetwork}`
      : "";

  // Call API only when the user stops typing (debounced value changes)
  const { data: customerdetailsData, isLoading: customerdetailssLoading } =
    useGetDatanew(
      debouncedCustomerId ? customerdetailsurl : "",
      "get_customer_details",
      userToken
    );





  const sumbitForm = (data: DataProps) => {
    // console.log("data=>", data);
    setCableDetails(data);
    setCableStepper(1);
    // console.log(customerdetailsData, "customerdetailsData");
    setCableCustomerDetails(customerdetailsData?.data?.data);
  };

  const router = useRouter();

  const handleUseClick = (number: string, type: string) => {
    setValue("iucnumber", number);
    setValue("decoder", type);
    setprintreceipt(false);
  };

  return (
    <div className=" flex flex-col items-center justify-center gap-4 bg-[#F6F6F6] py-12">
      <Formtitle
        // className="text-center w-1/2  leading-5 font-semibold text-[#2A2A2A] font-Poppins text-base"
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
              value={watch("decoder")}
              onChange={(e) => setValue("decoder", e.target.value)}
              className="text-sm w-full h-auto p-2.5 border rounded-lg font-Inter font-normal pr-12 border-[#A09F9F]"
            />
          </div>

          <div className="w-full max-w-[350px]">
            <InputField
              name="iucnumber"
              register={register}
              errors={errors}
              value={watch("iucnumber")}
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
                {transformedData && transformedData.length > 0 ? (
                  transformedData.map((item: TransformedDataItem) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
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
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg">
                    <div className="text-center">
                      <p className="text-gray-500 text-lg font-medium mb-2">No Beneficiaries Available</p>
                      <p className="text-gray-400 text-sm">You haven &rsquo; t saved any beneficiaries yet.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CustomModal>
        </form>
      </div>
    </div>
  );
};
