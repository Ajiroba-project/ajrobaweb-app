"use client";
import React from "react";
import { Header } from "../component/Header";
import { Profile } from "../../app/profile/components/Profile";
import { useAuthStore, userProfile } from "@/store/store";
import { useRouter } from "next/navigation";
import { useAuthOrders } from "@/hooks/useAuthOrders";
import { Footer } from "../component/Footer";
import { Title } from "../component/Title";
import purchasecheck from "@/app/asset/purchasecheck.svg";
import Image from "next/image";
import { MdOutlineFileDownload } from "react-icons/md";
import ricesample from "@/app/asset/image/rice_sample.jpg";
import payment_method from "@/app/asset/image/payment_method.svg";
import { useGetOrderData, useGetProductData } from "@/hooks/useGetData";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  useAuthOrders(router);
  const searchParams = useSearchParams();
  const order_id = searchParams.get("orderId");
  const profile = userProfile((state) => state.profile);
  const { isLoggedIn, user, token } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    token: state.token,
  }));
  const userToken = token;

  const {
    data: productinfo,
    isLoading: productLoading,
    error: producterror,
  } = useGetProductData(
    "/api/productdetailsbyid",
    userToken,
    order_id,
    "get_product_details"
  );

   console.log(productinfo?.data?.data, "productinfo")

  return (
    <section className="bg-[#F6F6F6] min-h-screen">
      <header className="z-50">
        <Header />
      </header>

      <section className="bg-[#F6F6F6] container">
        <div className="">
          <div onClick={() => router.back()}>
            <div className="cursor-pointer container flex justify-start">
              <p className="text-[#E84526] text-base">Back</p>
            </div>
          </div>

          <section
            style={{
              margin: "0 auto",
              width: "80%",
            }}
          >
            <Title title="Purchase Order Details" />
          </section>
        </div>
      </section>

      <main className="container bg-white py-8">
        <div className="container">
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div>
                <Image
                  width={30}
                  height={30}
                  src={purchasecheck}
                  alt="purchasecheck"
                />
              </div>
              <div>
                <p className="font-Poppins text-base text-[#2A2A2A] font-medium">
                  Your purchase Order is successful!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div>
                <MdOutlineFileDownload color="red" size={12} />
              </div>
              <div>
                <p className="font-Poppins text-sm text-[#504D4D] font-medium">
                  Download
                </p>
              </div>
            </div>
          </div>

          <div
            style={{ borderBottom: ".5px solid #6E6E6E" }}
            className="flex justify-between mt-8"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <div>
                <p className="font-Poppins text-sm text-[#504D4D] font-medium">
                  Product Details
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div>
                <p className="font-Poppins text-sm text-[#6E6E6E] font-medium">
                  Order Code:
                </p>
              </div>
              <div>
                <p className="font-Inter text-base text-[#111111] font-bold">
                  {productinfo?.data?.data?.[1].order_id}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section
          className="container"
          style={{
            margin: "0 auto",
            width: "85%",
          }}
        >
          {productinfo?.data?.data?.[0]?.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-between md:flex-row   mt-8 items-center border px-8 py-8 rounded-md w-full"
              >
              <div style={{
                width: '55%'
              }}  className="flex flex-col md:flex-row items-center gap-2 w-full md:w-1/2">
                  <div className="">
                    <Image
                      width={100}
                      height={100}
                      src={`https://ajiroba.onrender.com/media/${item.product?.images[0]?.image}`}
                      alt="product_image"
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <div>
                      <p className="text-[#353131] text-base font-Poppins">
                        {item.product?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#A09F9F] text-[12px] font-Poppins font-normal">
                        {item.product?.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{
                width: '35%'
              }} className="flex items-center gap-2 border rounded-sm border-[#6E6E6E] px-4 py-2 w-full md:w-1/2">
                  <div
                    className="flex flex-col items-baseline gap-4 w-full"
                    style={{
                      borderBottom: "1px solid #6E6E6E",
                      paddingBottom: ".5rem",
                    }}
                  >
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
                      <div>
                        <p className="text-[#6E6E6E] font-Poppins text-sm">
                          Unit Price:
                        </p>
                      </div>
                      <div>
                        <p className="font-Poppins text-[#353131] font-medium">
                        N {item?.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
                      <div>
                        <p className="text-[#6E6E6E] font-Poppins text-sm">
                          Qty:
                        </p>
                      </div>
                      <div>
                        <p className="font-Poppins text-[#353131] font-medium">
                          {item?.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full"
                      style={{
                        borderTop: "1px solid #6E6E6E",
                        paddingTop: ".5rem",
                      }}
                    >
                      <div>
                        <p className="text-[#6E6E6E] font-Poppins text-sm">
                          Price:
                        </p>
                      </div>
                      <div>
                        <p className="font-Poppins text-[#353131] font-medium">
                          N {item?.sub_total}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section
          style={{
            margin: "0 auto",
            width: "95%",
            marginTop: "3rem",
          }}
          className="border rounded-md px-4 py-2"
        >
          <div className="flex flex-col gap-8">
            <div className="flex justify-between">
              <div>
                <p className="font-Poppins text-[#353131] font-medium text-base">
                  Payment Method
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div>
                  <Image
                    width={20}
                    height={20}
                    src={payment_method}
                    alt="purchasecheck"
                  />
                </div>
                <div>
                  <p className="font-Poppins text-sm text-[#2A2A2A] font-normal">
                    {productinfo?.data?.data[1]?.payment_method}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="font-Poppins text-[#353131] font-medium text-base">
                  Ticket Price
                </p>
              </div>

              <div className="flex items-center">
                <div>
                  <p className="font-Poppins text-base text-[#2A2A2A] font-semibold">
                    N {productinfo?.data?.data[1]?.total_price}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="font-Poppins text-[#353131] font-medium text-base">
                  Discount
                </p>
              </div>

              <div className="flex items-center">
                <div>
                  <p className="font-Poppins text-base text-[#2A2A2A] font-semibold">
                    N 0
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="font-Poppins text-[#353131] font-medium text-base">
                  Total
                </p>
              </div>

              <div className="flex items-center">
                <div>
                  <p className="font-Poppins text-base text-[#2A2A2A] font-semibold">
                    N {productinfo?.data?.data[1]?.total_price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </section>
  );
};

export default Page;
