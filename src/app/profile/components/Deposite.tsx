import React, { useState } from 'react';
import Image from 'next/image';
import paystackbrand from '../../asset/image/paystack-icon.png';
import { DefaultButton } from '../../component/Button';
import { formatCurrency } from '@/utils/formatCurrency';

type DepositeProps = {
  handleNext?: any
  handleCancel: () => void;
  handleClick: () => void;
};

export const Deposite = ({ handleClick, handleNext }: DepositeProps) => {
  const suggestions = ['500', '1000', '2000', '3000', '4000', '5000'];
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const formatWithCommas = (numericString: string): string => {
    const digitsOnly = numericString.replace(/\D/g, '');
    if (digitsOnly === '') return '';
    const numberValue = parseInt(digitsOnly, 10);
    if (isNaN(numberValue)) return '';
    return numberValue.toLocaleString('en-NG');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = formatWithCommas(inputValue);
    setValue(formatted);
    setError('');
  };

  const handleNextClick = () => {
    const rawNumericValue = value.replace(/,/g, '').trim();
    if (rawNumericValue === '') {
      setError('Please enter an amount before proceeding.');
    } else {
      handleNext(rawNumericValue);
    }
  };

  return (
    <section className='fixed left-0 top-0 z-50 flex h-full w-screen items-center justify-center bg-[#000000d1] p-4'>
      <div className='xs:w-[15em] flex h-auto w-[20em] flex-col gap-6 rounded-md bg-white p-6 md:w-[25em] lg:w-[30em]'>
        <div className='flex flex-col items-center justify-center pt-3 text-center'>
          <p className=''>Payment Gateway</p>
          <Image src={paystackbrand} alt={'icon'} />
        </div>
        <div className='my-2 w-full justify-start'>
          <label className='text-left'>Deposit Amount</label>
          <input
            type='text'
            onChange={handleChange}
            value={value}
            className='w-full rounded-md border border-[#656565] p-3 '
            placeholder='Enter an Amount and press "Next"'
          />
          {error && <p className='text-red-500 mt-2'>{error}</p>}
          <p className='mt-3 capitalize'>Suggestions</p>
          <div className='mt-2 flex gap-3'>
            {suggestions.map((val, index) => (
              <div
                className='flex cursor-pointer rounded-md bg-gray-300 px-2 py-1'
                key={index}
                onClick={() => setValue(Number(val).toLocaleString('en-NG'))}
              >
                <p className='text-sm'>₦{Number(val).toLocaleString('en-NG')}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='flex w-full gap-5'>
          <DefaultButton
            text='Cancel'
            type='button'
            className='w-full rounded-md border-2 border-[#E84526] p-3 text-[#E84526]'
            handleClick={handleClick}
          />
          <DefaultButton
            text='Next'
            type='button'
            className='w-full rounded-md bg-[#E84526] p-3 text-white'
            handleClick={handleNextClick}
          />
        </div>
      </div>
    </section>
  );
};



const ConfirmationModal = ({ onClose, amount }: { onClose: () => void, amount: string }) => {


  const handlefundwalletandVerifyPayment = () => {
    console.log('fund and verify wallet')
  }




  return (
    <section className='fixed left-0 top-0 z-50 flex h-full w-screen items-center justify-center bg-[#000000d1] p-4'>
      <div className='xs:w-[15em] flex h-auto w-[20em] flex-col gap-6 rounded-md bg-white p-6 md:w-[25em] lg:w-[30em]'>
        <p className='text-center'> You are going to deposit the amount of  { formatCurrency(amount) }</p>

        <div className='flex w-full gap-5 flex-col'>
          <DefaultButton
            text='Continue'
            type='button'
            className='w-full rounded-md bg-[#E84526] p-3 text-white'
            handleClick={handlefundwalletandVerifyPayment}
          />
          <DefaultButton
            text='Back'
            type='button'
            className='w-full rounded-md border-2 border-[#E84526] p-3 text-[#E84526]'
            handleClick={onClose}
          />
        </div>
      </div>
    </section>
  );
};


const ParentComponent = () => {
  const [showDepositeModal, setShowDepositeModal] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleNext = () => {
    setShowDepositeModal(false);
    setShowConfirmationModal(true);
  };

  const handleClose = () => {
    setShowDepositeModal(false);
    setShowConfirmationModal(false);
  };

  const handleCancel = () => {
    setShowDepositeModal(false);
  };

  return (
    <>
      {showDepositeModal && (
        <Deposite handleClick={handleNext} handleNext={handleNext} handleCancel={handleCancel} />
      )}
      {showConfirmationModal && <ConfirmationModal amount={'3098'} onClose={handleClose} />}
    </>
  );
};

export default ParentComponent;
