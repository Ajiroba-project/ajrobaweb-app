import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { CiMenuKebab } from 'react-icons/ci';
import { ModalProfile } from './ModalProfile';
import Verify from '@/app/asset/verify.svg'

interface DropdownProps {
  onOptionClick: (option: string) => void;
  value?: any;
  transaction?: any;
}

const DropDownAuction: React.FC<DropdownProps> = ({ onOptionClick, value, transaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setModalOpen] = useState(false);

  // console.log(transaction, 'transaction')

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const router = useRouter();

  const handleOptionClick = (option: string) => {

// console.log(transaction, 'transaction' )

    switch (option) {
      case 'Purchase order':
     transaction?.id ?   router.push(`/purchaseorder?orderId=${transaction?.id}`) : router.push(`/purchaseorder?orderId=${transaction?.order_id}`);
        break;
      case 'Transaction Receipt':
        router.push(`/transreceipt?transId=${transaction?.reference}`);
        break;
      case 'Review':
        setModalOpen(true);
        break;
      case 'Delete':
        console.log('Delete selected');
        break;
      default:
        console.log('Unknown option selected');
    }
    onOptionClick(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className='relative z-40'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='p-2 text-sm'
      >
        <CiMenuKebab />
      </button>
      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg'>
          <ul className='list-none p-2'>
               <li
              onClick={() => handleOptionClick('Delete')}
              className='p-2 cursor-pointer hover:bg-gray-100'
            >
              Delete
            </li>
            <li
              onClick={() => handleOptionClick('Purchase order')}
              className='p-2 cursor-pointer hover:bg-gray-100'
            >
              Purchase order
            </li>
           {/*  <li
              onClick={() => handleOptionClick('Transaction Receipt')}
              className='p-2 cursor-pointer hover:bg-gray-100'
            >
              Transaction Receipt
            </li>
            <li
              onClick={() => handleOptionClick('Review')}
              className='p-2 cursor-pointer hover:bg-gray-100'
            >
              Review
            </li> */}

          </ul>
        </div>
      )}

     {/*  <ModalProfile
        icon={Verify}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Review Your Purchase"
        buttontext="Close"
        handleEvent={handleCloseModal}
      >
        <p>This is where the review content goes.</p>
      </ModalProfile> */}
    </div>
  );
};

export default DropDownAuction;
