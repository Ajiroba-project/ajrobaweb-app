import React from 'react';
import { formatCurrency } from '@/utils/formatCurrency';

interface OrderSummaryProps {
  cartItems: any;
  paymentMethod: string;
  isPaymentMethodConfirmed: boolean;
  onWalletPayment: () => void;
  onCardPayment: () => void;
  isProcessing: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  paymentMethod,
  isPaymentMethodConfirmed,
  onWalletPayment,
  onCardPayment,
  isProcessing
}) => {
  const orderSummary = cartItems?.["Order Summary"];
  
  if (!orderSummary) return null;

  const renderSummaryRow = (label: string, value: string | number, isTotal = false) => (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div>
        <p className={`text-base mt-4 ${isTotal ? 'font-bold' : 'text-[#b4a3a3]'}`}>
          {label}
        </p>
      </div>
      <div>
        <h1 className={`text-lg mt-4 ${isTotal ? 'font-bold' : ''}`}>
          {isTotal ? formatCurrency(value) : value}
        </h1>
      </div>
    </div>
  );

  const renderWalletBalance = () => (
    <>
      {renderSummaryRow("Wallet Balance", orderSummary.wallet_balance)}
      {renderSummaryRow("Total Item", orderSummary.total_items)}
      {renderSummaryRow("Delivery Fees", orderSummary.delivery_fee)}
      {renderSummaryRow("Service Charge", orderSummary.service_charge)}
      {renderSummaryRow("Total", orderSummary.total, true)}
    </>
  );

  const renderCardSummary = () => (
    <>
      {renderSummaryRow("Total Item", orderSummary.total_items)}
      {renderSummaryRow("Delivery Fees", orderSummary.delivery_fee)}
      {renderSummaryRow("Service Charge", orderSummary.service_charge)}
      {renderSummaryRow("Total", orderSummary.total, true)}
    </>
  );

  const renderButton = () => {
    const baseClasses = "w-full mt-4 px-12 py-2 text-sm font-Poppins font-normal rounded";
    const enabledClasses = "bg-[#E84526] text-[#FFFFFF] cursor-pointer";
    const disabledClasses = "bg-[#D2D2D2] text-[#F6F6F6] cursor-not-allowed";
    
    return (
      <button
        onClick={paymentMethod === "wallet" ? onWalletPayment : onCardPayment}
        className={`${baseClasses} ${isPaymentMethodConfirmed ? enabledClasses : disabledClasses}`}
        disabled={!isPaymentMethodConfirmed}
      >
        {isProcessing ? "Processing..." : "Confirm Order"}
      </button>
    );
  };

  return (
    <div className="border rounded border-[#D2D2D2] px-4 py-4 shadow-lg">
      <h1 className="text-[#111111] text-xl">Order SUMMARY</h1>
      
      {paymentMethod === "wallet" ? renderWalletBalance() : renderCardSummary()}
      
      {renderButton()}
    </div>
  );
};
