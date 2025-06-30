import React from 'react';
import { CustomModal } from '../../component/Modal'; // Assuming CustomModal is a reusable modal component
 // Import a reusable button component for the close button
 import Cookies from 'js-cookie';
import { useGetOrderData, useGetPointData } from '@/hooks/useGetData';

export const ReferralPointsModal = ({ isOpen, setIsOpen, referralData }: any) => {

  const closeModal = () => {
    setIsOpen(false);
  }


    // const userToken = token;
  const userToken = Cookies.get('token') as string;

  const tkn_: string = Cookies.get('token') as string;

  const { data: pointinfo, isLoading: pointsLoading, error: pointerror } = useGetPointData('/api/getpoints', "get_point_details", userToken);


// console.log(pointinfo?.data?.data, 'pointinfo')




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
              {pointinfo?.data?.data?.map((referral: any, index: number) => (
                <tr key={index}>
                  <td className="p-3 border border-gray-300  text-sm text-[#121212] font-Poppins font-medium">{index + 1}</td>
                  <td className="p-3 border border-gray-300  text-sm text-[#121212] font-Poppins font-medium">{referral.description}</td>
                  <td className="p-3 border border-gray-300  text-sm text-[#121212] font-Poppins font-medium">{referral.point}</td>
                  <td className="p-3 border border-gray-300  text-sm text-[#121212] font-Poppins font-medium">{referral.date_created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CustomModal>
  );
};
