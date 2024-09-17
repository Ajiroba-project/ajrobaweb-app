import React, { useState, useRef, useEffect } from "react";
import { CustomModal, Modal } from "../../component/Modal";
import { DefaultButton } from "@/app/component/Button";
import { InputField } from "@/app/recharge/components/FormField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutateData } from "@/hooks/useMutateNewData";
import { useForm } from "react-hook-form";
import { CreateNewPin } from "./YupValidation";
import { useAuthStore, userProfile } from "@/store/store";
import { toast } from "react-toastify";
import * as yup from 'yup'
import { FaCalendarAlt } from 'react-icons/fa';
import success from '../../asset/verify.svg'

export const PrintReceipt = ({ receipt, setreceipt }: any) => {
  const { successModal, setSuccessModal } = userProfile((state) => ({
    successModal: state.successModal,
    setSuccessModal: state.setSuccessModal,
  }));

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setreceipt(false);
      }
    };

    if (receipt) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [receipt]);

  // State for start date, end date, and format
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [format, setFormat] = useState<string>('pdf');

  // Handler for date inputs
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  // Handler for radio buttons
  const handleFormatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormat(e.target.value);
  };

  // State for download modal visibility
  const [download, setdownload] = useState(false);

  // Handle successful event (e.g., download success)
  const handleSuccess = () => {
 /*    setSuccessModal(!successModal); */
    setdownload(false);
    setreceipt(false);
  };

  // Handler for form submission (Generate statement)
  const handleGenerate = () => {
    console.log(`Start Date: ${startDate}, End Date: ${endDate}, Format: ${format}`);
    setdownload(true);  // Show the download modal after generation
    // setreceipt(false);   // Hide the statement modal
  };

  return (
    <div>
{
    !download ?



      <CustomModal isOpen={receipt}>
        {receipt && (
          <div ref={modalRef} className="inset-0 flex items-center justify-center p-4 sm:p-6 bg-opacity-50 z-50">
            <div className="flex flex-col items-center p-6 max-w-lg w-full shadow-lg rounded-lg">
              <div className="flex">
                <h1 className="text-2xl font-semibold mb-6 text-center mt-2">Generate Statement</h1>
              </div>

              {/* Date Inputs */}
              <div className="w-full mb-6">
                <h2 className="font-semibold mb-4">Set Duration</h2>
                <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
                  {/* Start Date */}
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label className="mb-2 font-medium">Start Date</label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute top-1/2 transform -translate-y-1/2 left-3 text-orange-500" />
                      <input
                        type="date"
                        className="w-full border border-gray-300 rounded-md px-10 py-2 focus:outline-none"
                        value={startDate}
                        onChange={handleStartDateChange}
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="flex flex-col w-full sm:w-1/2">
                    <label className="mb-2 font-medium">End Date</label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute top-1/2 transform -translate-y-1/2 left-3 text-orange-500" />
                      <input
                        type="date"
                        className="w-full border border-gray-300 rounded-md px-10 py-2 focus:outline-none"
                        value={endDate}
                        onChange={handleEndDateChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* File Format Selection */}
              <div className="w-full mb-6">
                <h2 className="font-medium mb-4">Generate as:</h2>
                <div className="flex justify-center gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="format"
                      value="pdf"
                      checked={format === 'pdf'}
                      onChange={handleFormatChange}
                      className="mr-2"
                    />
                    PDF
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="format"
                      value="excel"
                      checked={format === 'excel'}
                      onChange={handleFormatChange}
                      className="mr-2"
                    />
                    Excel File
                  </label>
                </div>
              </div>

              {/* Generate Button */}
              <button
                className="px-8 text-sm font-normal rounded-lg bg-[#FCDFD4] py-2 transition delay-300 duration-300 ease-in-out hover:bg-[#E84526] hover:text-white"
                onClick={handleGenerate}
              >
                Generate
              </button>
            </div>
          </div>
        )}
      </CustomModal> :


      download && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Modal
            buttoncount={1}
            icon={success}
            handleEvent={handleSuccess}
            title="Successful"
            subtitle={'Your statement has been generated. Click on the link below to download'}
            buttontext="Download"
            buttonclass="w-full rounded-md bg-[#FCDFD4] p-3 hover:bg-[#f25e26] hover:text-white"
          />
        </div>
      )}
    </div>
  );
};
