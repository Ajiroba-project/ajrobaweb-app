// import { useRouter } from 'next/navigation';
// import React, { useState, useRef, useEffect } from 'react';
// import { CiMenuKebab } from 'react-icons/ci';
// import { ModalProfile } from './ModalProfile';
// import Verify from '@/app/asset/verify.svg'

// interface DropdownProps {
//   onOptionClick: (option: string) => void;
//   value?: any;
//   transaction?: any;
// }

// const Dropdown: React.FC<DropdownProps> = ({ onOptionClick, value, transaction }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//     const [isModalOpen, setModalOpen] = useState(false);

//      const handleCloseModal = () => {
//     setModalOpen(false);
//   };


//   const handleClickOutside = (event: MouseEvent) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // const handleOptionClick = (option: string) => {
//   //   onOptionClick(option);
//   //   setIsOpen(false);
//   // };

//     const router = useRouter()

//   const handleOptionClick = (option: string) => {
//     switch (option) {
//       case 'Purchase order':
//         // console.log('Purchase order selected', option, 'optionnn', transaction);
//         // Add your logic for handling Purchase order here
//       router.push(`/purchaseorder?orderId=${transaction.order_id}`);
//         break;
//       case 'Transaction Receipt':
//         console.log('Transaction Receipt selected');
//         // Add your logic for handling Transaction Receipt here
//         console.log(transaction, 'transaction')
//              router.push(`/transreceipt?transId=${transaction?.reference}`);
//         break;
//       case 'Review':
//         console.log('Review selected');
//            setModalOpen(true);
//         // Add your logic for handling Review here
//         break;
//       case 'Delete':
//         console.log('Delete selected');
//         // Add your logic for handling Delete here
//         break;
//       default:
//         console.log('Unknown option selected');
//     }
//     onOptionClick(option);
//     setIsOpen(false);
//   };

//   return (
//     <div ref={dropdownRef} className='relative z-40'>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className='p-2 text-sm'
//       >
//         <CiMenuKebab />
//       </button>
//       {isOpen && (
//         <div className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg'>
//           <ul className='list-none p-2'>
//             <li
//               onClick={() => handleOptionClick('Purchase order')}
//               className='p-2 cursor-pointer hover:bg-gray-100'
//             >
//               Purchase order
//             </li>
//             <li
//               onClick={() => handleOptionClick('Transaction Receipt')}
//               className='p-2 cursor-pointer hover:bg-gray-100'
//             >
//               Transaction Receipt
//             </li>
//             <li
//               onClick={() => handleOptionClick('Review')}
//               className='p-2 cursor-pointer hover:bg-gray-100'
//             >
//               Review
//             </li>
//             <li
//               onClick={() => handleOptionClick('Delete')}
//               className='p-2 cursor-pointer hover:bg-gray-100'
//             >
//               Delete
//             </li>
//           </ul>
//         </div>
//       )}


//       <ModalProfile icon={Verify}
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         title="Review Your Purchase"
//         buttontext="Close"
//         handleEvent={handleCloseModal}
//       >
//         <p>This is where the review content goes.</p>
//       </ModalProfile>
//     </div>
//   );
// };

// export default Dropdown;



import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CiMenuKebab } from 'react-icons/ci';
import { ModalProfile } from './ModalProfile';
import Verify from '@/app/asset/verify.svg'

interface DropdownProps {
  onOptionClick: (option: string) => void;
  value?: any;
  transaction?: any;
}

const Dropdown: React.FC<DropdownProps> = ({ onOptionClick, value, transaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number }>({ top: 0, right: 0 });

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    const clickedInsideButton = dropdownRef.current && dropdownRef.current.contains(target);
    const clickedInsideMenu = menuRef.current && menuRef.current.contains(target);
    if (!clickedInsideButton && !clickedInsideMenu) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const updatePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + 8,
      right: Math.max(0, window.innerWidth - rect.right),
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();
    const handleScrollOrResize = () => updatePosition();
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen]);

  const router = useRouter();

  const handleOptionClick = (option: string) => {
    // console.log(transaction, 'transactionnnnn')
    switch (option) {
      case 'Purchase order':
        router.push(`/purchaseorder?orderId=${transaction.order_id}`);
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
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className='p-2 text-sm'
      >
        <CiMenuKebab />
      </button>
      {isOpen && ReactDOM.createPortal(
        <div
          ref={menuRef}
          style={{ position: 'fixed', top: menuPosition.top, right: menuPosition.right, zIndex: 9999 }}
          className='mt-2 w-48 bg-white border rounded shadow-lg'
        >
          <ul className='list-none p-2 max-h-64 overflow-y-auto'>
            <li
              onClick={() => handleOptionClick('Purchase order')}
              className='p-2 cursor-pointer hover:bg-gray-100'
            >
              Purchase Order
            </li>
            <li
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
            </li> 
            <li
              onClick={() => handleOptionClick('Delete')}
              className='p-2 cursor-pointer hover:bg-gray-100'
            >
              Delete
            </li>
          </ul>
        </div>,
        document.body
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

export default Dropdown;
