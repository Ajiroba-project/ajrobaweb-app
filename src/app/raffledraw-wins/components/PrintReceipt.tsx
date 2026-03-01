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
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (...args: any[]) => jsPDF;
  }
}

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
  }, [receipt, setreceipt]);

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
    if (format === "pdf") {
      generatePDF(demoData);
    } else {
      generateExcel(demoData);
    }
    setdownload(true);
  };

  const demoData = {
    name: "Mike James",
    address: "45, Harvey Road, Yaba Lagos",
    reportTime: "1:35pm, March 24, 2024",
    startDate: "12/02/2024",
    endDate: "23/03/2024",
    walletBalance: 10000,
    totalCredit: 75000,
    totalDebit: 60000,
    transactions: [
      {
        transactionId: "TRX123456",
        dateTime: "24/03/2024 13:35",
        narration: "Fund Transfer",
        class: "Debit",
        biller: "Bank Transfer",
        beneficiary: "John Doe",
        amountDr: "5000",
        amountCr: "0",
        accountBalance: "10000",
        channel: "Bank Transfer",
        status: "Success"
      },
      {
        transactionId: "TRX123457",
        dateTime: "23/03/2024 15:20",
        narration: "Wallet Funding",
        class: "Credit",
        biller: "Card Payment",
        beneficiary: "Self",
        amountDr: "0",
        amountCr: "20000",
        accountBalance: "75000",
        channel: "Card Payment",
        status: "Success"
      },
      {
        transactionId: "TRX123458",
        dateTime: "22/03/2024 09:15",
        narration: "Bill Payment",
        class: "Debit",
        biller: "DSTV",
        beneficiary: "DSTV Nigeria",
        amountDr: "15000",
        amountCr: "0",
        accountBalance: "60000",
        channel: "DSTV",
        status: "Success"
      },
      {
        transactionId: "TRX123459",
        dateTime: "21/03/2024 11:45",
        narration: "Airtime Purchase",
        class: "Debit",
        biller: "MTN",
        beneficiary: "Self",
        amountDr: "2000",
        amountCr: "0",
        accountBalance: "58000",
        channel: "MTN",
        status: "Success"
      },
      {
        transactionId: "TRX123460",
        dateTime: "20/03/2024 16:30",
        narration: "Fund Transfer",
        class: "Debit",
        biller: "Bank Transfer",
        beneficiary: "Jane Smith",
        amountDr: "10000",
        amountCr: "0",
        accountBalance: "48000",
        channel: "Bank Transfer",
        status: "Success"
      }
    ]
  };

  const generatePDF = (data: any) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text("AJIRÓBA", 14, 15);
    doc.setFontSize(14);
    doc.text("Wallet Statement", 14, 25);

    // User Info
    doc.setFontSize(10);
    doc.text(`Name: ${data.name}`, 14, 35);
    doc.text(`Address: ${data.address}`, 14, 41);
    doc.text(`Report Time: ${data.reportTime}`, 14, 47);
    doc.text(`Start Date: ${data.startDate}`, 14, 53);
    doc.text(`End Date: ${data.endDate}`, 14, 59);

    const boxX = doc.internal.pageSize.getWidth() - 80;
    const boxY = 30;
    doc.rect(boxX, boxY, 70, 25); // x, y, width, height
    doc.text(`Wallet Balance: ₦${data.walletBalance.toLocaleString()}`, boxX + 5, boxY + 8);
    doc.text(`Total Credit: ₦${data.totalCredit.toLocaleString()}`, boxX + 5, boxY + 15);
    doc.text(`Total Debit: ₦${data.totalDebit.toLocaleString()}`, boxX + 5, boxY + 22);

    // Table
    doc.autoTable({
      startY: 65,
      head: [[
        "S/N", "Transaction ID", "Date & Time", "Narration", "Class", "Biller", "Beneficiary", "Amount DR (₦)", "Amount CR (₦)", "Account Balance (₦)", "Channel", "Status"
      ]],

      body: data.transactions.map((t: any, i: any) => [
        i + 1,
        t.transactionId,
        t.dateTime,
        t.narration,
        t.class,
        t.biller,
        t.beneficiary,
        t.amountDr,
        t.amountCr,
        t.accountBalance,
        t.channel,
        t.status
      ]),
      styles: { fontSize: 8 },
      /*   headStyles: { fillColor: [232, 69, 38] }, */
      headStyles: {
        fillColor: [232, 69, 38], // your orange
        textColor: [255, 255, 255], // white text
        lineColor: [0, 0, 0], // black border
        lineWidth: 0.1 // thin border
      },
      theme: "grid",
      margin: { left: 14, right: 14 },
      didParseCell: function (data: any) {
        // Check if this is a body cell and the column is "Status"
        if (
          data.section === 'body' &&
          data.column.index === 11 // "Status" is the 12th column, so index is 11
        ) {
          data.cell.styles.textColor = [0, 128, 0]; // Green
          data.cell.styles.fontStyle = 'bold';
        }
      }
    });

    // Footer
    doc.setFontSize(8);
    doc.text(
      "This electronically generated receipt is provided for informational purposes only and is not a legally binding document.",
      14,
      doc.internal.pageSize.height - 10
    );

    doc.save("Wallet_Statement.pdf");
  };

  const generateExcel = (data: any) => {
    const wsData = [
      [
        "S/N", "Transaction ID", "Date & Time", "Narration", "Class", "Biller", "Beneficiary", "Amount DR (₦)", "Amount CR (₦)", "Account Balance (₦)", "Channel", "Status"
      ],
      ...data.transactions.map((t: any, i: any) => [
        i + 1,
        t.transactionId,
        t.dateTime,
        t.narration,
        t.class,
        t.biller,
        t.beneficiary,
        t.amountDr,
        t.amountCr,
        t.accountBalance,
        t.channel,
        t.status
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Statement");

    // Add summary and user info as a separate sheet or above the table as needed

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Wallet_Statement.xlsx");
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
                          className="mr-2 accent-[#f25e26]"
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
                          className="mr-2 accent-[#f25e26]"
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
                subtitle={'Your statement has been generated.'}
                buttontext="OK"
                buttonclass="w-full rounded-md bg-[#FCDFD4] p-3 hover:bg-[#f25e26] hover:text-white"
              />
            </div>
          )}
    </div>
  );
};
