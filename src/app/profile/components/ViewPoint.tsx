import React from 'react';
import { CustomModal } from '../../component/Modal'; // Assuming CustomModal is a reusable modal component
 // Import a reusable button component for the close button

export const ReferralPointsModal = ({ isOpen, setIsOpen, referralData }: any) => {

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <CustomModal isOpen={isOpen}>
      <div className="relative p-8  rounded-lg">
        {/* Close Button */}
        <p className="absolute top-4 right-4" onClick={closeModal}>
          <span className="text-2xl">✕</span>
        </p>

        {/* Modal Header */}
        <h2 className="text-lg font-semibold text-center font-Poppins text-[#000000]">Ajiroba Referral Points</h2>
        <p className="text-center font-normal text-sm font-Poppins text-[#A09F9F] ">
          Here is the list of people you have referred and points you have received.
        </p>

        {/* Table */}
        <div className="mt-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#FCDFD4] text-left">
                <th className="p-3 border border-gray-300 text-sm text-[#121212] font-Poppins font-medium">S/N</th>
                <th className="p-3 border border-gray-300 text-sm text-[#121212] font-Poppins font-medium">Name</th>
                <th className="p-3 border border-gray-300 text-sm text-[#121212] font-Poppins font-medium">Points</th>
                <th className="p-3 border border-gray-300 text-sm text-[#121212] font-Poppins font-medium">Date</th>
              </tr>
            </thead>
            <tbody className='mt-8' >
              {referralData?.map((referral: any, index: number) => (
                <tr key={index}>
                  <td className="p-3 border border-gray-300  text-sm text-[#121212] font-Poppins font-medium">{index + 1}</td>
                  <td className="p-3 border border-gray-300  text-sm text-[#121212] font-Poppins font-medium">{referral.name}</td>
                  <td className="p-3 border border-gray-300  text-sm text-[#121212] font-Poppins font-medium">{referral.points}</td>
                  <td className="p-3 border border-gray-300  text-sm text-[#121212] font-Poppins font-medium">{referral.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CustomModal>
  );
};
