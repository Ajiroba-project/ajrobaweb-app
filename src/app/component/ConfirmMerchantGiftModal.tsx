"use client";

import { DefaultButton } from "@/app/component/Button";

export type PendingMerchantSelection = {
  auctionId: string;
  code: string;
  ticketId: string;
  name: string;
};

type ConfirmMerchantGiftModalProps = {
  isOpen: boolean;
  onClose: () => void;
  merchantName: string;
  merchantCode: string;
  onConfirm: () => void | Promise<void>;
  isProcessing?: boolean;
};

export function ConfirmMerchantGiftModal({
  isOpen,
  onClose,
  merchantName,
  merchantCode,
  onConfirm,
  isProcessing = false,
}: ConfirmMerchantGiftModalProps) {
  if (!isOpen) return null;

  return (
    <section
      className="fixed left-0 top-0 z-[60] flex h-full w-screen items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isProcessing) onClose();
      }}
    >
      <div
        className="w-full max-w-md rounded-md bg-white p-5 shadow-lg sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-merchant-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="confirm-merchant-title"
          className="mb-2 text-center text-base font-semibold sm:text-lg"
        >
          Confirm merchant
        </h2>
        <p className="mb-1 text-center text-sm text-gray-600">
          Redeem with{" "}
          <span className="font-medium text-gray-900">{merchantName}</span>
        </p>
        <p className="mb-6 text-center text-xs text-gray-500">
          Code: {merchantCode}
        </p>
        <p className="mb-6 text-center text-sm text-gray-600">
          Do you want to continue with this merchant?
        </p>
        <div className="flex flex-col-reverse justify-center gap-3 sm:flex-row sm:gap-4">
          <DefaultButton
            text="Cancel"
            type="button"
            className="w-full rounded-md border-2 border-[#F25E26] p-2 px-4 text-[#F25E26] sm:flex-1"
            handleClick={onClose}
            disabled={isProcessing}
          />
          <DefaultButton
            text={isProcessing ? "Processing…" : "Yes, continue"}
            type="button"
            className="w-full rounded-md bg-[#F25E26] p-2 px-4 text-white sm:flex-1 disabled:opacity-60"
            handleClick={() => void onConfirm()}
            disabled={isProcessing}
          />
        </div>
      </div>
    </section>
  );
}
