import React, { useState } from 'react';
import Image from 'next/image';
import paystackbrand from '../../asset/image/paystack-icon.png';
import { DefaultButton } from '../../component/Button';

type DepositeProps = {
  handleNext?: any
  handleCancel: () => void;
  handleClick: () => void;
};

export const DepositeCard = ({ handleClick, handleNext }: DepositeProps) => {
  const suggestions = ['500', '1000', '2000', '3000', '4000', '5000'];
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setError('');
  };

  const handleNextClick = () => {
    if (value.trim() === '') {
      setError('Please enter an amount before proceeding.');
    } else {
      handleNext(value);
    }
  };

  return (
    <section className='fixed left-0 top-0 z-50 flex h-full w-screen items-center justify-center bg-[#000000d1] p-2 sm:p-4'>
      <div className='w-full max-w-[20em] sm:max-w-[25em] md:max-w-[30em] lg:max-w-[35em] flex h-auto flex-col gap-4 sm:gap-6 rounded-md bg-white p-4 sm:p-6 mx-4'>
        <div className='flex flex-col items-center justify-center pt-2 sm:pt-3 text-center'>
          <p className='text-sm sm:text-base font-medium text-gray-800'>Payment Gateway</p>
          <Image 
            src={paystackbrand} 
            alt={'icon'} 
            className='w-24 h-8 sm:w-28 sm:h-10 md:w-32 md:h-12 object-contain'
          />
        </div>
        
        <div className='w-full space-y-3'>
          <label className='block text-sm sm:text-base font-medium text-gray-700 text-left'>Amount (₦)</label>
          <input
            type='text'
            onChange={handleChange}
            value={value}
            className='w-full rounded-md border border-[#656565] p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E84526] focus:border-transparent transition-all duration-200'
            placeholder='₦ Enter an Amount and press "Next"'
          />
          {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
          
          <div className='space-y-2'>
            <p className='text-sm sm:text-base font-medium text-gray-700 capitalize'>Suggestions</p>
            <div className='grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3'>
              {suggestions.map((val, index) => (
                <div
                  className='flex cursor-pointer rounded-md bg-gray-200 hover:bg-gray-300 px-2 py-1.5 sm:px-3 sm:py-2 transition-colors duration-200 border border-gray-300'
                  key={index}
                  onClick={() => setValue(val)}
                >
                  <p className='text-xs sm:text-sm text-gray-700 font-medium text-center w-full'>₦{val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className='flex w-full gap-3 sm:gap-4 pt-2'>
          <DefaultButton
            text='Cancel'
            type='button'
            className='w-full rounded-md border-2 border-[#E84526] p-2.5 sm:p-3 text-sm sm:text-base font-medium text-[#E84526] hover:bg-[#E84526] hover:text-white transition-all duration-200'
            handleClick={handleClick}
          />
          <DefaultButton
            text='Next'
            type='button'
            className='w-full rounded-md bg-[#E84526] p-2.5 sm:p-3 text-sm sm:text-base font-medium text-white hover:bg-[#E84526]/90 transition-all duration-200'
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
        <p className='text-center'>You are going to make the payment of N {amount} for your purchase</p>
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
        <DepositeCard handleClick={handleNext} handleNext={handleNext} handleCancel={handleCancel} />
      )}
      {showConfirmationModal && <ConfirmationModal amount={'3098'} onClose={handleClose} />}
    </>
  );
};

export default ParentComponent;
