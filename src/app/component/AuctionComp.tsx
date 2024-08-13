"use clients";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/store";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import humanhair from "@/app/asset/image/humanhair.webp";
import { motion } from "framer-motion"

interface cardDetails {
  cardInfo: Array<{
    name: string;
    image: Array<{ image?: string }>;
    ticket_price: any;
    reviews: number;
    starts_in: string | undefined;
    images: any;
    id: string;
  }>;
  currentPage: number;
  cardsNum: number;
}

export const AuctionComp = ({ cardInfo }: cardDetails) => {
  // console.log(cardInfo, 'cardInfooooo')

  const { isLoggedIn, clearAuthCookies, user } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    clearAuthCookies: state.clearAuthCookies,
    user: state.user,
  }));

  function parseStartsIn(startsIn = "0 Days, 0 Hr: 3 Mins Left") {
    const daysMatch = startsIn.match(/(\d+)\s*Days/);
    const hoursMatch = startsIn.match(/(\d+)\s*Hr/);
    const minutesMatch = startsIn.match(/(\d+)\s*Mins/);

    const daysLeft = daysMatch ? parseInt(daysMatch[1], 10) : 0;
    const hoursLeft = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutesLeft = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

    return {
      totalMinutes: daysLeft * 24 * 60 + hoursLeft * 60 + minutesLeft,
      daysLeft,
      hoursLeft,
      minutesLeft,
    };
  }

  const CountdownTimer = ({ startsIn = "0 Days, 0 Hr: 3 Mins Left" }) => {
    const {
      totalMinutes: initialTotalMinutes,
      daysLeft: initialDaysLeft,
      hoursLeft: initialHoursLeft,
      minutesLeft: initialMinutesLeft,
    } = parseStartsIn(startsIn);

    const [timeLeft, setTimeLeft] = useState(initialTotalMinutes);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000); // Update every minute

      return () => clearInterval(timer);
    }, []);

    const minutesLeft = timeLeft % 60;
    const hoursLeft = Math.floor(timeLeft / 60) % 24;
    const daysLeft = Math.floor(timeLeft / 1440);

    const progress = (timeLeft / initialTotalMinutes) * 100;

    return (
      <div className="mb-3">
        <p className="text-xs capitalize ">
          <span className="font-medium">{daysLeft}</span> days{" "}
          <span className="font-medium">{hoursLeft}</span> hr{" "}
          <span className="font-medium">{minutesLeft}</span> min{" "}
          <span className="font-medium">left</span>
        </p>
        <div className="border-gray h-2.5 w-full rounded-full border ">
          <div
            className="h-2 rounded-full bg-[#F25E26]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const router = useRouter();

  return (
    <>

    {

        cardInfo &&  <section className="">


{/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {cardInfo?.map((value, index) => (
    <div
      className="rounded-lg bg-[#F6F6F6] p-4 transition-all duration-200 ease-in-out hover:shadow-lg"
      key={index}
      onClick={() => router.push(`/categories/productdetails/${value.id}`)}
    >
      <div className="border-b-4 pb-4">
        <div className="flex justify-between items-center py-2">
          <div>
            <p className="text-[#A09F9F] text-sm font-medium font-Poppins">
              On Auction
            </p>
          </div>
          <div>
            <button className="cursor-pointer rounded-md bg-[#FCFCFC] px-2 py-1 text-sm font-Poppins font-medium shadow-md transition duration-200 ease-in-out hover:bg-[#E84526] hover:text-white">
              Bid
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center m-3">
          <div className="bg-transparent p-0">
            <Image
              src={`https://ajiroba.onrender.com/media/${value?.images[0]?.image}`}
              width={100}
              height={100}
              alt="human hair"
              className="filter brightness-95"
            />
          </div>
        </div>
      </div>

      <div className="mt-2 mb-1">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-Poppins text-[#000000] text-pretty text-sm font-normal">
              {value?.name}
            </p>
          </div>

          <div className="flex justify-center items-center  gap-2">
            <div>
              <p className="text-xs font-normal font-Poppins text-[#000000]">
                Ticket Price:
              </p>
            </div>
            <div>
              <p className="text-pretty text-base font-Poppins font-medium text-[#F25E26]">
                &#8358;{value?.ticket_price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="flex justify-end text-left gap-1">
          {Array.from({ length: value?.reviews }, (_, index) => (
            <span key={index}>
              <FaStar className="text-[#F25E26]" />
            </span>
          ))}
        </p>
      </div>

      <div>
        <CountdownTimer startsIn={value?.starts_in} />
      </div>
    </div>
  ))}
</div> */}


 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cardInfo?.map((value, index) => (

       <motion.div
          key={index}
          className="rounded-lg bg-[#F6F6F6] p-4"
          onClick={() => router.push(`/categories/productdetails/${value.id}`)}
          whileHover={{ scale: 1.05, boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)' }} // Zoom in slightly on hover
          whileTap={{ scale: 0.95 }} // Slight zoom out on tap/click
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }} // Smooth transition out
        >
          <div className="border-b-4 pb-4">
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="text-[#A09F9F] text-sm font-medium font-Poppins">
                  On Auction
                </p>
              </div>
              <div>
                <button className="cursor-pointer rounded-md bg-[#FCFCFC] px-2 py-1 text-sm font-Poppins font-medium shadow-md transition duration-200 ease-in-out hover:bg-[#E84526] hover:text-white">
                  Bid
                </button>
              </div>
            </div>

            <div className="flex justify-center items-center m-3">
              <div className="bg-transparent p-0">
                <Image
                  src={`https://ajiroba.onrender.com/media/${value?.images[0]?.image}`}
                  width={100}
                  height={100}
                  alt="human hair"
                  className="filter brightness-95"
                />
              </div>
            </div>
          </div>

          <div className="mt-2 mb-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-Poppins text-[#000000] text-pretty text-sm font-normal">
                  {value?.name}
                </p>
              </div>

              <div className="flex justify-center items-center gap-2">
                <div>
                  <p className="text-xs font-normal font-Poppins text-[#000000]">
                    Ticket Price:
                  </p>
                </div>
                <div>
                  <p className="text-pretty text-base font-Poppins font-medium text-[#F25E26]">
                    &#8358;{value?.ticket_price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="flex justify-end text-left gap-1">
              {Array.from({ length: value?.reviews }, (_, index) => (
                <span key={index}>
                  <FaStar className="text-[#F25E26]" />
                </span>
              ))}
            </p>
          </div>

          <div>
            <CountdownTimer startsIn={value?.starts_in} />
          </div>
        </motion.div>
      ))}
    </div>




      </section>
    }

    </>
  );
};
