import React, { useState } from 'react';
import Dropdown from './Dropdown'; // Assuming this is the correct import path
import { ModalProfile } from './ModalProfile';
import Verify from '@/app/asset/verify.svg'
 // Your reusable Modal component

const ParentComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    if (option === 'Review') {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Dropdown onOptionClick={handleOptionClick} />


  {/*     <ModalProfile icon={Verify}
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

export default ParentComponent;
