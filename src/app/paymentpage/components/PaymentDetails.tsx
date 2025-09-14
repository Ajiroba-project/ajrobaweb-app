import React from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { MdKeyboardArrowRight } from 'react-icons/md';

interface PaymentDetailsProps {
  cartItems: any;
  paymentMethod: string;
  isPaymentMethodConfirmed: boolean;
  onAddressChange: () => void;
  onPaymentMethodChange: (method: string) => void;
  onConfirmPaymentMethod: () => void;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  cartItems,
  paymentMethod,
  isPaymentMethodConfirmed,
  onAddressChange,
  onPaymentMethodChange,
  onConfirmPaymentMethod
}) => {
  const renderDetailSection = (title: string, content: string, showChange = false) => (
    <div className="bg-[#F6F6F6] shadow-lg border rounded border-[#D2D2D2] px-4 py-4">
      <div className="px-4 py-2 my-4">
        <div className="flex justify-between flex-wrap 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-4">
          <div className="flex items-start gap-4">
            <div>
              <IoIosCheckmarkCircle color="#E84526" size={28} />
            </div>
            <div>
              <div>
                <p className="text-[#111111] text-base">{title}</p>
              </div>
              <div>
                <small className="text-[#A09F9F]">{content}</small>
              </div>
            </div>
          </div>
        </div>
        
        {showChange && (
          <div className="flex justify-end mt-2">
            <button
              onClick={onAddressChange}
              className="flex justify-center cursor-pointer text-[#E84526] text-sm"
            >
              Change <MdKeyboardArrowRight color="#E84526" className="mt-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderPaymentMethodSection = () => (
    <div className="bg-[#F6F6F6] shadow-lg border rounded border-[#D2D2D2] px-4 py-4 mt-4">
      <div className="px-4 py-2 my-4">
        <div className="flex justify-between flex-wrap 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col gap-4">
          <div className="flex items-start gap-4">
            <div>
              <IoIosCheckmarkCircle color="#E84526" size={28} />
            </div>
            <div>
              <div>
                <p className="text-[#111111] text-base mb-4">Payment Method</p>
              </div>
              <form>
                <div className="mb-4">
                  <div>
                    <input
                      type="radio"
                      id="wallet"
                      name="paymentMethod"
                      value="wallet"
                      checked={paymentMethod === "wallet"}
                      onChange={() => onPaymentMethodChange("wallet")}
                      className="accent-[#F25E26]"
                    />
                    <label className="ml-2" htmlFor="wallet">
                      Wallet
                    </label>
                  </div>
                  <div className="ml-4">
                    <small className="text-[#A09F9F] text-sm">
                      pay with the money in your wallet
                    </small>
                  </div>
                </div>

                <div>
                  <div>
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => onPaymentMethodChange("card")}
                      className="accent-[#F25E26]"
                    />
                    <label className="ml-2" htmlFor="card">
                      Pay with Cards, USSD or bank transfer
                    </label>
                  </div>
                  <div className="ml-4">
                    <small className="text-[#A09F9F] text-sm">
                      pay with Cards, USSD or bank transfer
                    </small>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <button
            onClick={onConfirmPaymentMethod}
            disabled={!paymentMethod}
            className={`flex justify-center cursor-pointer text-[#E84526] text-sm ${
              paymentMethod ? "active" : "disabled"
            }`}
          >
            Confirm Payment Method
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {renderDetailSection("Delivery Details", cartItems?.["Delivery Details"])}
      {renderDetailSection("Customer Address", cartItems?.["Customer Address"], true)}
      {renderPaymentMethodSection()}
    </div>
  );
};
