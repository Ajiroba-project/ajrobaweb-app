"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { raffle } from "@/app/static-data";
import { useRouter } from "next/navigation";
import { HeadingText } from "../component/Heading";
import { DefaultButton } from "../component/Button";
import Cookies from "js-cookie";
import ModalComponent from "@/app/component/ModalComponent";
import { Footer } from "@/app/component/Footer";
import { Header } from "@/app/component/Header";

import AuthMiddleware from "@/hooks/useAuth";
import useAuthMiddleware from "@/hooks/useAuthRaffle"

interface ProductData {
  id?: string;
  name?: string;
  price?: number;
  data?: any;
  starts_in?: string;
  start_date?: string;
  start_time?: string;
  end_time?: string;
}

const Page = ({ params }: any) => {
  const router = useRouter();
  useAuthMiddleware(router);

  const [data, setData] = useState<any>(
    raffle.filter((val) => val.host === params.id),
  );
  const [playState, setPlayState] = useState<boolean>(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewCoundown, setViewCountdown] = useState(false);
  const [raffleended, setraffleended] = useState(false);
  const [loadingdata, setLoadingData] = useState(true);
  const [videoWatched, setVideoWatched] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownValue, setCountdownValue] = useState(5);
  const [enforceTime, setEnforceTime] = useState(0); // Track enforced time on page
  const [raffleStartTime, setRaffleStartTime] = useState<number>(0); // When raffle actually started
  const [remainingEnforceTime, setRemainingEnforceTime] = useState(0); // Remaining enforced time

  const userToken = (Cookies.get("token") as string) || "";
  const product_id = params?.id;
  const [productdatanew, setProductDataNew] = useState<ProductData | null>(null);

  const fetchWithAuth = useCallback(async (url: string) => {
    setLoadingData(true);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `token ${userToken}`,
      },
      redirect: "follow",
    };

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      setProductDataNew(result?.data);

      // Set enforced time (2 minutes and 30 seconds = 150000ms)
      setEnforceTime(150000);
      // console.log('Enforced time set to:', 150000, 'ms');

      // Calculate when raffle started based on start_date and start_time
      if (result?.data?.start_date && result?.data?.start_time) {
        const raffleStartDate = new Date(result.data.start_date + " " + result.data.start_time);
        const raffleStartTimestamp = raffleStartDate.getTime();
        setRaffleStartTime(raffleStartTimestamp);
        // console.log('Raffle start time set to:', raffleStartTimestamp, 'which is:', new Date(raffleStartTimestamp).toLocaleString());
        
        // Check if enforced time has already passed
        const now = Date.now();
        const timeSinceRaffleStarted = now - raffleStartTimestamp;
     /*    console.log('Current time vs raffle start:', {
          now: new Date(now).toLocaleString(),
          raffleStart: new Date(raffleStartTimestamp).toLocaleString(),
          timeSinceStart: timeSinceRaffleStarted,
          enforceTime: 150000,
          shouldRedirect: timeSinceRaffleStarted >= 150000
        }); */
        
        // If enforced time has already passed, redirect immediately
        if (timeSinceRaffleStarted >= 150000) {
       /*    console.log('Enforced time already passed, redirecting immediately'); */
          router.push(`/raffle/${product_id}/winners`);
          return;
        }
        
        // If we're in the enforced period, set remaining time
        if (timeSinceRaffleStarted >= 0 && timeSinceRaffleStarted < 150000) {
          const remaining = 150000 - timeSinceRaffleStarted;
          setRemainingEnforceTime(remaining);
        /*   console.log('In enforced period, initial remaining time:', remaining); */
        }
      }

      // Handle different raffle states
      if (result?.data?.starts_in === "Raffle Started") {
        // Raffle is ongoing. Respect enforced window; do not redirect here.
        setraffleended(false);
        setViewCountdown(false);
      } else if (result?.data?.starts_in === "Raffle Ended") {
        setraffleended(true);
        setViewCountdown(false);
      } else {
        // Raffle hasn't started yet, show countdown modal
        setViewCountdown(true);
      }

      setLoadingData(false);
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      setLoadingData(false);
    }
  }, [userToken, product_id, router]);

  
  const handleVideoEnded = () => {
    setVideoWatched(true);
    
    // console.log('Video ended, checking enforced time:', {
    //   enforceTime,
    //   raffleStartTime,
    //   currentTime: Date.now()
    // });
    
    // Check if enforced time has passed first
    if (enforceTime > 0 && raffleStartTime > 0) {
      const timeSinceRaffleStarted = Date.now() - raffleStartTime;
     /*  console.log('Time since raffle started:', timeSinceRaffleStarted, 'ms'); */
      
      if (timeSinceRaffleStarted >= enforceTime) {
        // Enforced time has passed, redirect to winners page
  /*       console.log('Redirecting due to enforced time completion after video'); */
        router.push(`/raffle/${product_id}/winners`);
        return;
      } else {
        // console.log('Enforced time not yet complete, remaining:', enforceTime - timeSinceRaffleStarted, 'ms');
      }
    }
    
    // Check if raffle time is up (for upcoming raffles)
    checkRaffleTime();
  };

  // Check if raffle time is up
  const checkRaffleTime = () => {
    if (!productdatanew?.start_date || !productdatanew?.start_time) return;

    const now = new Date();
    const startDate = new Date(productdatanew.start_date + " " + productdatanew.start_time);
    
    if (now >= startDate) {
      // Raffle time is up, show countdown
      setShowCountdown(true);
      startCountdown();
    }
  };

  // // Check if raffle is about to start (within 5 seconds)
  // const checkRaffleAboutToStart = () => {
  //   if (!productdatanew?.start_date || !productdatanew?.start_time) return;

  //   const now = new Date();
  //   const startDate = new Date(productdatanew.start_date + " " + productdatanew.start_time);
  //   const timeUntilStart = startDate.getTime() - now.getTime();
    
  //   // If raffle starts in 5 seconds or less, show countdown
  //   if (timeUntilStart <= 5000 && timeUntilStart > 0) {
  //     setShowCountdown(true);
  //     startCountdown();
  //   }
  // };

  // // Check if enforced time has passed
  // const checkEnforcedTime = () => {
  //   if (enforceTime === 0 || raffleStartTime === 0) return;
    
  //   const now = Date.now();
  //   const timeSinceRaffleStarted = now - raffleStartTime;
  //   const remaining = Math.max(0, enforceTime - timeSinceRaffleStarted);
  //   setRemainingEnforceTime(remaining);
    
  //   // Check if we're in the enforced period
  //   if (timeSinceRaffleStarted >= 0 && timeSinceRaffleStarted < enforceTime) {
  //     // We're in the enforced period, show countdown
  //     // console.log('In enforced period, remaining time:', remaining);
  //   } else if (timeSinceRaffleStarted >= enforceTime) {
  //     // Enforced time has passed, redirect to winners page
  //   /*   console.log('Redirecting due to enforced time completion'); */
  //     router.push(`/raffle/${product_id}/winners`);
  //   }
    
  //   // console.log('Enforced time check:', {
  //   //   enforceTime,
  //   //   raffleStartTime: new Date(raffleStartTime).toLocaleString(),
  //   //   now: new Date(now).toLocaleString(),
  //   //   timeSinceRaffleStarted,
  //   //   remaining,
  //   //   shouldRedirect: timeSinceRaffleStarted >= enforceTime
  //   // });
  // };

  // Start countdown timer
  const startCountdown = () => {
    let count = 5;
    setCountdownValue(count);
    
    const timer = setInterval(() => {
      count--;
      setCountdownValue(count);
      
      if (count <= 0) {
        clearInterval(timer);
        // Navigate to winners page
        router.push(`/raffle/${product_id}/winners`);
      }
    }, 1000);
  };

  const handleVideoControl = () => {
    if (iframeRef.current) {
      const iframeWindow = iframeRef.current.contentWindow;
      if (iframeWindow) {
        const action = playState ? "pauseVideo" : "playVideo";
        iframeWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: action,
            args: [],
          }),
          "*",
        );
      }
    }
    setPlayState(!playState);
  };

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

  // Countdown Timer component for raffle start
  const CountdownTimer = ({ startsIn = "0 Days, 0 Hr: 0 Mins Left" }) => {
    const {
      totalMinutes: initialTotalMinutes,
      daysLeft: initialDaysLeft,
      hoursLeft: initialHoursLeft,
      minutesLeft: initialMinutesLeft,
    } = parseStartsIn(startsIn);

    const [timeLeft, setTimeLeft] = useState(initialTotalMinutes * 60);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const totalSeconds = timeLeft;
    const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
    const hoursLeft = Math.floor((totalSeconds % 86400) / 3600);
    const daysLeft = Math.floor(totalSeconds / 86400);

    const progress =
      initialTotalMinutes > 0 ? (timeLeft / (initialTotalMinutes * 60)) * 100 : 0;

    return (
      <div className="mb-3">
        <p className="text-xs capitalize mb-2 ">
          <span className="font-medium">{daysLeft}</span> dy:{" "}
          <span className="font-medium">{hoursLeft}</span> Hr:{" "}
          <span className="font-medium">{minutesLeft}</span> Min{" "}
          <span className="font-medium">Left</span>
        </p>
        <div className="border-[#B7B7B7] h-2.5 w-full rounded-full border ">
          <div
            className="h-2 rounded-full bg-[#F25E26]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Final countdown component (5 seconds)
  const FinalCountdown = () => (
    <div className="flex flex-col items-center justify-center min-h-[306px]">
      <div className="relative flex flex-col items-center justify-center w-64 h-72 rounded-xl bg-gradient-to-b from-[#FDECE9] to-white shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.1)] border-[4px] border-[#9C4DCC]">
        <div className="absolute -top-8 flex items-center justify-center w-16 h-16 rounded-full bg-[#FDECE9] border-[4px] border-white shadow-md">
          <span role="img" aria-label="emoji" className="text-3xl">
            🎉
          </span>
        </div>

        <h3 className="mt-12 text-lg font-semibold text-gray-800">
          Raffle Draw
        </h3>

        <p className="mt-1 text-sm text-gray-500">starts in</p>

        <div className="text-6xl font-bold text-[#F25E26] mt-4">
          {countdownValue}
        </div>
      </div>
    </div>
  );

  return (
    <section className="z-auto">
      <Header />
      <div className="w-full bg-[#F6F6F6] pt-[20vh]">
        <div className="container flex flex-col">
         {/*  <p
            onClick={() => router.back()}
            className="cursor-pointer text-[#F25E26] underline"
          >
            Back
          </p> */}
          <div className="mb-3 text-center">
            <HeadingText title="Live Raffle Draw" />
          </div>
        </div>
      </div>
      <section className="relative mb-[5rem] mt-7 flex flex-col items-center justify-center">
       {/*  {loadingdata ? (
          <div className="flex flex-col items-center justify-center min-h-[306px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F25E26]"></div>
            <p className="mt-4 text-gray-600">Loading raffle data...</p>
          </div>
        ) : showCountdown ? (
          <FinalCountdown />
        ) : ( */}
          <>
            <div className="relative z-auto mb-4 w-full">
              {/* Enforced Time Display - Only show during the enforced period */}
              {enforceTime > 0 && raffleStartTime > 0 && remainingEnforceTime > 0 && (
                <div className="text-center mb-4">
                  <p className="text-lg text-gray-600 mb-2">
                    Please wait before proceeding to raffle
                  </p>
                  <div className="flex justify-center items-center space-x-2">
                    <span className="text-sm text-gray-500">Time remaining:</span>
                    <span className="text-xl font-bold text-[#F25E26]">
                      {Math.floor(remainingEnforceTime / 60000)}:{(Math.floor(remainingEnforceTime / 1000) % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex justify-center items-center">
                                <div className="relative">
                  <video
                    width="800"
                    height="306"
                    controls
                    autoPlay
                    onEnded={handleVideoEnded}
                    onSeeked={(e) => {
                      // Prevent seeking forward - only allow seeking backward
                      const video = e.target as HTMLVideoElement;
                      if (video.currentTime > video.duration * 0.1) { // Allow small backward seeking
                        video.currentTime = Math.min(video.currentTime, video.duration * 0.1);
                      }
                    }}
                    onTimeUpdate={(e) => {
                      // Prevent fast-forwarding by monitoring playback rate
                      const video = e.target as HTMLVideoElement;
                      if (video.playbackRate > 1.5) {
                        video.playbackRate = 1;
                      }
                    }}
                    onLoadedMetadata={(e) => {
                      // Disable seeking controls
                      const video = e.target as HTMLVideoElement;
                      
                      // Prevent seeking forward
                      video.addEventListener('seeking', (e) => {
                        const targetTime = (e.target as HTMLVideoElement).currentTime;
                        const maxAllowedTime = video.duration * 0.1;
                        if (targetTime > maxAllowedTime) {
                          video.currentTime = maxAllowedTime;
                        }
                      });

                      // Disable right-click context menu
                      video.addEventListener('contextmenu', (e) => e.preventDefault());
                      
                      // Disable keyboard shortcuts
                      video.addEventListener('keydown', (e) => {
                        if (e.key === 'ArrowRight' || e.key === ' ') {
                          e.preventDefault();
                        }
                      });
                    }}
                    className="rounded-lg shadow-md"
                  >
                    <source src="/ajirobaraffleendedvideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Overlay to prevent progress bar interaction */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{ pointerEvents: 'none' }}
                  />
                  {/* CSS to disable progress bar dragging */}
                  <style jsx>{`
                    video::-webkit-media-controls-timeline {
                      pointer-events: none !important;
                    }
                    video::-webkit-media-controls-current-time-display {
                      pointer-events: none !important;
                    }
                    video::-webkit-media-controls-time-remaining-display {
                      pointer-events: none !important;
                    }
                    video::-webkit-media-controls-play-button {
                      pointer-events: auto !important;
                    }
                    video::-webkit-media-controls-pause-button {
                      pointer-events: auto !important;
                    }
                    video::-webkit-media-controls-volume-slider {
                      pointer-events: auto !important;
                    }
                    video::-webkit-media-controls-mute-button {
                      pointer-events: auto !important;
                    }
                  `}</style>
                </div>
              </div>
            </div>


            <div className="flex flex-col justify-center mb-8">
              <DefaultButton
                handleClick={() => router.push("/raffledraw")}
                text="Back to Auction"
                type="button"
                className="h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all"
              />
            </div>

         {/*    {raffleended ? (
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-4">Raffle has ended</p>
                <DefaultButton
                  text="View Winners"
                  className="h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all"
                  type="button"
                  handleClick={() => {
                    router.push(`/raffle/${product_id}/winners`);
                  }}
                />
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg text-gray-600 mb-4">
                  Please watch the video completely to participate in the raffle
                </p>
                <DefaultButton
                  text={playState ? "Stop Video" : "Play Video"}
                  className="h-14 w-60 rounded-lg bg-[#FCDFD4] p-2 transition delay-300 duration-300 ease-in-out hover:bg-[#F25E26] hover:text-white hover:transition-all"
                  type="button"
                  handleClick={handleVideoControl}
                />
              </div>
            )} */}
          </>
    {/*     )} */}
      </section>

      {/* Countdown Modal for raffle start */}
      <ModalComponent
        content={
          <div className="flex flex-col px-6 py-4">
            <div className="self-start text-red-500 font-Poppins cursor-pointer mb-4">
              Back
            </div>

            <div className="flex items-center justify-center bg-gray-100">
              <div className="relative flex flex-col items-center justify-center w-64 h-72 rounded-xl bg-gradient-to-b from-[#FDECE9] to-white shadow-[0_4px_6px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,0,0,0.1)] border-[4px] border-[#9C4DCC]">
                <div className="absolute -top-8 flex items-center justify-center w-16 h-16 rounded-full bg-[#FDECE9] border-[4px] border-white shadow-md">
                  <span role="img" aria-label="emoji" className="text-3xl">
                    😊
                  </span>
                </div>

                <h3 className="mt-12 text-lg font-semibold text-gray-800">
                  Raffle Draw
                </h3>

                <p className="mt-1 text-sm text-gray-500">starts in</p>

                <CountdownTimer startsIn={productdatanew?.starts_in || "0 Days, 0 Hr: 0 Mins Left"} />
              </div>
            </div>
          </div>
        }
        isModalOpen={viewCoundown}
        showModal={() => setViewCountdown(!viewCoundown)}
        handleOk={() => setViewCountdown(false)}
        handleCancel={() => setViewCountdown(false)}
      />
      <Footer />
    </section>
  );
};

export default Page;
