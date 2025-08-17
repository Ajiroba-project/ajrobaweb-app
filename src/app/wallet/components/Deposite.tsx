import React, { useState } from 'react';
import Image from 'next/image';
import paystackbrand from '../../asset/image/paystack-icon.png';
import { DefaultButton } from '../../component/Button';

type DepositeProps = {
  handleNext?: any
  handleCancel: () => void;
  handleClick: () => void;
};

export const Deposite = ({ handleClick, handleNext }: DepositeProps) => {
  const suggestions = ['500', '1000', '2000', '3000', '4000', '5000'];
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setError('');
  };

  const handleNextClick = async () => {
    if (value.trim() === '') {
      setError('Please enter an amount before proceeding.');
      return;
    }
    
    setIsLoading(true);
    try {
      await handleNext(value);
    } catch (error) {
      console.error('Error proceeding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='fixed left-0 top-0 z-50 flex h-full w-screen items-center justify-center bg-[#000000d1] p-2 sm:p-4'>
      <div className='w-full max-w-[90vw] sm:max-w-[25em] md:max-w-[30em] lg:max-w-[35em] flex h-auto flex-col gap-4 sm:gap-6 rounded-md bg-white p-4 sm:p-6'>
        <div className='flex flex-col items-center justify-center pt-2 sm:pt-3 text-center'>
          <p className='text-sm sm:text-base font-medium'>Payment Gateway</p>
          <Image src={paystackbrand} alt={'icon'} className='w-20 h-8 sm:w-24 sm:h-10' />
        </div>
        
        <div className='my-2 w-full justify-start'>
          <label className='text-sm sm:text-base font-medium text-gray-700 block mb-2'>Deposit Amount ₦</label>
          <div className='relative'>
            <input
              type='text'
              onChange={handleChange}
              value={value}
              className='w-full rounded-md border border-[#656565] p-2 sm:p-3 text-sm sm:text-base pr-10'
              placeholder='Enter an Amount and press "Next"'
              disabled={isLoading}
            />
            {isLoading && (
              <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                <div className='w-4 h-4 border-2 border-[#E84526] border-t-transparent rounded-full animate-spin'></div>
              </div>
            )}
          </div>
          {error && <p className='text-red-500 mt-2 text-xs sm:text-sm'>{error}</p>}
          
          <p className='mt-3 capitalize text-sm sm:text-base font-medium text-gray-700'>Suggestions</p>
          <div className='mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3'>
            {suggestions.map((val, index) => (
              <div
                className={`flex cursor-pointer rounded-md transition-colors duration-200 px-3 py-2 justify-center items-center ${
                  isLoading 
                    ? 'bg-gray-100 cursor-not-allowed opacity-50' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                key={index}
                onClick={() => !isLoading && setValue(val)}
              >
                <p className='text-xs sm:text-sm font-medium text-gray-700'>₦{val}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className='flex w-full gap-3 sm:gap-5 flex-col sm:flex-row'>
          <DefaultButton
            text='Cancel'
            type='button'
            className='w-full rounded-md border-2 border-[#E84526] p-2 sm:p-3 text-[#E84526] text-sm sm:text-base hover:bg-[#E84526] hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            handleClick={handleClick}
            disabled={isLoading}
          />
          <DefaultButton
            text={isLoading ? 'Processing...' : 'Next'}
            type='button'
            className='w-full rounded-md bg-[#E84526] p-2 sm:p-3 text-white text-sm sm:text-base hover:bg-[#E84526]/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
            handleClick={handleNextClick}
            disabled={isLoading}
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
        <p className='text-center'> You are going to deposit the amount of N {Number(amount).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

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
