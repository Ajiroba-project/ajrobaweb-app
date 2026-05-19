"use client";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Electricitychema } from "./YupValidations";
import { DefaultButton } from "../../component/Button";
import { InputField, SelectField, CurrencyInputField } from "./FormField";
import { AirtimePurchase, ElectricityPurchase } from "@/store/store";
import { Formtitle } from "./Formtitle";
import { CustomModal, Modal } from "@/app/component/Modal";
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
import ibedcicon from '../../asset/ibedcicon.png'
import ikejaicon from '../../asset/ikejaicon.png'
import beninicon from '../../asset/beninicon.png'
import enuguicon from '../../asset/enuguicon.jpeg'
import ekedcicon from '../../asset/ekedcicon.jpeg'
import kadunaicon from '../../asset/kadunaicon.jpeg'
import kanoicon from '../../asset/kedcoicon.png'
import aedcicon from '../../asset/aedc.png'
import jedicon from '../../asset/jedicon.jpeg'
import phedcicon from '../../asset/phedicon.jpeg'

import { removeDuplicateBeneficiaries } from '@/utils/removeDuplicates';
import { useDebounce } from "@/hooks/useDebounce";
type DataProps = {
  decoder: string;
  elecamount: string;
  elecphone: string;
  meter: string;
  iucnumber: string;
};

interface TransformedDataItem {
  id: number;
  number: string;
  type: string;
  icon: string | null;
}

export const ElectricityDetails = () => {
  const setElectricityDetails = ElectricityPurchase((state) => state.setElectricityDetails);
  const setElectricityCustomerDetails = ElectricityPurchase((state) => state.setElectricityCustomerDetails,
  );




  const [printreceipt, setprintreceipt] = useState<boolean>(false);

  const { setElectricityStepper } = ElectricityPurchase((state) => ({
    setElectricityStepper: state.setElectricityStepper,
  }));

  const plan = ['prepaid', 'postpaid']

  const userToken = (Cookies.get("token") as string) || "";

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/beneficiaries/?type=electricity`;

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
    IBEDC: ibedcicon,
    IKEJA: ikejaicon,
    BENIN: beninicon,
    ENUGU: enuguicon,
    EKEDC: ekedcicon,
    KADUNA: kadunaicon,
    KANO: kanoicon,
    AEDC: aedcicon,
    JED: jedicon,
    PHEDC: phedcicon,
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
    resolver: yupResolver(Electricitychema),
  });

  const discourl = `${process.env.NEXT_PUBLIC_BASE_URL}/pay/nomba/electric_discos/`;

  const { data: discosdata, isLoading: discosLoading } = useGetDatanew(
    discourl,
    "get_electric_discos",
    userToken || " ",
  );




 const providersList = Array.isArray(discosdata?.data)
    ? discosdata?.data?.map((provider: { id: any; name: any; code?: any; identifier?: any; slug?: any }) => ({
        value: String(provider?.id ?? ''),
        label: provider?.name ?? '',
        meta: provider
      }))
        .filter(provider => provider.value && provider.label)
    : [];

  // console.log(providersList, "providersList")

  const customerId = watch("iucnumber");
 const selectedNetwork = watch("decoder");

 const selectedProvider = providersList.find(provider => provider.value === selectedNetwork);

//  console.log(selectedProvider?.value, 'selected providerrrr')

 const discoQueryValue = selectedProvider?.meta?.code
    || selectedProvider?.meta?.identifier
    || selectedProvider?.meta?.slug
    || selectedProvider?.label
    || selectedProvider?.value
    || '';


    // console.log(discoQueryValue, 'ddd')

  // console.log(extractedContent, 'extractedContent');


  // console.log(selectedNetwork, 'selectedNetwork')

 const dataplanurl = discoQueryValue
    ? `/api/fetchcable?disco=${selectedProvider?.value}`
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

  const network = ["GOTV", "DSTV", "SHOWMAX", "STARTIME", "CONSAT TV", "IBEDC", "IKEDC", "BENIN", "ENUGU", "EKEDC", "KADUNA", "KANO", "AEDC", "JED", "PHEDC"];


  // Debounce the customerId to delay API call
  const debouncedCustomerId = useDebounce(customerId, 1000); // 800ms delay


 const customerdetailsurl =
    debouncedCustomerId && discoQueryValue
      ? `/api/discodetails?customerId=${debouncedCustomerId}&disco=${selectedProvider?.value}`
      : "";

  // Call API only when the user stops typing (debounced value changes)
  const { data: customerdetailsData, isLoading: customerdetailssLoading } =
    useGetDatanew(
      debouncedCustomerId ? customerdetailsurl : "",
      "get_customer_details",
      userToken
    );


  // console.log(customerdetailsData, "customerdetailsData")


  const sumbitForm = (data: DataProps) => {
    //  console.log("data=>", data);
    //  console.log(errors, 'eeeee')
     setElectricityDetails(data)
     setElectricityStepper(1)
    // // console.log(customerdetailsData, "customerdetailsData");
     setElectricityCustomerDetails(customerdetailsData?.data?.data);
  };

  const router = useRouter();

 const handleUseClick = (number: string, type: string) => {
    setValue("iucnumber", number);
    const matchingProvider = providersList.find(provider => provider.label?.toLowerCase() === type?.toLowerCase());
    if (matchingProvider) {
      setValue("decoder", matchingProvider.value);
    } else {
      setValue("decoder", type);
    }
    setprintreceipt(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 bg-[#F6F6F6] px-4 py-12">
      <Formtitle
        title="Electricity Recharge"
        subtitle="Recharge your electricity with ease"
      />
      <div className="w-full max-w-[400px]">
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(sumbitForm)}
        >

          {/* {
            console.log(providersList, 'providersList')
          } */}


          <div className="w-full">
            <SelectField
              name="decoder"
              register={register}
              errors={errors}
              options={providersList}
              label="Select Provider"
              showlabel={false}
              value={watch("decoder")}
              onChange={(e) => setValue("decoder", e.target.value)}
              className="text-sm w-full h-auto p-2.5 border rounded-lg font-Inter font-normal border-[#A09F9F]"
            />
          </div>

          <div className="w-full">
            <SelectField
              name='meter'
              register={register}
              errors='errors'
              options={plan}
              label='Meter type'
              showlabel={false}
              value={watch("meter")}
              onChange={(e) => setValue("meter", e.target.value)}
              className="text-sm w-full h-auto p-2.5 border rounded-lg font-Inter font-normal border-[#A09F9F]"
            />
          </div>

          <div className="w-full">
            <InputField
              name="iucnumber"
              register={register}
              errors={errors}
              value={watch("iucnumber")}
              type="text"
              placeholder="Meter Number"
            />
          </div>

          {/*   <div className="w-full max-w-[350px]">
            <SelectField
              name="bundle"
              register={register}
              errors="errors"
              options={dataPlan}
              label="Select Package/Bundle"
              showlabel={false}
              className="text-sm w-full max-w-full truncate h-auto p-2.5 border rounded-lg font-Inter font-normal border-[#A09F9F]"
            />
          </div> */}


          <div className="w-full">
            <CurrencyInputField
              name="elecamount"
              register={register}
              errors={errors}
              type="text"
              placeholder="Amount"
              // isdisabled
            />

          </div>


          <div className="w-full">
            <InputField
              name="elecphone"
              register={register}
              errors={errors}
              type="text"
              placeholder="Phone Number"

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
            <section className='flex items-center justify-between gap-4'>
              <div className='flex min-w-0 items-center gap-2 sm:gap-3'>
                <Image src={Brand} alt='brand-logo' className='h-5 w-auto flex-shrink-0 sm:h-8' />
                <h2 className='truncate font-Poppins text-sm font-semibold text-[#2A2A2A] sm:text-base'>Beneficiaries</h2>
              </div>
              <button
                className='flex-shrink-0 font-Poppins text-xs text-[#E84526] transition-colors hover:text-[#d94f1e] sm:text-sm'
                onClick={() => setprintreceipt(false)}
              >
                Close
              </button>
            </section>

            <div className='mt-4 space-y-3'>
              {transformedData && transformedData.length > 0 ? (
                transformedData.map((item: TransformedDataItem) => (
                  <div
                    key={item.id}
                    className='flex items-center justify-between rounded-xl border border-[#F0F0F0] bg-[#FAFAFA] px-3 py-3 transition-colors hover:bg-[#FFF8F5] sm:px-5 sm:py-4'
                  >
                    <div className='flex min-w-0 items-center gap-3'>
                      {item.icon && (
                        <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 sm:h-11 sm:w-11'>
                          <Image src={item.icon} alt={item.type} width={44} height={44} className='h-full w-full object-contain' />
                        </div>
                      )}
                      <div className='min-w-0'>
                        <p className='truncate font-Poppins text-sm font-medium text-[#2A2A2A] sm:text-base'>{item.number}</p>
                        <p className='font-Poppins text-xs text-[#8C8C8C]'>{item.type}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUseClick(item.number, item.type)}
                      className='ml-3 flex-shrink-0 rounded-lg bg-[#FCDFD4] px-4 py-2 font-Poppins text-xs font-medium text-[#2A2A2A] transition-colors hover:bg-[#F25E26] hover:text-white sm:px-5 sm:text-sm'
                    >
                      Use
                    </button>
                  </div>
                ))
              ) : (
                <div className='flex flex-col items-center justify-center rounded-xl border border-dashed border-[#E0E0E0] py-10'>
                  <p className='font-Poppins text-sm font-medium text-[#8C8C8C] sm:text-base'>No Beneficiaries Available</p>
                  <p className='mt-1 font-Poppins text-xs text-[#ABABAB] sm:text-sm'>You haven&apos;t saved any beneficiaries yet.</p>
                </div>
              )}
            </div>
          </CustomModal>
        </form>
      </div>
    </div>
  );
};
