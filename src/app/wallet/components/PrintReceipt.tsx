import React, { useState, useRef, useEffect } from "react";
import { CustomModal, Modal } from "../../component/Modal";
import { useGetStatementData } from "@/hooks/useGetData";
import { useAuthStore } from "@/store/store";
import { toast } from "react-toastify";
import { FaCalendarAlt } from 'react-icons/fa';
import success from '../../asset/verify.svg'
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Cookies from "js-cookie";
import Brand from '../../asset/ajirobalogo.png'
import { formatCurrency } from "@/utils/formatCurrency";


declare module "jspdf" {
  interface jsPDF {
    autoTable: (...args: any[]) => jsPDF;
  }
}

export const PrintReceipt = ({ receipt, setreceipt }: any) => {
  const { successModal, setSuccessModal } = useAuthStore((state) => ({
    successModal: state.successModal,
    setSuccessModal: state.setSuccessModal,
  }));







  // const { token } = useAuthStore((state) => ({
  //   token: state.token
  // }));

  const userToken = Cookies.get('token') as string;

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
  const [isGenerating, setIsGenerating] = useState(false);

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

  // API call for statement of account
  const {
    data: statementData,
    isLoading,
    error,
    refetch
  } = useGetStatementData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/pay/statement_of_account/`,
    'statement',
    userToken || '',
    startDate,
    endDate,
    false // Don't auto-fetch, only when generate is clicked
  );

  // Handle successful event (e.g., download success)
  const handleSuccess = () => {
    setdownload(false);
    setreceipt(false);
  };

  // Handler for form submission (Generate statement)
  const handleGenerate = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Fetch data from API
      const result = await refetch();

     /*  console.log("API Response:", result?.data?.results) */
      
      if (result.data && result.data.results) {
        if (format === "pdf") {
           await generatePDF(result.data.results); 
        } else {
          generateExcel(result.data.results); 
        }
        setdownload(true);
      } else {
        toast.error("Failed to fetch statement data");
      }
    } catch (error) {
      console.error("Error generating statement:", error);
      toast.error("Failed to generate statement");
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to convert image to base64
  const convertImageToBase64 = (imageSrc: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const base64 = canvas.toDataURL('image/png');
        resolve(base64);
      };
      img.onerror = reject;
      img.src = imageSrc;
    });
  };

  const generatePDF = async (data: any) => {
    // Use landscape orientation to fit all columns
    const doc = new jsPDF('landscape');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;

    // Helpers
    const replaceNaira = (text: string | number | undefined | null) => {
      const str = (text ?? '').toString();
      return str.replace(/\u20A6|₦/g, 'NGN ');
    };

    // Header with AJÍRÓBA® logo and title
    try {
      // Convert the logo image to base64 and add it to the PDF
      const logoBase64 = await convertImageToBase64(Brand.src);
      doc.addImage(logoBase64, 'PNG', margin, 5, 50, 25); // x, y, width, height
      
      // Add title next to the logo
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text("", margin + 60, 25);
    } catch (error) {
      // Fallback to text if image loading fails
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text("AJÍRÓBA®", margin, 25);
      
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text("Wallet Statement", pageWidth / 2, 35, { align: 'center' });
    }
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text("Wallet Statement", pageWidth / 2, 35, { align: 'center' });

    // User and Report Information (Left Column) with wrapping
    doc.setFontSize(10);
    let infoY = 45;
    const leftMaxWidth = (pageWidth - margin * 2) - (70 + 10); // page width minus margins and right box width + padding

    const nameLines = doc.splitTextToSize(`Name: ${data.details?.name || 'N/A'}`, leftMaxWidth);
    doc.text(nameLines, margin, infoY);
    infoY += 6 * nameLines.length;

    const addrLines = doc.splitTextToSize(`Address: ${data.details?.address || 'N/A'}`, leftMaxWidth);
    doc.text(addrLines, margin, infoY);
    infoY += 6 * addrLines.length;

    const rptTimeLines = doc.splitTextToSize(`Report Time: ${data.details?.report_time || 'N/A'}`, leftMaxWidth);
    doc.text(rptTimeLines, margin, infoY);
    infoY += 6 * rptTimeLines.length;

    const startLines = doc.splitTextToSize(`Start Date: ${data.details?.start_date || 'N/A'}`, leftMaxWidth);
    doc.text(startLines, margin, infoY);
    infoY += 6 * startLines.length;

    const endLines = doc.splitTextToSize(`End Date: ${data.details?.end_date || 'N/A'}`, leftMaxWidth);
    doc.text(endLines, margin, infoY);
    infoY += 6 * endLines.length;

    // Financial Summary Box (Right Column)
    const boxX = pageWidth - margin - 70;
    const boxY = 35;
    const boxWidth = 70;
    const boxHeight = 35;
    
    // Draw box with light grey background
    doc.setFillColor(240, 240, 240);
    doc.rect(boxX, boxY, boxWidth, boxHeight, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.rect(boxX, boxY, boxWidth, boxHeight);
    
    // Financial summary text (wrap inside the box and replace Naira sign)
    doc.setFontSize(10);
    const boxTextWidth = boxWidth - 10;
    const balLines = doc.splitTextToSize(
      `Wallet Balance:  ${replaceNaira(formatCurrency(data.details?.account_balance))}`,
      boxTextWidth
    );
    const crLines = doc.splitTextToSize(
      `Total Credit:  ${replaceNaira(formatCurrency(data.details?.total_credit))}`,
      boxTextWidth
    );
    const drLines = doc.splitTextToSize(
      `Total Debit:  ${replaceNaira(formatCurrency(data.details?.total_debit))}`,
      boxTextWidth
    );
    let boxTextY = boxY + 10;
    doc.text(balLines, boxX + 5, boxTextY);
    boxTextY += 8 * balLines.length;
    doc.text(crLines, boxX + 5, boxTextY);
    boxTextY += 8 * crLines.length;
    doc.text(drLines, boxX + 5, boxTextY);

    // Disclaimer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text(
      "",
     /*  "This electronically generated receipt is provided for informational purposes only and is not a legally binding document.", */
      margin,
      boxY + boxHeight + 15
    );

    // Second Header for Transaction Table
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text("AJÍRÓBA®", margin, boxY + boxHeight + 30);
    doc.text("WALLET STATEMENT", margin, boxY + boxHeight + 40);

    // Transaction Table
    const tableStartY = boxY + boxHeight + 50;
    
    // Calculate total table width to ensure it fits
    const totalWidth = 10 + 30 + 25 + 35 + 12 + 25 + 25 + 20 + 20 + 25 + 15 + 15; // Sum of all column widths
    const availableWidth = pageWidth - (margin * 2);
    // console.log('Total table width:', totalWidth, 'Page width:', pageWidth, 'Available width:', availableWidth);
    
    // If table is too wide, use auto-sizing
    const useAutoSizing = totalWidth > availableWidth;
    
    // Use a more compact table layout to ensure all columns fit
    doc.autoTable({
      startY: tableStartY,
      head: [[
        "S/N", "Txn ID", "Date & Time", "Narration", "Class", "Biller", "Beneficiary", "DR (Naira)", "CR (Naira)", "Balance (Naira)", "Channel", "Status"
      ]],
      body: data.data?.map((item: any, index: number) => [
        index + 1,
        item.statement.transaction_id || '',
        item.statement.date_and_time || '',
        item.statement.narration || '',
        item.statement.class || '',
        item.statement.biller || '',
        item.statement.benefiaciary || item.statement.beneficiary || '',
        item.statement.amount_dr > 0 ? replaceNaira(item.statement.amount_dr.toLocaleString()) : '',
        item.statement.amount_cr > 0 ? replaceNaira(item.statement.amount_cr.toLocaleString()) : '',
        item.statement.account_balance ? replaceNaira(item.statement.account_balance.toLocaleString()) : '',
        item.statement.channel || '',
        item.statement.status || ''
      ]) || [],
      styles: { 
        fontSize: 7,
        cellPadding: 1,
        overflow: 'linebreak',
        halign: 'left'
      },
      headStyles: {
        fillColor: [232, 69, 38], // Orange color
        textColor: [255, 255, 255], // White text
        lineColor: [0, 0, 0], // Black border
        lineWidth: 0.1 // Thin border
      },
      theme: "grid",
      margin: { left: margin, right: margin },
      pageBreak: 'auto',
      showFoot: 'lastPage',
      tableWidth: 'auto', // Let jsPDF auto-calculate the width
      willDrawCell: function(data: any) {
        // Ensure text doesn't get cut off
        if (data.cell.text && data.cell.text.length > 0) {
          data.cell.styles.overflow = 'linebreak';
        }
      },
      // Use conditional column styles based on available width
      columnStyles: useAutoSizing ? {
        0: { halign: 'center' }, // S/N
        1: { halign: 'left' }, // Txn ID
        2: { halign: 'left' }, // Date & Time
        3: { halign: 'left', cellWidth: 'wrap' }, // Narration
        4: { halign: 'center' }, // Class
        5: { halign: 'left' }, // Biller
        6: { halign: 'left' }, // Beneficiary
        7: { halign: 'right' }, // DR (₦)
        8: { halign: 'right' }, // CR (₦)
        9: { halign: 'right' }, // Balance (₦)
        10: { halign: 'center' }, // Channel
        11: { halign: 'center' }  // Status
      } : {
        0: { cellWidth: 10, halign: 'center' }, // S/N
        1: { cellWidth: 30, halign: 'left' }, // Txn ID
        2: { cellWidth: 25, halign: 'left' }, // Date & Time
        3: { cellWidth: 40, halign: 'left' }, // Narration (slightly wider for wrapping)
        4: { cellWidth: 12, halign: 'center' }, // Class
        5: { cellWidth: 25, halign: 'left' }, // Biller
        6: { cellWidth: 25, halign: 'left' }, // Beneficiary
        7: { cellWidth: 22, halign: 'right' }, // DR (NGN)
        8: { cellWidth: 22, halign: 'right' }, // CR (NGN)
        9: { cellWidth: 27, halign: 'right' }, // Balance (NGN)
        10: { cellWidth: 15, halign: 'center' }, // Channel
        11: { cellWidth: 15, halign: 'center' }  // Status
      },
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

    doc.save("Wallet_Statement.pdf");
  };

  const generateExcel = (data: any) => {
    // Header information
    const headerData = [
      ["AJÍRÓBA®", "", "", "", "", "", "", "", "", "", "", ""],
      ["Wallet Statement", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["Name:", data.details?.name || 'N/A', "", "", "", "", "", "", "", "", ""],
      ["Address:", data.details?.address || 'N/A', "", "", "", "", "", "", "", "", ""],
      ["Report Time:", data.details?.report_time || 'N/A', "", "", "", "", "", "", "", "", ""],
      ["Start Date:", data.details?.start_date || 'N/A', "", "", "", "", "", "", "", "", ""],
      ["End Date:", data.details?.end_date || 'N/A', "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["Wallet Balance:", `${formatCurrency(data.details?.account_balance)}`, "", "", "", "", "", "", "", "", "", ""],
      ["Total Credit:", `${formatCurrency(data.details?.total_credit)}`, "", "", "", "", "", "", "", "", "", ""],
      ["Total Debit:", `${formatCurrency(data.details?.total_debit)}`, "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""],
      ["AJÍRÓBA®", "", "", "", "", "", "", "", "", "", "", ""],
      ["WALLET STATEMENT", "", "", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", "", "", ""]
    ];

    // Table headers
    const tableHeaders = [
      "S/N", "Txn ID", "Date & Time", "Narration", "Class", "Biller", "Beneficiary", "DR (₦)", "CR (₦)", "Balance (₦)", "Channel", "Status"
    ];

    // Table data
    const tableData = data.data?.map((item: any, index: number) => [
      index + 1,
      item.statement.transaction_id || '',
      item.statement.date_and_time || '',
      item.statement.narration || '',
      item.statement.class || '',
      item.statement.biller || '',
      item.statement.benefiaciary || item.statement.beneficiary || '',
      item.statement.amount_dr > 0 ? item.statement.amount_dr.toLocaleString() : '',
      item.statement.amount_cr > 0 ? item.statement.amount_cr.toLocaleString() : '',
      item.statement.account_balance ? item.statement.account_balance.toLocaleString() : '',
      item.statement.channel || '',
      item.statement.status || ''
    ]) || [];

    // Combine all data
    const wsData = [...headerData, tableHeaders, ...tableData];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Wallet Statement");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "Wallet_Statement.xlsx");
  };

  return (
    <div>
      {!download ? (
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
                  className="px-8 text-sm font-normal rounded-lg bg-[#FCDFD4] py-2 transition delay-300 duration-300 ease-in-out hover:bg-[#E84526] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleGenerate}
                  disabled={isGenerating || !startDate || !endDate}
                >
                  {isGenerating ? 'Generating...' : 'Generate'}
                </button>

                {/* Error Display */}
                {error && (
                  <div className="mt-4 text-red-500 text-sm text-center">
                    Failed to fetch statement data. Please try again.
                  </div>
                )}
              </div>
            </div>
          )}
        </CustomModal>
      ) : (
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
        )
      )}
    </div>
  );
};
