import React from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../../component/Input';

interface WalletPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { password: string }) => void;
  isLoading: boolean;
}

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Passcode is required")
    .min(6, "Can't be lesser than 6 digits"),
});

export const WalletPinModal: React.FC<WalletPinModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  // Reset form when modal opens
  React.useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-center items-center flex-col">
          <p className="text-[#2A2A2A] font-bold text-xl font-Poppins">
            Wallet Pin
          </p>
          <small className="text-[#504D4D] text-lg font-Poppins">
            Kindly enter your wallet pin
          </small>
        </div>

        <form
          className="flex justify-center items-center flex-col mt-8 mb-4"
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            // Reset form after submission
            reset();
          })}
        >
          <div className="flex flex-col w-full">
            <Input
              label="Enter Pin"
              type="password"
              name="password"
              placeholder="****"
              register={register}
              errors={errors.password}
              HiEyeSlash={<FaRegEyeSlash />}
              HiEye={<FaRegEye />}
            />
            <div className="text-xs text-red-700">
              {errors?.password?.message}
            </div>

            <div className="flex gap-4 justify-center mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-[#E84526] text-white rounded hover:bg-[#E84526]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : "Pay"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
