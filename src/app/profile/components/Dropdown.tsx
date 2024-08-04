import React, { useState, useRef, useEffect } from 'react';
import { CiMenuKebab } from 'react-icons/ci';

interface DropdownProps {
  onOptionClick: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onOptionClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleOptionClick = (option: string) => {
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
              onClick={() => handleOptionClick('Purchase order')}
              className='p-2 cursor-pointer hover:bg-gray-100'
            >
              Purchase order
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
        </div>
      )}
    </div>
  );
};

export default Dropdown;
